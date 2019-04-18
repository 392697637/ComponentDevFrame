<template>
    <div class="sidebar">
        <el-menu v-loading="loading"  @select=selected  type="primary" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
			<template>
                <el-menu-item index="Main" key="Main">
                        <i class="fa fa-home"></i>
                        <span slot="title">首页</span>
                </el-menu-item>   
                <el-menu-item index="ComponentPage" key="ComponentPage">
                        <i class="fa fa-home"></i>
                        <span slot="title">动态组件示例页面</span>
                </el-menu-item>   
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
            	loading:true,
                collapse: false,
                collapseBgColor:"#1fa67a",  //"#324157"---dark  "#1fa67a"--theme-green
                collapseTextColor:"#efefef", //"#bfcbd9"--dark
               // collapseTextActiveColor:"#20a0ff", //"#20a0ff" ---drak 
                menuList: [],
                /*[
                    {
                        icon: 'fa fa-home fa-2x',
                        path: 'dashboard',
                        name: '系统首页'
                    },
                    {
                        icon: 'fa fa-table',
                        path: 'table',
                        name: '基础表格'
                    },
                    {
                        icon: 'fa fa-copy',
                        path: 'tabs',
                        name: 'tab选项卡'
                    },
                    {
                        icon: 'fa fa-calendar',
                        path: '3',
                        name: '表单相关',
                        children: [
                            {
                                path: 'form',
                                name: '基本表单'
                            },
                            {
                                path: '3-2',
                                name: '三级菜单',
                                children: [
                                    {
                                        path: 'editor',
                                        name: '富文本编辑器'
                                    },
                                    {
                                        path: 'markdown',
                                        name: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                path: 'upload',
                                name: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'fa fa-smile-o',
                        path: 'icon',
                        name: '自定义图标'
                    },
                    {
                        icon: 'fa fa-pie-chart',
                        path: 'charts',
                        name: 'schart图表'
                    },
                    {
                        icon: 'fa fa-arrows',
                        path: 'drag',
                        name: '拖拽列表'
                    },
                    {
                        icon: 'fa fa-exclamation-triangle',
                        path: '6',
                        name: '错误处理',
                        children: [
                            {
                                path: 'permission',
                                name: '权限测试'
                            },
                            {
                                path: '404',
                                name: '404页面'
                            }
                        ]
                    }
                ]*/
            }
        },
        beforeCreate(){
		},
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
        	this.loading =false;
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods:{
        	selected(path,indexPath){
        	//	console.log(path,indexPath);
        	}
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
    	
        height:100%;
    }
    .sidebar ul.el-menu li>i,.sidebar ul.el-menu li>div>i{
    	vertical-align: middle;
	    margin-right: 5px;
	    width: 18px;
	    text-align: center;
	    font-size: 18px;
    }
    .sidebar ul.el-menu li>span,.sidebar ul.el-menu li>div>span{
    	font-size: 16px;
    }
	.sidebar ul.el-menu li>div>span{
    	margin-left:4px;
    }
</style>
