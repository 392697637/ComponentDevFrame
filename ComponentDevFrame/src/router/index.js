import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
let  rout={};
let comp="Main";
rout = {
				mode:'hash',
			    routes: [
			        {
			            path: '/',
			            redirect: '/Main',
			        },
			        {
			            path: '/',
			            component:r => require.ensure( [], () => r (require('Components/page/Header/Home.vue'))),
			            meta: { title: '自述文件' },
			            children:[
			                {
			                    path: '/Main',
			                    component:r => require.ensure( [], () => r (require(`../components/page/${comp}.vue`))),
			                    name:"Main",
			                    meta: { 
			                    	title: '系统首页' ,
			                    //	permission: true
			                    },
			                },
			                {
			                    path: '/ComponentPage',
			                    component:r => require.ensure( [], () => r (require(`../components/page/ComponentPage.vue`))),
			                    name:"ComponentPage",
			                    meta: { 
			                    	title: '动态组件示例页面' ,
			                    },
			                },
			                {
			                    path: '/404',
			                    component:r => require.ensure( [], () => r (require('Components/common/vue/404.vue'))),
			                    meta: { title: '404' }
			                },
			                {
			                    path: '/403',
			                    component:r => require.ensure( [], () => r (require('Components/common/vue/403.vue'))),
			                    meta: { title: '403' }
			                },
			            ]
			        },
			        {
			            path: '/login',
			            component:r => require.ensure( [], () => r (require('Components/page/Login.vue'))),
			        },
			        {
			            path: '*',
			            redirect: '/404'
			        }
			    ]
			}
export default new Router(rout);