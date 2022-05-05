import { Modal } from "antd";
import React,{ FC } from "react";
// @ts-ignore
import classes from './Modal.module.scss';
import {FileImageOutlined} from "@ant-design/icons";

interface IModal {
	children: React.ReactNode,
	isModalVisible: boolean,
	handleModalVisible: () => void,
}

const CustomModal = ({children, isModalVisible, handleModalVisible}: IModal) => {
	return (
				<Modal
						className={classes.main}
						title="Basic Modal"
						visible={isModalVisible}
						onOk={handleModalVisible}
						onCancel={handleModalVisible}
						footer={[
							null
						]}>
					{children}
				</Modal>
	);
};

export default CustomModal;