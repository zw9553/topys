<template>
<!-- 登录/注册 -->
    <div class="register">
    <div class="go">
        <span class="iconfont icon-icon-test1" @click="back"></span>
        <span @click="clo">{{txt}}</span>
    </div>
    <h1 class="title">TOPYS.</h1>
    <!-- 注册/登录 -->
    <ul class="r-list" v-show="!isphone">
        <li class="r-item">
            <input type="text" class="phonenumber" v-model="username" placeholder="手机号">
            <span @click="rcode">获取验证码</span>
        </li>
        <li class="r-item">
            <input type="text" class="code" v-model="code" placeholder="验证码">
        </li>
    </ul>
    <!-- 输入密码 -->
    <ul class="r-list" v-show="pshow">
        <li class="r-item">
            <input type="text" v-model="name" class="phonenumber" placeholder="请输入用户名">
        </li>
        <li class="r-item">
            <input type="password" v-model="password" class="phonenumber" placeholder="请输入密码">
        </li>
        <li class="r-item">
            <input type="password" v-model="password1" class="code" placeholder="请再次输入密码">
        </li>
    </ul>
    <!-- 手机登录 -->
    <ul class="r-list" v-show="isphone">
        <li class="r-item">
            <input type="text" v-model="username" class="phonenumber" placeholder="手机号">
        </li>
        <li class="r-item">
            <input type="password" v-model="password" class="code" placeholder="密码">
        </li>
    </ul>
    <a class="reg" href="javascript:;" @click="oreg">注册/登录</a>
    <p class="agree"><span>点击表示已阅读并同意</span>《TOPYS用户服务协议》</p>
    </div>
</template>

<script>
import Router from '../router/index'
export default {
    name: 'Register',
    data() {
        return {
            username:'',
            code:'',
            code1:'',
            pshow:false,
            name:'',
            password:'',
            password1:'',
            users:[],
            repeat:false,
            isphone:false,
            txt:'账号密码登录'
        }
    },
    methods:{
        back() {
            Router.go(-1)
        },
        // 添加用户的回调函数
        adduser(i,t,n) {
            this.axios.get(`http://localhost:3000/add?username=${i}&password=${t}&name=${n}`).then(res=> {
                alert(res.data.message)
                this.pshow=false
                this.code=''
            }).catch(err=> {
                console.log(err)
            })
        },
        rcode() {
            if (this.username.match(/^[1][0-9][1-9]{9}$/)) {
                for(var i = 0,str='';i<4;i++){
                    str += Math.floor(Math.random()*10);
                }
                alert(str)
                this.code1=str
            }else {
                alert("手机号必须是1开头的十一位数字长度的号码！")
            }
        },
        // 登录成功之后的会掉函数
        success() {
            alert('登录成功')
            localStorage.setItem('islogin',this.username)
            Router.push('/mine')
        },
        oreg() {
            if (this.isphone==false) {
                if (this.code1===this.code) {
                    // 查询用户是否已经注册，已经注册过就直接登录
                    this.axios.get('http://localhost:3000/user').then(res=> {
                        if (res.data.data.length) {
                            this.repeat=res.data.data.some(val=> val.username==this.username)
                            if (!this.repeat) {
                                this.pshow=true
                                if (this.password.match(/^[0-9a-zA-Z]{6,12}$/)&&this.password.match(/^[0-9a-zA-Z]{6,12}$/)&&this.password===this.password1) {
                                    // 添加用户
                                    this.adduser(this.username,this.password,this.name)
                                }
                            }else {
                                // 登录
                                this.success()
                            }
                        }else {
                            // 添加用户
                            this.adduser(this.username,this.password,this.name)
                        }
                    }).catch(err=> {
                        console.log(err)
                    })
                }
            }else {
                if (this.username&&this.password) {
                    // 查询用户密码进行登录验证
                    this.axios.get('http://localhost:3000/unique?username='+this.username).then(res=> {
                        if (this.password==res.data.data[0].password) {
                            this.success()
                        }
                    }).catch(err=> {
                        console.log(err)
                    })
                }
            }
        },
        // 切换手机登录和账号密码登录
        clo() {
            this.pshow=false
            this.isphone=!this.isphone
            if (this.isphone==true) {
                this.txt="手机登录"
            }else {
                this.txt="账号密码登录"
            }
        }
    }
}
</script>
<style scoped>
    .register {
        width: 90%;
        margin-left: 5%;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 9;
        font-size: .28rem;
        letter-spacing: .03rem;
    }
    .go {
        display: flex;
        justify-content: space-between;
        margin-top: .3rem;
        height: .8rem;
        line-height: .8rem;
    }
    .go .iconfont {
        font-size: .6rem;
    }
    .title {
        text-align: center;
        font-size: .6rem;
        font-weight: bold;
        margin: 0.8rem 0;
    }
    .reg {
        display: block;
        width: 90%;
        margin-left: 5%;
        text-align: center;
        background: #161616;
        color: #fff;
        height: .8rem;
        line-height: .8rem;
        text-decoration: none;
        border-radius: .9rem;
        margin-top: .8rem;
        margin-bottom: 0.4rem;
    }
    .r-item {
        width: 90%;
        margin-left: 5%;
        height: 1.1rem;
        line-height: 1.1rem;
        border-bottom: 1px solid #d8d8d8;
    }
    .r-item input {
        border: none;
        outline: none;
    }
    .agree {
        text-align: center;
        font-size: .20rem;
    }
    .agree span {
        color: #9a9a9a;
    }
</style>
