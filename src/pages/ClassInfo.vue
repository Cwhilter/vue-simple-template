<template>
  <main-layout klass='true'>
  <div class="t-index">
	<div class="container">
	  <table class="table">
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>班级人数</th>
            <th>负责人</th>
            <th>负责人电话</th>   
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in class_info" :class="{'active':index%2}">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.size}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.leader_phone_number}}</td>
            <td><i class="glyphicon glyphicon-edit" @click="showModal" :id="index" title="编辑"></i><i class="glyphicon glyphicon-trash" title="删除" :id="index"  @click="showConfim"></i></td>
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
                <h4 class="modal-title" id="myModalLabel">编辑班级信息</h4>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-addon">名称</span>
                <input v-model="data.name" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">负责人</span>
                <input v-model="data.leader" @keyup="clearMessage" type="text" class="form-control">
              </div>
              <div class="input-group">
                <span class="input-group-addon">电话</span>
                <input v-model="data.leader_phone_number" @keyup="clearMessage" type="text" class="form-control">
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="changeData">修改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<dialog-components :message="msg" v-if="dialog_show"></dialog-components>
	</div>
  <div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">确定删除？</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"  @click="deleteInfo">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/AdminMain.vue'
  import Dialog from '../components/Dialog.vue'

  export default {
    data(){
      return{
        msg:'',
        dialog_show:false,
        class_info:[],
        data:{
          id:'',
          name:'',
          size:'',
          leader:'',
          leader_phone_number:''
        },
        deleteNumber:'',
        deleteName:'',
        alert:false,
        warning:false,
        message:''
      } 
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
      showModal(event){
      	$('#editInfo').modal('toggle');
      	var target=event.target;
      	var index=$(target).attr("id");
      	this.data=this.class_info[index];
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
            url: "/hsc/admin/updateClassInfo",
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
        },
        showConfim(event){
          $('#confirm').modal('toggle');
          var target=event.target;
          var index=$(target).attr("id");
          this.deleteNumber=this.class_info[index].id;
          this.deleteName=this.class_info[index].name;
        },
        deleteInfo(){
          var _this=this;
          var data={number:this.deleteNumber,name:this.deleteName};
          $.ajax({
            type: 'post',
            data:data,
            url: "/hsc/admin/deleteClassInfo",
            dataType: 'json',
            timeout: 60000,
            success: function(data) {
              if(data.status==='success'){
                $('#confirm').modal('hide');
                _this.dialogShow('删除成功');
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
      MainLayout,
      'dialog-components':Dialog
    },
    mounted(){
      var _this=this;
      $.ajax({
        type: 'get',
        url: "/hsc/admin/getClassesInfo",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.class_info=data.result;
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
