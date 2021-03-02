/*
* 能发送异步ajax请求的函数模块
* 封装axios库
* 函数的返回值是promise对象
* 1.优化：统一处理请求异常
*   在外层包一个自己创建的promise对象
*   在请求出错时，不去reject(error),而是显示错误提示
* 2.异步得到的不想是response,而是response.data
* 在请求成功resolve时，resolve(response.data)
* */
import axios from 'axios';
import {message} from 'antd';
//因为每一个ajax请求都是在这里发的，所以可以在这里处理每一个ajax请求的错误提示
export default function ajax(url, data={}, type='GET'){

    //外面套一层promise这样就可以用.then()
    //(resolve,reject)=>{
    //
    //     }称为执行器函数
    return new Promise((resolve, reject) => {
        //1.执行异步ajax请求
        let promise;
        //get和post都会产生promise对象，所以直接用promise去接收
        if(type==='GET'){
            promise = axios.get(url, {
                params:{//配置对象
                    ID:data
                }
            });
        }else{
            //前面用的axios的promise:
            //return axios.post(url,data);
            //后面自己去new了一个promise
            promise = axios.post(url, data);
        }
        promise.then((response) => {
            //2.如果成功了，调用resolve(value),传入response
            resolve(response.data);
        }).catch((error) => {
            //3.如果失败了，不调用reject(reason),如果这样调用reject会进入到catch的流程里面,而我们要统一处理请求异常
            //而是提示异常信息
            message.error('请求出错：'+error.message);
        })


    })


}
//请求登录的接口
// ajax('http://localhost:5000/login',{username:'Tom',password:'12345'},'POST').then();

// ajax('http://localhost:5000/manger/user/add',{username:'Tom',password:'12345',phone:'111111111'},'POST').then();



