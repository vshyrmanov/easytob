import React, {useCallback, useState} from 'react';
import {AppstoreOutlined, CrownOutlined } from "@ant-design/icons";
import {Menu} from "antd";
import Link from "next/link";
// @ts-ignore
import classes from './Menu.module.scss';
import {useDispatch} from "react-redux";
import {changeCurrentCategoryId} from "../../../src/store/categoryReducer";
import EditCategoryDrawer from "../Drawer/EditCategoryDrawer";
import {sendGetOneRequest} from "../workers/sendRequestCategories";

const CustomMenu = ({ items, handleModalVisible }) => {
	const { SubMenu } = Menu;
	const dispatch = useDispatch();

	const [openKeys, setOpenKeys] = useState(['sub1']);
	const [editItem, setEditItem] = useState()
	const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

	const onOpenChange = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	const [drawerVisible, setDrawerVisible] = useState(false)

	const getItem = (id) => {
		sendGetOneRequest(id)
				.then(r => setEditItem(r.data))
	}

	return (
			<Menu
					mode="inline"
					openKeys={openKeys}
					onOpenChange={onOpenChange}
					className={classes.menu}
			>
				<SubMenu key="sub1" icon={<AppstoreOutlined />} title="Categories">
					{items && items.map(e =>
							<>
								<Menu.Item key={e._id}>
									<div style={{ display: 'flex', justifyContent: 'space-between'}}>
										<div style={{ border: '1px solid red' }} onClick={() => (getItem(e._id), setDrawerVisible(true))}>Edit </div>
										{/*<div style={{ border: '1px solid red' }}><Link href={`/filter/${e._id}`}>{e.name}</Link></div>*/}
									</div>
								</Menu.Item>
								<Menu.Item key={e._id}>
										<div style={{ border: '1px solid red' }}><Link href={`/filter/${e._id}`}>{e.name}</Link></div>
								</Menu.Item>
							</>
							)}
				</SubMenu>
				<SubMenu key="sub2" icon={<CrownOutlined /> } title="Admin">
					<Menu.Item key={'add_category'} onClick={() => handleModalVisible('category')}>
						Add category
					</Menu.Item>
					<Menu.Item key={'add_position'} onClick={() => handleModalVisible('position')}>
						Add position
					</Menu.Item>
				</SubMenu>
				{editItem && <EditCategoryDrawer
						visible={drawerVisible}
						showDrawer={() => (setDrawerVisible(false), setEditItem(""))}
            editItem={editItem}
				/>}
			</Menu>
	);
};

export default CustomMenu;