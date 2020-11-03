<template>
<!-- 我的页面 -->
    <div class="mine">
        <!-- 未登录显示 -->
        <div class="m-header" @click="login" v-show="!isLogin">
            <img src="../assets/img/unlogin.jpg" alt="" class="unlogin">
            <h1>Hi,您未登录</h1>
            <p>点击登录体验更多功能</p>
            <img src="../assets/img/vip.jpg" alt="" class="vip">
        </div>
        <!-- 登录后显示 -->
        <div class="m-header" v-show="isLogin">
            <img :src="(user.picture?user.picture:'/img/unlogin.42298e26.jpg')" alt="" class="unlogin">
            <h1>{{user.name}}</h1>
            <div class="edit">
                <p>完善个人信息</p>
                <span class="iconfont icon-79"></span>
            </div>
            <ul class="slist">
                <li class="sitem">
                    <router-link to="/message">
                    <span class="iconfont icon-xiaoxizhongxin"></span>
                    <span class="txt">消息中心</span></router-link>
                </li>
                <li class="sitem"><router-link to="/class">
                    <span class="iconfont icon-dianshiju"></span>
                    <span class="txt">我的课程</span></router-link>
                </li>
                <li class="sitem"><router-link to="/order">
                    <span class="iconfont icon-ticket"></span>
                    <span class="txt">我的订单</span></router-link>
                </li>
            </ul>
            <img src="../assets/img/vip.jpg" alt="" class="vip">
        </div>
        <ul class="m-list">
            <li class="m-item">
                <router-link to="/ticket">我的门票
                <span class="iconfont icon-ticket"></span></router-link>
            </li>
            <li class="m-item">
                <router-link to="/adress">地址管理
                <span class="iconfont icon-location"></span></router-link>
            </li>
            <li class="m-item">
                <router-link to="/acount">账号管理
                <span class="iconfont icon-zhanghaoguanli"></span></router-link>
            </li>
            <li class="m-item">
                <router-link to='1'>去评分
                <span class="iconfont icon-duigou"></span></router-link>
            </li>
            <li class="m-item">
                <router-link to="1">问题反馈
                <span class="iconfont icon-fankuiyijian"></span></router-link>
            </li>
            <li class="m-item">
                <router-link to="1">关于TOPYS
                <span class="iconfont icon-xiaoliansmiley40"></span></router-link>
            </li>
        </ul>
        <p class="quit" @click="quit" v-show="isLogin">退出登录</p>
        <div class="coverdis" id="coverdis" v-show="iscover">
            <div class="cover-con">
                <p>您是否确定要退出登录？</p>
                <div class="share">
                    <span class="sure" @click="sure">确定</span>
                    <span class="cancel" @click="cancel">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Router from '../router/index'
export default {
    name: 'Mine',
    data() {
        return {
            iscover:false,
            isLogin:false,
            user:[]
        }
    },
    methods:{
        login() {
            if (!localStorage.getItem('islogin')) {
                Router.push('/register')
            }
        },
        quit() {
            this.iscover=true
        },
        sure() {
            localStorage.setItem('islogin',''),
            this.isLogin=false
            this.iscover=false
        },
        cancel() {
            this.iscover=false
        }
    },
    mounted() {
        if (localStorage.getItem('islogin')) {
            this.isLogin=true
            this.axios.get('http://localhost:3000/user?username='+localStorage.getItem('islogin')).then(res=> {
                this.user=res.data.data[0]
            }).catch(err=> {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
    .mine {
        margin-bottom: 1.5rem;
    }
    .m-header {
        text-align: center;
    }
    .m-header .unlogin {
        display: block;
        width: 1.225rem;
        margin: .575rem auto .41rem;
        border-radius: 50%;
    }
    .m-header h1 {
        font-size: .4rem;
        margin-bottom: .3rem;
    }
    .m-header p {
        color: #9a9a9a;
        margin-bottom: .3rem;
        font-size: .24rem;
    }
    .m-header .vip {
        width: 100%;
    }
    .m-list .m-item {
        height: .98rem;
        line-height: .98rem;
        border-bottom: 1px solid #d8d8d8;
        font-size: .28rem;
        position: relative;
    }
    .m-list .m-item a, .slist .sitem a {
        color: #000;
        text-decoration: none;
        display: block;
    }
    .m-list .m-item a .iconfont {
        position: absolute;
        right: 0;
    }
    .slist {
        display: flex;
        justify-content: space-between;
    }
    .edit {
        position: relative;
    }
    .edit .iconfont {
        position: absolute;
        right: 2.3rem;
        top:-.04rem;
    }
    .slist .sitem span {
        display: block;
        font-size: .24rem;
    }
    .slist .sitem .iconfont {
        font-size: .45rem;
        margin-bottom: 0.2rem;
    }
    .quit {
        text-align: center;
        margin-top: .2rem;
        font-size: .28rem;
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