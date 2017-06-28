<template>
  <main-layout arrage='true'>
    <div class="container">
			<div style="display: none;"><input type="text" name="t-id"></div>
			<div class="t-form-rows"><span>作业名称</span><input type="text" name="t-theme" placeholder="不能为空" v-model="arrage.course_name"></div>
		    <div class="t-form-rows"><span>所属班级</span><select class="form-control" v-model="arrage.course_class">
              <option v-for="list in classes">{{list}}</option>            
            </select></div>
		    <div class="t-form-rows"><span class="upload">附件</span><input type="file" name="file" class="layui-upload-file"></div>
        <div class="t-form-rows"><span>截止日期</span><input id="end" type="text" name="t-date" placeholder="格式如2017-01-01"></div>
		    <div class="t-form-rows"><span>备注</span><textarea cols="30" rows="8" v-model="arrage.course_content"></textarea></div>
		    <div class="t-form-rows"></div>
 		    <div class="t-form-rows"></div>
        <div class="t-form-rows"></div>
        <div class="t-form-rows"></div>

		    <div class="t-form-btn"><button class="layui-btn layui-btn-normal" id="t-info-update" @click="submit"><i class="glyphicon glyphicon-ok"></i>布置</button>
        <!-- <button class="layui-btn layui-btn-normal" id="btn-cancel">取消</button> --></div>
		</div>
    <dialog-components :message="message" v-if="dialog_show"></dialog-components>
  </main-layout>
  
</template>

<script>
  import MainLayout from 'layouts/Main.vue' 
  //import 'assets/lib/layui.all.js'
  //import 'assets/lib/layui/css/layui.css'
  import Dialog from 'components/Dialog.vue'
  import Cookies from 'assets/lib/cookies.js'
  export default {
    data(){
      return {
        message:'',
        dialog_show:false,
        arrage:{
          course_name:'',
          course_start:'',
          course_end:'',
          course_class:'',
          course_href:'',
          course_content:'',
          teacher_name:'',
          teacher_number:''
        },
        classes:[]
      }
    },
    components: {
      'main-layout':MainLayout,
      'dialog-components':Dialog
      
    },
    mounted(){
      Date.prototype.Format = function(fmt)   
    {  
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    };
      var _this=this;
      $.ajax({
        type: 'get',
        url: "/hsc/teacher/getClassInfo",
        dataType: 'json',
        timeout: 60000,
        success: function(data) {
          if(data.status==='success'){
            _this.classes=data.result;
          }
        },
        error: function(error) {
           
        }
      });
      //初始化上传插件
      
      layui.upload({
        url: '/hsc/teacher/upload',
        type: 'file',
        ext:'docx|doc|pdf|jpg|png|zip|rar|gif|html',
        success: function(res){
          if(res.status==='success'){
            _this.dialogShow("上传成功");
            _this.arrage.course_href=res.filename;
          }
          else{
            _this,dialogShow("上传失败，请稍后重试")
          }
        }

      });
      //初始化日期插件
      var laydate=layui.laydate;
      var end = {
        min: laydate.now()
        ,max: '2099-06-16 23:59:59'
        ,istoday: false
        
      };      
      document.getElementById('end').onclick = function(){
        end.elem = this
        laydate(end);
      }
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
      submit(){
        this.arrage.course_end=$('#end').val();
        if(!this.arrage.course_name){
          this.dialogShow('作业名称不能为空');
        }else if(!this.arrage.course_class){
          this.dialogShow('所属班级不能为空');          
        }else if(!this.arrage.course_end){
          this.dialogShow('截止日期不能为空');          
        }
        else{
          var _this=this;
          this.arrage.teacher_name=Cookies.get('name');
          this.arrage.teacher_number=Cookies.get('number');         
          this.arrage.course_start=new Date().Format("yyyy-MM-dd");
          var data={arrage:this.arrage};
          $.ajax({
            type: 'post',
            data:data,
            url: "/hsc/teacher/arrage",
            dataType: 'json',
            timeout: 60000,
            success: function(data) {
              if(data.status==='success'){
                _this.dialogShow('布置作业成功');
                setTimeout(function(){
                  window.location.href='/teacher';                
                },1500);  
              }
              else if(data.status==='false'){
                _this.dialogShow('布置作业失败，请稍后重试');
              }
            },
            error: function(error) {
               
            }
          });
        }
        
      }
    }
  }
</script>
<style style="less" scoped>
.t-form-rows{
  margin-top: 30px;      
  height: 35px;
  line-height: 35px;
}
.t-form-btn{
  margin: 30px 0 30px 280px;
}
.t-form-btn i{
  margin-right: 10px;
}
.t-form-btn button{
  margin-right: 30px;
}
span{
  width: 200px;
  text-align: right;
  position: relative;
  color: #454545;
  display: inline-block;
  height: 35px;
  line-height: 35px;
}
span.radio{
  width: 18px;
  margin-left: 40px;
}
textarea{
  position: absolute;
  margin-left: 15px;
  border:1px solid #ccc;
  width: 500px;
  padding: 5px 10px;
  font-size: 15px;
}
input[disabled=true]{
  background: rgba(0, 0, 0, 0.2);
}
input{
    padding-left: 8px;
    font-size: 15px;
    border-radius: 3px;
    margin-left: 15px;
    height: 32px;
    display: inline-block;
    border:1px solid #ccc;
  }
input[name=t-theme]{
  width: 300px;
}
input[name=t-age]{
    width: 100px;
}
input[name=t-position]{
    width: 300px;        
}
input[name=t-address]{
    width: 400px;
}
span.upload{
  margin-right: 15px;
}
.input-group{
  padding: 0!important;
  margin: 10px 0;
  float: left;
  width: 25%;
}
.form-control{
  display: inline-block;
  width: 200px;
  margin-left: 15px;
  border: 1px solid #ccc;
}
.layui-upload-button{
  border: 1px solid #ccc;
  margin-left: 15px;
}
</style>
 