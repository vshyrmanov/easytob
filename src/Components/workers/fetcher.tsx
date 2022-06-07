import axios from "axios";


export const fetcher = (url, message) => {

	return (axios.get(url).then((res) => res.data))
}