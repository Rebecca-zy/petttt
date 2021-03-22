// 首页
<template>
    <div class="homebox">
        <!-- 首栏 -->
        <v-top></v-top>
        <!-- 插画 -->
        <img class="longpets" :src="longpets" >
        <!-- logo栏 -->
        <div class="homelogos">
            <!-- 分栏 -->
            <img @click="home_goto('pethome',2)" class="homelogo1" :src="logo1" >
            <el-popover  class="homelogo23" 
                placement="bottom"
                min-width="150"
                trigger="click">
                <img :src="wxUrl" class="wximg">
                <span slot="reference">
                    <img :src="logo2">
                </span>
            </el-popover> 
            <img @click="home_goto('hospital',4)" class="homelogo23" :src="logo3">
            <!-- 分区 -->
            <div class="homelans">
                <img @click="home_gotosearch('1')" class="homelan1" :src="lan1"> <!-- 萌宠日常 -->
                <img @click="home_gotosearch('2')" class="homelan2" :src="lan2"> <!-- 学习训练 -->
            </div>
            <div class="homelans">
                <img @click="home_gotosearch('3')" class="homelan3" :src="lan3"> <!-- 喂养贴士 -->
                <img @click="home_gotosearch('4')" class="homelan4" :src="lan4"> <!-- DIY课堂 -->
            </div>
            <!-- 分类 -->
            <div class="homefenqus">
                <div class="homefenqus1">
                    <div  v-for="lan in lans1" :key="lan.key">
                        <span @click="home_gotosearch(lan)">{{lan}}</span>
                    </div>
                </div>
                <div class="homefenqus2">
                    <div style="margin-right:22px" v-for="lan in lans2" :key="lan.key">
                        <span @click="home_gotosearch(lan)">{{lan}}</span>
                    </div>
                    <span style="margin-right:22px" @click="home_goto('search')">更多</span>
                </div>
            </div>
            <img @click="home_goto('medicalcard')" class="book" :src="book">
        </div>
        <div class="homebuttom">
            <div class="homeleft">
                <!-- 轮播 --> 
                <div class="homepicsbox">
                    <el-carousel :interval="4000" type="card" arrow="hover" height="250px" autoplay="autoplay" ref="carousel">
                    <el-carousel-item class="carousel-item" v-for="lunbo in lunbolist" :key="lunbo">
                        <img  class="carousel-img"  :src="lunbo">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 推荐 -->
                <div class="hometuijianbox">
                    <div  class="tuijiantitlebox">
                        <img class="title1" :src="title1">
                        <img @click="change()" class="title15" :src="title15">
                    </div>
                    <div  v-for="(tuijian,index) in tuijianlist_pic"  :key="tuijian.key" >
                        <div  class="tuijianitembox_pic">
                            <img @click="home_gotolog(tuijian.jlid)" class="tuijianpic" :src="tuijian.url">
                            <div class="tuijianright">
                                <div @click="home_gotolog(tuijian.jlid)" class="tuijiantextbox">
                                    <div class='tuijiantext'>{{tuijian.txt}}</div>
                                </div>
                                <div class="tuijianinfobox">
                                    <img @click="home_gotouser(tuijian.username,tuijian.userid,tuijian.url)" class="tuijianuserurl" :src="tuijian.userurl">
                                    <div @click="home_gotouser(tuijian.username,tuijian.userid,tuijian.url)" class="tuijianinfotxt1">{{tuijian.username}}</div>
                                    <div class="tuijianinfotxt2">{{tuijian.datatim}}</div>
                                </div>
                                <div class="rightbottombox">
                                    <img @click="starplus(index)" class="tuijianstar" :src="star">
                                    <div>{{tuijian.star}} {{tuijian.starnum}}</div>
                                    <img @click="loveplus(index)" class="tuijianlove" :src="love">
                                    <div>{{tuijian.love}}  {{tuijian.lovenum}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tuijianline"></div>
                    </div>
                    <div  v-for="tuijian2 in tuijianlist_video"  :key="tuijian2.key" >
                        <div  class="tuijianitembox_video">
                            <div @click="home_gotolog(tuijian2.jlid,tuijian2.userid)" class="tuijianvideo">
                                <video-player class="video-player vjs-custom-skin"
                                    muted
                                    ref="videoPlayer"
                                    :playsinline="true"
                                    :options="playerOptions">
                                </video-player>
                            </div>
                            <div class="tuijianright2">
                                <div @click="home_gotolog(tuijian2.jlid,tuijian2.userid)" class="tuijiantextbox2">
                                    <div class='tuijiantext2'>{{tuijian2.txt}}</div>
                                </div>
                                <div class="tuijianinfobox2">
                                    <img @click="home_gotouser(tuijian2.username,tuijian2.userid,tuijian2.url)"  class="tuijianuserurl" :src="tuijian2.userurl">
                                    <div @click="home_gotouser(tuijian2.username,tuijian2.userid,tuijian2.url)"  class="tuijianinfotxt1">{{tuijian2.username}}</div>
                                    <div class="tuijianinfotxt2">{{tuijian2.datatim}}</div>
                                </div>
                                <div class="rightbottombox2">
                                    <img @click="starplus2()" class="tuijianstar" :src="star">
                                    <div>{{tuijian2.star}} {{tuijian2.starnum}}</div>
                                    <img @click="loveplus2()" class="tuijianlove" :src="love">
                                    <div>{{tuijian2.love}}  {{tuijian2.lovenum}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 热榜 -->
            <div class="homerebangbox">
                <img class="title2" :src="title2">
                <div class="hotbox">
                    <div @click="home_gotolog(hot.hotid)" v-for="(hot,index) in hotlist" :key="hot.key" class="hotitem">
                        <span class="hotid">{{index+1}}</span>
                        <img  class="hotpic" :src="hot.hotpic">
                        <div class="hottextbox">
                            <div class='hottext'>{{hot.hottext}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import vTop from '../components/topselect'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
const axios = require('axios');
export default {
    components:{
        vTop,
        videoPlayer,
        swiper,
        swiperSlide
    },
    data(){
        
        return{
            
            wxUrl:require("@/assets/img/wxurl.jpg"),
            longpets:require("@/assets/img/longpets.png"),
            logo1:require("@/assets/img/home_logo_liulang.png"),
            logo2:require("@/assets/img/home_logo_kepu.png"),
            logo3:require("@/assets/img/home_logo_hospital.png"),
            lan1:require("@/assets/img/home_lan_richang.png"),
            lan2:require("@/assets/img/home_lan_xunlian.png"),
            lan3:require("@/assets/img/home_lan_tieshi.png"),
            lan4:require("@/assets/img/home_lan_diy.png"),
            book:require("@/assets/img/home_title_book.png"),
            title2:require("@/assets/img/home_title_hot.png"),
            title1:require("@/assets/img/home_title_tuijian.png"),
            title15:require("@/assets/img/home_title_huan.png"),
            star:require("@/assets/img/star.png"),
            love:require("@/assets/img/love.png"),
            lans1:["猫咪","狗狗","乌龟","仓鼠","兔子"],
            lans2:["鸟类"],
            lunbolist:[
                require("@/assets/img/swiper1.jpg"),
                require("@/assets/img/swiper2.jpg"),
                require("@/assets/img/swiper3.jpg"),
            ],
            hotlist:[
                {
                    hotid:0,
                    hottext:"",
                    hotpic:""
                },
                {
                    hotid:1,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:2,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:3,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:4,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:5,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:6,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:7,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:8,
                    hotpic:"",
                    hottext:""
                },
                {
                    hotid:9,
                    hottext:"",
                    hotpic:"",
                },                
            ],
            tuijianlist_pic:[
                {
                    jlid:1,
                    userid:8,
                    url:'',
                    txt:'',
                    userurl:'',
                    username:'',
                    datatim:'',
                    starnum:0,
                    lovenum:0,
                    star:"",
                    love:"",
                },
                {
                    jlid:2,
                    userid:8,
                    url:'',
                    txt:'',
                    userurl:'',
                    username:'',
                    datatim:'',
                    starnum:0,
                    lovenum:0,
                    star:"",
                    love:"",
                },
                {
                    jlid:1,
                    userid:8,
                    url:'',
                    txt:'',
                    userurl:'',
                    username:'',
                    datatim:'',
                    starnum:0,
                    lovenum:0,
                    star:"",
                    love:"",
                }
            ],
            tuijianlist_video:[
                {
                    jlid:0,
                    userid:0,
                    txt:'',
                    userurl:'',
                    username:'',
                    datatim:'',
                    starnum:0,
                    lovenum:0,
                    star:"",
                    love:"",
                },
            ] ,
            playerOptions: {
                playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
                autoplay : 'muted', //如果true,浏览器准备好时开始回放。
                //muted : true, // 默认情况下将会消除任何音频。
                loop : true, // 视频一结束就重新开始。
                preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language : 'zh-CN',
                aspectRatio : '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid : false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4", // 类型
                    src: '' //url地址
                }],
                poster: '', // 封面地址
                notSupportedMessage : '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar : {
                    timeDivider : true,//当前时间和持续时间的分隔符
                    durationDisplay : true,//显示持续时间
                    remainingTimeDisplay : false,//是否显示剩余时间功能
                    fullscreenToggle : true  //全屏按钮
                }
            }, 
            a:[],
        }
    },
    activated:function(){
        this.gethot()
        this.change() 
        // this.getallpet()
        localStorage.setItem("nowpage",1)
    },
    methods:{
        // getallpet(){
        //     const _this=this
        //     axios.post('/allpet')
        //     .then(res => { 
        //         console.log(res.data)  
        //         console.log(res.data.length)
        //         if(res.data.length<=6){
        //             var j=0
        //             var i
        //             for(i=1;i<res.data.length;i++){
        //                 _this.lans1[j]=res.data[i]
        //                 j++; 
        //             }
        //         } 
        //         else{
        //             var j=0
        //             var i
        //             for(i=1;i<res.data.length;i++){
        //                 _this.lans1[j]=res.data[i]
        //                 j++
        //             }
        //             j=0
        //             for(i=7;i<res.data.length;i++){
        //                 _this.lans2[j]=res.data[i]
        //                 j++
        //             }
        //         }       
        //     }).catch(err => {
        //         console.log('错误！！！！：'+err)
        //     })
        // },
        change(){
            this.gettuijianvd();
            this.gettuijianpt();
            console.log(this.tuijianlist_pic)
            console.log(this.tuijianlist_video[0])
        },
        writelocal(temp){
            if(!window.localStorage){
                return false;
            }else{
                var localstorage=window.localStorage;
                var arra=[];
                for(var i=0;i<10;i++){
                    arra[i]=temp[i].jlid
                }
                localStorage.setItem('key',JSON.stringify(arra));
                var read=JSON.parse(localStorage.getItem('key'));
                //console.log(read,read.length);
            }
        },
        writelocal2(temp){
            if(!window.localStorage){
                return false;
            }else{
                var localstorage=window.localStorage;
                localstorage.setItem("nowhotid",temp);
            }
        }, 
        gethot(){
            localStorage.setItem("nowpage",0)
            let _this=this
            axios.get('/gethotshare',{        
            }).then(async res => {
                //console.log(res.data)
                _this.writelocal(res.data)
                var i=0
                while(i<10){
                    _this.hotlist[i].hotid=res.data[i].jlid
                    _this.hotlist[i].hottext=res.data[i].wz  
                    var read=JSON.parse(localStorage.getItem('key'));
                    _this.writelocal2(i)
                    await axios.get('/ishavephoto',{
                        params:{
                            jlid:read[localStorage.getItem('nowhotid')]
                        }
                    }).then(async re => { //照片
                        // console.log(read)
                        //console.log(re.data)
                        // console.log(read[1])
                        if(re.data=="you"){
                            await axios.get('/getPhotoByjlid',{
                                params:{
                                    jlid:read[localStorage.getItem('nowhotid')]
                                }
                            }).then((r) => {
                                //console.log(r.data)
                                _this.hotlist[localStorage.getItem('nowhotid')].hotpic=r.data[0].zp
                                i++
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                        else{//视频
                            await axios.get('/getVideoByjlid',{
                                params:{
                                    jlid:read[localStorage.getItem('nowhotid')]
                                }
                            }).then(r => {
                                //console.log(r.data)
                                _this.hotlist[localStorage.getItem('nowhotid')].hotpic=r.data.fm
                                i++
                            }).catch(err => {
                                console.log('错误！！！！：'+err)
                            })
                        }               
                    }).catch(err => {
                        console.log('错：'+err)
                    })    
                }
            }).catch(err => {
                console.log(err)
            })
            console.log(this.hotlist)
        },
        async gettuijianvd(){
            const _this = this
            await axios.get('/getrandomvdid',{                     
            }). then(async r => {
                _this.tuijianlist_video[0].jlid=r.data
                await _this.getvdJlData(r.data);
            }).catch(err => {
                console.log('错误！！！！：'+err)
            })
        },
        async gettuijianpt(){
            const _this = this
            await axios.get('/getRandomptid',{                     
            }). then( r => {
                var i=0
                while(i<3){
                    _this.tuijianlist_pic[i].jlid=r.data[i]
                    _this.getptJlData(r.data[i],i);
                    i++
                }
            }).catch(err => {
                console.log('错误！！！！：'+err)
            })
        },
        getptJlData(e,i) {
            
            const _this = this
            axios.get('/getShareByjlid',{
                params:{
                    jlid:e
                }
                }).then(async res => {
                    _this.tuijianlist_pic[i].username=res.data.yhm
                    _this.tuijianlist_pic[i].datatim=res.data.fbsj
                    _this.tuijianlist_pic[i].txt=res.data.wz
                    _this.tuijianlist_pic[i].userid=res.data.yhid
                    await axios.get('/getPhotoByjlid',{
                    params:{
                        jlid:e
                    }
                    }).then(re => {
                        _this.tuijianlist_pic[i].url=re.data[0].zp
                        axios.post('/likecount?jlid='+e)
                        .then(r=>{
                             _this.tuijianlist_pic[i].lovenum=r.data;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        axios.post('/starcount?jlid='+e)
                        .then(r=>{
                            _this.tuijianlist_pic[i].starnum=r.data;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        axios.get('/user/getUserByNamelog/'+ _this.tuijianlist_pic[i].username)
                        .then(r=>{
                             _this.tuijianlist_pic[i].userurl=r.data.tx;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        // 喜欢初始化
                        if(localStorage.getItem("yhid")){
                            console.log(e,i)
                            const _this=this
                            axios.get('/islike',{//查成功
                                params:{
                                    yhid:_this.tuijianlist_pic[i].userid,
                                    jlid:e
                                }
                            }).then(r => {
                                // console.log(res.data)
                                if(r.data=="wu"){
                                    _this.tuijianlist_pic[i].love="喜欢"
                                } 
                                else if(r.data=="1"){
                                    _this.tuijianlist_pic[i].love="喜欢"
                                }
                                else{
                                    _this.tuijianlist_pic[i].love="已喜欢"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                            _this.tuijianlist_pic[i].love="喜欢"
                        }
                        // 收藏初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('/isstar',{//查成功
                                params:{
                                    yhid:_this.tuijianlist_pic[i].userid,
                                    jlid:e
                                }
                            }).then(r => {
                                // console.log(res.data)
                                if(r.data=="wu"){
                                    _this.tuijianlist_pic[i].star="收藏"
                                } 
                                else if(r.data=="1"){
                                    _this.tuijianlist_pic[i].star="收藏"
                                }
                                else{
                                   _this.tuijianlist_pic[i].star="已收藏"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                           _this.tuijianlist_pic[i].star="收藏"
                        }
                    }).catch(err => {
                        console.log('错误！！！！：'+err)
                    })
                }).catch(err => {
                    console.log('错误111：'+err)
                })
            // console.log("看这里！！！！！：")
            // console.log(this.tuijianlist_pic)
        }, 
        getvdJlData(e) {
            const _this = this
            axios.get('/getShareByjlid',{
                params:{
                    jlid:e
                }
                }).then(res => {
                    _this.tuijianlist_video[0].username=res.data.yhm
                    _this.tuijianlist_video[0].datatim=res.data.fbsj
                    _this.tuijianlist_video[0].txt=res.data.wz
                    _this.tuijianlist_video[0].userid=res.data.yhid
                    axios.get('/getVideoByjlid',{
                    params:{
                        jlid:e
                    }
                    }).then(res => {
                        // console.log(res.data)
                        _this.ph=res.data
                        _this.playerOptions.sources[0].src=res.data.sp
                        _this.playerOptions.poster=res.data.fm
                        // console.log(_this.playerOptions.sources.src)
                        axios.post('/likecount?jlid='+e)
                        .then(res=>{
                             _this.tuijianlist_video[0].lovenum=res.data;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        axios.post('/starcount?jlid='+e)
                        .then(res=>{
                            _this.tuijianlist_video[0].starnum=res.data;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        axios.get('/user/getUserByNamelog/'+ _this.tuijianlist_video[0].username)
                        .then(res=>{
                             _this.tuijianlist_video[0].userurl=res.data.tx;
                        }).catch(err => {
                            console.log('错误！！！！：'+err)
                        })
                        // 喜欢初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('/islike',{//查成功
                                params:{
                                    yhid:_this.tuijianlist_video[0].userid,
                                    jlid:e
                                }
                            }).then(res => {
                                // console.log(res.data)
                                if(res.data=="wu"){
                                    _this.tuijianlist_video[0].love="喜欢"
                                } 
                                else if(res.data=="1"){
                                    _this.tuijianlist_video[0].islove="喜欢"
                                }
                                else{
                                    _this.tuijianlist_video[0].islove="已喜欢"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                            _this.tuijianlist_video[0].love="喜欢"
                        }
                        // 收藏初始化
                        if(localStorage.getItem("yhid")){
                            const _this=this
                            axios.get('/isstar',{//查成功
                                params:{
                                    yhid:_this.tuijianlist_video[0].userid,
                                    jlid:e
                                }
                            }).then(res => {
                                // console.log(res.data)
                                if(res.data=="wu"){
                                    _this.tuijianlist_video[0].star="收藏"
                                } 
                                else if(res.data=="1"){
                                    _this.tuijianlist_video[0].star="收藏"
                                }
                                else{
                                   _this.tuijianlist_video[0].star="已收藏"
                                }
                            }).catch(err => {
                            console.log('错误！！！！：'+err)
                            })
                        }
                        else{
                           _this.tuijianlist_video[0].star="收藏"
                        }
                    }).catch(err => {
                        console.log('错误！！！！：'+err)
                    })
                }).catch(err => {
                    console.log('错误111：'+err)
                })
            // console.log("看这里！！！！！：")
            // console.log(this.tuijianlist_video[0])
        }, 
        loveplus(e) {
            // console.log(e)
            const _this=this
            if(localStorage.getItem("yhid")){
                axios.get('/islike', {
                params:{
                    yhid:localStorage.getItem("yhid"),
                    jlid:_this.tuijianlist_pic[e].jlid
                }
                }).then(res => {
                // console.log(res.data)
                if(res.data=="wu"){
                    axios.get('/addlike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_pic[e].jlid
                    }
                    }).then(res => {
                        // console.log(res.data)
                        if(res.data=="success"){
                            _this.tuijianlist_pic[e].love="已喜欢"
                            _this.tuijianlist_pic[e].lovenum++
                        }
                    }).catch(err => {
                        console.log('首关注环节错误：'+err)//
                        })
                }
                else if(res.data=="1"){
                    axios.get('/uplike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_pic[e].jlid,
                        sc:0
                    }
                    }).then(res => {
                        // console.log(res.data)
                        if(res.data=="success"){
                            _this.tuijianlist_pic[e].love="已喜欢"
                            _this.tuijianlist_pic[e].lovenum++
                        }
                    }).catch(err => {
                        console.log('再关注环节错误：'+err)//
                        })
                }
                else{
                    axios.get('/uplike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_pic[e].jlid,
                        sc:1
                    }
                    }).then(res => {
                    // console.log(res.data)
                    if(res.data=="success"){
                        _this.tuijianlist_pic[e].love="喜欢"
                        _this.tuijianlist_pic[e].lovenum--
                    }
                    }).catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
                }).catch(err => {
                    console.log('查错误：'+err)
                })
            }
            else{
                this.$router.push({
                name: 'content',
                })
            }
        },
        loveplus2() {
            const _this=this
            if(localStorage.getItem("yhid")){
                axios.get('/islike', {
                params:{
                    yhid:localStorage.getItem("yhid"),
                    jlid:_this.tuijianlist_video[0].jlid
                }
                }).then(res => {
                // console.log(res.data)
                if(res.data=="wu"){
                    axios.get('/addlike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_video[0].jlid
                    }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            _this.tuijianlist_video[0].love="已喜欢"
                            _this.tuijianlist_video[0].lovenum++
                        }
                    }).catch(err => {
                        console.log('首关注环节错误：'+err)//
                        })
                }
                else if(res.data=="1"){
                    axios.get('/uplike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_video[0].jlid,
                        sc:0
                    }
                    }).then(res => {
                        console.log(res.data)
                        if(res.data=="success"){
                            _this.tuijianlist_video[0].love="已喜欢"
                            _this.tuijianlist_video[0].lovenum++
                        }
                    }).catch(err => {
                        console.log('再关注环节错误：'+err)//
                        })
                }
                else{
                    axios.get('/uplike',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_video[0].jlid,
                        sc:1
                    }
                    }).then(res => {
                    // console.log(res.data)
                    if(res.data=="success"){
                        _this.tuijianlist_video[0].love="喜欢"
                        _this.tuijianlist_video[0].lovenum--
                    }
                    }).catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
                }).catch(err => {
                    console.log('查错误：'+err)
                })
            }
            else{
                this.$router.push({
                name: 'content',
                })
            }
        },
        starplus(e) {
            const _this= this
            if(localStorage.getItem("yhid")){
                axios.get('/isstar', {
                params:{
                    yhid:localStorage.getItem("yhid"),
                    jlid:_this.tuijianlist_pic[e].jlid
                }
                }).then(res => {
                // console.log(res.data)
                if(res.data=="wu"){
                        axios.get('/addstar',{
                        params:{
                            yhid:localStorage.getItem("yhid"),
                            jlid:_this.tuijianlist_pic[e].jlid
                        }
                    }).then(res => {
                    // console.log(res.data)
                    if(res.data=="success"){
                        _this.tuijianlist_pic[e].star="已收藏"
                        _this.tuijianlist_pic[e].starnum++
                    }
                    })
                        .catch(err => {
                        console.log('首关注环节错误：'+err)//
                        })
                }
                else if(res.data=="1"){
                    axios.get('/upstar',{
                        params:{
                            yhid:localStorage.getItem("yhid"),
                            jlid:_this.tuijianlist_pic[e].jlid,
                            sc:0
                    }
                    }).then(res => {
                    // console.log(res.data)
                    if(res.data=="success"){
                        _this.tuijianlist_pic[e].star="已收藏"
                        _this.tuijianlist_pic[e].starnum++
                    }
                    }).catch(err => {
                        console.log('再关注环节错误：'+err)//
                    })
                }
                else{
                    axios.get('/upstar',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_pic[e].jlid,
                        sc:1
                    }
                    }).then(res => {
                        // console.log(res.data)
                        if(res.data=="success"){
                            _this.tuijianlist_pic[e].star="收藏"
                            _this.tuijianlist_pic[e].starnum--
                        }
                    }).catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
                }).catch(err => {
                    console.log('查错误：'+err)
                })
            }
            else{
                this.$router.push({
                name: 'content',
                })
            }
        },
        starplus2() {
            const _this= this
            if(localStorage.getItem("yhid")){
                axios.get('/isstar', {
                params:{
                    yhid:localStorage.getItem("yhid"),
                    jlid:_this.tuijianlist_video[0].jlid
                }
                }).then(res => {
                // console.log(res.data)
                if(res.data=="wu"){
                        axios.get('/addstar',{
                        params:{
                            yhid:localStorage.getItem("yhid"),
                            jlid:_this.tuijianlist_video[0].jlid
                        }
                    }).then(res => {
                    // console.log(res.data)
                    if(res.data=="success"){
                        _this.tuijianlist_video[0].star="已收藏"
                        _this.tuijianlist_video[0].starnum++
                    }
                    })
                        .catch(err => {
                        console.log('首关注环节错误：'+err)//
                        })
                }
                else if(res.data=="1"){
                    axios.get('/upstar',{
                        params:{
                            yhid:localStorage.getItem("yhid"),
                            jlid:_this.tuijianlist_video[0].jlid,
                            sc:0
                    }
                    }).then(res => {
                    // console.log(res.data)
                    if(res.data=="success"){
                        _this.tuijianlist_video[0].star="已收藏"
                        _this.tuijianlist_video[0].starnum++
                    }
                    }).catch(err => {
                        console.log('再关注环节错误：'+err)//
                    })
                }
                else{
                    axios.get('/upstar',{
                    params:{
                        yhid:localStorage.getItem("yhid"),
                        jlid:_this.tuijianlist_video[0].jlid,
                        sc:1
                    }
                    }).then(res => {
                        // console.log(res.data)
                        if(res.data=="success"){
                            _this.tuijianlist_video[0].star="收藏"
                            _this.tuijianlist_video[0].starnum--
                        }
                    }).catch(err => {
                        console.log('取关错误：'+err)
                    })
                }
                }).catch(err => {
                    console.log('查错误：'+err)
                })
            }
            else{
                this.$router.push({
                name: 'content',
                })
            }
        },
        home_goto(e,t){
            if(t)
                localStorage.setItem("nowpage",t)
            else
                localStorage.setItem("nowpage",0)
            this.$router.push('/'+e);
        },
        home_gotosearch(e){
            localStorage.setItem("nowpage",0)
            // console.log(e),
            this.$router.push({
                name: 'lan',
                params: {
                homesearch: e,
                }
            })
        },
        home_gotolog(e){
            localStorage.setItem("nowpage",0)
            const _this=this
            axios.get('/ishavephoto',{
                params:{
                    jlid:e
                }
            }).then(res => { //照片
                console.log(res.data)
                if(res.data=="you"){
                    this.$router.push({
                        name: 'Petlog',
                        params: {
                            jlid: e,
                        }
                    }) 
                }
                else{//视频
                    this.$router.push({
                        name: 'Petlog2',
                        params: {
                            jlid: e,
                        }
                    })
                }               
            }).catch(err => {
                console.log('错误！！！！：'+err)
            })
        },
        home_gotouser(e,i,t){
            localStorage.setItem("nowpage",0)
            this.$router.push({
                name: 'otheruser',
                    params: {
                        yhm: e,
                        yhid:i,
                        tx:t
                    }
                })
        }
    }
}   

</script>

<style scoped>
 
.wximg{
  width: 250px;
  height: 250px;
  padding: 10px;
}
.carousel-item {
    width: 100%;
    height: 100%;
    background: white; 
    display: flex;
    justify-content: center;
}
.carousel-img {
    max-width: 100%;
    max-height: 100%;
}
body {
    margin: 0;
}
.homebox{
    width: 1440px;
    height: 1360px;
    font-size: 21px;
    font-family: ZTSJ-BaguetteFont;
    font-weight: 400;
    color: #000000;
}
/* 上  */
.longpets{
    margin-top:4px;
}
/* LOGOS 1192 126+20*/
.homelogos{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    height: 126px;
    width: 1192px;
    margin-left: 124px;
}
.homelogo1{
    margin-top: 0px;
    width:93px;
    height:106px
}
.homelogo23{
    margin-top: 0px;
    width:93px;
    height:106px
}
.homelans{
    margin-top: 0px;
    width: 150px;
    height: 103px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.homefenqus{
    width: 300px;
    height: 103px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.homefenqus1{
    width: 300px;
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.homefenqus2{
    width: 300px;
    height: 24px;
    /* display: flex;
    flex-direction: row;
    justify-content: left; */
}
.homefenqus2_col{
    min-width: 250px;
    display: flex;
    flex-direction: col;
}
.homefenqus2_row{
    min-width: 250px;
    display: flex;
    flex-direction: row;
}
.fenqu2lan{
    padding: 5px;
}
.book{
    widows: 105px;
    height: 126px;
    margin-top: 0px;
}
/* 下 1192*/
.homebuttom{
    margin-top: 10px;
    width: 1192px;
    margin-left: 124px;
    display: flex;
    flex-direction: row;
}
/* 左711 */
.homeleft{
    width: 721px;
    margin-left: 0px;
    display: flex;
    flex-direction: column;
}
/* 轮播图 711*/
.homepicsbox{
    width: 721px;
    height: 250px;
    background:white;
}
/* 推荐 */
/* 推荐title */
.hometuijianbox{
    margin-top: 10px;
    width: 721px;
    height: 619px;
}
.tuijiantitlebox{
    display: flex;
    flex-direction: row;
    width: 721px;
    height: 79px;
    justify-content: space-between;
}
.title1{
    width: 242px;
    height: 79px;
}
.title15{
    width: 139px;
    height: 40px;
    margin-top: 27px;
}
/* 推荐图片 */
.tuijianitembox_pic{
    width: 711px;
    height: 126px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
}
.tuijianpic{
    width: 178px;
    height: 116px;
    object-fit: cover;
}
/* 左右间隔20px */
.tuijianright{
    width: 513px;
    height: 116px;
    display: flex;
    flex-direction: column;
}
.tuijiantextbox{
    width: 513px;
}
.tuijiantext {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
    word-wrap:break-word;
    word-break:break-all; 
}
.tuijianinfobox{
    margin-top: 5px;
    height: 40px;
    width: 350px;
    display: flex;
    flex-direction: row;
    font-size: 18px;
}
.tuijianuserurl{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}
.tuijianinfotxt1{
    margin-left: 10px;
    margin-top: 10px;
}
.tuijianinfotxt2{
    margin-left: 10px;
    margin-top: 10px;
}
.rightbottombox{
    width: 190px;
    height: 21px;
    margin-left: 270px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
}
.tuijianstar{
    width: 21px;
    height: 21px;
}
.tuijianlove{
    width: 21px;
    height: 21px;
}
.tuijianline{
    width: 721px;
    height: 1px;
    background: #E4DBD4;
}
/* 推荐视频 */
.tuijianitembox_video{
    margin-top: 10px;
    width: 711px;
    height: 194px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.tuijianvideo{
    width: 338px;
    height: 194px;
    background-color: white;
}


/* 左右间隔20px */
.tuijianright2{
    width: 353px;
    height: 116px;
    display: flex;
    flex-direction: column;
}
.tuijiantextbox2{
    width: 353px;
}
.tuijianinfobox2{
    margin-top: 5px;
    height: 40px;
    width: 350px;
    display: flex;
    flex-direction: row;
    font-size: 18px;
}
.tuijiantext2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-wrap:break-word;
    word-break:break-all; 
}
/* 视频宽度比照片宽170  370-170=200 */
.rightbottombox2{
    width: 190px;
    height: 21px;
    margin-left: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 18px;
}
/* 热榜471+10 */
.homerebangbox{
    margin-left: 40px;
    width: 431px;
    height: 975px;
    display: flex;
    flex-direction: column;
}
.title2{
    width: 204px;
    height: 50px;
}
.hotbox{
    margin-top: 20px;
    width: 431px;
    height: 877px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.hotitem{
    width: 431px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.hotid{
    width: 10px;
    height: 70px;
}
.hotpic{
    width:130px;
    height: 80px;
    object-fit: cover;
}
.hottextbox{
    margin-top: 5px;
    width: 247px;
    height: 55px;
}
.hottext {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-wrap:break-word;
    word-break:break-all; 
}
</style>