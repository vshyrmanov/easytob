import React from 'react';
import CreateForm from "../../../src/Components/UI/Form/CreateForm";
import classes from '../../../styles/EditPage.module.scss';

const SubcategoryEdit = ({ subcategory }) => {

	return (
			<div className={classes.main}>
				<CreateForm
						type="Subcategory"
						editItem={subcategory}
						edit={true}
				/>
			</div>
	);
};

	export default SubcategoryEdit;

export async function getServerSideProps({ params }) {
		const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getOneSubcategory/${params.id}`)
		const subcategory = await response.json()
		return {
			props: {subcategory}
		}
}