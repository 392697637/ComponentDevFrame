import "babel-polyfill";
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex';
import $ from 'jquery';
import config from "../static/config.js";
import ElementUI from 'element-ui';
import iView from 'iview';
import md5 from 'js-md5';
import Viewer from 'v-viewer'

import 'viewerjs/dist/viewer.css'
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';        // 默认主题
import "../static/css/theme-dark/color-dark.css";     /*深色主题*/
//import "../static/css/theme-green/color-green.css";     /*绿色主题*/
import 'font-awesome/css/font-awesome.min.css'
import "../static/css/main.css";
import Cesium from 'cesium/Cesium'


Vue.use(Vuex);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(Viewer);
Vue.prototype.MD5 = md5;

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';  //针对此项目设置的请求头
Vue.prototype.$axios = axios;
Vue.prototype.$config = config;

//配置全局进度条
iView.LoadingBar.config({
 //   color: "rgb(135, 208, 104)",
  //  failedColor: '#f0ad4e',
    height: 3
});
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token');
    iView.LoadingBar.start();
    if (!token && to.path !== '/login') {
        next('/login');
    }  else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {

            next();
        }
    }
})

router.afterEach(transition => {
    iView.LoadingBar.finish();
});


const store = new Vuex.Store({
    state: {
        token: '',
        loginInfo:{},
        userName:null,
        DictArr:[],    //系统用的字典存储，已有的直接混去，，没有的从后台访问
        pro:{},         //页面间的单个项目名称变化监听
        xmbh:null,      //用于小班的项目编号
        ToState:null,   //用于小班的状态监听
        xiaoBanJson:0,  //监控小班是否有未提交的数据，，以提示是否关闭    0
    },
    mutations: {
    	xiaoBanJson(state,data){
    		state.xiaoBanJson = data;
    	},
    	setPro(state,data){
    		state.pro = data;
    	},
    	setDicts(state,data){
    		let inputArr=[];
			if(typeof(data) == "string"){   //为单个字符串
				inputArr=[data];
			}else{
				inputArr=data;
			}
			state.DictArr = state.DictArr.concat(inputArr);
    		
    	},
    	setXmbh(state,data){
    		state.xmbh = data.xmbh;
    		state.state = data.state;
	    	sessionStorage.setItem('xmbh', data.xmbh || null);
	    	sessionStorage.setItem('ToState', data.ToState || null);
    	},
    	setLogin(state,data){
    			state.loginInfo = data;
	    		state.userName = data.userName;
	    		sessionStorage.setItem('userName', data.userName);
    	},
    	delLogin(state){
    		state.loginInfo = null;
    		state.userName = null;
            sessionStorage.removeItem('userName');
    	},
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', token);
        },
        delToken(state) {
            state.token = null;
            sessionStorage.removeItem('token');
        }
    },
    getters: {
	     
	 },
	actions: {
		getDics(context,data){   //将字典存入vuex的缓存
			let inputArr=[];
			if(typeof(data) == "string" || typeof(data) == "number"){   //为单个字符串
				inputArr=[data];
			}else if(typeof(data) == "object" && data.length){
				inputArr=data;
			}else{
				console.error("传入对象错误");
				return ;
			}
			let hasdDicts = context.state.DictArr;
			let toServer = inputArr;
			let req= [];                   // 如果有直接从vuex strore中获取，，没有的话请求后台数据并存入vuex 
			if(hasdDicts.length > 0){
				for(let i = inputArr.length - 1; i >= 0; i--){
					let objTest = inputArr[i].toUpperCase();
					
					hasd:
					for(let ele of hasdDicts){
						let typeTest = ele.type.toUpperCase();
						if(objTest == typeTest ){   //有的话直接从缓存中得到
							toServer.splice(i,1);
							req.push(ele);
							break hasd;
						}
					}

				}
			}else{
					toServer = inputArr;
					req= []; 
			}
			

			let reqServer = [];
			const urlStr = "api/Dictionary/GetDictionaries";
			
			let ret ;
			
			if(toServer.length>0){
				ret = axios.post(config.serverUrl+urlStr, 
					    JSON.stringify(toServer),
					    {headers: {'Content-Type': 'application/json'}}
					 ).then((res) => {
								reqServer = res.data;
								let dataArr = req.concat(reqServer);
								context.commit('setDicts',reqServer);
								return dataArr;
					    }).catch(error=>{
					        console.error(error);
					});
			}else{
				reqServer = [];
				let dataArr = req.concat(reqServer);
				ret = Promise.resolve(dataArr);

			}
			console.log(context.state.DictArr);
			return ret;
		}
	   
	}
})

new Vue({
    router: router,
    store: store,
    render: h => h(App)
}).$mount('#app');

// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
    store.commit('setToken', sessionStorage.getItem('token'))
}
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = store.state.token;
            //    config.headers.Content-Type = 'application/json';
            //  config.headers.Authorization = 'application/json';
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    this.$store.commit('delToken');
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });