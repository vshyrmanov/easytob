import React from 'react';
import CreateForm from "../../../Components/UI/Form/CreateForm";
import classes from '../../../styles/Create.module.scss';

const CreateCategory = () => {

	return (
			<div className={classes.main}>
				<CreateForm
					type="Category"
					edit={false}
				/>
			</div>
	);
};

	export default CreateCategory;
