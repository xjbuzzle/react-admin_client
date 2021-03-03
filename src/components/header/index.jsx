import React, {Component} from 'react';
import './index.less';

export default class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎,admin</span>
                    <a href="#">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2021-03-03 18:12</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="wheater"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
