import React from 'react';
import Link from "next/link";
import {useRouter} from 'next/router';
import { Card, Avatar, Button, Skeleton } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

// @ts-ignore
import classes from '../../styles/Users.module.scss';

export default function({item}) {
	const { Meta } = Card;



	return (
			<>
				{item ? <Card
						className={classes.card}
						actions={[
							<SettingOutlined key="setting" onClick={() => alert('Hello')} />,
							<EditOutlined key="edit" />,
							<EllipsisOutlined key="ellipsis" />,
						]}
				>
					<Meta
							avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
							title={item.name}
							// description={user.company.bs}
					/>
				</Card> : <Skeleton className={classes.card} active avatar paragraph={{ rows: 4 }} />}
				<Button>
					<Link href={'/users'}>Back</Link>
				</Button>
			</>

	);
};

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getOneCategory/${params.id}`)
	const item = await response.json()
	return {
		props: {item}
	}
}

