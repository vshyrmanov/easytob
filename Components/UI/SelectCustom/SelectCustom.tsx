import React, {useState} from 'react';
import {Button, Form, Row, Select, Space} from "antd";
import useSWR from "swr";
import {LINK} from "../../Helpers/Links";
import {fetcher} from "../../workers/fetcher";
import {useSelector} from "react-redux";
import {IRootReducer} from "../../../src/types/storeTypes";

const SelectCustom = ({ type, setOwner, form }) => {
	const { Option, OptGroup } = Select;
	const selectItemsCategories = useSWR(`${LINK}getAllCategory`, fetcher, {refreshInterval: 2000});
	const selectItemsSubCategories = useSWR(`${LINK}getAllSubcategory`, fetcher, {refreshInterval: 2000})
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);

	return (
				<Form form={form}>
					<Select placeholder="Please select an owner" onChange={(e) => setOwner(e)}>
						{type === 'Subcategory' && selectItemsCategories.data && selectItemsCategories.data.map(e =>
								<Option key={e._id} value={e._id}>{e.name[currentLanguage].name}</Option>
						)}
						{type === 'Position' && selectItemsCategories.data && selectItemsCategories.data.map(e =>
								<OptGroup label={e.name[currentLanguage].name} key={e._id}>
									{selectItemsSubCategories.data && selectItemsSubCategories.data.map((a, i) =>
											e._id === a.owner && <Option key={a._id + i} value={a._id}>{a.name[currentLanguage].name}</Option>
									)}
								</OptGroup>
						)}
					</Select>
				</Form>
	);
};

export default SelectCustom;