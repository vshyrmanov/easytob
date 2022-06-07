import React from 'react';
import {UserOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";

const CustomDropdown = ({ action }) => {
	return (
			<Dropdown
					overlay={
						<label onClick={action}>
							<a>Logout</a>
						</label>
					}
					placement="bottomRight" arrow>
				<UserOutlined />
			</Dropdown>
	);
};

export default CustomDropdown;