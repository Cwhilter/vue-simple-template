<template>
  <main-layout teacher='true'>
  <div class="t-index">
	<div class="container">
	  <table class="table">
        <thead>
          <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>职位</th>   
            <th>所带班级</th>         
            <th>联系方式</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in teacher_info" :class="{'active':index%2}">
            <td>{{item.number}}</td>
            <td>{{item.name}}</td>
            <td>{{item.sex}}</td>
            <td>{{item.age}}</td>
            <td>{{item.position}}</td>
            <td>{{item.classes}}</td>
            <td>{{item.phone_number}}</td>
            <td><i class="glyphicon glyphicon-edit" @click="showModal" :id="index" title="编辑"></i><i class="glyphicon glyphicon-trash" title="删除" :id="index" @click="deleteCourse"></i></td>
          </tr>
        </tbody>
      </table>
		</div>
<div class="modal fade" id="editInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    
    <div class="modal-dialog">
    <div id="changeData" v-show="alert" class="alert " :class="{'alert-warning':warning,'alert-success':!warning}">
          <a href="javascript:void(0)" class="close" @click="clearMessage">&times;</a>
          <strong>{{message}}</strong>
        </div>
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">编辑教师信息</h4>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-addon">姓名</span>
                <input v-model="data.name" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">性别</span>
                <input v-model="data.sex" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">专业</span>
                <input v-model="data.position" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">年龄</span>
                <input v-model="data.age" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">电话</span>
                <input v-model="data.phone_number" @keyup="clearMessage" type="text" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="changeData">注册</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
	</div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/AdminMain.vue'

  export default {
    data(){
      return{
        teacher_info:[],
        data:{
          number:'',
          name:'',
          sex:'',
          position:'',
          age:'',
          phone_number:''
        },
        alert:false,
        warning:false,
        message:''
      } 
    },
    methods:{
      deleteCourse(event){

      },
      showModal(event){
      	$('#editInfo').modal('toggle');
      	var target=event.target;
      	var index=$(target).attr("id");
      	this.data=this.teacher_info[index];
      },
      showMessage(msg,warning){
        this.message=msg;
        this.warning=warning;
        this.alert=true;
      },
	  clearMessage(){
        this.alert=false;
        this.message='';
      }, 
      changeData(){
          for(var item in this.data){
            if(!this.data[item]){
              this.showMessage('信息未填写完成',true);
              return false;
            }
          }
          var _this=this;
          var data={data:this.data};
          $.ajax({
            type: 'post',
            data:data,
            url: "/hsc/student/updatePersonalInfo",
            dataType: 'json',
            timeout: 60000,
            success: function(data) {
              if(data.status==='success'){
                $('#editInfo').modal('hide');
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
    components: {
      MainLayout
    },
    mounted(){
      var _this=this;
      $.ajax({
        type: 'get',
        url: "/hsc/admin/getTeacherInfo",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.teacher_info=data.result;
          }
        },
        error: function(error) {
           
        }
      });

    }
  }
</script>
<style scoped>
.table th{
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #ddd;
}
.table td{
  vertical-align: middle;
}
.table td i{
	display: inline-block;
	margin-right: 10px;
	cursor: pointer;
	color: #2ABCB9;
	font-size: 16px;
}
.table caption{
  padding-left: 20px;
  color: #2ABCB9;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 22px;
}
.table caption i{
  font-size: 14px;
  display: inline-block;
  margin-right: 5px;
  margin-left: 25px;
}
.table caption span{
  font-size: 13px;
}
.btn{
  margin-left: 40px;
  width: 75px;
}
.input-groups{
  padding: 0!important;
  margin: 10px 0;
  float: left;
  width: 25%;
}
.modal-dialog{
    top: 25px!important;
    width: 500px!important;
}
</style>
