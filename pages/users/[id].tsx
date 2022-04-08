import React from 'react';
import Link from "next/link";
import {useRouter} from 'next/router';

export default function({user}) {

	return (
			<div>
				<Link href="/users">Back</Link>
				{`User  ${user.name}`}
			</div>
	);
};

export async function getServerSideProps({params}) {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
	const user = await response.json()
	return {
		props: {user}
	}
}

