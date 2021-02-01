import {
    AppstoreOutlined,
    PieChartOutlined,
    LineChartOutlined,
    HomeOutlined,
    BarsOutlined,
    TeamOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    UserOutlined,
    ToolOutlined
} from '@ant-design/icons';
const menuList=[
    {
        title:'首页',//菜单标题名称
        key:'/home',//对应的path
        icon:<HomeOutlined />,//图标名称
    },
    {
        title:'商品',
        key:'/products',
        icon:<AppstoreOutlined />,
        children:[//子菜单列表
            {
                title:'品类管理',
                key:'/category',
                icon:<BarsOutlined />,
            },
            {
                title:'商品管理',
                key:'/product',
                icon:<ToolOutlined />,
            }
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:<UserOutlined />,
    },
    {
        title:'角色管理',
        key:'/role',
        icon:<TeamOutlined />,
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: <BarChartOutlined />
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: <LineChartOutlined />
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: <PieChartOutlined />
            },
        ]
    }
];

export default menuList;
//数组类型模块
/*
* 由于后期的角色管理功能需求，left-nav的菜单需要动态地显示
* 即：将菜单中的数据剥离出来，再根据menuConfig文件定义的数据动态的生成菜单
* */