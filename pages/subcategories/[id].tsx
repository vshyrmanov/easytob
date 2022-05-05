import React, {useEffect, useState} from 'react';
import {Carousel, Divider, List} from "antd";
import {getByOwnerRequest, getOneRequest, removeRequest} from "../../Components/workers/sendRequest";
import { rerenderSubcategory } from "../../src/store/rerenderReducer";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducer} from "../../src/types/storeTypes";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import CustomDropdown from "../../Components/UI/Dropdown/Dropdown";
import CardElementSub from "../../Components/CardElement/CardSubcategory";
import classes from '../../styles/Subcategories.module.scss';
import {useRouter} from "next/router";
import DrawerCustom from "../../Components/Drawer/DrawerCustom";
import HomeCarousel from "../../Components/UI/Carousel/HomeCarousel";

const SubcategoriesElements = ({ subcategories, params }) => {
	const dispatch = useDispatch();
	const rerender = useSelector<IRootReducer>(state => state.rerender.subcategories)
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);

	const router = useRouter();
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [filteredPositions, setFilteredPositions] = useState();
	const [editItem, setEditItem] = useState();

	const editElement = () => {
		setDrawerVisible(!drawerVisible);
		dispatch(isEdit(true))
	}

	// useEffect(() => {
	// 	setFilteredPositions(subcategories)
	// }, [subcategories])

	useEffect(() => {
		getByOwnerRequest('Subcategory', params.id)
				.then(r => setFilteredPositions(r.data))
				.then(() => dispatch(rerenderSubcategory(false)))
		getOneRequest('Category', params.id)
				.then(r => setEditItem(r.data))
	}, [])

	const removeElement = () => {
		removeRequest('Category', params.id)
				.then(() => {
					dispatch(rerenderSubcategory(true))
					router.push('/subcategories/')
				})
	}

	console.log(editItem)

	return (
			<div className={classes.main}>
				<div className={classes.carousel}><HomeCarousel /></div>
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