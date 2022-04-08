import Link from "next/link";
// @ts-ignore
import classes from '../styles/Users.module.scss';

const Users = ({users}) => {
	return (
			<div className={classes.main}>
				<Link href="/">Home</Link>
				<h2>Users page</h2>
				{users.map(e => <li key={e.id}><Link href={`/users/${e.id}`}>{e.name}</Link></li>)}
			</div>
	);
};

export default Users;

export async function getStaticProps(context) {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	const users = await response.json()
	return {
		props: {users}
	}
}