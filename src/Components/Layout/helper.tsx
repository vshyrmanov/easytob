import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import React from "react";
import {changeRole, changeToken, changeUserId} from "../../store/categoryReducer";
import {handleHideButton} from "../../store/positionsReducer";

const { confirm } = Modal;

export const headerColorized = (query, setTransparentHeader) => {
	if (query.pathname !== '/') {
		setTransparentHeader(false)
	} else {
		setTransparentHeader(true)
	}
}

export const modalHelper = (userId, state, setState) => {
	const handleModal = () => {
		if (!userId) {
			setState(!state);
		}
	}
	return { handleModal };
}

export const logOut = (dispatch) => {
	const showConfirm = () => {
		confirm({
			title: 'Do you Want to logout?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				dispatch(changeToken(""))
				dispatch(changeUserId(""))
				dispatch(changeRole(""))
			},
			onCancel() {
			},
		});
	}
	return { showConfirm }
};

export const scrollHelper = (dispatch, setState) => {
	window.onscroll = function() {
		let distanceScrolled = document.documentElement.scrollTop;
		if (distanceScrolled >= 200) {
			setState(true);
			dispatch(handleHideButton(true))
		}
		if (distanceScrolled < 316) {
			setState(false);
			dispatch(handleHideButton(false))
		}
	}
}


