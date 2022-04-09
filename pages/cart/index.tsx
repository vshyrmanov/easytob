import {useDispatch, useSelector} from "react-redux";
import {Button, List} from "antd";
import {useEffect, useState} from "react";
import {removeFromCart} from "../../src/store/positionsReducer";
import {IPosition} from "../../src/types/positions";

const Cart = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useSelector(state => state.positions.cart);
	const positions = useSelector(state => state.positions.positions);
	const dispatch = useDispatch();

	useEffect(() => {
		if (cart.length > 0) {
			let res = 0;
			cart.forEach(e => res += e.price);
			setTotalPrice(res);
		} else {
			setTotalPrice(0);
		}
	}, [cart]);

	const remove = (id) => {
		dispatch(removeFromCart(id));
	};

	console.log(positions);

	return (
			<>
				{cart && <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item: IPosition) => (
								<List.Item
										actions={[<Button onClick={() => remove(item._id)}>remove</Button>]}
								>
									<List.Item.Meta
											title={item.name}
											description={item.desc}
									/>
									<div>{item.price}</div>
								</List.Item>
						)}
        />}
				<hr/>
				<List.Item>Total price: <h2>{totalPrice}</h2></List.Item>
			</>

	);
};

export default Cart;