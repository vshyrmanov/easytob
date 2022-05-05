import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, List, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {addToCart, deleteFromCart, removeFromCart} from "../../src/store/positionsReducer";
import {IPosition} from "../../src/types/positions";
import {IRootReducer} from "../../src/types/storeTypes";

// @ts-ignore
import classes from '../../styles/Cart.module.scss';

const Cart = () => {
	const { Title } = Typography;
	const [totalPrice, setTotalPrice] = useState(0);
	const [data, setData] = useState([])
	const cart: any = useSelector<IRootReducer>(state => state.positions.cart);
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const dispatch = useDispatch();

	useEffect(() => {
		if (cart.length > 0) {
			let res = 0;
			cart.forEach(e => res += e.price);
			setTotalPrice(res);
			// @ts-ignore
			let uniq = [...new Map(cart.map(item =>
					[item["_id"], item])).values()]
			setData(uniq)
		} else {
			setTotalPrice(0);
		}
		if (cart.length == 0) {
			setData([])
		}

	}, [cart]);

	let test = {}
		if (cart && cart.length > 0) {
			cart.forEach(e => {
						if (test.hasOwnProperty(e._id)) {
							let count = test[e._id] += 1
							test[`${e._id}`] = count
						} else {
							Object.assign(test, {[e._id]: 1})
						}
					}
			)
		}

		const increment = (item) => {
			dispatch(addToCart(item))
		}

	const decrement = (id) => {
			let res = [...cart]
		for(let x = 0; x <= res.length; x++) {
			if (res[x]._id === id) {
				res.splice(x, 1);
				break;
			}
		}
		dispatch(removeFromCart(res))
	}

	const remove = (id) => {
		dispatch(deleteFromCart(id))
	};

	return (
			<div className={classes.main}>
				<div className={classes.head}>
					<Title level={2}>Cart</Title>
				</div>
				<div className={classes.content}>
					{cart && <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item: IPosition) => (
									<List.Item
											actions={[<Button onClick={() => remove(item._id)}>remove</Button>]}
									>
										<List.Item.Meta
												avatar={<Avatar src={item.image} />}
												title={item.name[currentLanguage].name}
												description={item.desc}
										/>
										<Space className={classes.quantity}>
											<div className={classes.btns}>
												<Button onClick={() => decrement(item._id)}>-</Button>
												<div>{test[item._id]}</div>
												<Button onClick={() => increment(item)} >+</Button>
											</div>
											<div className={classes.price_item}>{test[item._id] && item.price * test[item._id]}</div>
										</Space>
									</List.Item>
							)}
          />}
				</div>
				<div className={classes.foot}>
					<List.Item>Total price: <h2>{totalPrice}</h2></List.Item>
				</div>
			</div>

	);
};

export default Cart;