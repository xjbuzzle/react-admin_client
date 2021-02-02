/*
* 左侧导航的组件
* */

import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Menu } from 'antd';

import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';


const { SubMenu } = Menu;

 class LeftNav extends Component{
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
        /*
        * 得到当前请求的路由路径
        * 不是路由组件但是想要得到路由组件拥有的三个属性:
        * 引入react-router-dom的withRouter
        * */
        const path = this.props.location.pathname;
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
                /*
               * 查找一个与当前请求路径匹配的子item
               * */
                const cItem = item.children.find(cItem => cItem.key===path);
                //如果存在说明当前item所对应子列表需要展开
                // console.log(this);//this是LeftNav
                if(cItem){
                    this.openKey = item.key;
                }
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
        /*
        * 得到当前请求的路由路径
        * 不是路由组件但是想要得到路由组件拥有的三个属性:
        * 引入react-router-dom的withRouter
        * */
        const path = this.props.location.pathname;
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
                /*
                * 查找一个与当前请求路径匹配的子item
                * */
                const cItem = item.children.find(cItem => cItem.key===path);
                //如果存在说明当前item所对应子列表需要展开
                // console.log(this);//this是LeftNav
                if(cItem){
                    this.openKey = item.key;
                }

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

    /*
    * 利用生命周期函数，willmount在第一次render之前执行，且只执行一次
    * 为第一个render()准备数据（必须同步）
    * 如果直接放在render开头会执行两次
    * */
    componentWillMount() {
        //先运行该方法，提前获得openKey
        this.menuNodes = this.getMenuNodes(menuList);
    }

     render(){
        // debugger
        /*
        * 得到当前请求的路由路径
        * 不是路由组件但是想要得到路由组件拥有的三个属性:
        * 引入react-router-dom的withRouter
        * */
        const path = this.props.location.pathname;
        const openKey = this.openKey;

        return(
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='logo'/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    // defaultSelectedKeys={[path]}
                    //打印path可以看到，第一次是/，第二次是/home
                    // 默认第一次选中的,导致直接是3000的路径会去到path为/，
                    // 而后重定向为/home,但是已经不能再给该属性赋值了，智能赋值一次，所以改用selectedKeys
                    selectedKeys={[path]}//换成selectedKeys就不止可以定义一次了
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >

                    {
                        //获取菜单节点,用map循环或是reduce方法来生成Menu.Item或是SubMenu,返回值是个数组
                        //this.getMenuNodes(menuList)
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

/*
* widthRouter高阶组件：
* 包装非路由组件，返回一个新组件
* 新组件向非路由组件传递3个属性：
* history、location、match
* */
export default withRouter(LeftNav);