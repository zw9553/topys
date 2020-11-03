<template>
<!-- 创意库页面 -->
    <div class="bank">
        <div class="bank-top">
            <span class="iconfont icon-icon-test1" @click="back"></span>
            <span class="txt">创建灵感库</span>
        </div>
        <div class="bank-cover">
            <img :src="url" alt="" class="cover">
            <span class="cover-txt" @click="change_cover">更换封面</span>
        </div>
        <ul class="con">
            <li class="con-item">
                <span class="txt">名称</span>
                <input type="text" placeholder="灵感库标题" v-model="name">
            </li>
            <li class="con-item">
                <span class="txt">介绍</span>
                <input type="text" placeholder="灵感库介绍" v-model="desc">
            </li>
        </ul>
        <div class="success-box">
            <a class="success" href="javascript:;" @click="create_library">完成</a>
        </div>
    </div>
</template>

<script>
import router from '../router/index'
export default {
    name:'Bank',
    data() {
        return {
            name:'',
            desc:'',
            url:'http://pic.topys.cn/topys_web/favdefault.png?x-oss-process=style/fav-pic-1x',
            contents:[]
        }
    },
    methods: {
        back() {
            router.go(-1)
        },
        // 更换封面
        change_cover() {
            this.url="https://img-sz.topys.cn/2020-08-21/1597991387331.jpg?x-oss-process=style/article-pic-list-webp-1x"
        },
        // 点击完成，查询创意库名字是否重复，向数据库添加创意库的信息
        create_library() {
            if (this.name) {
                var bool=null
                this.axios.get('http://localhost:3000/sellib?username='+localStorage.getItem('islogin')).then(res=> {
                    bool=res.data.data.some(val=> val.name==this.name)
                }).catch(err=> {
                    console.log(err)
                })
                if (bool==false) {
                    this.axios.get(`http://localhost:3000/library?username=${localStorage.getItem('islogin')}&name=${this.name}&desc=${this.desc}&url=${this.url}`).then(res=> {
                        console.log(res.data.message);
                    }).catch(err=> {
                        console.log(err)
                    })
                }
            }else {
                alert('请输入标题！')
                return
            }
            router.push('/collect')
        }
    },
    // 进入到某一个创意库里
    watch:{
        $route:{
            handler(to) {
                if (to.params.id>0) {
                    this.id=to.params.id
                    this.axios.get('http://localhost:3000/sellib?id='+to.params.id).then(res=> {
                        this.contents=res.data.data[0]
                        this.name=res.data.data[0].name
                        this.desc=res.data.data[0].desc
                        this.url=res.data.data[0].url
                    }).catch(err=> {
                        console.log(err)
                    })
                }
            },
            immediate:true
        }
    }
}
</script>

<style scoped>
    .bank {
        width: 100%;
        padding-left: 5%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 9;
        font-size: .28rem;
        box-sizing: border-box;
    }
    .bank-top {
        height: .8rem;
        line-height: .8rem;
        position: relative;
    }
    .bank-top .iconfont {
        font-size: .45rem;
        vertical-align: middle;
    }
    .bank-top .txt {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .bank-cover {
        width: 100%;
        text-align: center;
        margin: 0.4rem 0;
    }
    .bank-cover .cover {
        width: 2rem;
        height: 2rem;
        margin-bottom: .3rem;
    }
    .bank-cover .cover-txt {
        display: block;
    }
    .con {
        width: 70%;
        margin-left: 15%;
    }
    .con-item {
        border-bottom: 1px solid #d8d8d8;
        height: .6rem;
        margin-top: 0.5rem;
        position: relative;
    }
    .con-item .txt {
        margin-right: .4rem;
        position: absolute;
        top:-.3rem;
        left: -.9rem;
    }
    .con-item input {
        outline: none;
        border: none;
    }
    .success-box {
        position: relative;
        margin-top: 0.6rem;
    }
    .success {
        text-decoration: none;
        color: #fff;
        background: #000;
        position: absolute;
        right: 0;
        padding: .2rem .5rem;
        border-radius: .4rem;
    }
</style>