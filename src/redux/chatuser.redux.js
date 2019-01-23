import axios from 'axios'

// 定义action.type
const USER_LIST = 'USER_LIST'


// 定义初始state, 这里写成一个对象，方便后期追加
const initState = {
	userlist:[]
}

// 首先书写reducer
// reducer接受一个原始state,再返回一个新的state,第二个参数就是action
export function chatuser(state = initState, action) {
    switch(action.type){
		case USER_LIST:
			return {...state, userlist:action.payload}
		default:
			return state
	}
}
// 这个一个action
function userList(data){
	return { type:USER_LIST, payload:data}
}

// 因为redux-thunk的缘故允许我们定义一个函数内部返回一个action
export function getUserList(type){
	return dispatch=>{
		axios.get('/user/list?type='+type)
			.then(res=>{
				if (res.data.code==0) {
					dispatch(userList(res.data.data))
				}
			})

	}
}









