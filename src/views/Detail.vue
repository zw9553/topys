<template>
<!-- 作品详情页 -->
    <div class="detail" >
        <!-- 顶部返回上一页、收藏、分享 -->
        <div class="back">
            <div class="bl">
                <span class="iconfont icon-icon-test1" @click="back"></span>
            </div>
            <div class="br">
                <span class="iconfont icon-02" @click="addk"></span>
                <span class="iconfont icon-fenxiang_2" @click="dis"></span>
            </div>
        </div>
        <!-- 作品详情 -->
        <h1 class="title">{{content.title}}</h1>
        <div class="desc">
            <img :src="content.picture" alt="">
            <span class="author">{{content.author}}</span>
            <span class="time">{{content.date}}发表</span>
        </div>
        <div class="con" v-html="content.content"></div>
        <div class="symbols">
            <span>{{content.about1}}</span>
            <span>{{content.about2}}</span>
            <span>{{content.about3}}</span>
        </div>
        <!-- 作品评论 -->
        <div class="dis">
            <h2>最新评论</h2>
            <ul class="dlist">
                <li class="ditem" v-for="(comment,index) in comments" :key="index">
                    <div class="l">
                        <img :src="comment.url" alt="">
                    </div>
                    <div class="r">
                        <div class="rt">
                            <div class="rtl">
                                <span class="title">{{comment.title}}</span>
                                <span class="time">{{comment.date}}</span>
                            </div>
                            <div class="rtr">
                                <span>{{comment.num}}</span>
                                <span class="iconfont icon-icon_good"></span>
                            </div>
                        </div>
                        <p class="rb">{{comment.content}}</p>
                    </div>
                </li>
            </ul>
            <!-- 点击可跳转到评论页面查看更多评论 -->
            <router-link class="more" :to="'/comment/'+id">查看更多</router-link>
        </div>
        <!-- 是否确认分享 -->
        <div class="coverdis" id="coverdis" v-show="isdis">
            <div class="cover-con">
                <p>您是否确定要分享该内容到您的朋友圈!</p>
                <div class="share">
                    <span class="sure" @click="sure">确定</span>
                    <span class="cancel" @click="cancle">取消</span>
                </div>
            </div>
        </div>
        <!-- 收藏显示 -->
        <div class="iscol" id="iscol" v-show="iscol">
            <div class="iscol-top" @click="discover" style="background:transparent;height:37%">
            </div>
            <div class="iscol-con">
                <div class="iscol-top">
                    <span class="txt">收藏至：</span>                   
                    <span @click="tobank" class="store">+创建新灵感库</span>
                </div>
                <ul class="librarys">
                    <li class="librarys_item" v-for="(item,index) in librarys" :key="index">
                        <div class="l">
                            <img :src="item.url" alt="">
                        </div>
                        <div class="r">
                            <span class="title">{{item.name}}</span>
                            <span class="desc">{{item.articles?item.articles.split(',').slice(0,item.articles.split(',').length-1).length:0}}条文章</span>
                        </div>
                        <span class="iconfont icon-tianjia" @click="add_Articles(index)"></span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 下方点赞、评论、收藏、分享 -->
        <div class="interact">
            <div class="like" @click="good(id,content.likes)">
                <span class="iconfont icon-icon_good" id="like"></span>
            </div>
            <div class="other">
                <div class="comments fcon">
                    <router-link :to="'/comment/'+id">
                        <span class="iconfont icon-pinglun"></span>
                        <span class="txt">评论</span>
                    </router-link>
                </div>
                <div class="share fcon" @click="dis">
                    <span class="iconfont icon-fenxiang_2"></span>
                    <span class="txt">分享</span>
                </div>
                <div class="collect fcon" @click="addk">
                    <span class="iconfont icon-02"></span>
                    <span class="txt">收藏</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import Router from '../router/index'
