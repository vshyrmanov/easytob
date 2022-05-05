import React, {useEffect, useState} from 'react';
// @ts-ignore
import classes from '../../styles/Positions.module.scss';
import {rerenderCategory, rerenderPosition} from "../../src/store/rerenderReducer";
import CardPosition from "../../Components/CardElement/CardPosition";
import {useDispatch, useSelector} from "react-redux";
import {getByOwnerRequest, getOneRequest, removeRequest} from "../../Components/workers/sendRequest";
import {Breadcrumb, Divider, Space} from "antd";
import { Typography } from 'antd';
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import {IRootReducer} from "../../src/types/storeTypes";
import {useRouter} from "next/router";
import {removeFromBreadcrumb} from "../../src/store/categoryReducer";

export default function PositionsList ({positions, params}) {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const router = useRouter();
	const [filteredPositions, setFilteredPositions] = useState();
	const breadCrumb: any = useSelector<IRootReducer>(state => state.categories.breadCrumb);
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const currentTitle: any = useSelector<IRootReducer>(state => state.categories.currentTitle);



	useEffect(() => {
		getByOwnerRequest('Position', params.id)
				.then(r => setFilteredPositions(r.data))
				.then(() => dispatch(rerenderPosition(false)))
	}, [])

	const removeBC = (index, path) => {
		router.push(path)
		if (index > 0) {
			dispatch(removeFromBreadcrumb(breadCrumb.slice(0, index)))
		} else {
			dispatch(removeFromBreadcrumb(breadCrumb.slice(0, 1)))
		}
	}

	console.log(filteredPositions)

	return (
			<div className={classes.main}>
				<div className={classes.head}>
						<Breadcrumb>
							{breadCrumb && breadCrumb.map((e, i) =>
									<Breadcrumb.Item key={e.path} onClick={() => removeBC(i, e.path)} style={{ cursor: 'pointer' }}>
										<span>{e.title}</span>
									</Breadcrumb.Item>)}
						</Breadcrumb>
						<Title>{currentTitle}</Title>
				</div>
				<div className={classes.wrapper}>
					<div className={classes.aside}>
							Aside
					</div>
					<div className={classes.content}>
						<div className={classes.cardList}>
							{filteredPositions && filteredPositions.length > 0 ? filteredPositions.map(e =>
									<CardPosition key={e._id} item={e} />
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

