import React,{Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
//引入子路由
import home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';


const {  Footer, Sider, Content } = Layout;
/*
* 后台管理的路由组件
* */
export default class Admin extends Component{

    render(){
        const user = memoryUtils.user;
        //如果内存中没有存储user==》当前没有登录
        //登录成功后，刷新页面会回到登录页面，因为内存中没有user了,所以需要维持登录
        if(!user||!user._id){
            //自动跳转到登录(在render()中)
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            /*
                            * 暂时这么设计：
                            * Switch会用路径去匹配，如果匹配上就调用那个组件
                            * 如果没有匹配上就重定向到/home,也就是请求第一个，直接用Home组件
                            * 例如：http://localhost:3000/xxx   --->   http://localhost:3000/home
                            * */
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center',color: '#999'}}>推荐使用谷歌浏览器，可以获得更加页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
