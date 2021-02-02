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
import menuList from '../../config/menuConfig';


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

    /*
    * 根据menu的数据数组生成对应的标签数组
    * 使用map()+递归调用
    * */
    getMenuNodes_map = (menuList) =>{
        return menuList.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                );
            }else{
                return(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            //利用递归去生成内部的menuitem
                            this.getMenuNodes_map(item.children)
                        }
                    </SubMenu>
                );
            }
        })
    }

    /*
    * 根据menu的数据数组生成对应的标签数组
    * 使用reduce()+递归调用
    * reduce:用来做累计累加的
    * pre是上一次统计的结果，第一次pre是[],第二次还是这个数组，只是可能多了个元素
    * 第二个参数是默认的空数组，用于插入标签数据
    * */
    getMenuNodes = (menuList) =>{
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                ));
            }else{
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            //利用递归去生成内部的menuitem
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                ));
            }
            return pre;
        },[]);
    }

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
                    {/*
                    <Menu.Item key="/home" icon={<HomeOutlined />}>
                        <Link to='/home'>
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品">
                        <Menu.Item key="/category" icon={<BarsOutlined />}>
                            <Link to='/category'>
                                品类管理
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product" icon={<ToolOutlined />}>
                            <Link to='/product'>
                                商品管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user" icon={<UserOutlined />}>
                        <Link to='/user'>
                            用户管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role" icon={<TeamOutlined />}>
                        <Link to='/role'>
                            角色管理
                        </Link>
                    </Menu.Item>*/}

                    {
                        //获取菜单节点,用map循环或是reduce方法来生成Menu.Item或是SubMenu,返回值是个数组
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>
        )
    }
}
