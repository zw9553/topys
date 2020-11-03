<template>
<!-- 课程详情页面 -->
    <div class="detailo">
        <div class="box">
            <div class="back">
                <div class="bl" @click="back">
                    <span class="iconfont icon-icon-test1"></span>
                </div>
                <div class="br">
                    <span class="iconcoll" :class="['iconfont','icon-'+iconcoll,{'on':flag}]" @click="acoll"></span>
                    <span class="iconfont icon-fenxiang_2" @click="isf(1)"></span>
                </div>
            </div>
            <div class="con" v-html="content.content"></div>
        </div>
        <div class="bottom">
            <div class="txt">
                <span class="price">￥30.00</span> / 30天有效观看
            </div>
            <span class="sub" @click="isf(0)">订阅课程</span>
        </div>
        <div class="coverdis" id="coverdis" v-show="isshare">
            <div class="cover-con">
                <p>您是否确定{{txt}}？</p>
                <div class="share">
                    <span class="sure" @click="sure">确定</span>
                    <span class="cancel" @click="cancel">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router/index'
export default {
    name:'ClassDetail',
    data() {
        return {
            content:[],
            tabs:[],
            id:'',
            iconcoll:'02',
            flag:false,
            isshare:false,
            num:'',
            txt:''
        }
    },
    watch:{
        $route:{
            handler(to) {
                this.id=to.params.id
                this.axios.get('http://localhost:3000/detail1?id='+to.params.id).then(res=> {
                    this.content=res.data.data[0]
                    this.$nextTick(()=> {
                        var imgs=document.querySelectorAll('.con img')
                        imgs.forEach(val=> {
                            val.style.width="100%"
                            val.style.margin=".3rem 0"
                        })
                        var video=document.getElementById('minds_video_play')
                        video.style.width="100%"
                        video.style.height='4rem'
                        var _video=document.getElementById('video-html');
                        _video.style.position="relative"
                        _video.style.width="110%"
                        _video.style.marginLeft="-5%"
                        video.style.objectFit="fill"
                        var icon=document.createElement('span')
                        icon.classList.add('iconfont','icon-ziyuan')
                        _video.append(icon)
                        icon.style.position="absolute"
                        icon.style.top="50%"
                        icon.style.left="50%"
                        icon.style.transform="translate(-50%,-50%)"
                        icon.style.fontSize=".8rem"
                        icon.style.color="#fff"
                        icon.onclick=function() {
                            video.play()
                            icon.style.display="none"
                        }
                        video.controls=false
                        var share=document.querySelector('.minds-video-tab-box')
                        share.style.display="none"
                        var video_box=document.getElementsByClassName('video_info_box')[0]
                        video_box.style.display="flex"
                        video_box.style.justifyContent="space-between"
                    })
                }).catch(err=> {
                    console.log(err)
                })
            },
            immediate:true
        }
    },
    methods:{
        back() {
            router.go(-1)
        },
        acoll() {
            this.axios.get('http://localhost:3000/cvideos?username='+localStorage.getItem('islogin')).then(res=> {
                var str=''
                var str1=res.data.data[0].videos
                if (str1) {
                    var bool=str1.split(',').some(val=> val==this.id)
                    if (bool) {
                        // 取消收藏
                        str=str1.replace(this.id+',','')
                        this.iconcoll='02'
                    }else {
                        // 收藏
                        str=str1+this.id+','
                        this.iconcoll='icon_favorite'
                    }
                    this.axios.get('http://localhost:3000/cvideos1?username='+localStorage.getItem('islogin')+'&videos='+str).then(res=> {
                        console.log(res.data.message);
                    }).catch(err=> {
                        console.log(err);
                    })
                }else {
                    // 直接收藏
                    this.iconcoll='icon_favorite'
                    this.axios.get('http://localhost:3000/cvideos1?username='+localStorage.getItem('islogin')+'&videos='+this.id+',').then(res=> {
                        console.log(res.data.message);
                    }).catch(err=> {
                        console.log(err);
                    })
                }
            }).catch(err=> {
                console.log(err)
            })
        },
        isf(i) {
            this.num=i
            if (i==1) {
                this.txt='分享此内容到朋友圈'
            }else {
                this.txt='订阅此课程'
            }
            this.isshare=true
        },
        sure() {
            this.isshare=false
            if (this.num==1) {
                console.log('您成功分享该内容到朋友圈！')
            }else {
                console.log('您成功订阅该课程！')
            }
        },
        cancel() {
            this.isshare=false
            if (this.num==1) {
                console.log('您取消了分享！')
            }else {
                console.log('您取消了该课程！')
            }
        }
    },
    mounted() {
        this.axios.get('http://localhost:3000/cvideos?username='+localStorage.getItem('islogin')).then(res=> {
                var str1=res.data.data[0].videos
                if (str1) {
                    var bool=str1.split(',').some(val=> val==this.id)
                    if (bool) {
                        // 显示已收藏
                        this.iconcoll='icon_favorite'
                    }else {
                        // 显示未收藏
                        this.iconcoll='02'
                    }
                }
        }).catch(err=> {
            console.log(err);
        })
    }
}
</script>

<style scoped>
    .detailo {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        padding: 0 5%;
        box-sizing: border-box;
        z-index: 9;
        overflow-y: auto;
    }
    .box {
        position: relative;
    }
    .back {
        display: flex;
        justify-content: space-between;
        z-index: 10;
        padding: .3rem .2rem 0 .2rem;
    }
    .back .iconfont {
        font-size: .45rem;
        color: #fff;
    }
    .back .br .iconfont {
        font-size: .38rem;
        margin-left: 0.2rem;
        color: #fff;
    }
    .back .br .iconcoll.on {
        color: #000;
    }
    .detailo .con {
        z-index: -1;
        font-size: .28rem;
        line-height: .42rem;
        margin-bottom: 1.2rem;
        color: #9a9a9a;
        position: absolute;
        top: 0;
        left: 0;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        background: #fff;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        color: #9a9a9a;
        font-size: .24rem;
        width: 100%;
    }
    .bottom .price {
        color: #333;
        font-size: .28rem;
    }
    .bottom .sub {
        display: block;
        background: rgba(0,0,0,.8);
        height: .8rem;
        line-height: 0.8rem;
        padding: 0 .3rem;
        border-radius: .8rem;
        box-sizing: border-box;
        margin-top: .2rem;
        margin-right: 10%;
        color: #fff;
    }
        .coverdis, .iscol {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.2);
        z-index: 9;
    }
    .cover-con {
        position: fixed;
        background: #fff;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
        width: 60%;
        line-height: .42rem;
        padding: .3rem;
        font-size: .28rem;
    }
    .coverdis .share {
        margin-top: 0.4rem;
        width: 70%;
        margin-left: 15%;
        text-align: center;
    }
    .coverdis .share span {
        display: inline-block;
        margin-right: 0.3rem;
        background: #f60;
        padding: .1rem;
        border-radius: .2rem;
        color: #fff;
    }
</style>