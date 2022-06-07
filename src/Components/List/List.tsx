import React, {FC} from 'react';
// @ts-ignore
import classes from './List.module.scss';

interface ListProps<T> {
	items: T[],
	renderItem: (item: T, i?: number) => React.ReactNode
}

function List<T> (props: ListProps<T>) {
	return (
			<div className={classes.main}>
				{props.items.map(props.renderItem)}
			</div>
	);
};

export default List;