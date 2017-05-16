<template>
  <main-layout index='true'>
  <div class="t-index">
		<div class="container">
		  <table class="table">
        <caption>
          <label>{{course.course_name}}</label>
          <i class="glyphicon glyphicon-time"></i><span>布置时间：{{course.course_start}}</span>        
          <i class="glyphicon glyphicon-time"></i><span>截止时间：{{course.course_end}}</span>
          <i class="glyphicon glyphicon-tag"></i><span>所属班级：{{course.course_class}}</span>
          <i class="glyphicon glyphicon-paperclip"></i><span>总人数：{{course.course_cap}}</span>
          <i class="glyphicon glyphicon-paperclip"></i><span>未提交人数：{{course.unsubmit}}</span>
        </caption>
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>状态</th>
            <th>分数</th>
            <th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in student_detail" :class="{'active':index%2}">
            <td>{{item.student_number}}</td>
            <td>{{item.student_name}}</td>
            <td>{{item.status}}</td>
            <td>{{item.score>=0?item.score:null}}</td>
            <td><a href="" v-if="item.status==='已提交'">查看作业</a></td>
          </tr>
          
        </tbody>
      </table>
		</div>
	</div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    data(){
      return {
        course:{},
        student_detail:[]
      }
    },
    components: {
      MainLayout
    },
    created(){
      var number=window.location.search.split('=').pop();
      var data={code:number};
      var _this=this;
      $.ajax({
          type: 'post',
          data:data,
          url: "/hsc/teacher/getHomeworkDetail",
          dataType: 'json',
          timeout: 60000,
          success: function(data) {
            if(data.status==='success'){
              _this.student_detail=data.student_detail;
              _this.course=data.course;
            }
            else if(data.status==='false'){
              _this.student_info=[];
            }
          },
          error: function(error) {
             
          }
        });
    },
  }
</script>
<style scoped>
a{
  color: #2ABCB9;
}
a:hover{
  color: #337ab7;
}
.table th{
  text-align: center;
  vertical-align: middle;
}
.table td{
  vertical-align: middle;
}
.table caption{
  padding-left: 20px;
  color: #2ABCB9;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 22px;
  vertical-align: top;
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
</style>
