import React, {useEffect, useState} from 'react';
import {Space, Upload} from "antd";
import {imageToBase64} from "../../workers/imageToBase64";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {imageUrlToFile} from "../../workers/imageUrlToFile";

const UploadImg = ({ img, setImg, edit }) => {
	const [loading, setLoading] = useState(false)
	const [previewImg, setPreviewImg] = useState()

	const onChange = (info) => {
		setPreviewImg(info.file.originFileObj)
		setImg(info.file.originFileObj)
		let reader = new FileReader();
		if(info.file.status === 'done') {
			reader.readAsDataURL(previewImg)
			reader.onloadend = () => {
				setPreviewImg(reader.result);
			}
		}
	}

	const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
	);

	return (
			<>
				<Space>
					<Upload
							name="avatar"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							// beforeUpload={beforeUpload}
							onChange={onChange}
					>
						{!edit && <>{previewImg ? <img src={previewImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</>}
						{edit && <>{previewImg ? <img src={previewImg} alt="avatar" style={{ width: '100%' }} /> :
								<img src={img} alt="avatar" style={{ width: '100%' }} />}</>}
					</Upload>
				</Space>
			</>
	);
};

export default UploadImg;