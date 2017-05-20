 <template>
<div id="body">
<nav class="navbar navbar-default" role="navigation">
  <div class="container">
  <div class="navbar-header">
    <span class="glyphicon glyphicon-bookmark"></span><v-link class="navbar-brand" href="/teacher" title="返回首页">作业提交与批改系统</v-link>
  </div>
  <ul class="nav-list">
  <li><v-link href="/admin" :class="{'active':student}">学生信息</v-link></li>
    <li><v-link href="/admin/homeworkInfo" :class="{'active':homework}">作业信息</v-link></li>
    <li><v-link href="/admin/teacherInfo" :class="{'active':teacher}">教师信息</v-link></li>
    
    <li><v-link href="/admin/classInfo" :class="{'active':klass}">班级信息</v-link></li>
  </ul>
  <div class="status">   
    <span class="username">{{user.role}}:{{user.name}}<span class="drop"></span></span> 
    <ul class="hide-option">
      <li data-toggle="modal" data-target="#myModal">修改个人资料</li>
      <li data-toggle="modal" data-target="#addAdmin">添加管理员</li>
      <li data-toggle="modal" data-target="#changePassword">修改密码</li>
      <li data-toggle="modal" data-target="#logout">注销登录</li>
    </ul> 
  </div>
  <div class="modal fade" id="logout" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">确定注销？</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="logout">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

  </div>
</nav>
<div class="t-index">
<slot></slot>
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    
    <div class="modal-dialog">
        <div id="changeData" v-show="alert" class="alert " :class="{'alert-warning':warning,'alert-success':!warning}">
          <a href="javascript:void(0)" class="close" @click="clearMessage">&times;</a>
          <strong>{{message}}</strong>
        </div>
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">修改个人资料</h4>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-addon">姓名</span>
                <input v-model="admin.name" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">性别</span>
                <input v-model="admin.sex" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">电话</span>
                <input v-model="admin.phone_number" @keyup="clearMessage" type="text" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="changeData">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<div class="modal fade" id="changePassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    
    <div class="modal-dialog">
    <div id="myAlert" v-show="alert" class="alert " :class="{'alert-warning':warning,'alert-success':!warning}">
      <a href="javascript:void(0)" class="close" @click="clearMessage">&times;</a>
      <strong>{{message}}</strong>
    </div>
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">修改密码</h4>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-addon">原&nbsp密&nbsp码&nbsp</span>
                <input v-model="password.origin" @keyup="clearMessage" type="password" class="form-control" placeholder="请输入原密码">
              </div>
              <div class="input-group">
                <span class="input-group-addon">新&nbsp密&nbsp码&nbsp</span>
                <input v-model="password.newPassword" @keyup="clearMessage" type="password" class="form-control" placeholder="长度6到20位">
              </div>
              <div class="input-group">
                <span class="input-group-addon">再次输入</span>
                <input v-model="password.again" @keyup="clearMessage" type="password" class="form-control" placeholder="再次输入新密码">
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="postPassword">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<dialog-components :message="msg" v-if="dialog_show"></dialog-components>
<div id="footer">
  <div class="container">
    <div class="footer-body">
      <div class="sign">Copyright © 2017 wp design毕设名称：作业提交与批改系统</div>
    </div>
  </div>
 </div>
