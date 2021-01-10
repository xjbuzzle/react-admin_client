import React,{Component} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import logo from './images/logo.png';

//不能写在import之前
const Item=Form.Item;
/*
* 登录的路由组件
* */
export default class Login extends Component{
    render(){
        //新组件传递给Form组件->强大的form对象
        const form =this.props.form;
        // const { getFieldDecorator } =form;高阶函数，返回一个组件
        const onFinish = (event,values) => {
            event.preventDefault();//阻止事件的默认行为
            console.log('Received values of form: ', values);
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
                    >
                        <Item
                            name="username"//标识名称
                            //验证规则
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                        </Item>
                        <Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
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
//新组件会向Form组件传递一个强大的对象属性：form
// const WrapLogin=Form.create()(Login);
// export default WrapLogin;

/*
* 1.前台表单验证
* 2.收集表单输入数据
*
*
* */

