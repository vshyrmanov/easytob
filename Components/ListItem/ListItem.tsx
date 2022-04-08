import {Avatar, List, Spin} from "antd";
import Link from "next/link";
import {useState} from "react";

const ListItem = ({item}) => {
	const [loading, setLoading] = useState(false);

	return (
			<>
				<List.Item>
					<List.Item.Meta
							key={item._id}
							avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
							title={<Link href={`/users/${item._id}`}>
								<a onClick={() => setLoading(true)}>{item.name}</a>
							</Link>}
							// description={item.description}
					/>
					{loading && <Spin />}
				</List.Item>
			</>
	);
};

export default ListItem;