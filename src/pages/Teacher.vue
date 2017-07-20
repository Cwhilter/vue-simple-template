<template>
  
  <div class="container">
    <div class="homework-list" v-for="item in homework_list" v-if="homework_list.length>0">
      <div class="file-img"><img src="../assets/images/file.png"></div>
      <div class="detail">
        <div class="file-name">{{item.course_name}}</div>
        <div class="file-detail">
          <i class="glyphicon glyphicon-time"></i><span>布置时间：{{item.course_start}}</span>      
          <i class="glyphicon glyphicon-time"></i><span>截止时间：{{item.course_end}}</span>
          <i class="glyphicon glyphicon-tag"></i><span>所属班级：{{item.course_class}}</span>
          <i class="glyphicon glyphicon-paperclip"></i><span>总人数：{{item.course_cap}}</span>
          <i class="glyphicon glyphicon-paperclip"></i><span>未提交人数：{{item.unsubmit}}</span>
        </div>
      </div>
      <div class="option">
        <span><a :href="'/teacher/homeworkDetail?id='+item.course_code">查看详情</a></span>
      </div>
    </div>
    <div class="no-data" v-if="homework_list.length<=0">未找到相关数据</div>
    </div> 
    
  
</template>

<script>

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
      
    }
  }
</script>
<style scoped>
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
  width: 75%;
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
  width: 100px;
  float: right;
  line-height: 100px;
}
.option span{
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