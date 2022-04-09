import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {Layout, Menu, Button, Badge, Modal, Form, Input, Select } from 'antd';
import { CrownOutlined, AppstoreOutlined } from '@ant-design/icons';
// @ts-ignore
import classes from './LayoutHOC.module.scss';
import axios from "axios";


const LayoutHOC = ({children}) => {
	const { Header, Content } = Layout;
	const { SubMenu } = Menu;
	const { Option } = Select;

	const [openKeys, setOpenKeys] = useState(['sub1']);
	const [data, setData] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible2, setIsModalVisible2] = useState(false);



	const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
	const onOpenChange = keys => {
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	useEffect(() => {
		axios.get('https://arcane-falls-56249.herokuapp.com/store/getCategories')
				.then(r => setData(r.data));
	}, [])
	const [cartCounter, setCartCounter] = useState(0);
	const cart = useSelector(state => state.positions.cart);

	useEffect(() => {
		if (cart.length > 0) {
			setCartCounter(cart.length);
		} else {
			setCartCounter(0);
		}
	}, [cart])

	const onFinish = (values: any) => {
		console.log('Success:', values);
		axios.post('https://arcane-falls-56249.herokuapp.com/store/createCategory', values)
				.then(() => setIsModalVisible(!isModalVisible))
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const onFinish2 = (values: any) => {
		console.log('Success:', values);
		axios.post('https://arcane-falls-56249.herokuapp.com/store/createPosition', values)
				.then(() => setIsModalVisible2(!isModalVisible2))
	};

	const onFinishFailed2 = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
			<Layout className={classes.layout}>
				<Header className={classes.header}>
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']} className={classes.navbar}>
						<Menu.Item key={'home'}><Link href="/home">Home</Link></Menu.Item>
							<Menu.Item key={'cart'}>
								<Badge count={cartCounter} offset={[50, 30]}/>
								<Link href="/cart">Cart</Link>
							</Menu.Item>
					</Menu>
				</Header>
				<Content className={classes.content}>
					<Menu
							mode="inline"
							openKeys={openKeys}
							onOpenChange={onOpenChange}
							className={classes.menu}>
						<SubMenu key="sub1" icon={<AppstoreOutlined />} title="Categories">
							{data && data.map(e =>
									<Menu.Item key={e._id}>
									<Link href={`/filter/${e._id}`}>{e.name}</Link>
									</Menu.Item>)}
						</SubMenu>
						<SubMenu key="sub2" icon={<CrownOutlined /> } title="Admin">
							<Menu.Item key={'add_category'} onClick={() => setIsModalVisible(!isModalVisible)}>
								Add category
							</Menu.Item>
							<Menu.Item key={'add_position'} onClick={() => setIsModalVisible2(!isModalVisible2)}>
								Add position
							</Menu.Item>
						</SubMenu>
					</Menu>
					<div className={classes.container}>
						{children}
					</div>

				</Content>
				<Modal
						title="Basic Modal"
						visible={isModalVisible}
						onOk={() => setIsModalVisible(!isModalVisible)}
						onCancel={() => setIsModalVisible(!isModalVisible)}
						footer={[
								null
						]}
				>
					<Form
							name="basic"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
					>
						<Form.Item
								label="Category name"
								name="name"
						>
							<Input />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Modal>
				<Modal
						title="Basic Modal"
						visible={isModalVisible2}
						onOk={() => setIsModalVisible2(!isModalVisible2)}
						onCancel={() => setIsModalVisible2(!isModalVisible2)}
						footer={[
							null
						]}
				>
					<Form
							name="basic"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							initialValues={{ remember: false }}
							onFinish={onFinish2}
							onFinishFailed={onFinishFailed2}
							autoComplete="off"
					>
						<Form.Item
							label="Choose a category"
							name="owner"
						>
							<Select defaultValue="Choose category" style={{ width: 120 }}>
								{data && data.map(e =>
										<Option key={e._id} value={e._id}>
											{e.name}
										</Option>)}
							</Select>
						</Form.Item>
						<Form.Item
								label="Position name"
								name="name"
						>
							<Input />
						</Form.Item>
						<Form.Item
								label="Position description"
								name="desc"
						>
							<Input />
						</Form.Item>
						<Form.Item
								label="Price"
								name="price"
						>
							<Input />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</Layout>
	);
};

export default LayoutHOC;