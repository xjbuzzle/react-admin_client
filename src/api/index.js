/*
* 包含应用中所有接口请求函数的模块
* 每个函数的返回值都是promise对象
* 要求：
* 能根据接口文档定义接口请求函数
* */
import ajax from './ajax';
import {message} from 'antd';
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

/*
* jsonp请求的接口请求函数
* */
export const reqWeather = (city_id) =>
    //返回一个promise对象
    new Promise((resolve, reject) => {
        const url = 'http://api.map.baidu.com/weather/v1/?district_id='+ {city_id} + '&data_type=all&ak=fNu7l7D4t5xbtaeO6fgp7812AafD53tK';
        jsonp(url, {}, (err, data) => {
            if(!err && data.status===0){
                const text = data.result.now.text;
                resolve(text);
            }else{
                //失败了
                message.error('请求数据失败');
            }
        })
    })
// reqWeather(350100)

