<template>
<!-- 作品评论页面 -->
    <div class="comment">
        <div class="back">
            <span class="iconfont icon-icon-test1" @click="back"></span>
        </div>
        <div class="dis">
            <h2>评论</h2>
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
                            <div class="rtr" @click="good(comment.id,index)">
                                <span>{{comment.num}}</span>
                                <span class="iconfont icon-icon_good"></span>
                            </div>
                        </div>
                        <p class="rb">{{comment.content}}</p>
                    </div>
                </li>
            </ul>
            <div class="send-comment" v-if="islogin">
                <input v-model.trim="txt" type="text" placeholder="发表评论">
                <span @click="send" class="iconfont icon-zhifeiji"></span>
            </div>
            <div class="send-comment" v-else @click="register">
                <input v-model.trim="txt" type="text" placeholder="登录账号发表评论" disabled>
                <span @click="send" class="iconfont icon-zhifeiji"></span>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../router'
export default {
    name:'Comment',
    data() {
        return {
            comments:[],
            user:[],
            txt:'',
            id:'',
            islogin:false
        }
    },
    watch:{
        $route:{
            handler(to) {
                this.id=to.params.id
                this.axios.get('http://localhost:3000/comment?id='+to.params.id).then(res=> {
                    this.comments=res.data.data
                }).catch(err=> {
                    console.log(err)
                })
            },
            immediate:true
        }
    },
    methods:{
        register() {
            router.push('/register')
        },
        back() {
            router.go(-1)
        },
        good(id,i) {
            this.comments.forEach((val,index) => {
                if(index==i) {
                    val.num++
                    if (val.num==2) {
                        val.num=0
                    }
                    this.axios.get(`http://localhost:3000/good?id=${id}&num=${val.num}`).then(res=> {
                        console.log(res.data.message)
                    }).catch(err=> {
                        console.log(err)
                    })
                }
            });
        },
        send() {
            var date= new Date();
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var date1=date.getDate();
            var hour=date.getHours();
            var minute=date.getMinutes();
            var second=date.getSeconds();
            var time=year+'-'+month+'-'+date1+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
            if (this.txt) {
                this.comments.push({content:this.txt,date:time,num:0,title:(this.user.name?this.user.name:'TOPYS用户'),url: (this.user.picture?this.user.picture:'/img/unlogin.42298e26.jpg'),work_id:this.id})
                this.axios.get(`http://localhost:3000/addcomment?workid=${this.id}&url=${this.user.picture?this.user.picture:'/img/unlogin.42298e26.jpg'}&title=${this.user.name?this.user.name:'TOPYS用户'}&content=${this.txt}&date=${time}`).then(res=> {
                    console.log(res.data.message)
                }).catch(err=> {
                    console.log(err)
                })
            }
        }
    },
    mounted() {
        if (localStorage.getItem('islogin')) {
            this.islogin=true
        }
    }
}
</script>

<style scoped>
    .comment {
        width: 100%;
        padding-left: 5%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 9;
        box-sizing: border-box;
    }
    .back .iconfont {
        margin: .3rem 0;
        display: block;
        font-size: .45rem;
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
    .send-comment {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 1.2rem;
        line-height: 1.2rem;
        background: #ccc;
        padding: 0 .2rem;
    }
    .send-comment input {
        border: none;
        outline: none;
        width: 75%;
        padding: .2rem;
        background: #fff;
        border-radius: .3rem;
        margin-right: .2rem;
    }
</style>