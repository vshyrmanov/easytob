import React from 'react';
import {Carousel} from "antd";

const HomeCarousel = () => {
	const contentStyle:React.CSSProperties = {
		// height: '250px',
		// width: '100%',
		color: '#fff',
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		lineHeight: '160px',
		textAlign: 'center',
		background: '#fff',
		objectFit: "cover"
	};
	return (
			<Carousel autoplay>
				<div>
					<div style={contentStyle}>
						<img alt="price"
								 src="https://content.rozetka.com.ua/banner_main/image/original/261746187.jpg"
						/>
					</div>
				</div>
				<div>
					<div style={contentStyle}>
						<img
								alt="price"
								src="https://content.rozetka.com.ua/banner_main/image/original/261635401.jpg"
						/>
					</div>
				</div>
				<div>
					<div style={contentStyle}>
						<img
								alt="price"
								src="https://content2.rozetka.com.ua/banner_main/image/original/261746185.jpg"
						/>
					</div>
				</div>
				{/*<div>*/}
				{/*	<div style={contentStyle}>*/}
				{/*		<img*/}
				{/*				alt="price"*/}
				{/*				src="https://content.rozetka.com.ua/banner_main/image/original/261847967.jpg"*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</Carousel>
	);
};

export default HomeCarousel;