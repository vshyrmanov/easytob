import React from 'react';
import {HomeOutlined} from "@ant-design/icons";
import Link from "next/link";

const CustomLink = ({ path, component }) => {
	return (
			<Link href={path}>
				{component}
			</Link>
	);
};

export default CustomLink;