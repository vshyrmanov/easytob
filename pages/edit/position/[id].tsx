import React from 'react';
import CreateForm from "../../../Components/UI/Form/CreateForm";

import classes from '../../../styles/EditPage.module.scss';

const EditPage = ({ position }) => {

	return (
			<div className={classes.main}>
				<CreateForm
						type="Position"
						editItem={position}
						edit={true}
				/>
			</div>
	);
};

export default EditPage;

export async function getServerSideProps({ params }) {
		const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getOnePosition/${params.id}`)
		const position = await response.json()
		return {
			props: { position }
		}
}