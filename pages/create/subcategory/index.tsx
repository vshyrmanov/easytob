import React from 'react';
import {LINK} from "../../../src/Components/Helpers/Links";
import CreateForm from "../../../src/Components/UI/Form/CreateForm";
import classes from '../../../styles/Create.module.scss';


const CreateCategory = () => {



	return (
			<div className={classes.main}>
				<CreateForm
						type="Subcategory"
						edit={false}
				/>
			</div>
	);
};

export default CreateCategory;

// export async function getServerSideProps({params}) {
// 	const response = await fetch(`${LINK}getOneSubcategory/${params.id}`)
// 	const subcategory = await response.json()
// 	return {
// 		props: { subcategory }
// 	}
// }