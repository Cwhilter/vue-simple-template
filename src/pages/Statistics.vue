<template>
  <main-layout statistics='true'>
	<div class="container">
	<div>
		<div class="input-group">
	      <span class="input-group-addon">作业</span>
	      <select class="form-control" v-model="currentCourse">
	        <option v-for="list in course_info">{{list}}</option>		        
	      </select>
	    </div>
      	<button class="btn btn-primary" @click="choose">查看</button>
	</div>
	  
      
	</div>
  	<div id="chart"></div>
  </main-layout>
</template>

<script>
  import MainLayout from 'layouts/Main.vue'
  import echarts from 'assets/lib/echarts.min.js';

  export default {
    data(){
      return{
        course_info:[],
        currentCourse:'',
        chartTaskNum:{},
        option:{}
      } 
    },
    methods:{
      choose(){
        var _this=this;
        var data={course:this.currentCourse};
        $.ajax({
          type: 'post',
          data:data,
          url: "/hsc/teacher/getStatistics",
          dataType: 'json',
          timeout: 60000,
          success: function(data) {
            if(data.status==='success'){
                var chartTaskNum = echarts.init(document.getElementById('chart'));
				var option = {
				    title : {
				        text: '作业提交信息统计表',
				        subtext: '',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['未提交','优秀(>=80分)','良好(>=70分)','及格','不及格']
				    },
				    series : 
				        {
				            name: '人数',
				            type: 'pie',
				            radius : '75%',
				            center: ['50%', '60%'],
				            data:[
				               
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    
				};
				option.series.data=data.result;
				chartTaskNum.setOption(option);
            }
            else if(data.status==='false'){
              
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
        url: "/hsc/teacher/getHomeworkName",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.course_info=data.result;
            _this.currentCourse=_this.course_info[0];
            var data={course:_this.currentCourse};
            $.ajax({
              type: 'post',
              data:data,
              url: "/hsc/teacher/getStatistics",
              dataType: 'json',
              timeout: 60000,
              success: function(data) {
                if(data.status==='success'){
                	var chartTaskNum = echarts.init(document.getElementById('chart'));
					var option = {
					    title : {
					        text: '作业提交信息统计表',
					        subtext: '',
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c} ({d}%)"
					    },
					    legend: {
					        orient: 'vertical',
					        left: 'left',
					        data: ['未提交','优秀(>=80分)','良好(>=70分)','及格','不及格']
					    },
					    series : 
					        {
					            name: '人数',
					            type: 'pie',
					            radius : '75%',
					            center: ['50%', '60%'],
					            data:[
					               
					            ],
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    
					};
					option.series.data=data.result;
					chartTaskNum.setOption(option);

                }
                else if(data.status==='false'){
                  
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
  width: 30%;
}
#chart {
	width: 600px;
	height: 400px;
	margin:20px auto 0;
	}
</style>
