import React from 'react';
import {Divider, Space, Switch} from "antd";

const SwitchVisibility = ({ status, setStatus }) => {


	return (
			<>
				<Divider orientation="left">Visibility</Divider>
				<Space style={{ display: 'flex', justifyContent: 'space-between'}}>
					{status ? <h3 style={{ color: 'green' }}>Visible</h3> : <h3 style={{ color: 'red' }}>Hidden</h3>}
					<Switch defaultChecked onChange={(val) => setStatus(val)} />
				</Space>
			</>
	);
};

export default SwitchVisibility;