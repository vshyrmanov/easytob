import { Button } from 'antd';
import Link from "next/link";


// @ts-ignore
import classes from '../styles/ErrorPage.module.scss';

const ErrorPage = () => {
	return (
			<div className={classes.main}>
				<img src="https://robota-slovakia.com/files/404-page-not-found-uk.png"/>
				<Button type="link" href={'/home'}>Back to Home page</Button>
			</div>
	);
};

export default ErrorPage;