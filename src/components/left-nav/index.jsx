/*
* 左侧导航的组件
* */

import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    BarsOutlined,
    TeamOutlined,
    ContainerOutlined,
    MailOutlined,
    UserOutlined,
    ToolOutlined
} from '@ant-design/icons';

import './index.less';
import logo from '../../assets/images/logo.png';


const { SubMenu } = Menu;

export default class LeftNav extends Component{
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render(){
        return(
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='logo'/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}//默认选中第一个
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        首页
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="2" icon={<BarsOutlined />}>品类管理</Menu.Item>
                        <Menu.Item key="3" icon={<ToolOutlined />}>商品管理</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<UserOutlined />}>用户管理</Menu.Item>
                    <Menu.Item key="5" icon={<TeamOutlined />}>角色管理</Menu.Item>
                </Menu>
            </div>
        )
    }
}
