import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

const Home = ({categories}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({type: "ADD_STORES", payload: categories})
	}, [])

	console.log(categories);
	return (
			<div>
				Hello there!
			</div>
	);
};

export default Home;

export async function getStaticProps(context) {
	const response = await fetch('https://arcane-falls-56249.herokuapp.com/store/getAll')
	const categories = await response.json()
	return {
		props: {categories}
	}
}