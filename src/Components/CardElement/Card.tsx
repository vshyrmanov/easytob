import React, {FC} from 'react';
import List from "../List/List";
import ListItem from "../ListItem/ListItem";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducer} from "../../types/storeTypes";
// @ts-ignore
import classes from './Card.module.scss';
import {useRouter} from "next/router";
import {currentTitle} from "../../store/categoryReducer";

interface Item {
	_id: string,
	name: {},
	image: string,
}

interface CardProps<T> {
	items: Item[],
	name: string,
	id: string,
}

export default function Card<T> (props: CardProps<T>) {
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const router = useRouter();
	const dispatch = useDispatch();


	const getRoute = () => {
		router.push(`/positions/${props.id}`)
		dispatch(currentTitle(props.name))
	}

	return (
			<div className={classes.main}>
				<h1 onClick={getRoute}>{props.name}</h1>
				<List
						items={props.items}
						renderItem={(item, i) =>
								<ListItem
										key={item._id}
										_id={item._id}
										name={item.name[currentLanguage].name}
										image={item.image}
								/>
						}
				/>
			</div>
	);
};

// export default Card;