export default {
	serverUrl:"http://59.110.26.156:8867/",  //59
	eviaLayer:"http://119.3.56.4:8081/earth/evts?format=image/jpg&scene=default&ds=1&type=edom&x={x}&y={y}&l={z}",
	eviaSearchUrl:"http://119.3.56.4:8081/forestry/getxiaobanwkt", 
	eviaSearchSource:"http://119.3.56.4:8081/forestry/getxiaobanmulwkt", //框选小班用
	systemID:28,                      //这个系统的system  root id
};
/*  注意:如需修改只需修改对应数字端口号,注意正确的标点符号!!! 如：  var configSite={server:8020,websit:8022,}
 * 配置说明:server--->运维服务端口号,websit---->系统网址端口号(可参照101对应的端口号进行修改)。*/