import React from 'react';

// @ts-ignore
import classes from './SkeletonCard.module.scss';

const SkeletonCard = ({quantity}) => {
	const arr = [0, 1, 2, 3];
	const cardCounter = [...Array(quantity)].map(e => '1');

	return (
			<div className={classes.list}>
				{cardCounter.map((e) =>
				<div key={Math.random() * 99} className={classes.main}>
					<div className={classes.name} />
					<div className={classes.positions}>
						{arr.map(e => <div key={e} className={classes.item} />)}
					</div>
				</div>)}
			</div>
		)
};

export default SkeletonCard;