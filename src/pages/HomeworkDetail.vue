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
            <td><a :href="'/hsc/teacher/download?code='+course.course_code+'&number='+item.student_number" v-if="item.status==='已提交'">查看作业</a><span v-if="item.score<0&&item.status==='已提交'" @click="marking(item)" data-toggle="modal" data-target="#marking">打分</span></td>
          </tr>
          
        </tbody>
      </table>
		</div>
	</div>
  <div class="modal fade" id="marking" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">    
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">作业评分<span>{{message}}</span></h4>
            </div>
            <div class="modal-body">
              <div class="marking-row"><span>作业题目：</span><span class="content">{{marking_info.title}}</span></div>
              <div class="marking-row"><span>学生学号：</span><span class="content">{{marking_info.student_number}}</span></div>
              <div class="marking-row"><span>学生姓名：</span><span class="content">{{marking_info.student_name}}</span></div>
              <div class="marking-row"><span>所得分数：</span><input type="text" name="score" v-model="marking_info.score" placeholder="请输入数字" @keyup="clearMessage"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="submitScore">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    data(){
      return {
        message:'',
        course:{},
        student_detail:[],
        marking_info:{
          title:'',
          student_number:'',
          student_name:'',
          score:''
        }
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
    methods:{
      clearMessage(){
        this.message='';
      }, 
      marking(item){
        this.marking_info.title=this.course.course_name;
        this.marking_info.student_number=item.student_number;
        this.marking_info.student_name=item.student_name;
      },
      submitScore(){
        var _this=this;
        var regNum=/^[\d]*$/;
        if(!regNum.test(this.marking_info.score)){
          this.message='分数必须为数字';
          return false;
        }
        var data={code:this.course.course_code,student_number:this.marking_info.student_number,score:this.marking_info.score};
        $.ajax({
          type: 'post',
          data:data,
          url: "/hsc/teacher/marking",
          dataType: 'json',
          timeout: 60000,
          success: function(data) {
            if(data.status==='success'){
              window.location.reload();
            }
            else if(data.status==='false'){
              _this.message='评分失败，请稍后重试';
            }
          },
          error: function(error) {
             
          }
        });
      }
    }
  }
</script>
<style scoped>
a{
  display: inline-block;
  margin-right: 10px;
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
.table td span{
  cursor: pointer;
  color: #2ABCB9;
}
.table td span:hover{
  color: #337ab7;
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
.marking-row{
  line-height: 50px;
}
.marking-row span{
  display: inline-block;
  width: 40%;
  text-align: right;
  margin-right: 10px;
}
.marking-row span.content{
  text-align: left;
  color: #898989;
}
input[name=score]{
  line-height: 25px;
  width: 40%;
  margin-right: 10px;
}
.modal-title span{
  color: #d53a38;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  width: 150px;
}
</style>
