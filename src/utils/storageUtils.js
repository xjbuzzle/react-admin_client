/*
* 进行local数据存储管理的工具模块
* */
import store from 'store';
const USER_KEY='user_key';
export default {
    /*
    * 保存user
    * */
    saveUser(user){
        // localStorage.setItem('user_key',user) 不能直接存user对象，这边接收的是一个字符串，这样会把user.toString，变成[Object Object]
        //转成json格式的字符串
        //  localStorage.setItem(USER_KEY,JSON.stringify(user));
        store.set(USER_KEY, user);
    },
    /*
    * 读取user
    * */
    getUser(){
        //第一次取是没有值的，返回null,最好是返回空对象{}
        //用json.parse去解析
        //为什么{}要加单引号，因为parse要跟json格式的字符串，如果直接{}就不是json格式的字符串，而是js对象
        // return JSON.parse(localStorage.getItem(USER_KEY)||'{}');
        return store.get(USER_KEY)||{};
    },

    /*
    * 删除user
    * */
    removeUser(){
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}