export default {
    name:'Detail',
    data() {
        return {
            content:[],
            comments:[],
            id:'',
            num:0,
            isdis:false,
            iscol:false,
            librarys:[]
        }
    },
    watch:{
        $route:{
            handler(to) {
                this.id=to.params.id
                // 请求作品详情
                this.axios.get('http://localhost:3000/list?id='+to.params.id).then(res=> {
                    this.content=res.data.data[0]
                    this.$nextTick(()=> {
                        var imgs=document.querySelectorAll('.con img')
                        imgs.forEach(val=> {
                            val.style.width="100%"
                            val.style.margin=".3rem 0"
                        })
                        var iframe=document.getElementsByClassName('iframe')[0]
                        var share=document.getElementsByClassName('share_img_box')[0]
                        iframe?iframe.style.display="none":''
                        share.style.display="none"
                    })
                }).catch(err=> {
                    console.log(err)
                })
                // 请求作品评论
                this.axios.get('http://localhost:3000/comment?id='+to.params.id).then(res=> {
                    this.comments=res.data.data.slice(0,2)
                }).catch(err=> {
                    console.log(err)
                })
            },
            immediate:true
        }
    },
    methods:{
        getArticles() {
            // 请求用户个人创意库
            this.axios.get('http://localhost:3000/sellib?username='+localStorage.getItem('islogin')).then(res=> {
                this.librarys=res.data.data
            }).catch(err=> {              
                console.log(err);
            })
        },
        back() {
            Router.go(-1)
        },
        good(i,num) {
            if (localStorage.getItem('islogin')) {
                var like=document.getElementById('like')
                this.num++
                if (this.num>1) {
                    this.num=0
                }
                if (this.num==1) {
                    num++
                    like.style.color="#f60"
                }else {
                    like.style.color=""
                }
                // 用户点赞修改数据库字段值
                this.axios.get(`http://localhost:3000/good1?id=${i}&num=${this.num}&like=${num}`).then(res=> {
                    console.log(res.data.message)
                }).catch(err=> {
                    console.log(err)
                })
            }else {
                Router.push("/register")
            }
        },
        dis() {
            this.isdis=true
        },
        sure() {
            if (localStorage.getItem('islogin')) {
                this.isdis=false
                console.log('您成功分享该内容到朋友圈！')
            }else {
                Router.push('/register')
            }
        },
        cancle() {
            this.isdis=false
            console.log('您取消了该分享！')
        },
        addk() {
            if (localStorage.getItem('islogin')) {
                this.iscol=true
                this.getArticles()
            }else {
                Router.push('/register')
            }
        },
        tobank() {
            Router.push('/bank/0')
        },
        // 往用户的创意库里添加作品，查询是否有该作品
        add_Articles(i) {
            if (this.librarys[i].articles) {
                var str=''
                var bool=this.librarys[i].articles.split(',').some(val=> val==this.id)
                if (!bool) {
                    str=this.librarys[i].articles+this.id+','
                }else {
                    str=this.librarys[i].articles.replace(this.id+',','')
                }
                this.axios.get(`http://localhost:3000/aart?id=${this.librarys[i].id}&articles=${str}`).then(res=> {
                    console.log(res.data);
                }).catch(err=> {
                    console.log(err);
                })
                this.getArticles()
            }else {
                this.axios.get(`http://localhost:3000/aart?id=${this.librarys[i].id}&articles=${this.id+','}`).then(res=> {
                    console.log(res.data);
                }).catch(err=> {
                    console.log(err);
                })
                this.getArticles()
            }
        },
        discover() {
            this.iscol=false
        }
    }
}
</script>

