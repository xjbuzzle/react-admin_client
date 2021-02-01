import React,{Component} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom';
import './login.less';
import logo from '../../assets/images/logo.png';
import {reqLogin} from "../../api";
import {message} from "antd/es";
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

//不能写在import之前
const Item=Form.Item;
/*
* 登录的路由组件
* */
export default class Login extends Component{
    //对密码进行自定义验证
    // validatePwd = (rule,value) => {
    //     // value ? Promise.resolve() : Promise.reject('Should accept agreement');
    //     // callback();//代表验证通过
    //     // callback('xx');//验证失败，提示
    //     // console.log(value);
    // }
    render(){
        //判断用户是否登录，如果登录了就直接跳转到后台页面
        const user = memoryUtils.user;
        if(user._id){
            return <Redirect to='/'/>;
        }

        //新组件传递给Form组件->强大的form对象
        // const form =this.props.form;
        // const { getFieldDecorator } =form;高阶函数，返回一个组件
        const onFinish = async (values) => {
            // event.preventDefault();//阻止事件的默认行为
            console.log('提交登录的ajax请求: ', values);
            const {username, password} = values;
            // reqLogin(username,password).then(response=>{
            //     console.log('成功',response.data);
            // }).catch(error=>{
            //     console.log('失败',error);
            // });
            /*
            *  reqLogin(username,password)的返回值是一个promise对象，所以可以定义一个promise来接收它
            * 而它异步给我的就是response，
            * const response = reqLogin(username,password);直接这么写拿到的还是promise，
            * 要想拿到response，要加个await（等待）,等到成功返回了数据，就可以用一个变量或常量来接收
            * const response =await reqLogin(username,password);
            * 但是这样写会报错，因为await所在的函数要加个async（即包含await的最近的函数（包括箭头函数），要加一个async）
            * */
            // try{
            //     const response = await reqLogin(username, password);
            //     //请求成功不代表登录成功！
            //     console.log('请求成功',response.data);
            // }catch (error) {
            //     //不代表登录出错
            //     console.log('请求出错！'+ error.message);
            // }
            //因为try-catch对于错误的处理都放在ajax函数中解决了，所以，这边就不需要写try-catch了
            // const response = await reqLogin(username, password);
            //请求成功不代表登录成功！
            // console.log('请求成功',response.data);
            /*
            * 登录的成功与失败是根据response.data中数据来确定的，由api文档可知，status为0是成功，status为1是失败
            * */
            const result = await reqLogin(username, password);//在ajax函数中把resolve(response)改成直接返回response.data
            // const result = response.data;//{status:0,data:user} {status:1,msg:'xxx'}
            if(result.status===0){
                //登录成功,提示登录成功
                message.success('登录成功');
                //跳转之前把user保存在内存中
                const user=result.data;
                memoryUtils.user=user;//保存到内存中
                storageUtils.saveUser(user);//保存到local中
                //跳转到后台管理页面
                //登录到管理界面（不需要再回退到登录所以用replace，直接替换掉当前页面，如果需要回退到登录页面，那就用push）
                this.props.history.replace('/');

            }else{
                //登录失败,提示错误信息
                message.error(result.msg);
            }
        };
        const onFinishFailed = (errorInfo) => {
            console.log('校验失败:', errorInfo);
        };
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Item
                            name="username"//标识名称
                            //验证规则
                            //声明式验证:直接使用别人定义好的验证规则进行验证
                            rules={[
                                { required: true, whitespace:true, message: '用户名必须输入' },
                                { min:4,message:'用户名不能少于4位'},
                                { max:12,message:'用户名不能大于12位'},
                                { pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                                ]}
                            validateStatus
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                        </Item>
                        <Item
                            name="password"
                            // rules={[{ required: true, message: 'Please input your Password!' }]}
                            validateStatus
                            rules={[
                                {
                                    validator:async(rule, value)=>{
                                        //value ? Promise.resolve():Promise.reject('should accept agreement')
                                        if(!value){
                                            Promise.reject('请输入密码');
                                        }else if(value.length<4){
                                            Promise.reject('密码长度不能小于4位');
                                        }else if(value.length>12){
                                            Promise.reject('密码长度不能大于12位');
                                        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                                            Promise.reject('密码必须是英文、数字或下划线组成');
                                        }else{
                                            Promise.resolve();
                                        }
                                    }
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
* 1.高阶函数
*   1）一类特别的函数
*       a.接收函数类型的参数
*       b.函数的返回值是函数
*   2）常见的高阶函数
*       a.定时器：setTimeOut()/setInterval()
*       b.Promise：Promise(()=>{}) then(value=>{},reson=>{})
*       c.数组遍历相关的方法;forEach()/filter()/map()/reduce()/find()/finndIndex()
*       d.函数对象的bind()方法返回一个函数
*       e.form.create()() / getFieldDecorator()() 返回一个函数
* 一个函数代表一个动态的功能，而获取一个函数作为参数的高阶函数，更加动态更加具有扩展性
*
* 2.高阶组件
*   1)本质是个函数，高阶组件也是高阶函数
*   2）接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入特定的属性
*   3)作用：扩展组件的功能
*   4）高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数
*
* */
//包装Form组件（内部有Form标签的组件）生成一个新的组件 Form(Login)
//新组件会