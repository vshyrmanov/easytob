import { List } from 'antd';
// @ts-ignore
import classes from '../../styles/Users.module.scss';
import ListItem from '../../Components/ListItem/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from "react";
import axios from 'axios';

interface ICategories {
	id: string,
	name: string,
}

const Users = ({categories}) => {

	return (
			<List
					itemLayout="horizontal"
					dataSource={categories}
					renderItem={(item: ICategories) => <ListItem item={item} />}
			/>
	);
};

export default Users;

export async function getStaticProps(context) {
	const response = await fetch('https://arcane-falls-56249.herokuapp.com/store/getCategories')
	const categories = await response.json()
	return {
		props: {categories}
	}
}