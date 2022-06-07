import React, {useState} from 'react';
import {Button, Input, message, Space} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from "@ant-design/icons";
import {auth} from "../../workers/sendRequest";
import {changeRole, changeToken, changeUserId} from "../../../store/categoryReducer";
import {useDispatch, useSelector} from "react-redux";
import {IRootReducer} from "../../../types/storeTypes";

const AuthForm = ({ modal, setModal }) => {
	const dispatch = useDispatch();
	const userId: any = useSelector<IRootReducer>(state => state.categories.userId);

	const [form, setForm] = useState({ username: "", password: "" })

	const handleAuth = (type) => {
		auth(type, form)
				.then(r => {
					handleModal()
					dispatch(changeToken(r.token))
					dispatch(changeUserId(r.userId))
					dispatch(changeRole(r.role))
					message.success(type === 'register' ? "User has been registered" : "User has been authorized")
				})
				.catch(e => message.error(e.message))
	}

	const handleModal = () => {
		if (!userId) {
			setModal(!modal);
		}
	};

	return (
			<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
				<Input
						value={form.username}
						onChange={(e) => setForm({...form, username: e.target.value})}
						size="large"
						placeholder="Enter user name"
						prefix={<UserOutlined />} />
				<Input.Password
						value={form.password}
						onChange={(e) => setForm({...form, password: e.target.value})}
						placeholder="Enter password"
						iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
				/>
				<Button type="primary" block onClick={() => handleAuth('login')}>Login</Button>
				<Button type="primary" block onClick={() => handleAuth('register')}>Register</Button>
			</Space>
	);
};

export default AuthForm;