import {message} from "antd";

export const imageToBase64 = (isLoading, sendImg, previewImg) => {
	const beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 5000 / 5000 < 5;
		if (!isLt2M) {
			message.error('Image must smaller than 5MB!');
		}
		return isJpgOrPng && isLt2M;
	}

	const handleChange = info => {
		if (info.file.status === 'uploading') {
			isLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			sendImg(info.file.originFileObj)
			let reader = new FileReader();
			reader.readAsDataURL(info.file.originFileObj)
			reader.onloadend = () => {
				previewImg(reader.result);
				isLoading(false);
			}
		}
	};
	return {beforeUpload, handleChange}
}