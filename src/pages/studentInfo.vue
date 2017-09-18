<template>
  <div class="t-index">
	<div class="container">
	  <table class="table">
        <caption>
  		    <div class="input-group">
  		      <span class="input-group-addon">班&nbsp&nbsp&nbsp级</span>
  		      <select class="form-control" v-model="currentClass">
  		        <option v-for="list in class_info">{{list}}</option>		        
  		      </select>
  		    </div>
        	<button class="btn btn-primary" @click="choose">查看</button>
        </caption>
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>专业</th>
            <th>班级</th>
            <th>联系方式</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in student_info" :class="{'active':index%2}">
            <td>{{item.number}}</td>
            <td>{{item.name}}</td>
            <td>{{item.sex}}</td>
            <td>{{item.age}}</td>
            <td>{{item.major}}</td>
            <td>{{item.class}}</td>
            <td>{{item.phone_number}}</td>
          </tr>
        </tbody>
      </table>
		</div>
	</div>
</template>

<script>

  export default {
    data(){
      return{
        class_info:[],
        student_info:[],
        currentClass:''
      } 
    },
    methods:{
      choose(){
        this.student_info.length=0;
        var _this=this;
        var data={class:this.currentClass};
        $.ajax({
          type: 'post',
          data:data,
          url: "/hsc/teacher/getStudentInfo",
          dataType: 'json',
          timeout: 60000,
          success: function(data) {
            if(data.status==='success'){
              _this.student_info=data.result;
            }
            else if(data.status==='false'){
              _this.student_info=[];
            }
          },
          error: function(error) {
             
          }
        });
      }
    },
    components: {
    },
    mounted(){
      var _this=this;
      $.ajax({
        type: 'get',
        url: "/hsc/teacher/getClassInfo",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.class_info=data.result;
            _this.currentClass=_this.class_info[0];
            _this.student_info.length=0;
            var data={class:_this.currentClass};
            $.ajax({
              type: 'post',
              data:data,
              url: "/hsc/teacher/getStudentInfo",
              dataType: 'json',
              timeout: 60000,
              success: function(data) {
                if(data.status==='success'){
                  _this.student_info=data.result;
                }
                else if(data.status==='false'){
                  _this.student_info=[];
                }
              },
              error: function(error) {
                 
              }
            });
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
.input-group{
  padding: 0!important;
  margin: 10px 0;
  float: left;
  width: 25%;
}
</style>
