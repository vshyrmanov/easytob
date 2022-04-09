import { Card } from 'antd';
import CardElement from '../../Components/CardElement/CardElement';
// @ts-ignore
import classes from '../../styles/Home.module.scss';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getAllPositions} from "../../src/store/positionsReducer";


const HomePage = ({ positions }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllPositions(positions));
	}, [positions])

	return (
			<div className={classes.cardList}>
				{positions && positions.map(e =>
					<CardElement key={e._id} item={e} />
				)}
			</div>
	);
};

export default HomePage;

export async function getStaticProps(context) {
	const response = await fetch('https://arcane-falls-56249.herokuapp.com/store/getAllPositions')
	const positions = await response.json()
	return {
		props: {positions}
	}
}