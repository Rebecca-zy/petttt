//main.js css home
//  头部选择栏组件
<template>
    <div class="tab">
      <img :src="topUrl" class="toplogo">
      <p @click="top_goto('home',1)"  class="webitem15">首页</p>
      <p @click="top_goto('pethome',2)" class="webitem15">流浪之家💕</p>
      <p @click="top_goto('knowledgecard',3)" class="webitem15">宠物识别🔍</p>
      <p @click="top_goto('hospital',4)" class="webitem15">医疗资源💊</p>
      <img :src="imgUrl" class="img">
      <p class="webitem3">扫码小程序</p>
      <!-- <div class="sousuo"> -->
        <input type="text" class="webitem4" ref="topsearchval" id="topinput"></input>
        <div class="webitem5" @click="top_gotosearch">
          <p  class="text1">搜索</p>
        </div>
      <!-- </div> -->
      <img :src="userimg" @click="top_gotouser()" class="userimg" >
      <p v-if="islogin==0" class="webitem6" @click="top_goto('content',5)">登陆</p>
      <p  v-if="islogin==0" class="webitem7" @click="top_goto('petregister',6)">注册</p>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
const axios=require('axios');
export default {
  name:'v-top',
  data() {
    return {
      topUrl:require("@/assets/img/toplogo.png"),
      imgUrl:require("@/assets/img/img1.png"),
      userimg:require("@/assets/img/userimg.png"),
      islogin:0,
      nowpage:0,
    }
  },
  activated:function(){
    if(localStorage.getItem("yhm")){
      this.islogin=1
      axios.get('http://localhost:8000/user/getUserByNamelog/'+JSON.parse(localStorage.getItem('yhm')))
        .then(res=>{
          console.log("头像："+res.data)
          this.userimg=res.data.tx
        }).catch(err => {
          console.log('错误！！！！：'+err)
      })
    }
  },
  methods: {
    top_gotouser(){
      if(localStorage.getItem('yhid')){
        this.$router.push('/userhistory');
      }
      else{
        this.$router.push('/content');
      }
    },
    top_goto(e,t){
      this.nowpage=t
      this.$router.push('/'+e);
    },
    top_gotosearch(){
      var e=document.getElementById("topinput");
      console.log(e.value);
      this.$router.push({
        name: 'Search',
        path:"/search",
        params: {
          topsearch: e.value,
        }
            })
      this.$refs.topsearchval.value="";

    },
  }
}
</script>

<style scope>
.tab{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-shrink: 0;
  margin-top: 5px;
  background-color: white;
  width: 1440px;
  font-family: ZTSJ-BaguetteFont;
  font-size: 23px;
  font-weight: 400;
  color: #030303;
}
.toplogo{
  margin-top: 15px;
  height: 38px;
}

.webitem1{
  height: 23px;
  /* color: #030303; */
  margin-top: 1.75%;

}
.webitem15{
  
  margin-top:1.75%;
  height: 22px;
  /* color: #000000; */

}
.webitem2{
  margin-top:2%;
  height: 22px;
  /* color: #000000; */

}
.img{
  margin-top: 19px;
  margin-bottom: 13px;
  flex: 0 0 35px;
  height: 45px;
}
.webitem3{
  margin-top: 2%;
  height: 23px;
  /* color: #000000; */
}
.text1{
  height: 23px;
  /* color: #2E3232; */
  margin-top: 15%;
}
.webitem4{
  margin-top: 1.5%;
  height: 41px;
  background: #B6B6B6;
  opacity: 0.1;
  box-sizing: border-box;
}
.webitem5{
  height: 41px;
  background: #F5EEEE;
  margin-top: 1.5%;
}
.userimg{
  height: 75px;
  border-radius: 50%;
}
.webitem6{
  /* color: #030303; */
  margin-top: 2%;
}
.webitem7{
  color: #030303;
  margin-top: 2%;
}

</style>

