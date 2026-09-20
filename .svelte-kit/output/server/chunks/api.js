import axios from "axios";
//#region src/lib/api.js
var api = axios.create({
	baseURL: "http://127.0.0.1:8002",
	headers: { "Accept": "application/json" }
});
api.interceptors.request.use((config) => {
	if (typeof localStorage !== "undefined") {
		const token = localStorage.getItem("sso_token");
		if (token) config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});
api.interceptors.response.use((response) => response, (error) => {
	if (error.response && error.response.status === 401) {
		if (typeof window !== "undefined" && window.location.pathname !== "/") {
			localStorage.removeItem("sso_token");
			localStorage.removeItem("sso_user");
			window.location.href = "/";
		}
	}
	return Promise.reject(error);
});
//#endregion
export {};
