import {Card, Button, Typography} from 'antd';
import { Skeleton, Space, Divider, Switch, Form, Radio, Input } from 'antd';
import React, { useEffect, useState } from "react";
// @ts-ignore
import classes from './CardElement.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../src/store/positionsReducer";

import {IRootReducer} from "../../src/types/storeTypes";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {getOneRequest} from "../workers/sendRequest";
import {addToBreadcrumb} from "../../src/store/categoryReducer";

const CardPosition = ({ item, isSkeleton }) => {
	const { Text, Link } = Typography;
	const { Meta } = Card;
	const router = useRouter();
	const query = useRouter();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const cart: any = useSelector<IRootReducer>(state => state.positions.cart);

	const [isQuantity, setIsQuantity] = useState(false);

	useEffect(() => {
		if (cart.some(e => e._id === item._id)) {
			setIsQuantity(true)
		}
	}, [cart])

	const handleCartButton = () => {
		setLoading(true)
		setIsQuantity(true)
		dispatch(addToCart(item))
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	};

	const [isShowBtn, setIsShowBtn] = useState(false)

	const [subcategory, setSubcategory] = useState<any>()
	const [category, setCategory] = useState<any>()

	useEffect(() => {
		getOneRequest('Subcategory', item.owner)
				.then(r => setSubcategory(r.data))
	}, [])

	useEffect(() => {
		if (subcategory) {
			getOneRequest('Category', subcategory.owner)
					.then(r => setCategory(r.data))
		}
	}, [subcategory])

	const addToRoute = () => {
		router.push(`/element/${item._id}`)
	}

	return (
			<>
				{!isSkeleton && <div className={classes.card} onMouseOver={() => setIsShowBtn(true)} onMouseOut={() => setIsShowBtn(false)}>
					<img
							className={classes.avatar}
							src={item.image ? item.image : "https://www.gscaltexindia.com/wp-content/uploads/2020/12/kixx-ultra-synthetic.jpg"}
					/>
					<div className={classes.desc} >
						<div className={classes.name}>
								<Text strong className={classes.text} onClick={addToRoute}>
									{item.name[currentLanguage].name}
								</Text>
						</div>
						<div className={classes.price}><Text type="secondary">{item.price}₴</Text></div>
					</div>
					<div className={classes.buttons}>
						{!isQuantity ? <Button
										type="primary"
										block
										onClick={handleCartButton}
								>Add to card</Button> :
								<Text className={classes.toCart} onClick={() => router.push('/cart')}>
									<ShoppingCartOutlined />Added to cart
								</Text>
						}
					</div>
				</div>}
				{isSkeleton &&
				<Card.Grid className={classes.card}>
            <Skeleton.Avatar active={true} size={100} shape={'square'} />
            <Skeleton paragraph={{ rows: 1 }} />
            <Skeleton.Button active={true} size={'large'} shape={'square'} block />
				</Card.Grid>}
			</>

	);
};

export default CardPosition;