import React, {useEffect, useState} from 'react';
import {Button} from "antd";

// @ts-ignore
import classes from './CustomCarousel.module.scss';
import {useSelector} from "react-redux";
import {IRootReducer} from "../../../types/storeTypes";

const CustomCarousel = ({ children }) => {
	const [move, setMove] = useState({ step: 0, counter: 0 });
	const hideButtons: any = useSelector<IRootReducer>(state => state.positions.hideButtons);


	const imagesArr = () => {
		const arr = [
			'https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg',
			'https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg',
			'https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg',
			'https://m.media-amazon.com/images/I/61-8rBAD68L._SX3000_.jpg',
			'https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg'
		]
		let res = arr.map(item => (
				<div key={item} className={classes.carousel_item} style={{ backgroundImage: `url(${item})`}} />
		))
		return { res, length: arr.length }
	}

	const { res, length } = imagesArr();

	useEffect(() => {
		if (move.counter === length) {
			setMove({step: 0, counter: 0})
		}
		if (move.counter === -1) {
			setMove({step: 400, counter: 4})
		}
	}, [move.counter])

	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	}

	return (
			<div className={classes.background}>
				<div className={classes.carousel} style={{ left: `-${move.step}%`}}>
					{res}
				</div>
				{<div className={!hideButtons ? classes.arrows : classes.hide_arrows}>
					<Button ghost onClick={() => setMove({step: move.step - 100, counter: move.counter - 1})}>Left</Button>
					<Button ghost onClick={() => setMove({step: move.step + 100, counter: move.counter + 1})}>Right</Button>
				</div>}
				<div className={classes.content}>
						{children}
					<div className={classes.footer}>
						<div className={classes.toTop} onClick={scrollToTop}>
							Back to top
						</div>
						<div className={classes.footer_content}>
							<img alt="footer_logo" src={"https://www.logopik.com/wp-content/uploads/edd/2018/07/Ecommerce-Logo-Vector.png"} />
						</div>
					</div>
				</div>

			</div>
	);
};

export default CustomCarousel;