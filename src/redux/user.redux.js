import axios from 'axios'
import { getRedirectPath } from '../util'

// 创建action对象（redux-thunk能让action为函数）交给reducer处理，reducer处理后并且返回新的state
const ERROR_MSG = 'error_msg'
const AUTH_SUCCESS = 'auth_success'
const LOAD_DATA = 'load_data'

// state初始
const initState = {
    user: '',
    pwd: '',
    type: '',
    msg: '',
    redirectTo: ''
}
// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

function authSucess(data) {
    return { type: AUTH_SUCCESS, payload: data }
}
function errMsg(msg) {
    return { msg, type: ERROR_MSG }
}

export function loadData(userInfo) {
    return { type: LOAD_DATA, payload: userInfo }
}


export function register({ user, pwd, repeatpwd, type }) {
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
                    dispatch(authSucess({ user, pwd, type }))
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
                    dispatch(authSucess(res.data.data))
                } else {
                    // 返回后台的错误信息
                    dispatch(errMsg(res.data.msg))
                }
            })
    }
}
// boss 页面数据更新,
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then((res) => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSucess(res.data.data))
                } else {
                    // 返回后台的错误信息
                    dispatch(errMsg(res.data.msg))
                }
            })
    }
}