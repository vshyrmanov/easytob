import {Card, Button, Spin} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import Link from 'next/link';
// @ts-ignore
import classes from './CardSubcategory.module.scss';
import {useDispatch, useSelector} from "react-redux";
import { addToCart } from "../../src/store/positionsReducer";
import {rerenderCategory, rerenderPosition, rerenderSubcategory} from "../../src/store/rerenderReducer";
import CustomDropdown from "../UI/Dropdown/Dropdown";
import {removeRequest} from "../workers/sendRequest";
import {addToBreadcrumb, changeCurrentSubcategoryId, currentTitle } from "../../src/store/categoryReducer";
import {IRootReducer} from "../../src/types/storeTypes";
import DrawerCustom from "../Drawer/DrawerCustom";
import {useRouter} from "next/router";

const CardElementSub = ({ item, categoryName }) => {
	const [loading, setLoading] = useState(false);
	const query = useRouter();
	const dispatch = useDispatch();
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);

	return (
			<>
				<Card.Grid className={classes.card}>
					<img
							className={classes.avatar}
							src={item.image ? item.image : "https://www.gscaltexindia.com/wp-content/uploads/2020/12/kixx-ultra-synthetic.jpg"}
					/>
					<div className={classes.desc}>
						<Link href={`/positions/${item._id}`}>
							<a onClick={() => {
								setLoading(true)
								dispatch(addToBreadcrumb({title: categoryName, path: query.asPath }))
								dispatch(currentTitle(item.name[currentLanguage].name))
							}}>
								{item.name[currentLanguage].name}
							</a>
						</Link>  <div className={classes.spin}>{loading && <Spin />}</div>
					</div>
				</Card.Grid>
			</>

	);
};

export default CardElementSub;