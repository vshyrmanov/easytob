import { Card, Button } from 'antd';
import { useState } from "react";
// @ts-ignore
import classes from './CardElement.module.scss';
import { useDispatch } from "react-redux";
import { addToCart } from "../../src/store/positionsReducer";

const CardElement = ({ item }) => {
	const { Meta } = Card;
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleCartButton = () => {
		setLoading(true)
		dispatch(addToCart(item))
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	};

	return (
			<Card.Grid className={classes.card}>
				<img
						className={classes.avatar}
						src="https://www.gscaltexindia.com/wp-content/uploads/2020/12/kixx-ultra-synthetic.jpg"
				/>
				<div className={classes.desc}>
					<Meta
							className={classes.meta}
							title={item.name}
							description={item.desc}
					/>
					<h3>&#8372; {item.price}</h3>
					<div className={classes.btn}>
						<Button
								type="primary"
								onClick={handleCartButton}
						>Add to card</Button>
					</div>
				</div>
			</Card.Grid>
	);
};

export default CardElement;