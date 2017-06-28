<template>
  <main-layout index='true' page='- -查看作业'>
  <div class="container">
    <div class="homework-list" v-for="item in homework_list" v-if="homework_list.length>0">
      <div class="file-img"><img src="../assets/images/file.png"></div>
      <div class="detail">
        <div class="file-name">{{item.name}}</div>
        <div class="file-detail">
          <i class="glyphicon glyphicon-time"></i><span>布置时间：{{item.course_start}}</span>      
          <i class="glyphicon glyphicon-time"></i><span>截止时间：{{item.course_end}}</span>
          <i class="glyphicon glyphicon-tag"></i><span>任课教师：{{item.teacher_name}}</span>
          <i class="glyphicon glyphicon-info-sign" v-if="item.score>=0"></i><span v-if="item.score>=0">分数：{{item.score}}</span>
          <i class="glyphicon glyphicon-pushpin" v-if="item.score<0"></i><span v-if="item.score<0">状态：未批改</span>
        </div>
      </div>
      <div class="option" v-if="item.score<0">
        <span><a href="javascript:void(0)" @click="deleteFile(item)">重新提交</a></span>
      </div>
      <div class="option">
        <span><a :href="'/hsc/student/downloadFile?code='+item.code">查看作业</a></span>
      </div>
    </div>
    </div> 
    <div class="no-data" v-if="homework_list.length<=0">未找到相关数据</div>
	<dialog-components :message="message" v-if="dialog_show"></dialog-components>
  </main-layout>
</template>

<script>
  import MainLayout from 'layouts/StudentMain.vue'
  //import 'assets/lib/layui.all.js'
//  import 'assets/lib/layui/css/layui.css'
  import Dialog from 'components/Dialog.vue'

  export default {
    data(){
      return {
         homework_list:[],
         message:'',
         dialog_show:false,
      }
    },
    created(){   
      var _this=this;	
      $.ajax({
        type: 'get',
        url: "/hsc/student/getScore",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.homework_list=data.result;
          }
          else{
          }
        },
        error: function(error) {
        }
      });
    },
    updated(){
    	
    },
    methods:{
      dialogShow(msg){
        this.dialog_show=true;
        this.message=msg;
        var _this=this;
        setTimeout(function(){
          _this.dialog_show=false;
        },1500)
      },
      deleteFile(item){
        var data={code:item.code};
        $.ajax({
          type: 'post',
          data:data,
          url: "/hsc/student/deleteHomework",
          dataType: 'json',
          timeout: 60000,
          success: function(data) {
            if(data.status==='success'){
              window.location.href='/student/commit';
            }
            else{
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
    }
  }
</script>
<style scoped>
.layui-upload-file{
	position: relative;
	z-index: 10;
	width: 80px;
	color: #000;
}
.homework-list{
  height: 100px;
  border: 1px solid #d1d1d1;
  margin: 0 0 15px 0;
}
.file-img{
  height: 100px;
  line-height: 95px;
  width: 9%;
  float: left;
  margin-left: 20px;
}
.detail{
  float: left;
  height: 100%;
  width: 65%;
}
.file-name{
  height: 40px; 
  vertical-align: top;
}
.file-detail{
  font-size: 14px;
  height: 60px;
  color: #999;
}
.file-detail span{
  display: inline-block;
  height: 50px;
  line-height: 40px;
  margin-right: 25px;
}
.file-detail i{
  display: inline-block;
  margin-right: 5px;
}
.option{
  position: relative;
  width: 100px;
  float: right;
  line-height: 100px;
}
.option span{
  vertical-align: middle;
  cursor: pointer;
  color: #fff;
  border-radius: 4px;
  background-color: #2ABCB9;
  text-align: center;
  margin:0 auto;
  display: inline-block;
  width: 80px;
  height: 35px;
  line-height: 35px;
}
.option span label{
	top: 33px;
	right: 19px;
	position: absolute;
	width: 80px;
	height: 35px;
	line-height: 35px;
	color: #fff;
	font-weight: 500;
	margin-bottom: 0;
}
.option span:hover{
  background-color: #3aceca;
}
.option a{
  color: #fff;
  display: inline-block;
  width: 100%;
}
.no-data{
  color: #999;
  line-height: 660px;
  font-size: 18px;
  text-align: center;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(../assets/images/noData.png);
}
</style>