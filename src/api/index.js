/*
* 包含应用中所有接口请求函数的模块
* 每个函数的返回值都是promise对象
* 要求：
* 能根据接口文档定义接口请求函数
* */
import ajax from './ajax';
//登录
// export function reqLogin() {
//     ajax('/login',{username,password}){
//         return ajax('login',{username,password},'POST');
//     }
// }
// const BASE='http://120.55.193.14:5000';
//因为不确定运行起来是3000还是3001，所以直接写空串，因为在package.json配置过代理服务器了，所以可行
const BASE='';
export const reqLogin=(username, password) => ajax(BASE+'/login', {username, password}, '/POST');

//添加用户
export const reqAddUser=(user) => ajax(BASE+'/manage/user/add', user, 'POST');


