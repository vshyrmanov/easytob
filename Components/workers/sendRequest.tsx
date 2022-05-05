import axios from "axios";

type routes = "Category" | "Subcategory" | "Position"

export const createRequest = async (type: routes, values?, img?) => {
	if ( type === 'Position' || type === 'Subcategory') {
		let formData = new FormData()
		formData.append("file", img);
		for (let k in values) {
			if (k === 'name') {
				values.name.map(e => formData.append("name", JSON.stringify(e)))
			} else if (k === 'description') {
				values.description.map(e => formData.append("description", JSON.stringify(e)))
			} else {
				formData.append(k, values[k]);
			}
		}
		await axios.post(`https://arcane-falls-56249.herokuapp.com/store/create${type}`, formData)
	} else {
		await axios.post(`https://arcane-falls-56249.herokuapp.com/store/create${type}`, values)
	}
}

export const getAllRequest = async (type: routes) => {
	return await axios.get(`https://arcane-falls-56249.herokuapp.com/store/getAll${type}`)
}

export const getOneRequest = async (type: routes, id) => {
	return await axios.get(`https://arcane-falls-56249.herokuapp.com/store/getOne${type}/${id}`)
}

export const getByOwnerRequest = async (type: routes, ownerId) => {
	return await axios.get(`https://arcane-falls-56249.herokuapp.com/store/get${type}ByOwner/${ownerId}`)
}

export const updateRequest = async (type: routes, values, id, img?) => {
	if ( type === 'Position' || type === 'Subcategory') {
		let formData = new FormData();
		formData.append('file', img);
		for (let k in values) {
			if (k === 'name') {
				values.name.map(e => formData.append("name", JSON.stringify(e)))
			} else if (	values?.description && k === 'description') {
				values.description.map(e => formData.append("description", JSON.stringify(e)))
			} else {
				formData.append(k, values[k]);
			}
		}
		await axios.patch(`https://arcane-falls-56249.herokuapp.com/store/update${type}/${id}`, formData)
	} else {
		await axios.patch(`https://arcane-falls-56249.herokuapp.com/store/update${type}/${id}`, values)
	}
}

export const removeRequest = async (type: routes, id) => {
		await axios.delete(`https://arcane-falls-56249.herokuapp.com/store/remove${type}/${id}`)
}

export const auth = async (type, values) => {
	try {
		if (values) {
			values = JSON.stringify(values)
		}
		const response = await fetch(`https://arcane-falls-56249.herokuapp.com/${type}`, {
		method: 'POST', body:values, headers: {'Content-Type' :'application/json'}
		})
		const data = await response.json()
		if (!response.ok) {
			throw new Error(data.message || "Something wrong")
		}
		return await data

	} catch (e) {
		throw e
	}
}
