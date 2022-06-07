import React, {useEffect, useState} from 'react';
import {Carousel, Divider, List} from "antd";
import {getByOwnerRequest, getOneRequest, removeRequest} from "../../src/Components/workers/sendRequest";
import { rerenderSubcategory } from "../../src/store/rerenderReducer";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducer} from "../../src/types/storeTypes";
import CardElementSub from "../../src/Components/CardElement/CardSubcategory";
// @ts-ignore
import classes from '../../styles/Subcategories.module.scss';
import {useRouter} from "next/router";
import {IPosition} from "../../src/types/positions";

const SubcategoriesElements = ({ subcategories, params }) => {
	const dispatch = useDispatch();
	const rerender = useSelector<IRootReducer>(state => state.rerender.subcategories)
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);

	const router = useRouter();
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [filteredPositions, setFilteredPositions] = useState<any>();
	const [editItem, setEditItem] = useState<IPosition>();


	useEffect(() => {
		getByOwnerRequest('Subcategory', params.id)
				.then(r => setFilteredPositions(r.data))
				.then(() => dispatch(rerenderSubcategory(false)))
		getOneRequest('Category', params.id)
				.then(r => setEditItem(r.data))
	}, [])

	return (
			<div className={classes.main}>
				{editItem && <Divider orientation="left"><h2>{editItem.name[currentLanguage].name}</h2></Divider>}
				<div className={classes.cards}>
					{filteredPositions && filteredPositions.length > 0 ? filteredPositions.map(e =>
							<CardElementSub key={e._id} item={e} categoryName={editItem && editItem.name[currentLanguage].name} />
					) : <h1>Empty list</h1>}
				</div>
			</div>
	);
};

export default SubcategoriesElements;

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getSubcategoryByOwner/${params.id}`)
	const subcategories = await response.json()
	return {
		props: {subcategories, params}
	}
}