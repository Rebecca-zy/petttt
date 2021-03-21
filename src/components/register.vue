<template>
  <el-upload style="margin-left:50%;transform:translateX(-74px)"
    action="#"
    :http-request="uploadImg"
    :limit='1'
    list-type="picture-card"
    :on-change="changeHandel"
    :auto-upload="true">
      <span id="text">点击上传封面</span>
    </el-upload>
</template>

<script>
import vue from 'vue'
import { Upload } from 'element-ui'
vue.use(Upload)
export default {
  name: "register",
  data () {
    return {
      // 修改作品信息弹窗显示与否
      dialogVisible: false,
      // 图片文件
      imgFile: '',
      // 图片文件名称
      fileName: '',
      // 上传成功后的地址
      imgURL: '',
    }
  },
  methods:{
    // 获取封面对象
    changeHandle (file, fileList) {
      console.log(file)
      this.imgFile = file
      this.fileName = file.name
      // 上传之后将上传封面隐藏，避免频繁操作
      const upload = document.getElementById('text')
      const parent = upload.parentNode
      parent.style.display = 'none'
    },
    //请忽略我傻逼式的DOM操作
    // 封面上传
   async uploadImg () {
      // 创建COS实例  获取签名
      //这里写你们后端提供的请求接口即可
      const res = await this.$axios.get('/xxxxxxxx/xxxxxxxx')
      // console.log(JSON.parse(res.data.data))
      //这里是因为我们后端返回的是一组JSON字符串，所以进行了一次转化，如果你们直接返回的就是json对象，直接忽略即可
      const data = JSON.parse(res.data.data)
      const cos = new COS({
        // 必选参数
        getAuthorization: (options, callback) => {
          const obj = {
            TmpSecretId: data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials.tmpSecretKey,
            XCosSecurityToken: data.credentials.sessionToken,
            StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
          }
          callback(obj)
        }
      })
      // 上传图片  其中Bucket 和 Region找你们负责人拿
      //key 在前面加上路径写法可以生成文件夹
      cos.putObject({
        Bucket: 'sike-123456789', /* 必须 */
        Region: 'ap-chongqing', /* 存储桶所在地域，必须字段 */
        Key: '/img/' + new Date().getTime() + this.fileName, /* 必须 */
        StorageClass: 'STANDARD',
        Body: this.imgFile.raw, // 上传文件对象
        onProgress: progressData => {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // 将上传后的封面进行路径拼接保存到本地
        console.log(err || data)
        const url = 'https://' + data.Location
        // console.log(url)
        this.imgURL = url
      })
    },
  }
}
</script>

<style scoped>

</style>