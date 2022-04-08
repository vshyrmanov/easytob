import { List } from 'antd';
// @ts-ignore
import classes from '../../styles/Users.module.scss';
import ListItem from '../../Components/ListItem/ListItem';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from "react";
import axios from 'axios';

interface IUsers {
	id: string,
	name: string,
}

const Users = () => {
	const [categories, setCategories] = useState();
	const dispatch = useDispatch();

	const storeId = useSelector(state => state.currentStore);

	useEffect(() => {
		if (storeId) {
			axios.get(`https://arcane-falls-56249.herokuapp.com/store/getCategories/${storeId}`)
					.then(r => setCategories(r.data));
		}
	}, [storeId])

	return (
			<List
					itemLayout="horizontal"
					dataSource={categories}
					renderItem={(item: IUsers) => (<ListItem item={item} />)}
			/>
	);
};

export default Users;