import axios from 'axios'
// axios配置
axios.defaults.withCredentials = false;

export const GET = "get";
export const POST = "post";
export const PUT = "put"
export const PATCH = "patch"
export const DELETE = "delete"

export const baseUrl = "http://39.105.145.102:3000";

// Api.getUser().then(res => {}).catch(err => {});

//获取用户
export const getArea = (x, y) => {
	// console.log(x)
	// console.log(y)
	return new axios({
		url: 'http://localhost:5000/api/1',
		data: {
			'x': x,
			'y': y
		},
		method: POST
	})
};


// 新建用户
export const newUser = (obj) => {
	return new axios({
		url: baseUrl + '/api/admin/signup',
		data: {
			'userInfo': obj,
		},
		method: POST
	})
};

//获取用户
export const getUser = (name) => {
	return new axios({
		url: baseUrl + '/api/admin/getUser/' + name,
		method: GET
	})
};

//用户登录
export const Login = (obj) => {
	return new axios({
		url: baseUrl + '/api/admin/signin',
		data: {
			'userInfo': obj,
		},
		method: POST
	})
};

//获取所有文章
export const getAllEssay = () => {
	return new axios({
		url: baseUrl + '/api/essayList',
		method: GET
	})
};

//获取一个文章  object
export const getEssay = (id) => {
	return new axios({
		url: baseUrl + '/api/essayDetail/' + id,
		method: GET
	})
};

//改文章
export const updateEssay = (obj) => {
	return new axios({
		url: baseUrl + '/api/admin/updateessay',
		data: {
			'essayInformation': obj,
		},
		method: POST
	})
};

//增加文章
export const saveEssay = (obj) => {
	return new axios({
		url: baseUrl + '/api/admin/saveessay',
		data: {
			'essayInformation': obj,
		},
		method: POST
	})
};

//删除文章
export const deleteEssay = (id) => {
	return new axios({
		url: baseUrl + '/api/admin/deleteessay',
		data: {
			'_id': id,
		},
		method: POST
	})
};



