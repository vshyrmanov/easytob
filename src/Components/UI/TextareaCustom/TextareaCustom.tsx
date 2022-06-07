import React from 'react';
import {Button, Form, Input, Select} from "antd";

const TextareaCustom = ({ setDescription }) => {

	return (
			<Form.Item
					name="intro"
					// label="Description"
					onChange={(e) => setDescription(e.target.value)}
					rules={[{ required: true, message: 'Please input description' }]}
			>
				<Input.TextArea showCount maxLength={250} placeholder={"Enter a description"} />
			</Form.Item>
	);
};

export default TextareaCustom;