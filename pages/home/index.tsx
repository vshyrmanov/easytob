import CardPosition from '../../Components/CardElement/CardPosition';
// @ts-ignore
import classes from '../../styles/Home.module.scss';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {rerenderCategory, rerenderPosition} from "../../src/store/rerenderReducer";
import {IRootReducer} from "../../src/types/storeTypes";
import HomeCarousel from "../../Components/UI/Carousel/HomeCarousel";
import {Avatar, Col, Divider, Menu, Row, Skeleton, Space, List} from "antd";
import {getAllRequest} from "../../Components/workers/sendRequest";
import {changeCurrentSubcategoryId} from "../../src/store/categoryReducer";
import Link from "next/link";


const HomePage = () => {
	const [positions, setPositions] = useState([]);
	const dispatch = useDispatch();
	const rerender = useSelector<IRootReducer>(state => state.rerender.positions)
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const [categoriesSelect, setCategoriesSelect] = useState()
	const [isSkeleton, setIsSkeleton] = useState(false)


	useEffect(() => {
		setIsSkeleton(true)
		getAllRequest('Position')
				.then(r => setPositions(r.data))
				.then(() => (dispatch(rerenderPosition(false)), setIsSkeleton(false)))
	}, [])

	useEffect(() => {
		getAllRequest('Category')
				.then(r => setCategoriesSelect( r.data))
				.then(() => dispatch(rerenderCategory(false)))
	}, [])

	return (
			<div className={classes.main}>
				<div className={classes.aside}>
					{/*<CustomTree items={selectItems} />*/}
								<Menu
										mode="inline"
										defaultSelectedKeys={['1']}
										defaultOpenKeys={['sub1']}
										style={{ height: '100%', borderRight: 0 }}
								>
									{categoriesSelect && categoriesSelect.map(e =>
											<Menu.Item
													key={e._id}
													onClick={() => dispatch(changeCurrentSubcategoryId({type: 'Subcategory', id: e._id}))}
											>
												<Link href={`/subcategories/${e._id}`}>
													{e.name[currentLanguage].name}
												</Link>
											</Menu.Item>
									)}
								</Menu>
				</div>
				<div className={classes.content}>
					<div className={classes.carousel}><HomeCarousel /></div>
					<div className={classes.cardList}>
						<Divider orientation="left">Last positions</Divider>
						{!isSkeleton && <div className={classes.cards}>
							{positions && positions.map(e =>
									<CardPosition key={e._id} item={e} isSkeleton={isSkeleton} />
							)}
						</div>}
						{isSkeleton && <Skeleton active />}
					</div>
					<div className={classes.cardList}>
						<Divider orientation="left">Last positions</Divider>
						{!isSkeleton && <div className={classes.cards}>
							{positions && positions.map(e =>
									<CardPosition key={e._id} item={e} isSkeleton={isSkeleton} />
							)}
            </div>}
						{isSkeleton && <Skeleton active />}
					</div>
					<div className={classes.cardList}>
						<Divider orientation="left">Last positions</Divider>
						{!isSkeleton && <div className={classes.cards}>
							{positions && positions.map(e =>
									<CardPosition key={e._id} item={e} isSkeleton={isSkeleton} />
							)}
            </div>}
						{isSkeleton && <Skeleton active />}
					</div>
				</div>
			</div>
	);
};

export default HomePage;

// export async function getStaticProps(context) {
// 	const response = await fetch('https://arcane-falls-56249.herokuapp.com/store/getAllPositions')
// 	const positions = await response.json()
// 	return {
// 		props: {positions}
// 	}
// }