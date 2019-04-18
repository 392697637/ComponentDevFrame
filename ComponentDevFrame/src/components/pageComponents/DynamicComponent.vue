<template>
	<div>
		异步组件
		<div v-if="this.type== 'el-table'">
			<el-table
		      :data="data"
		      style="width: 100%">
		      <el-table-column
		        prop="des"
		        label="描述">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="姓名">
		      </el-table-column>
		      <el-table-column
		        prop="age"
		        label="年龄">
		      </el-table-column>
		    </el-table>
		</div>
		<div v-if="this.type== 'dropdown'">
			<el-dropdown>
			  <span class="el-dropdown-link">
			    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item v-for = "ele in data">{{ele.name}}</el-dropdown-item>

			  </el-dropdown-menu>
			</el-dropdown>

		</div>
		 <component :is="component" :data="data" v-if="component" />

	</div>
	
</template>

<script>
	export default{
    	components:{
    	 
    	},
    	props:["type","data","url"],
		data(){
				return {
					component:null,
				}
		},
		created(){
			
		},
		computed: {
        loader() {
        	console.log("l:"+this.url);
	            if (!this.url) {
	                return () => import(`../common/vue/404.vue`)
	            }else{
	            	return () => import(`./${this.url}.vue`)
	            }
	        },

	    },
		mounted() {
			
			this.loader().then(()=>{
				
				if (!this.url) {
	                this.component = () => import(`../common/vue/404.vue`)
	            }else{
	            	this.component = () => import(`./${this.url}.vue`)
	            }
			}).catch(()=>{
				this.component = () => import(`../common/vue/404.vue`)
			})

		
		        
		},
        methods: {
        },
    }

</script>

<style>
</style>