<style scoped>
    .detail {
        width: 100%;
        padding: 0 5%;
        position: absolute;
        overflow-y: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 9;
        box-sizing: border-box;
    }
    .back {
        display: flex;
        margin-top: 0.3rem;
        justify-content: space-between;
    }
    .back .iconfont {
        font-size: .45rem;
    }
    .back .br .iconfont {
        font-size: .38rem;
        margin-left: 0.2rem;
    }
    h1 {
        font-size: .4rem;
        line-height: .6rem;
        margin: 0.1rem 0;
    }
    .desc img {
        display: inline-block;
        width: .4rem;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 0.1rem;
    }
    .desc .time {
        font-size: .2rem;
        color: #9a9a9a;
        margin-left: 0.2rem;
    }
    .con {
        margin-top: 0.1rem;
        margin-bottom: 0.3rem;
        font-size: .28rem;
        color: #666;
        line-height: .42rem;
        width: 100%;
        position: relative;
    }
    .interact {
        width: 100%;
        position: fixed;
        bottom: .3rem;
        display: flex;
        justify-content: space-between;
    }
    .interact .like {
        width: .8rem;
        height: .8rem;
        text-align: center;
        line-height: 0.8rem;
        background: #fff;
        border-radius: 50%;
        border: 1px solid #666;
    }
    .like .iconfont {
        font-size: .4rem;
    }
    .interact .other {
        background: #fff;
        width: 3rem;
        padding: .1rem .3rem;
        display: flex;
        border-radius: .8rem;
        border: 1px solid #666;
        margin-right: .4rem;
    }
    .interact .other span {
        display: block;
    }
    .interact .other .fcon {
        width: 33.33%;
        text-align: center;
        font-size: .24rem;
        color: #666;
    }
    .interact .other .fcon .iconfont {
        font-size: .38rem;
    }
    .symbols {
        font-size: .24rem;
        line-height: .42rem;
    }
    .symbols span {
        display: inline-block;
        background: #666;
        margin-right: .3rem;
        color: #fff;
        border-radius: .3rem;
        padding: .1rem .3rem;
    }
    h2 {
        margin: .1rem 0;
    }
    .dis {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    .ditem {
        border-bottom: 1px solid #d8d8d8;
        display: flex;
        padding-bottom: 0.4rem;
        margin-top: 0.3rem;
    }
    .ditem .l {
        width: 10%;
    }
    .ditem .l img {
        width: 100%;
        border-radius: 50%;
    }
    .ditem .r {
        width: 90%;
    }
    .ditem .r .rt {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: .3rem;
        color:#9a9a9a;
    }
    .ditem .r .rtl span {
        display: block;
    }
    .ditem .r .rtl .title {
        font-size: .32rem;
        margin-bottom: .1rem;
        color: #000;
    }
    .ditem .r .rtl .time {
        font-size: .20rem;
    }
    .dis .more {
        text-decoration: none;
        color: #000;
        text-align: center;
        display: block;
        margin-top: 0.25rem;
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
    .other .fcon a {
        text-decoration: none;
        color: #666;
    }
    .iscol-con {
        position: fixed;
        bottom: 0;
        background: #fff;
        width: 100%;
        height: 60%;
        max-height: 60%;
        z-index: 9;
        padding: .2rem;
    }
    .iscol-con .iscol-top {
        display: flex;
    }
    .iscol-top .txt {
        margin-right: 3.6rem;
    }
    .librarys {
        margin-top: .3rem;
        max-height: 7.6rem;
        overflow-y: auto;
    }
    .librarys_item {
        position: relative;
        height: 1.6rem;
    }
    .librarys_item .l img {
        top: 0;
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
    }
    .librarys_item .r {
        position: absolute;
        top: .18rem;
        left: 2rem;
    }
    .librarys_item .r span {
        display: block;
    }
    .librarys_item .r .title {
        margin-bottom: 0.2rem;
    }
    .librarys_item .r .desc {
        color: #9a9a9a;
        font-size: .24rem;
    }
    .librarys_item .iconfont {
        position: absolute;
        top:.3rem;
        right: .4rem;
        width: .8rem;
        height: .8rem;
        font-size: .5rem;
    }
</style>