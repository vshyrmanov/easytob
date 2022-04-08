import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Layout, Menu, Button, Select } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// @ts-ignore
import classes from './LayoutHOC.module.scss';


const LayoutHOC = ({children}) => {
	const { Header, Content, Footer } = Layout;
	const { SubMenu } = Menu;
	const { Option } = Select;

	const [openKeys, setOpenKeys] = React.useState(['sub1']);
	const [collapsed, setCollapsed] = React.useState(false);
	const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
	const onOpenChange = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	}

	const dispatch = useDispatch();

	const handleChange = (val) => {
		// localStorage.setItem('store', val)
		dispatch({type: "SET_STORE", payload: val});
	}

	const stores = useSelector(state => state.stores)

	return (
			<Layout className={classes.layout}>
				<Header className={classes.header}>
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
						<Menu.Item key={'home'}><Link href="/home">Home</Link></Menu.Item>
						<Menu.Item key={'users'}><Link href="/users">Users</Link></Menu.Item>
						<Select defaultValue="Take s store" style={{ width: 120 }} onChange={handleChange}>
							{stores && stores.map(e => <Option key={e._id} value={e._id}>{e.name}</Option>)}
							{/*<Option value="jack">Jack</Option>*/}
							{/*<Option value="lucy">Lucy</Option>*/}
							{/*<Option value="Yiminghe">yiminghe</Option>*/}
						</Select>
					</Menu>
				</Header>
				<Content className={classes.content}>
					<Menu
							mode="inline"
							openKeys={openKeys}
							onOpenChange={onOpenChange}
							className={!collapsed ? classes.menu: classes.menu_pullOf}
							inlineCollapsed={collapsed}>
						<Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
							{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
						</Button>
						<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
							<Menu.Item key="1">Option 1</Menu.Item>
							<Menu.Item key="2">Option 2</Menu.Item>
							<Menu.Item key="3">Option 3</Menu.Item>
							<Menu.Item key="4">Option 4</Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
							<Menu.Item key="5">Option 5</Menu.Item>
							<Menu.Item key="6">Option 6</Menu.Item>
							<SubMenu key="sub3" title="Submenu">
								<Menu.Item key="7">Option 7</Menu.Item>
								<Menu.Item key="8">Option 8</Menu.Item>
							</SubMenu>
						</SubMenu>
						<SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
							<Menu.Item key="9">Option 9</Menu.Item>
							<Menu.Item key="10">Option 10</Menu.Item>
							<Menu.Item key="11">Option 11</Menu.Item>
							<Menu.Item key="12">Option 12</Menu.Item>
						</SubMenu>
					</Menu>
					<div className={!collapsed ? classes.container : classes.pullOf}>
						{children}
					</div>
				</Content>
			</Layout>
	);
};

export default LayoutHOC;