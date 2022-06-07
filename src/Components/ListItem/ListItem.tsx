import React, {FC} from 'react';
import {Avatar, List, Spin} from "antd";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {IRootReducer} from "../../types/storeTypes";

// @ts-ignore
import classes from './ListItem.module.scss';
import {useRouter} from "next/router";

interface ItemProps {
	_id: string,
	name: string,
	image: string,
	price?: number,
}

const ListItem:FC<ItemProps> = ({_id, name, image, price}) => {
	const router = useRouter();

	const toPosition = () => {
		router.push(`/element/${_id}`)
	}

	return (
			<div className={classes.main} onClick={toPosition}>
				<img alt={name} src={image} />
				<p>{name}</p>
			</div>
	);
};

export default ListItem;
