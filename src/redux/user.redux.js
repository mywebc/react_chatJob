import axios from 'axios'
import { getRedirectPath } from '../util'

// 创建action对象（redux-thunk能让action为函数）交给reducer处理，reducer处理后并且返回新的state
const ERROR_MSG = 'error_msg'
const REGISTER_SUCCESS = 'register_success'
const LOGIN_SUCCESS = 'login_success'

// state初始
const initState = {
    isAuth: false,
    user: '',
    pwd: '',
    type: '',
    msg: '',
    redirectTo: ''
}
// reducer
export function user(state = initState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
        default: 
            return state
    } 
}

function registerSuccess(data) {
    return { type: REGISTER_SUCCESS, payload: data }
}

function errMsg(msg) {
    return { msg, type: ERROR_MSG }
}
function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data }
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !repeatpwd || !type) {
        console.log(user, pwd, repeatpwd, type)
        return errMsg('用户名或密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errMsg('密码不一致')
    }
    // redux-thunk允许返回一个函数
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
        .then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(registerSuccess({ user, pwd, type }))
            } else {
                // 返回后台的错误信息
                dispatch(errMsg(res.data.msg))
            }
        })  
    }
    
}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        console.log(user, pwd)
        return errMsg('用户名或密码必须输入')
    }
    // redux-thunk允许返回一个函数
    return dispatch => {
        axios.post('/user/login', { user, pwd })
        .then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                // 返回后台的错误信息
                dispatch(errMsg(res.data.msg))
            }
        })  
    }
}