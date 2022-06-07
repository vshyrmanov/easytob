import React, {useEffect, useState} from 'react';
// @ts-ignore
import classes from '../../styles/Positions.module.scss';
import { rerenderPosition } from "../../src/store/rerenderReducer";
import CardPosition from "../../src/Components/CardElement/CardPosition";
import {useDispatch, useSelector} from "react-redux";
import { getByOwnerRequest } from "../../src/Components/workers/sendRequest";
import { Typography } from 'antd';
import {IRootReducer} from "../../src/types/storeTypes";


export default function PositionsList ({positions, params}) {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const [filteredPositions, setFilteredPositions] = useState<any>();
	const currentTitle: any = useSelector<IRootReducer>(state => state.categories.currentTitle);

	useEffect(() => {
		getByOwnerRequest('Position', params.id)
				.then(r => setFilteredPositions(r.data))
				.then(() => dispatch(rerenderPosition(false)))
	}, [])

	return (
			<div className={classes.main}>
				<div className={classes.head}>
						<Title>{currentTitle}</Title>
				</div>
				<div className={classes.wrapper}>
					<div className={classes.aside}>
							Aside
					</div>
					<div className={classes.content}>
						<div className={classes.cardList}>
							{filteredPositions && filteredPositions.length > 0 ? filteredPositions.map(e =>
									<CardPosition key={e._id} item={e} isSkeleton={false} />
							) : <h1>Empty list</h1>}
						</div>
					</div>
				</div>
			</div>


	);
};

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getPositionByOwner/${params.id}`)
	const positions = await response.json()
	return {
		props: {positions, params}
	}
}

