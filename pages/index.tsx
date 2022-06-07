import React, {useEffect, useState} from 'react';
import CustomCarousel from '../src/Components/UI/Carousel/CustomCarousel';
import SkeletonCard from '../src/Components/UI/Skeleton/SkeletonCard';
// @ts-ignore
import classes from '../styles/Main.module.scss';
import {getAllRequest} from "../src/Components/workers/sendRequest";
import {rerenderPosition} from "../src/store/rerenderReducer";
import {useDispatch, useSelector} from "react-redux";
import List from "../src/Components/List/List";
import Card from '../src/Components/CardElement/Card';
import {IRootReducer} from "../src/types/storeTypes";

const Main = () => {
	const [positions, setPositions] = useState([]);
	const [subcategory, setSubcategory] = useState([]);
	const [isSkeleton, setIsSkeleton] = useState(false)
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsSkeleton(true)
		getAllRequest('Position')
				.then(r => setPositions(r.data))
				.then(() => (dispatch(rerenderPosition(false)), setIsSkeleton(false)))
		getAllRequest('Subcategory')
				.then((r) => (setSubcategory(r.data), setIsSkeleton(false)))
	}, [])

	return (
			<div className={classes.main}>
				<CustomCarousel>
					{!isSkeleton ? <List
							items={subcategory}
							renderItem={(item) => {
							let arr =	positions && positions.filter(e => e.owner === item._id)
								return (
									 <Card
												key={item._id}
												id={item._id}
												name={item.name[currentLanguage].name}
												items={arr}
										/>
								)}}
						/>: <SkeletonCard quantity={3} /> }
				{!isSkeleton ? <List
							items={subcategory}
							renderItem={(item) => {
								let arr =	positions && positions.filter(e => e.owner === item._id)
								return (
										<Card
												key={item._id}
												id={item._id}
												name={item.name[currentLanguage].name}
												items={arr}
										/>
								)}}
					/> : <SkeletonCard quantity={3} />}
				</CustomCarousel>
			</div>
	);
};

export default Main;