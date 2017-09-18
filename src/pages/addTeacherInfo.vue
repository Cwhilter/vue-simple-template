<template>
  <div class="container">
    <div style="display: none;">
      <input type="text" name="t-id">
    </div>
    <div class="t-form-rows">
      <span>教师编号</span>
      <input type="text" name="t-theme" placeholder="不能为空" v-model="teacher.number">
    </div>
    <div class="t-form-rows">
      <span>教师名称</span>
      <input type="text" name="t-theme" placeholder="不能为空" v-model="teacher.name">
    </div>
    <div class="t-form-rows">
      <span>年龄</span>
      <input type="text" name="t-theme" placeholder="不能为空" v-model="teacher.age">
    </div>
    <div class="t-form-rows">
      <span class="upload">性别</span>
      <label class="checkbox-inline checkbox-radio">
        <input type="radio" name="optionsRadiosinline" value="男" v-model="teacher.sex">男
      </label>
      <label class="checkbox-inline">
        <input type="radio" name="optionsRadiosinline" value="女" v-model="teacher.sex">女
      </label>
    </div>
    <div class="t-form-rows">
      <span>教师职称</span>
      <input type="text" name="t-theme" placeholder="不能为空" v-model="teacher.position">
    </div>
    <div class="t-form-rows">
      <span>所带班级</span>
      <label class="checkbox-inline" v-for="list in classes">
        <input type="checkbox" :value="list" v-model="checkedClass">{{list}}
      </label>
  
    </div>
  
    <div class="t-form-rows">
      <span>联系电话</span>
      <input id="end" type="text" name="t-date" v-model="teacher.phone_number">
    </div>
    <div class="t-form-rows">
      <span>密码</span>
      <input id="end" type="password" name="t-date" v-model="teacher.password">
    </div>
    <div class="t-form-btn">
      <button class="btn btn-primary" id="t-info-update" @click="submit">
        <i class="glyphicon glyphicon-ok"></i>添加</button>
      <!-- <button class="layui-btn layui-btn-normal" id="btn-cancel">取消</button> -->
    </div>
  
    <dialog-components :message="message" v-if="dialog_show"></dialog-components>
  </div>
</template>

<script>
import Dialog from 'components/Dialog.vue'
import Cookies from 'assets/lib/cookies.js'
export default {
  data() {
    return {
      message: '',
      dialog_show: false,
      teacher: {
        name: '',
        number: '',
        age: '',
        sex: '',
        position: '',
        phone_number: '',
        classes: '',
        password: ''
      },
      classes: [],
      checkedClass: []
    }
  },
  components: {
    'dialog-components': Dialog

  },
  mounted() {
    var _this = this;
    $.ajax({
      type: 'get',
      url: "/hsc/admin/getClassInfo",
      dataType: 'json',
      timeout: 60000,
      success: function (data) {
        if (data.status === 'success') {
          _this.classes = data.result;
        }
      },
      error: function (error) {

      }
    });
  },
  methods: {
    dialogShow(msg) {
      this.dialog_show = true;
      this.message = msg;
      var _this = this;
      setTimeout(function () {
        _this.dialog_show = false;
      }, 1500)
    },
    submit() {
      this.teacher.classes = this.checkedClass.join(',');
      for (var item in this.teacher) {
        if (!this.teacher[item]) {
          this.dialogShow('信息未填写完全');
        }
      }
      var _this = this;
      var data = { teacher: this.teacher };
      $.ajax({
        type: 'post',
        data: data,
        url: "/hsc/admin/addTeacherInfo",
        dataType: 'json',
        timeout: 60000,
        success: function (data) {
          if (data.status === 'success') {
            _this.dialogShow('添加成功');
            setTimeout(function () {
              window.location.href = '/admin/teacherInfo';
            }, 1500);
          }
          else if (data.status === 'false') {
            _this.dialogShow('添加失败，请稍后重试');
          }
        },
        error: function (error) {

        }
      });

    }
  }
}
</script>
<style style="less" scoped>
.t-form-rows {
  margin-top: 30px;
  height: 35px;
  line-height: 35px;
}

.t-form-btn {
  margin: 30px 0 30px 350px;
}

.t-form-btn i {
  margin-right: 10px;
}

.t-form-btn button {
  margin-right: 30px;
}

span {
  width: 300px;
  text-align: right;
  position: relative;
  color: #454545;
  display: inline-block;
  height: 35px;
  line-height: 35px;
}

span.radio {
  width: 18px;
  margin-left: 40px;
}

textarea {
  position: absolute;
  margin-left: 15px;
  border: 1px solid #ccc;
  width: 500px;
  padding: 5px 10px;
  font-size: 15px;
}

input[disabled=true] {
  background: rgba(0, 0, 0, 0.2);
}

input {
  padding-left: 8px;
  font-size: 15px;
  border-radius: 3px;
  margin-left: 15px;
  height: 32px;
  display: inline-block;
  border: 1px solid #ccc;
}

input[name=t-theme] {
  width: 200px;
}

input[name=t-age] {
  width: 100px;
}

input[name=t-position] {
  width: 300px;
}

input[name=t-address] {
  width: 400px;
}

input[type=checkbox] {
  vertical-align: top;
  margin: 1px 0 0 -20px;
}

input[type=radio] {
  display: inline-block;
  vertical-align: middle;
  margin: 0px 5px 0 0;
  height: 20px;
}

span.upload {
  margin-right: 15px;
}

.input-group {
  padding: 0!important;
  margin: 10px 0;
  float: left;
  width: 25%;
}

.form-control {
  display: inline-block;
  width: 200px;
  margin-left: 15px;
  border: 1px solid #ccc;
}

.layui-upload-button {
  border: 1px solid #ccc;
  margin-left: 15px;
}

.checkbox-inline {
  margin-left: 12px;
}

.checkbox-radio {
  vertical-align: bottom;
  padding-left: 0;
}
</style>
 