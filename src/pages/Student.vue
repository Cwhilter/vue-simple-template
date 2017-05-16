<template>
  <main-layout index='true'>
  <div class="container">
  	<a class="chunk" href="/student/commit">
  		<span class="glyphicon glyphicon-open"></span>
  		<p>提交作业</p>
  		<p class="detail">查看、提交未完成作业</p>
  	</a>
  	<a class="chunk" href="/student/homeworkList">
  		<span class="glyphicon glyphicon-search"></span>
  		<p>查看作业</p>
  		<p class="detail">查看已提交作业</p>
  	</a> 
  	<a class="chunk">
  		<span class="glyphicon glyphicon-picture"></span>
  		<p>成绩统计</p>
  		<p class="detail">个人成绩统计图</p>
  	</a> 
  	<a class="chunk">
  		<span class="glyphicon glyphicon-globe"></span>
  		<p>更多功能</p>
  		<p class="detail">敬请期待。。</p>
  	</a> 
   </div> 
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/StudentMain.vue'

  export default {
    data(){
      return {
         homework_list:[]
      }
    },
    mounted(){
      var _this=this;
      $.ajax({
        type: 'get',
        url: "/hsc/teacher/getHomeworkList",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.homework_list=data.result;            
          }
        },
        error: function(error) {
           
        }
      });
    },
    created(){
      
    },
    components: {
      MainLayout
    }
  }
</script>
<style scoped>
.chunk{
	display: inline-block;
	text-align: center;
	font-weight: 600;
	letter-spacing: 1px;
	font-size: 20px;
	width: 20%;
	margin:100px 10px 0 40px;
	float: left;
	height: 280px;
	border: 1px solid #2ABCB9;
	color: #2ABCB9;
	cursor: pointer;
}
.chunk p{
	line-height: 28px;
}
.chunk:hover{
	background: #2ABCB9;
	color: #fff;
}
.chunk span.glyphicon{	
	height: 100px;
	line-height: 100px;
	margin-top: 50px;
	height: 80px;
	font-size: 60px;	
}
.chunk p.detail{
	font-weight: 500;
	font-size: 14px;
	vertical-align: top;
}
</style>