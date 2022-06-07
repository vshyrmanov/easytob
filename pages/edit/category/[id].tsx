import React from 'react';
import CreateForm from "../../../src/Components/UI/Form/CreateForm";
// @ts-ignore
import classes from '../../../styles/EditPage.module.scss';

const CategoryEdit = ({ category }) => {

	return (
			<div className={classes.main}>
				<CreateForm
						type="Category"
						editItem={category}
						edit={true}
				/>
			</div>
	);
};

	export default CategoryEdit;

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getOneCategory/${params.id}`)
	const category = await response.json()
	return {
		props: { category }
	}
}