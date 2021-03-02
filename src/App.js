/*
* 应用的根组件
* */
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

export default class App extends Component{

    render(){
        return(
            //BrowserRouter是路由器，Route是路由，一个路由器里面可以有多个路由
            //本来是/admin,但是后面还有有admin的子路由类似home之类的，为了好看改成/
            <BrowserRouter>
                <Switch>{/*只匹配其中一个*/}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}