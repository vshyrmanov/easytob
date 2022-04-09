import React from 'react';
import CardElement from "../../Components/CardElement/CardElement";
// @ts-ignore
import classes from '../../styles/Filter.module.scss';

const FilterElement = ({ filteredPositions }) => {

	return (
			<div className={classes.cardList}>
				{filteredPositions && filteredPositions.map(e =>
						<CardElement key={e._id} item={e} />
				)}
			</div>
	);
};

export default FilterElement;

export async function getServerSideProps({params}) {
	const response = await fetch(`https://arcane-falls-56249.herokuapp.com/store/getPositions/${params.id}`)
	const filteredPositions = await response.json()
	return {
		props: { filteredPositions }
	}
}