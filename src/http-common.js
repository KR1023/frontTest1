import axios from "axios"

export default axios.create({
	baseURL: "http://localhost:8888",
	header:{
		"Content-type":"application/json"
	}
});