<template>
  <main-layout homework='true'>
  <div class="t-index">
	<div class="container">
	  <table class="table">
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>布置日期</th>
            <th>截止日期</th>
            <th>所属班级</th>   
            <th>所属教师</th>  
            <th>所属教师编号</th>       
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in homework_info" :class="{'active':index%2}">
            <td>{{item.course_code}}</td>
            <td>{{item.course_name}}</td>
            <td>{{item.course_start}}</td>
            <td>{{item.course_end}}</td>
            <td>{{item.course_class}}</td>
            <td>{{item.teacher_name}}</td>
            <td>{{item.teacher_number}}</td>
            <td>{{item.course_content}}</td>
            <td><i class="glyphicon glyphicon-trash" title="删除" :id="index" @click="deleteCourse"></i></td>
          </tr>
        </tbody>
      </table>
		</div>

	</div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/AdminMain.vue'

  export default {
    data(){
      return{
        homework_info:[],
        alert:false,
        warning:false,
        message:''
      } 
    },
    methods:{
      deleteCourse(event){
          var target=event.target;
      	  var index=$(target).attr("id");
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
        url: "/hsc/admin/getHomeworkInfo",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.homework_info=data.result;
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
