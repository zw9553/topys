<template>
<!-- 创意库详情页面 -->
    <div class="mybank">
        <div class="top">
            <span class="back iconfont icon-icon-test1" @click="back"></span>
            <span class="txt">我的创意库</span>
            <span class="more iconfont icon-dashujukeshihuaico-" @click="more"></span>
        </div>
        <div class="mb_con">
            <img class="img" :src="contents.url" alt="">
            <span class="title">{{contents.name}}</span>
            <span class="desc">{{contents.articles?contents.articles.split(',').slice(0,contents.articles.split(',').length-1).length:0}}条文章</span>
        </div>
        <ul class="list">
            <li class="main-item" v-for="(list,index) in lists" :key="index">
                <router-link :to="'/detail/'+list.id">
                <div class="mleft">
                    <img :src="list.cover" alt="">
                </div>
                <div class="mright">
                    <span class="title">{{list.title}}</span>
                    <div class="from">
                    <span class="comment">{{list.comments}}</span> 评论
                    <span class="like">{{list.likes}}</span> 赞
                    <span class="collect">{{list.collets}}</span> 收藏
                    </div>
                </div>
                </router-link>
            </li>
        </ul>
        <div class="bottom" v-show="bool">
            <div class="b_cover" @click="more1"></div>
            <div class="b-txt">
                <span class="edit" @click="gobank">编辑灵感库信息</span>
                <span class="remove" @click="remove">删除灵感库</span>
            </div>
        </div>
        <div class="coverdis" id="coverdis" v-show="iscover">
            <div class="cover-con">
                <p>您是否确定要删除此创意库？</p>
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
    name:'MyBank',
    data() {
        return {
            contents:[],
            lists:[],
            bool:false,
            id:null,
            iscover:false
        }
    },
    methods:{
        back() {
            router.go(-1)
        },
        more() {
            this.bool=true
        },
        more1() {
            this.bool=false
        },
        gobank() {
            console.log(this.id);
            router.push('/bank/'+this.id)
        },
        remove() {
            this.bool=false
            console.log(this.iscover);
            this.iscover=true
        },
        sure() {
            // 删除创意库
            // console.log(this.contents.id);
            this.axios.get('http://localhost:3000/rbank?id='+this.contents.id).then(res=> {
                console.log(res.data.message);
            }).catch(err=> {
                console.log(err)
            })
            this.iscover=false
            router.push('/collect')
        },
        cancel() {
            this.iscover=false
        }
    }, 
    watch:{
        $route:{
            handler(to) {
                this.id=to.params.id
                this.axios.get('http://localhost:3000/sellib?id='+to.params.id).then(res=> {
                    this.contents=res.data.data[0]
                    var arr=res.data.data[0].articles.split(',')
                    var arr1=arr.slice(0,arr.length-1)
                    arr1.forEach(val => {
                        this.axios.get('http://localhost:3000/list?id='+val).then(res=> {
                            this.lists.push(res.data.data[0])
                        }).catch(err=> {
                            console.log(err)
                        })
                    })
                }).catch(err=> {
                    console.log(err)
                })
            },
            immediate:true
        }
    }
}
</script>

<style scoped>
    .mybank {
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
    .top {
        height: .8rem;
        line-height: 0.8rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3rem;
    }
    .top span {
        display: inline-block;
    }
    .top .iconfont {
        font-size: .45rem;
    }
    .top .txt {
        font-size: .24rem;
    }
    .mb_con .img {
        width: 80%;
        margin: .2rem 10% .5rem;
    }
    .mb_con .desc, .mb_con .title {
        display: block;
        margin: .2rem 0;
    }
    .mb_con .desc {
        color: #9a9a9a;
        font-size: .24rem;
    }
    .mb_con .title {
        font-size: .34rem;
    }
    .list {
        margin-bottom: 2rem;
    }
    .main-item a {
        color: #000;
        display: flex;
        margin: .3rem 0;
        text-decoration: none;
    }
    .main-item .mleft img {
        width: 2.5rem;
        margin-right: 0.3rem;
    }
    .main-item .mright {
        position: relative;
    }
    .main-item .mright .title {
        margin-top: -0.02rem;
        font-size: .28rem;
        line-height: .42rem;
    }
    .main-item .mright .from {
        font-size: .20rem;
        color: #9a9a9a;
        position: absolute;
        bottom: 0;
    }
    .bottom {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.3);
    }
    .bottom .b_cover {
        height: 90%;
    }
    .bottom .b-txt {
        position: absolute;
        bottom: .1rem;
        width: 100%;
        height: 10%;
    }
    .bottom .b-txt span {
        width: 100%;
        display: block;
        background: #fff;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
    }
    .bottom .b-txt .edit {
        border-bottom: 1px solid #ddd;
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