</div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import Dialog from '../components/Dialog.vue'
  import Cookies from '../assets/lib/cookies.js'

  export default {
    data(){
      return{
        msg:'',
        dialog_show:false,
        user:{
          name:'',
          type:'',
          role:''
        },
        password: {
          origin: '',
          newPassword: '',
          again: ''
        },
        admin:{
          name:'',
          sex:'',
          phone_number:''
        },
        alert:false,
        warning:false,
        message:''
      }
    },
    created(){

    },
    mounted(){
      this.user.name=Cookies.get('name');
      this.user.type=Cookies.get('type');
      switch(this.user.type){
        case 'teacher_info':
          this.user.role='教师';
          break;
        case 'student_info':
          this.user.role='学生';
          break;
        case 'admin_info':
          this.user.role='管理员';
          break;
      }
      var _this=this;
      $.ajax({
        type: 'get',
        url: "/hsc/admin/getPersonalInfo",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.admin=data.result;
          }
        },
        error: function(error) {
           
        }
      });
    },
    components: {
      VLink,
      'dialog-components':Dialog
    },
    methods:{
      dialogShow(msg){
        this.dialog_show=true;
        this.msg=msg;
        var _this=this;
        setTimeout(function(){
          _this.dialog_show=false;
        },1500)
      },
      logout(){
        $.ajax({
          type: 'get',
          url: "/hsc/common/loginOut",
          dataType: 'json',
          timeout: 60000,
          success: function(data) {
            if(data.status === 'success') {
              Cookies.clear('number');
              Cookies.clear('type');
              Cookies.clear('name');
              window.location.href='/';
            } else {
              
            }
          },
          error: function(error) {
             
          }
        });            
      },
      clearMessage(){
        this.alert=false;
        this.message='';
      }, 
      showMessage(msg,warning){
        this.message=msg;
        this.warning=warning;
        this.alert=true;
      },
      postPassword() {
          var _this = this;
          var origin = this.password.origin,
            newPassword = this.password.newPassword,
            again = this.password.again,
            num = /[0-9]+/,
            lowercase = /[a-z]+/,
            capital = /[A-Z]+/;
          if((!origin) || (!newPassword) || (!again)) {
            this.showMessage('信息未填写完成',true);
          } else if(newPassword.length < 6 || newPassword.length > 20) {
            this.showMessage('密码长度不正确',true);
          } else if(newPassword !== again) {
            this.showMessage('两次密码不一致',true);
          } else{
            var changePassword = {};
            changePassword.oldpasswd = this.password.origin;
            changePassword.newpasswd = this.password.newPassword;
            changePassword.renewpasswd = this.password.again;
            $.ajax({
              type: 'post',
              data: changePassword,
              url: "/hsc/admin/changePassword",
              dataType: 'json',
              timeout: 60000,
              success: function(data) {
                if(data.status === 'success') {
                  $('#changePassword').modal('hide');
                  _this.dialogShow('修改成功');
                  setTimeout(function(){
                    window.location.reload();
                  },2000);
                } else {
                  _this.message = '原始密码不正确';
                }
              },
              error: function(error) {
                 _this.message = '修改失败，请稍后重试';
              }
            });
          } 

        },
        changeData(){       
          for(var item in this.admin){
            if(!this.admin[item]){
              this.showMessage('信息未填写完成',true);
              return false;
            }
          }
          var _this=this;
          var data={data:this.admin};
          $.ajax({
            type: 'post',
            data:data,
            url: "/hsc/admin/updatePersonalInfo",
            dataType: 'json',
            timeout: 60000,
            success: function(data) {
              if(data.status==='success'){
                $('#myModal').modal('hide');
                _this.dialogShow('修改成功');
                setTimeout(function(){
                  window.location.reload();
                },2000);
              }
            },
            error: function(error) {
               
            }
          });
        }
    },
    props:['homework','student','teacher','klass']
  }
</script>

<style lang="less" scoped>
@border_color:#e2e2e2;
#body{
  height: 100%;
}
.navbar{
  margin-bottom: 15px;
  border: none;
}
.navbar-default{
  background-color: #f5f5f5;
}


.container{
  line-height: 50px;
}
.navbar-brand.active{
    color: #2ABCB9;
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
.nav-list{
  font-size: 15px;
  color: #999;
  display: inline;
  margin-left: 50px;
  .active{
    color: #2ABCB9!important;
    border-bottom: 3px solid #2ABCB9;
  }
  li{
    cursor: pointer;
    display: inline-block;
    height: 50px;
    width: 100px;
    margin-right:20px; 
    text-align: center;
    vertical-align: top;
    a{
      display: inline-block;
      height: 50px;
    }
  }
  li a:hover{
    color: #4c4c47;
  }
}
.username{
    letter-spacing: 1px;
    cursor: pointer;
    float: right;
    font-size: 15px;
    color: #2ABCB9;
  }
.hide-option{
  background-color: #f5f5f5;
  display: none;
  right: 0;
  top: 50px;
  position: absolute;
  z-index: 10;
  li{
    cursor: pointer;
    width: 100px;
    text-align: center;
    color: #4c4c47;
  }
  li:hover{
    color: #2ABCB9;
  }
}
.status{
  position: relative;
  float: right;
  .drop{
    float: right;
    display: block;
    height: 0;
    width: 0;
    margin-top: 22px;
    margin-left: 5px; 
    vertical-align: middle;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;  
  }
}
.status:hover .hide-option{
  display: block;
}
.username:hover .hide-option{
    display: block;
  }
.modal-dialog{
  top: 50px;
  width: 450px;
}
.modal-body{
  font-size: 16px;
  text-align: center;
}
.input-group{
  padding: 15px 70px;
}
#myAlert{
  position: absolute;
  width: 100%;
  top: -65px;
  text-align: center;
}
#changeData{
  position: absolute;
  width: 100%;
  top: -65px;
  text-align: center;
}
#footer{
  background-color: #f0f0f0;
  height: 50px;
  border:1px solid @border_color;
  .footer-body{
    width: 100%;
    text-align: center;
    color: #2ABCB9;
    font-size: 15px;
    font-weight: 500;  
  }
}
</style>
