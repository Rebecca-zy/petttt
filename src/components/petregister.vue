// 注册
<template>  
  <div class="registerbox">
    <!-- 首栏 -->
    <v-top></v-top>
    <!-- 注册 -->
    <img class="longpets" src="../assets/img/longpets.png" alt="">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="head">注册</div>
     <el-form hide-required-asterisk :model="userinform" status-icon :rules="rules"  ref="userinform" class="ff">
      <el-form-item class="el-form-item__content" prop="name" >
        <el-input class="input1" placeholder="请输入用户名" maxlength="10" type="text"     v-model="userinform.name" ></el-input>
      </el-form-item>
      <el-form-item class="el-form-item__content" prop="password">
        <el-input class="input2" placeholder="请输入密码" maxlength="25" type="password" v-model="userinform.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item__content" prop="checkword">
        <el-input class="input3" placeholder="请确认密码" maxlength="25" type="password" v-model="userinform.checkword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item__content" prop="email">
        <el-input class="input4" placeholder="请输入邮箱" maxlength="25" type="email"    v-model="userinform.email" ></el-input>
      </el-form-item>
      <div class="input5"  @click="submitForm('userinform')"  ><div class="sub">提交</div></div>
    </el-form>
  </div>
</template>


<script>
const axios = require('axios');
import vTop from '../components/topselect'
export default {
  name:'petregister',
  components:{
        vTop
    },
  activated:function(){
    this.userinform.name="",
    this.userinform.password="",
    this.userinform.checkword="",
    this.userinform.email=""
    localStorage.setItem("nowpage",6)
  },
  data() {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        //这里加验证用户名唯一性
        callback();
      }, 1000);
    };
    var checkemail = (rule, value, callback) => {
      // var mail=document.getElementById("mail").value;
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        var regex=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(value)) {
          callback(new Error('邮箱格式错误'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userinform.checkword !== '') {
          this.$refs.userinform.validateField('checkword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userinform.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dis:true,
      userinform: {
      //用户信息
      name:"",
      password:"",
      checkword:"",
      email:"",
    },
    rules: {
        // validator校验函数 对应上面的函数
        // trigger: 'blur' 失去焦点 校验是否为空  trigger: 'change'数据改变 校验手动选择框
        name: [
          { validator: checkname, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: checkemail, trigger: 'blur' }
        ],
      }
    };
  },
  methods:{
    Checkname(name){
      axios.get('/user/registercheck',{
            params:{
                yhm:name
            }
        }).then(res => {
              console.log(res)
              return res
        })
        .catch(err => {
            console.log('错误：'+err)
        })
    },
    submitForm(formName) {
      if(this.dis==true){
        this.dis=false
        const  _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('/user/registercheck',{
              params:{
                yhm:_this.userinform.name
              }
            }).then(res => {
              //console.log(res.data)
              if(res.data=="testusername"){
                axios.get('/user/registeryxcheck',{
                  params:{
                    yx:_this.userinform.name
                  }
                }).then(re=>{
                    console.log(re)
                    if(re.data=="testmail"){
                      console.log(re.data)
                      _this.$message({
                          duration: 2000,
                          message: '注册成功',
                      });
                      axios.post('/user/register',{
                        username:_this.userinform.name,
                        password:_this.userinform.password,
                        yx:_this.userinform.email
                      }).then(function(resp){
                            console.log(resp)
                            _this.dis=true
                            localStorage.setItem("nowpage",5)
                            _this.$router.replace('/content')

                          })
                        }
                    else{
                      _this.$message({
                          duration: 2000,
                          message: '该邮箱已注册，请修改！',
                      });
                       this.dis=true
                      return false;
                     
                    }
                  })    
              }
              else{
                _this.$message({
                    duration: 2000,
                    message: '该用户名已存在，请修改！',
                });
                 this.dis=true
                return false;
              }
            })
            .catch(err => {
                console.log('错误：'+err)
            })
          }
          else {
            _this.$message({
                duration: 2000,
                message: '信息错误，注册失败!',
            });
            this.dis=true
            return false;
          }
        });
      }
    },
  }
}
</script>

<style scoped>
.registerbox{
  width: 1440px;
  height: 700px;
}
.longpets{
  margin-top:4px;
}
.head{
  position: absolute;
  top: 241px;
  left: 674px;
  width: 100px;
  height: 43px;
  font-size: 48px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #000000;
}
.line1{
  position: absolute;
  top: 258px;
  left: 83px;
  width: 526px;
  height: 1px;
  background: #B6B6B6;
  border: 3px solid #B6B6B6;
  opacity: 0.25;
}
.line2{
  position: absolute;
  top: 258px;
  left: 831px;
  width: 526px;
  height: 1px;
  background: #B6B6B6;
  border: 3px solid #B6B6B6;
  opacity: 0.25;
}
.ff{
  position: absolute;
  top: 315px;
  left: 473px;
}
/* 覆盖element */
.input1>>>input{
  width: 495px;
  height: 60px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input2>>>input{
  width: 495px;
  height: 60px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input3>>>input{
  width: 495px;
  height: 60px; 
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input4>>>input{
  width: 495px;
  height: 60px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
  font-family:"ZTSJ-BaguetteFont";
  font-size:30px;
  color:  #424141;
}
.input5{
  width: 488px;
  height: 54px;
  border: 3px solid #b9b9b9;
  border-radius: 10px;
} 
.sub{
  padding-top: 0px;
  padding-left: 208px;
  width: 400px;
  height: 32px;
  font-size: 36px;
  font-family: ZTSJ-BaguetteFont;
  font-weight: 400;
  color: #424141;
}
</style>


