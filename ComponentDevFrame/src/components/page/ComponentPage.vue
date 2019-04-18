<template>
	<div>
		<div class="crumbs">
	      <el-breadcrumb separator="/">
	        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>{{this.$route.meta.title}}</el-breadcrumb-item>
	      </el-breadcrumb>
	    </div>
	    <div class="container">
	    	<dynamic-com :is="dynamicCom" v-bind:data="testData.data" v-bind:type="testData.type" v-bind:url="testData.url" v-if="dynamicCom" />
	    </div>
	</div>
</template>

<script>
	
	export default{
		name:"ComponentPage",
		data(){
			return {
				testData :{
		  			url:null,
		  			data:null,
		  			type:null,
		  		},
		  		dynamicCom:null,
			}
		},
		mounted(){
			let _this = this;
		    setTimeout(function(){
		  		_this.testData = {
		  			url:"dynamic01",
		  			type:"dropdown",
		  			data:[{name:"01"},
		  				  {name:"02"},
		  				  {name:"03"},
		  				  {name:"04"},
		  				]
		  		}
		  		_this.dynamicCom = ()=> import(`../pageComponents/DynamicComponent.vue`);
		  		
		  	},1000)
		}
	}
</script>

<style>
</style>