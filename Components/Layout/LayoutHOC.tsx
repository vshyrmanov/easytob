import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {Layout, Input, AutoComplete, Select, Modal, Button, Typography, message, Space, Dropdown, Badge} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import {IRootReducer} from "../../src/types/storeTypes";
// @ts-ignore
import classes from './LayoutHOC.module.scss';
import {rerenderCategory, rerenderSubcategory} from "../../src/store/rerenderReducer";
import {
	ShoppingCartOutlined,
	UserOutlined,
	HomeOutlined,
	SettingOutlined
} from "@ant-design/icons";
import {auth} from "../workers/sendRequest";
import {
	changeCurrentLanguage,
	changeCurrentSubcategoryId,
	changeRole, changeToken, changeUserId,
	removeFromBreadcrumb
} from "../../src/store/categoryReducer";
import CustomModal from "../UI/Modal/Modal";


const LayoutHOC = ({children}) => {
	const { Text } = Typography;
	const { confirm } = Modal;
	const { Header, Content } = Layout;
	const { Option } = Select;
	const dispatch = useDispatch();
	const cart: any = useSelector<IRootReducer>(state => state.positions.cart);
	const rerender: any = useSelector<IRootReducer>(state => state.rerender.categories);
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const breadCrumb: any = useSelector<IRootReducer>(state => state.categories.breadCrumb);
	const role: any = useSelector<IRootReducer>(state => state.categories.role);
	const userId: any = useSelector<IRootReducer>(state => state.categories.userId);
	const token: any = useSelector<IRootReducer>(state => state.categories.token);



	const reset = () => {
		dispatch(removeFromBreadcrumb(breadCrumb.slice(0, 1)))
	}

	// useEffect(() => {
	// 	if (cart.length > 0) {
	// 		setCartCounter(cart.length);
	// 	} else {
	// 		setCartCounter(0);
	// 	}
	// }, [cart])


	function getRandomInt(max: number, min: number = 0) {
		return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
	}

	const searchResult = (query: string) =>
			new Array(getRandomInt(5))
					.join('.')
					.split('.')
					.map((_, idx) => {
						const category = `${query}${idx}`;
						return {
							value: category,
							label: (
									<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
									>
            <span>
              Found {query} on{' '}
							<a
									href={`https://s.taobao.com/search?q=${query}`}
									target="_blank"
									rel="noopener noreferrer"
							>
                {category}
              </a>
            </span>
										<span>{getRandomInt(200, 100)} results</span>
									</div>
							),
						};
					});

	const [options, setOptions] = useState([]);

	const handleSearch = (value: string) => {
		setOptions(value ? searchResult(value) : []);
	};

	const onSelect = (value: string) => {
	};

	const [isModalVisible, setIsModalVisible] = useState(false);
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
			setIsModalVisible(!isModalVisible);
		}
	};

	const logout = () => {
		dispatch(changeToken(""))
		dispatch(changeUserId(""))
		dispatch(changeRole(""))
	}

	const showConfirm = () => {
		confirm({
			title: 'Do you Want to logout?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				logout();
			},
			onCancel() {

			},
		});
	}

	return (
			<>
				<Layout className={classes.layout}>
				<Header className={classes.header} style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<div className={classes.navbar}>
						<div className={classes.nav_item} onClick={reset}>
							<Link href="/home">
								<HomeOutlined />
							</Link>
						</div>
						<div className={classes.search}>
							<AutoComplete
									dropdownMatchSelectWidth={252}
									style={{ width: '100%' }}
									options={options}
									onSelect={onSelect}
									onSearch={handleSearch}
							>
								<Input.Search size="large" placeholder="input here" enterButton />
							</AutoComplete>
						</div>
						{role === 'ADMIN' && <div className={classes.nav_item} onClick={reset}>
							<Link href="/admin">
								<SettingOutlined />
							</Link>
						</div>}
						<div className={classes.nav_item} onClick={handleModal}>
							{userId ? <Dropdown overlay={<label onClick={showConfirm}><a>Logout</a></label>} placement="bottomRight" arrow>
								<UserOutlined />
							</Dropdown> : <UserOutlined />}
						</div>
							<Select
									bordered={false}
									className={classes.custom_select}
									defaultValue={currentLanguage}
									placeholder="Select language"
									onChange={(value) => dispatch(changeCurrentLanguage(value))}>
								<Option key={"UA"} value={0}>UA</Option>
								<Option key={"RU"} value={1}>RU</Option>
								<Option key={"EN"} value={2}>EN</Option>
							</Select>
						{/*</div>*/}
						<div className={classes.nav_item} onClick={reset}>
							<Badge count={cart && cart.length}>
								<Link href="/cart" >
									<ShoppingCartOutlined />
								</Link>
							</Badge>
						</div>
					</div>
					<CustomModal
						isModalVisible={isModalVisible}
						handleModalVisible={handleModal}
					>
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
					</CustomModal>
				</Header>
				<Content className={classes.content}>
						{children}
				</Content>
			</Layout>
			</>
	);
};

export default LayoutHOC;