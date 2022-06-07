import React, {useEffect, useState} from 'react';
import {Button, Col, Drawer, Row, Space, Form, Input, Select, Upload, Divider} from "antd";
import {rerenderCategory, rerenderPosition, rerenderSubcategory} from "../../store/rerenderReducer";
import {useDispatch, useSelector} from "react-redux";
import {createRequest, updateRequest} from "../workers/sendRequest";
import UploadImg from "../UI/UploadImg/UploadImg";
import SelectCustom from "../UI/SelectCustom/SelectCustom";
import FormTranslate from "../FormTranslate/FormTranslate";
import SwitchVisibility from "../UI/SwitchVisibility/SwitchVisibility";
import InputCustom from "../UI/InputCustom/InputCustom";
import {IRootReducer} from "../../types/storeTypes";
import {isEdit} from "../../store/categoryReducer";

const DrawerCustom = ({ visible, showDrawer, type, editItem }) => {
	const edit: unknown = useSelector<IRootReducer>(state => state.categories.edit);
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [img, setImg] = useState<any>( "");
	const [nameTranslations, setNameTranslations] = useState( []);
	const [descTranslations, setDescTranslations] = useState( []);
	const [status, setStatus] = useState(true);
	const [owner, setOwner] = useState( "");
	const [price, setPrice] = useState( "");

	useEffect(() => {
		if (edit) {
			setImg( editItem.image)
			setNameTranslations(editItem.name)
			setDescTranslations(editItem.description)
			setOwner(editItem.owner)
			setStatus(editItem.status)
			setOwner(editItem.owner)
			setPrice(editItem.price)
		}
	}, [])

	const sendForm = {
		name: nameTranslations,
		owner: owner,
		status: status,
		description: descTranslations,
		price: price
	}


	const clear = () => {
		if (edit) {
			showDrawer()
			dispatch(isEdit(false))

		} else {
			form.resetFields()
			// setImg("")
			setNameTranslations([])
			setDescTranslations([])
			setOwner("")
			showDrawer()
			dispatch(isEdit(false))
		}
	}

	const finish = () => {
		{edit ?
				updateRequest(type, sendForm, editItem._id, img)
						.then(() => {
							clear()
							switch (type) {
								case 'Category':
									dispatch(rerenderCategory(true))
									break;
								case 'Subcategory':
									dispatch(rerenderSubcategory(true))
									break;
								case 'Position':
									dispatch(rerenderPosition(true))
									break;
							}
						})
				:
				createRequest(type, sendForm, img)
						.then(() => {
							clear()
							switch (type) {
							case 'Category':
								dispatch(rerenderCategory(true))
								break;
							case 'Subcategory':
								dispatch(rerenderSubcategory(true))
								break;
							case 'Position':
								dispatch(rerenderPosition(true))
								break;
						}})}
	};


	return (
			<Drawer
					title="Create a new subcategory"
					placement="right"
					width={500}
					onClose={clear}
					visible={visible}
			>
				{type !== 'Category' && <UploadImg img={img} setImg={setImg} edit={edit} />}
				<Divider orientation="left">Translations</Divider>
					<FormTranslate
							translations={nameTranslations}
							setTranslations={setNameTranslations}
							label={type === 'Subcategory' ? "Name of subcategory" : type === 'Category' ? "Name of category" : "Name of position"}
							form={form}
							type="text"
							placeholder={"Enter a name"}
							edit={edit}
					/>
				<Divider orientation="left">Choose category</Divider>
					{type !== 'Category' && <SelectCustom type={type} setOwner={setOwner} />}
					<SwitchVisibility status={status} setStatus={setStatus}/>
				{type === 'Position' && <Divider orientation="left">Description</Divider>}
				{type === 'Position' && <FormTranslate
							translations={descTranslations}
							setTranslations={setDescTranslations}
							label="Description of position"
							form={form}
							type="textarea"
							placeholder={"Enter a description"}
					/>}
				{type === 'Position' && <Divider orientation="left">Price</Divider>}
				{type === 'Position' && <InputCustom value={price} setValue={setPrice} edit={true} />}
				<Divider orientation="left" />
				<Space>
					<Button onClick={clear}>Cancel</Button>
					<Button type="primary" onClick={finish}>Send</Button>
				</Space>
			</Drawer>
	);
};

export default DrawerCustom;