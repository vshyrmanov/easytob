import React from 'react';
import {Input, Tooltip} from "antd";

const InputCustom = ({ value, setValue, edit = false }) => {
	return (
			<Tooltip
					trigger={['focus']}
					title={"Only number"}
					placement="topLeft"
			>
				<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Enter a price"
						type="number"
						maxLength={6}
				/>
			</Tooltip>
	);
};

export default InputCustom;