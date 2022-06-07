import React from 'react';
import {Button, Form, Input, Select} from "antd";

interface input {
	name: string,
	label: string,
}
interface button {
	text: string
}

interface selectItems {
	_id: string,
	name: string
}
interface select {
	name: string,
	label: string,
	items: selectItems[]
}

interface FormProps<T> {
	children?: React.ReactNode,
	inputItems?: input[],
	buttonItems: button[],
	selectItems?: select,
	showSelect?: boolean,
	onFinish: (val: any) => void,
}

function CustomForm<T> (props: FormProps<T>, ){
	const { Option } = Select;

	return (
			<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={props.onFinish}
					autoComplete="off"
			>
				{props.showSelect && <Form.Item
						label="Choose a category"
						name="owner"
				>
					<Select style={{ width: 120 }}>
						{props.selectItems.items.map(e =>
								<Option key={e._id} value={e._id}>
									{e.name}
								</Option>)}
					</Select>
				</Form.Item>}
				{props.children}
				{props.inputItems.map(item =>
						<Form.Item
								key={item.name}
								label={item.label}
								name={item.name}>
							<Input/>
						</Form.Item>)}
				{props.buttonItems.map(item =>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }} 	key={item.text}>
							<Button type="primary" htmlType="submit">
								{item.text}
							</Button>
						</Form.Item>)}

			</Form>
	);
};

export default CustomForm;