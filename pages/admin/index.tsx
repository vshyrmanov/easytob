import React, {useEffect, useState} from 'react';
import {Avatar, Button, Divider, List, message, Popconfirm, Skeleton, Space, Spin, Tabs, Typography} from "antd";

// @ts-ignore
import classes from '../../styles/Admin.module.scss';
import {getAllRequest, removeRequest} from "../../src/Components/workers/sendRequest";
import {useSelector} from "react-redux";
import {IRootReducer} from "../../src/types/storeTypes";
import {UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import useSWR from "swr";
import {LINK} from "../../src/Components/Helpers/Links";
import {fetcher} from "../../src/Components/workers/fetcher";

const AdminPage = () => {
	const { TabPane } = Tabs;
	const router = useRouter();
	const currentLanguage: any = useSelector<IRootReducer>(state => state.categories.currentLanguage);
	const role: any = useSelector<IRootReducer>(state => state.categories.role);
	const [data, setData] = useState();
	const [key, setKey] = useState<string>('Category')
	const [rerender, setRerender] = useState(false);
	const [loading, setLoading] = useState(false);
	const selectItemsCategories = useSWR(`${LINK}getAllCategory`, fetcher, {refreshInterval: 2000});
	const selectItemsSubCategories = useSWR(`${LINK}getAllSubcategory`, fetcher, {refreshInterval: 2000})

	const currentTab = (key) => {
		setKey(key)
		setLoading(true)
	}

	useEffect(() => {
		getAllRequest(key)
				.then((r) => {
					setData(r.data)
					setRerender(false)
					setLoading(false)
				})
	}, [key, rerender])

	const deleteItem = (type, id) => {
		removeRequest(type, id)
				.then(() => (message.success(`${key} was deleted.`), setRerender(true)))
	}

	const addNewElement = (type) => {
		router.push(`create/${type}`)
	}

	const editElement = (type, id) => {
		router.push(`edit/${type}/${id}`)
	}

	return (
			<div className={classes.main}>
				{role === 'ADMIN' ? <Tabs defaultActiveKey="1" onChange={currentTab} className={classes.tabs}>
					<TabPane tab="Categories" key="Category" className={classes.content}>
						<Button type="dashed" block onClick={() => addNewElement('category')}>Add new category</Button>
						<List
								bordered
								dataSource={data}
								renderItem={item => (
										<List.Item>
											{!loading ? <><List.Item.Meta
													avatar={<Avatar src={item.image} shape="square" size={64} icon={<UserOutlined />} />}
													title={<Typography.Text>{item.name[currentLanguage].name}</Typography.Text>}
											/>
											<Space>
												<Button onClick={() => editElement('category', item._id)}>Edit</Button>
												<Popconfirm
														title={`Delete this ${key.toLocaleLowerCase()}`}
														onConfirm={() => deleteItem('Category', item._id)}
														placement="bottomRight"
														okText="Confirm"
														cancelText="Cancel"
												>
													<Button danger>Delete</Button>
												</Popconfirm>
											</Space></> : <Skeleton avatar bordered paragraph={{ rows: 1 }} />}
										</List.Item>
								)}
						/>
						{loading && <Spin tip="Loading..." size="large" className={classes.spinner}/>}
					</TabPane>
					<TabPane tab="Subcategories" key="Subcategory" className={classes.content}>
						<Button type="dashed" block onClick={() => addNewElement('subcategory')}>Add new subcategory</Button>
						{selectItemsCategories && selectItemsCategories.data && selectItemsCategories.data.map(e =>
								<div key={e._id}>	<Divider  orientation="left">{e.name[0].name}</Divider>
						<List
								bordered
								dataSource={data}
								renderItem={item =>
										e._id === item.owner &&
										<List.Item>
											{!loading ? <><List.Item.Meta
													avatar={<Avatar src={item.image} shape="square" size={64} />}
													title={<Typography.Text>{item.name[currentLanguage].name}</Typography.Text>}
											/>
											<Space>
												<Button onClick={() => editElement('subcategory', item._id)}>Edit</Button>
												<Popconfirm
														title={`Delete this ${key.toLocaleLowerCase()}`}
														onConfirm={() => deleteItem('Subcategory', item._id)}
														placement="bottomRight"
														okText="Confirm"
														cancelText="Cancel"
												>
													<Button danger>Delete</Button>
												</Popconfirm>
											</Space></> : <Skeleton avatar bordered paragraph={{ rows: 1 }} />}
										</List.Item>
								}
						/>
						</div>)}
						{loading && <Spin tip="Loading..." size="large" className={classes.spinner}/>}
					</TabPane>
					<TabPane tab="Positions" key="Position" className={classes.content}>
						<Button type="dashed" block onClick={() => addNewElement('position')}>Add new position</Button>
						{selectItemsSubCategories && selectItemsSubCategories.data && selectItemsSubCategories.data.map(e =>
							<div key={e._id}>	<Divider  orientation="left">{e.name[0].name}</Divider>
						<List
								bordered
								dataSource={data}
								renderItem={item =>
										item.owner === e._id &&
										<List.Item>
											{!loading ? <><List.Item.Meta
													avatar={<Avatar src={item.image} shape="square" size={64} />}
													title={<Typography.Text>{item.name[currentLanguage].name}</Typography.Text>}
											/>
											<Space>
												<Button onClick={() => editElement('position', item._id)}>Edit</Button>
												<Popconfirm
														title={`Delete this ${key.toLocaleLowerCase()}`}
														onConfirm={() => deleteItem('Position', item._id)}
														placement="bottomRight"
														okText="Confirm"
														cancelText="Cancel"
												>
													<Button danger>Delete</Button>
												</Popconfirm>
											</Space></> : <Skeleton avatar bordered paragraph={{ rows: 1 }} />}
										</List.Item>
								}
						/>
					</div>
							)}
						{loading && <Spin tip="Loading..." size="large" className={classes.spinner}/>}
					</TabPane>
				</Tabs> : <h1>Access denied</h1>}
			</div>
	);
};

export default AdminPage;