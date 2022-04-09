import React from 'react';
import Link from "next/link";
import {useRouter} from 'next/router';
import { Card, Avatar, Button, Skeleton, List, message, Spin, } from 'antd';
import VirtualList from 'rc-virtual-list';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

// @ts-ignore
import classes from '../../styles/Users.module.scss';

export default function Item ({positions}) {


	console.log(positions);
	return (
			<>
				{positions ? <List>
					<VirtualList
							data={positions}
							height={400}
							itemHeight={47}
							itemKey="email"
					>
						{item => (
								<List.Item key={item._id}>
									<List.Item.Meta
											avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
											title={<a href="https://ant.design">{item.name}</a>}
											description={item.desc}
									/>
									<div>Content</div>
								</List.Item>
						)}
					</VirtualList>
				</List> : <Spin />}
				<Button>
					<Link href={'/positions'}>Back</Link>
				</Button>
			</>

	);
};

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getPositions/${params.id}`)
	const positions = await response.json()
	return {
		props: {positions}
	}
}

