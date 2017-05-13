<template>
  <main-layout index='true'>
  <div class="container">
  	<div class="chunk">
  		<span class="glyphicon glyphicon-upload"></span>
  		<p>提交作业</p>
  		<p class="detail">查看</p>
  	</div>
  	<div class="chunk">
  		<span class="glyphicon glyphicon-search"></span>
  		<span>查看作业</span>
  	</div> 
  	<div class="chunk">
  		<span class="glyphicon glyphicon-download"></span>
  		<span>下载作业</span>
  	</div> 
  	<div class="chunk">
  		<span class="glyphicon glyphicon-download"></span>
  		<span>下载作业</span>
  	</div> 
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
	text-align: center;
	font-size: 18px;
	width: 20%;
	margin:100px 10px 0 40px;
	float: left;
	height: 280px;
	border: 1px solid #2ABCB9;
	color: #2ABCB9;
	cursor: pointer;
}
.chunk p{
	line-height: 20px;
}
.chunk:hover{
	background: #2ABCB9;
	color: #fff;
}
.chunk span.glyphicon{	
	height: 100px;
	line-height: 100px;
	margin-top: 65px;
	height: 80px;
	font-size: 50px;	
}
.chunk span.detail{
	font-size: 12px;
	vertical-align: top;
}
</style>