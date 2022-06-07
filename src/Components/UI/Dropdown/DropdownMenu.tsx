import React from 'react';
import {Menu, message, Popconfirm} from "antd";



const DropdownItem = ({ method, msgSuccess, msgCancel, icon, itemName, msgConfirm, type, ...props }) => {

	const confirm = () => {
		method()
		message.success(msgSuccess);
	}

	const cancel = () => {
		message.error(msgCancel);
	}


	return (
						<Menu.Item onClick={type !== 'delete' && method} {...props}>
							{icon} {itemName}
							{type === 'delete' && <Popconfirm
										title={msgConfirm}
										onConfirm={confirm}
										onCancel={cancel}
										okText="Yes"
										cancelText="No"
								>
									<a href="#" />
								</Popconfirm>
							}
						</Menu.Item>
		);
};

export default DropdownItem;