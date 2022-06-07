import React from 'react';
import {changeCurrentLanguage} from "../../store/categoryReducer";
import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducer} from "../../types/storeTypes";

import classes from './CustomSelect.module.scss';

const CustomSelect = () => {
	const dispatch = useDispatch();
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);

	return (
			<Select
					bordered={false}
					className={classes.custom_select}
					defaultValue={currentLanguage}
					placeholder="Select language"
					onChange={(value) => dispatch(changeCurrentLanguage(value))}>
				<Select.Option key={"UA"} value={0}>UA</Select.Option>
				<Select.Option key={"RU"} value={1}>RU</Select.Option>
				<Select.Option key={"EN"} value={2}>EN</Select.Option>
			</Select>
	);
};

export default CustomSelect;