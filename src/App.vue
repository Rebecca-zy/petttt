<template>
  <div id="app">
    <v-top></v-top>
    <!--  <keep-alive> 帮助获取路由跳转监听 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vTop from '@/components/topselect'
export default {
  components:{
        vTop
    },
  name: "App",
  mounted() {
    // // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // window.onbeforeunload = function (e) {
    //     var storage = window.localStorage;
    //     storage.clear()
    // }
  }
};
</script>

<style>
.el-table--border th.gutter:last-of-type {
  display: block !important;
  width: 17px !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
