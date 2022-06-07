import React, {useEffect, useState} from 'react';
import {Typography, Image, Divider, Button, Breadcrumb} from 'antd';
// @ts-ignore
import classes from '../../styles/Element.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../../src/types/storeTypes";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart } from "../../src/store/positionsReducer";
import { useRouter } from "next/router";

const Element = ({ element }) => {
	const { Title, Text } = Typography;
	const dispatch = useDispatch();
	const router = useRouter();
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const cart: any = useSelector<IRootReducer>(state => state.positions.cart);
	const [isQuantity, setIsQuantity] = useState(false);

	useEffect(() => {
		if (cart.some(e => e._id === element._id)) {
			setIsQuantity(true)
		}
	}, [cart])

	const handleCartButton = () => {
		setIsQuantity(true)
		dispatch(addToCart(element))
	}

	return (
			<div className={classes.main}>
				<div className={classes.head}>
					<Title>{element.name[currentLanguage].name}</Title>
				</div>
				<div className={classes.wrapper}>
					<div className={classes.content}>
						<Image
								width={400}
								src={element.image}
						/>
					</div>
					<div className={classes.volumes}>
						<div className={classes.desc}>
							<Title level={4} >Description</Title>
							<Text>{element.description[currentLanguage].name}</Text>
						</div>
						{!isQuantity ? <Button
										type="primary"
										block
										onClick={handleCartButton}
										className={classes.btn}
								>Add to card</Button> :
								<Text className={classes.toCart} onClick={() => router.push('/cart')}>
									<ShoppingCartOutlined />Added to cart
								</Text>
						}
					</div>
				</div>
			</div>
	);
};

export default Element;

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getOnePosition/${params.id}`)
	const element = await response.json()
	return {
		props: {element}
	}
}