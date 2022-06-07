import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Badge, } from 'antd';
import {IRootReducer} from "../../types/storeTypes";
import { ShoppingCartOutlined, UserOutlined, HomeOutlined, SettingOutlined, } from "@ant-design/icons";
import CustomModal from "../UI/Modal/Modal";
import CustomAutocomplete from "../Autocomplete/CustomAutocomplete";
import CustomSelect from "../Select/CustomSelect";
import AuthForm from "../UI/Form/AuthForm";
import { logOut, scrollHelper, modalHelper, headerColorized } from './helper';
import CustomLink from "./CustomLink";
import CustomDropdown from "../UI/Dropdown/DropdownLayout";
import cn from 'classnames';
import classes from './LayoutHOC.module.scss';
import {useRouter} from "next/router";

const LayoutHOC = ({ children }) => {
	const [hideNav, setHideNav] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [transparentHeader, setTransparentHeader] = useState(true);
	const { Header, Content } = Layout;
	const dispatch = useDispatch();
	const query = useRouter();
	const cart: any = useSelector<IRootReducer>(state => state.positions.cart);
	const role: any = useSelector<IRootReducer>(state => state.categories.role);
	const userId: any = useSelector<IRootReducer>(state => state.categories.userId);
	const { showConfirm } = logOut(dispatch);
	const { handleModal } = modalHelper(userId, isModalVisible, setIsModalVisible);
	scrollHelper(dispatch, setHideNav);
	useEffect(() => {
		headerColorized(query, setTransparentHeader);
	}, [query])

	return (
				<Layout className={classes.layout}>
					<Header
							className={transparentHeader ? classes.header : cn(classes.header, classes.colorized)}
							style={{top: `${hideNav ? '-100%' : '0'}`}}
					>
						<div className={classes.navbar}>
							<div className={classes.nav_item}>
								<CustomLink path="/" component={<HomeOutlined />} />
							</div>
							<CustomAutocomplete />
							{role === 'ADMIN' && <div className={classes.nav_item}>
									<CustomLink path="/admin" component={<SettingOutlined />} />
							</div>}
							<div className={classes.nav_item} onClick={handleModal}>
								{userId ? <CustomDropdown action={showConfirm} /> : <UserOutlined />}
							</div>
							<CustomSelect />
							<div className={classes.nav_item}>
								<Badge count={cart && cart.length}>
									<CustomLink path="/cart" component={<ShoppingCartOutlined />} />
								</Badge>
							</div>
						</div>
						<CustomModal isModalVisible={isModalVisible} handleModalVisible={handleModal}>
							<AuthForm modal={isModalVisible} setModal={setIsModalVisible} />
						</CustomModal>
					</Header>
					<Content className={classes.content}>
							{children}
					</Content>
			</Layout>
	);
};

export default LayoutHOC;