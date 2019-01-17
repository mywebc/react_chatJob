// 根据用户信息返回跳转
export function getRedirectPath({type, avatar}) {
    let url = type === 'boss' ? '/boss' : '/genius'
    // 如果不完善
    if(!avatar) {
        return url += 'info'
    }
    return url
}