import React, { FC } from 'react';
import {Dropdown, Menu, message, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined, SettingOutlined} from "@ant-design/icons";
import DropdownItem from "./DropdownMenu";

interface IMenuItems {
	icon?: React.ReactElement,
	itemName: string,
	method: () => void,
	msgSuccess?: string,
	msgCancel?: string,
	msgConfirm?: string
	type: string
}

const CustomDropdown = ({ ItemsArray, ...props }) => {

	const menu = (
			<Menu>
				{ItemsArray.map(e =>
						<DropdownItem
							icon={e.icon}
							itemName={e.itemName}
							method={e.method}
							msgSuccess={e.msgSuccess}
							msgCancel={e.msgCancel}
							msgConfirm={e.msgConfirm}
							type={e.type}
							key={e.type}

						/>
				)}
			</Menu>
	);

	return (
			<Dropdown overlay={menu} trigger={['click']} {...props}>
				{/*<a  onClick={e => e.preventDefault()}>*/}
					<SettingOutlined />
				{/*</a>*/}
			</Dropdown>
	);
};

export default CustomDropdown;