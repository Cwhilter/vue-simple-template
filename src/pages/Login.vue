<template>
<div>
<nav class="navbar navbar-default" role="navigation">
  <div class="container">
  <div class="navbar-header">
    <span class="glyphicon glyphicon-bookmark"></span><a class="navbar-brand" href="/">作业提交与批改系统</a>
  </div>
  <div class="status">
    <span class=""></span>
  </div>
  </div>
</nav>
  <div class="login-input">
    <div class="logo">登录</div>
    <div class="input-group">
      <span class="input-group-addon">身&nbsp&nbsp&nbsp份</span>
      <select class="form-control" v-model="user.type">
        <option v-for="list in type" :value="list.value" @click="clearMessage">{{list.text}}</option>
      </select>
    </div>
    <div class="input-group">
            <span class="input-group-addon">学&nbsp&nbsp&nbsp号</span>
            <input type="text" v-model="user.number" class="form-control" placeholder="请输入学号" @keyup="clearMessage">
    </div>
    <div class="input-group">
        <span class="input-group-addon">密&nbsp&nbsp&nbsp码</span>
        <input type="password" v-model="user.password" class="form-control" placeholder="请输入密码" @keyup="clearMessage">
    </div>
    <div class="login-btn" @click="loginAction">
      登录
    </div>
  </div>
  <div id="myAlert" v-show="alert" class="alert " :class="{'alert-warning':warning,'alert-success':!warning}">
    <a href="javascript:void(0)" class="close" @click="clearMessage">&times;</a>
    <strong>{{message}}</strong>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        user:{
          type:'',
          number:'',
          password:''
        },
        type:[
          {text:'学生',value:'student_info'},
          {text:'教师',value:'teacher_info'},          
          {text:'管理员',value:'admin_info'}
        ],
        alert:false,
        warning:false,
        message:''
      }
    },
    methods: {
      showMessage(msg,warning){
        this.message=msg;
        this.warning=warning;
        this.alert=true;
      },
      //登陆操作
      loginAction(){
        console.log(this.user.type);
        if(!this.user.type){
          this.showMessage('身份不能为空',true);
        }
        else if(!this.user.number){
          this.showMessage('学号不能为空',true);
        }
        else if(!this.user.password){
          this.showMessage('密码不能为空',true);
        }
        else{
          var user=this.user;
          var _this=this;
          $.ajax({
              type: 'POST',
              data: user,
              url: "/hsc/common/login",
              dataType: 'json',
              timeout: 60000,
              success: function (data) {
                if(data.status==='success'){
                  sessionStorage.number=user.number;
                  sessionStorage.type=user.type;
                  sessionStorage.name=data.name;
                  var date = new Date();
                  date.setTime(date.getTime() + 300000);
                  document.cookie=encodeURIComponent('number')+'='+encodeURIComponent(user.number);
                  _this.showMessage('登录成功',false);
                  var href='';
                  if(_this.user.type==='teacher_info'){
                    href='/teacher';
                  }
                  else if(_this.user.type==='student_info'){
                    href='/student';
                  }
                  else{
                    href='/admin';
                  }
                  setTimeout(function(){
                    window.location.href = href;
                  },500);  
                }
                else{
                  _this.showMessage('用户名或密码错误，请重试',true);
                }
              },
              error: function (error) {
                  _this.showMessage('用户名或密码错误，请重试',true);
              }
          });
        }
        
        
      },    
      clearMessage(){
        this.alert=false;
        this.message='';
      }
    },
    created(){
      var type=sessionStorage.type;
      if(type==='teacher_info'){
        window.location.href = '/teacher';
      }
      else if(type==='student_info'){
        window.location.href = '/student';
      }
      else if (type==='admin_info'){
        window.location.href = '/admin';  
      }
    },
    components: {
      
    }
  }
</script>
<style lang="less" scoped>
@border_color:#d1d1d1;
#myAlert{
  text-align: center;
  color: #f75c5a;
}
.navbar-default{
  background-color: #f6f6f6;
  border-color: @border_color;
  border-radius: 0;
}
.navbar-brand{
  color: #2ABCB9;
}
.glyphicon-bookmark{
  float: left;
  font-size: 20px;
  color: #2ABCB9;
  display: inline-block;
  height: 30px;
  line-height: 48px;
  margin-right: 15px;
  vertical-align: middle;
}
.login-input{
  width: 500px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -180px;
  margin-left: -250px;
  background-color: #f6f6f6;
  border:1px solid @border_color;
}
.logo{
  font-size: 18px;
  color: #4c4c47;
  height: 65px;
  line-height: 65px;
  text-align: center;
  border-bottom: 1px solid @border_color;
}
.input-group{
  height: 30px;
  width: 360px;
  margin: 30px auto;
}
.login-btn{
  cursor: pointer;
  color: #fff;
  background-color: #29bdb9;
  font-size: 18px;
  width: 360px;
  margin: 40px auto;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 2px;
}
.login-btn:hover{
  background-color: #3aceca;
}
</style>