
//时间转换  或者获取当期YYYY-MM-DD格式数据
const formatDate = function(time) {
	const d = time ? new Date(time) : new Date();
	try {
		let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
		let m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
		let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
		return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + h + ':' + m + ':' + s;
	} catch(error) {

		return time;
	}
};

//通过数组项删除数组某个数组  返回数组
const delateArrItem = function(arr, item) {
	let Arr = arr;
	for(let i = 0; i < Arr.length; i++) {
		if(this[i] == item) {
			this.splice(i, 1);
			break;
		}
	}
	return Arr
};

/*******
 * num：待处理数字
 * precision：保留小数位
 * separator：分隔符
 * eg:formatNumber(100000000) 结果"100,000,000" 
 * formatNumber(100000000,2); 结果："100,000,000.00"
 * formatNumber(100000000,2,"?"); 结果："100?000?000.00"
 *********/
function formatNumber(num, precision, separator) {
    let parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        let n  =new Number(num);
        // 处理小数点位数
        n = (typeof precision !== 'undefined' ? n.toFixed(precision) : n).toString();
        // 分离数字的小数部分和整数部分
        parts = n.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
 
        return parts.join('.');
    }else{
    	console.error(`NaN: ${num}`);
    	return NaN;
    }
    
}
function dataToNumber(num,sorted) {  //计算和排序只针对数组
	
	
	let sort = false;  //默认不排序
	for(let ele of arguments){
		
		if(ele == true || ele=="sort" || ele=="sorted" || ele=="true" || ele=="True" || ele=="T" || ele=="t"){
			sort = true
		}
	}
	 let sequence = function (a, b) {
	 	if(a > b) {
	 		return 1;
	 	} else if(a < b) {
	 		return -1
	 	} else {
	 		return 0;
	 	}
	 }
	
    if(typeof(num) != "object"){   //不是数组

    	if (!isNaN(parseFloat(num)) && isFinite(num)){
    		let data  =new Number(num);
    		return data
    	}else{
    		console.error(`NaN: ${num}`);
    		return `NaN: ${num}`;
    	}
    	
    }else{   //数组
    	let dataArr = num;
    	let request=[];
    	for(let obj of dataArr){
    		if (!isNaN(parseFloat(obj)) && isFinite(obj)){
    			
	    		request.push(new Number(obj));
	    	}else{
				console.error(`NaN: ${obj}`);
	    		request.push(`NaN: ${obj}`);
	    	}
    	}
    	sort ? request = request.sort(sequence) : null;
    	
    	return request;
    }
}

//已弃用，，，目前用的  vuex 的Action
//获取通过字典类型  获取字典项 支持多个字典   如果有直接从vuex strore中获取，，没有的话请求后台数据并存入vuex 
/*	1,$this  --- 包括项目上的  axios vuex  config的地址配置
	2,data   --- 需要查找的字典  支持  string Array number 
	3,url    --- 如果需要指定访问的地址
	return   ----返回promise data = >{}  得到数据*/
const getDics = function($this,data,url) {
			
			if(!$this){
				console.error("没有传入实例对象");
				return ;
			}
			
			let inputArr=[];
			if(typeof(data) == "string" || typeof(data) == "number"){   //为单个字符串
				inputArr=[data];
			}else if(typeof(data) == "object" && data.length){
				inputArr=data;
			}else{
				console.error("传入对象错误");
				return ;
			}
			let hasdDicts = $this.$store.state.DictArr;
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
				ret = $this.$axios.post($this.$config.serverUrl+urlStr, 
					    JSON.stringify(toServer),
					    {headers: {'Content-Type': 'application/json'}}
					 ).then((res) => {
								reqServer = res.data;
								let dataArr = req.concat(reqServer);
								$this.$store.commit('setDicts',reqServer);
								return dataArr;
					    }).catch(error=>{
					        console.error(error);
					});
			}else{
				reqServer = [];
				let dataArr = req.concat(reqServer);
				ret = Promise.resolve(dataArr);

			}
			console.log($this.$store.state.DictArr);
			return ret;
	
};
export default {
	formatDate,
	delateArrItem,
	getDics,
	formatNumber,
	dataToNumber,
}
