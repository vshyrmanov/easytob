import React, {useState} from 'react';
import {Button, Col, Divider, Form, Input, List, message, Row, Select, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const FormTranslate = ({ label, translations, setTranslations, form, type, placeholder, edit }) => {
	const { Option } = Select;
	const handleClick = (values) => {
		switch (translations.length) {
			case 0:
				if (values.language !== 'UA') {
					return message.error('First must be UA')
				}
				break;
			case 1:
				if (values.language !== 'RU') {
					return message.error('Second must be RU')
				}
				break;
			case 2:
				if (values.language !== 'EN') {
					return message.error('Third must be EN')
				}
				break;
		}
		if (translations.length === 0) {
			setTranslations([...translations, values])
		} else if (translations.length > 0 && translations.every(e => e.language !== values.language)) {
			setTranslations([...translations, values])
		} else {
			message.error('Such language is already added ')
		}
	}

	const removeFromForm = (id) => {
		let res = translations.filter(e => e.language !== id)
		setTranslations(res)
	}

	return (
			<>
				{type === 'text' &&	<><Form
						form={form}
						layout="vertical"
						hideRequiredMark
						onFinish={handleClick}
						initialValues={{ remember: false }}
				>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
									name="language"
									label="Choose language"
									rules={[{ required: true, message: 'Please select language' }]}
							>
								<Select placeholder="Select language" >
									<Option key={"UA"} value={"UA"}>UA</Option>
									<Option key={"RU"} value={"RU"}>RU</Option>
									<Option key={"EN"} value={"EN"}>EN</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							{type === "text" && <Form.Item
										name="name"
										label={label}
										rules={[{ required: true, message: `Please enter ${label}` }]}
								>
									<Input placeholder={placeholder} />
								</Form.Item>}
						</Col>
					</Row>
					<Space>
						<Button type="primary" htmlType="submit" disabled={translations.length === 3}>Add translate</Button>
					</Space>
				</Form>
				<Divider orientation="left">Result</Divider>
				<List
						size="small"
						bordered
						dataSource={translations}
						renderItem={e =>
								<List.Item style={{ display: 'flex', justifyContent: 'space-between'}}>
									{e.name}
									<DeleteOutlined style={{ marginLeft: '40px' }} onClick={() => removeFromForm(e.language)} />
								</List.Item>}
				/></>}
				{type === 'textarea' && <><Form
						// form={form}
            layout="vertical"
            hideRequiredMark
            onFinish={handleClick}
            initialValues={{ remember: false }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="language"
                        label="Choose language"
                        rules={[{ required: true, message: 'Please select language' }]}
                    >
                        <Select placeholder="Select language" >
                            <Option key={"UA"} value={"UA"}>UA</Option>
                            <Option key={"RU"} value={"RU"}>RU</Option>
                            <Option key={"EN"} value={"EN"}>EN</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                      name="name"
                      label={label}
                      rules={[{ required: true, message: `Please enter ${label}` }]}
                  >
                      <Input.TextArea showCount maxLength={250} placeholder={placeholder} />
                  </Form.Item>
                </Col>
            </Row>
            <Space>
                <Button type="primary" htmlType="submit" disabled={translations.length === 3}>Add translate</Button>
            </Space>
        </Form>
					<Divider orientation="left">Result</Divider>
					<List
					size="small"
					bordered
					dataSource={translations}
					renderItem={e =>
					<List.Item style={{ display: 'flex', justifyContent: 'space-between'}}>
						{e.name}
					<DeleteOutlined style={{ marginLeft: '40px' }} onClick={() => removeFromForm(e.language)} />
					</List.Item>}
					/></>}
			</>
	);
};

export default FormTranslate;