<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">智慧林业管理系统</div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" placeholder="请输入用户名">
                   		
                   		<template  slot="prepend">
                   			<Icon size="20" type="ios-contact"/>
                   		</template>
                        
 
                    </el-input>
                    
			        <!--<Input size="large" placeholder="请输入用户名" v-model="ruleForm.account" style="width: 100%">
			            <Icon type="ios-contact" slot="prefix" />
			        </Input>-->
			        
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        
                        <template  slot="prepend">
                   			<Icon  size="20" type="ios-lock" slot="prefix" />
                   		</template> 
                   		
                    </el-input>
                    <!--<Input size="large" placeholder="请输入密码" type="password" v-model="ruleForm.password" @on-enter="submitForm('ruleForm')" style="width: 100%">
			            <Icon type="ios-lock" slot="prefix" />
			        </Input>-->
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名为用户中文名全拼，默认密码为123456。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
    	
        data: function(){
        	const validateLogin = (rule, value, callback) => {
                if ($.trim(value) === '') {
                    callback(new Error('请输入密码'));
                } else {
                	
                	this.$Loading.start();
                	if(this.ruleForm.password == 123456){
                		callback();
                	}else{
                		this.$message.error("密码为123456");
						this.$router.replace('/login');
						callback(new Error("密码为123456"));
                	}
                	this.$Loading.finish();
                   
                }
            };
            return {
                ruleForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true,  message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	
                    	
                        this.$Loading.start();
	                	if(this.ruleForm.password == 123456){
														
							this.$message.success('登录成功');
							this.$store.commit('setToken', "123121212");
							this.$store.commit('setLogin', {userName:this.ruleForm.account});
							this.$router.push('/')
														
						}else{
							this.$message.error("密码为123456");
							this.$router.replace('/login');
						}
	                	this.$Loading.finish();
                        
						/*this.$axios.post(this.$config.serverUrl + "api/Login/CheckLogin",
						                   			JSON.stringify({
															account: this.ruleForm.account,
															password: this.MD5(this.ruleForm.password)
													}),
													{headers: {'Content-Type': 'application/json'}}
						                   			).then(res => {
													let data = res.data ;
													console.log(data);
													if(data.token){
														
														this.$message.success('登录成功');
														this.$store.commit('setToken', data.token);
														this.$store.commit('setLogin', data);
														this.$router.push('/')
														
														
													}else{
														this.$message.error(data);
														this.$router.replace('/login');
													}
													 this.$Loading.finish();
												}).catch(error => {
													console.log(error);
													this.$Loading.error();
													this.$message.error(error);
										
												})*/

                    } else {
                       this.$message.error("验证错误");
                        return false;
                    }
                });
           },
          
          
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #383d3e;
        background-color:rgba(206,213,219, 0.9);
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.6);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color: #3f9ffe;
    }
</style>