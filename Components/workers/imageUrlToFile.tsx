export const imageUrlToFile = () => {
	console.log('a vot i ya')
	const getUrlExtension = (url) => {
		if (url) {
			return url
					.split(/[#?]/)[0]
					.split(".")
					.pop()
					.trim();
		}
	}

	const onImageEdit = async (imgUrl) => {

				let imgExt = getUrlExtension(imgUrl);
				const response = await fetch(imgUrl);
				const blob = await response.blob();
				return new File([blob], "profileImage." + imgExt, {
					type: blob.type,
				});


	}


	return {onImageEdit}
}