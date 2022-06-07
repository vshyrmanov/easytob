import React, {useEffect, useState} from 'react';
import {AutoComplete, Avatar, List} from "antd";
import {getAllRequest} from "../workers/sendRequest";
import Link from "next/link";
import {useSelector} from "react-redux";
import {IRootReducer} from "../../types/storeTypes";

import classes from './CustomAutocomplete.module.scss';

const CustomAutocomplete = () => {
	const [allPosition, setAllPosition] = useState([]);
	const [allSubcategory, setAllSubcategory] = useState([]);
	const [options, setOptions] = useState([]);
	const [isFocus, setIsFocus] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);

	useEffect(() => {
		getAllRequest('Position')
				.then((r) => setAllPosition(r.data))
		getAllRequest('Subcategory')
				.then((r) => setAllSubcategory(r.data))
	}, [])
	const clearSearchInput = () => {
		setIsFocus(!isFocus);
		setSearchValue("");
	}
	useEffect(() => {
		setOptions(allSubcategory.map(item => ({
					label: item.name[currentLanguage].name,
					options: allPosition
							.filter(elem => elem.owner === item._id)
							.map(e => ({
								value: e.name[currentLanguage].name,
								label: (
										<Link href={`/element/${e._id}`}><List.Item.Meta
												avatar={<Avatar src={e.image} />}
												title={
													<a onClick={clearSearchInput}>{e.name[currentLanguage].name}</a>
												}
												description={`₴${e.price}`}
										/></Link>)
							}))
				})
		))
	}, [allPosition, allSubcategory, isFocus])

	const searchResult = (query: string) => {
		return allPosition
				.filter(item => item.name[currentLanguage].name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
				.map(e => ({value: e.name[currentLanguage].name, label: (
							<Link href={`/element/${e._id}`}><List.Item.Meta
									avatar={<Avatar src={e.image} />}
									title={
										<a onClick={clearSearchInput}>{e.name[currentLanguage].name}</a>
									}
									description={e.price}
							/></Link>)})
				)
	}

	const handleSearch = (value: string) => {
		setOptions(value ? searchResult(value) : []);
	};
	return (
			<div className={classes.search}>
				<AutoComplete
						dropdownClassName="certain-category-search-dropdown"
						dropdownMatchSelectWidth={500}
						className={classes.autocomplete}
						options={options}
						value={searchValue}
						onChange={(e) => setSearchValue(e)}
						onSearch={handleSearch}
						onBlur={clearSearchInput}
						notFoundContent="😿 Nothing found"
						allowClear={true}
						placeholder="Find something ..."
						onSelect={clearSearchInput}
				>
				</AutoComplete>
			</div>
	);
};

export default CustomAutocomplete;