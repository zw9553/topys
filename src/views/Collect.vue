<template>
<!-- 收藏 -->
  <div class="collect">
    <!-- 未登录显示页面 -->
    <div class="c-body" v-show="!cshow">
      <h1>欢迎来到TOPYS!</h1>
      <p>立即注册/登录，探寻全球先锋创意内容</p>
      <ul class="c-list">
        <li class="c-item">
          <img src="../assets/img/ex_1.jpg" alt="" />
          <div class="txt">
            <span class="title">建立你的灵感库</span>
            <span class="desc">轻松查阅收藏过的文章</span>
          </div>
        </li>
        <li class="c-item">
          <img src="../assets/img/ex_2.jpg" alt="" />
          <div class="txt">
            <span class="title">灵感视频想看就看</span>
            <span class="desc">TOPYS精选大量全球创意视频，找参考不用愁</span>
          </div>
        </li>
        <li class="c-item">
          <img src="../assets/img/ex_3.jpg" alt="" />
          <div class="txt">
            <span class="title">解锁Minds创意学院高阶秘籍</span>
            <span class="desc"
              >订阅创意大师的视频课程、报名有意思的线下分享活动</span
            >
          </div>
        </li>
        <li class="c-item">
          <img src="../assets/img/ex_4.jpg" alt="" />
          <div class="txt">
            <span class="title">换设备也能同步灵感瞬间</span>
            <span class="desc">注册账号并登录，随时同步收藏、订阅等记录</span>
          </div>
        </li>
      </ul>
      <a class="register" href="javascript:;" @click="reg">注册/登录</a>
    </div>
    <!-- 登录后显示页面 -->
    <div class="c-body1" v-show="cshow">
      <h1>收藏</h1>
      <!-- tab切换 -->
      <ul class="c-list1">
        <li class="c-item1" v-for="(list, index) in lists" :key="index" @click="change(index)">
          {{ list }}
        </li>
      </ul>
      <!-- tab下方显示的内容 -->
      <div class="con">
        <!-- 我的创意库 -->
        <div class="insp" v-if="num==0">
          <span>我创建的灵感库({{librarys.length}})</span>
          <span class="iconfont icon-jiahao" @click="goBank"></span>
        </div>
        <div class="con-box" v-if="num==0">
          <ul class="list">
            <li class="librarys_item" v-for="(item,index) in librarys" :key="index">
              <router-link :to="'/mybank/'+item.id">
                <div class="l">
                    <img :src="item.url" alt="">
                </div>
                <div class="r">
                    <span class="title">{{item.name}}</span>
                    <span class="desc">{{item.articles?item.articles.split(',').slice(0,item.articles.split(',').length-1).length:0}}条文章</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 视频 -->
        <div class="video" v-if="num==1">
          <ul class="video-list" v-if="videos.length">
            <li class="citem" v-for="(video,index) in videos" :key="index">
              <router-link :to="'/classdetail/'+video.id">
                <div class="ileft">
                  <video :src="video.cover" :poster="video.img"></video>
                  <span class="iconfont icon-ziyuan"></span>
                </div>
                <span class="title">{{video.title.length>6?video.title.slice(0,6)+'...':video.title}}</span>
              </router-link>
            </li>
          </ul>
          <span v-else class="txt" style="margin:2.5rem 0;display:block;text-align:center;font-size:.24rem">您还没有收藏任何视频呦~~</span>
        </div>
        <!-- 课程 -->
        <div class="class" v-if="num==2">
          <ul class="class-list" v-if="classes.length"></ul>
          <span class="txt" style="margin:2.5rem 0;display:block;text-align:center;font-size:.24rem"  v-else>您还没有订阅任何课程呦~~</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  name: "Collect",
  data() {
    return {
      cshow: false,
      lists: ["灵感库", "视频", "课程", "赞过的"],
      num: 0,
      librarys:[],
      videos:[],
      classes:[],
      video_data:{id:'',falg:''}
    }
  },
  methods: {
    change(i) {
      this.num = i;
    },
    goBank() {
      router.push('/bank/0')
    },
    reg() {
      router.push('/register')
    }
  },
  mounted() {
    if (localStorage.getItem("islogin")) {
      this.cshow = true;
      this.axios.get('http://localhost:3000/sellib?username='+localStorage.getItem('islogin')).then(res=> {
        this.librarys=res.data.data
      }).catch(err=> {              
        console.log(err);
      })
      this.axios.get('http://localhost:3000/cvideos?username='+localStorage.getItem('islogin')).then(res=> {
        var arr=res.data.data[0].videos.split(',')
        arr.forEach(val => {
          if (val) {
            this.axios.get('http://localhost:3000/detail1?id='+val).then(res=> {
              this.videos=res.data.data
            }).catch(err=> {
              console.log(err);
            })
          }
        })
      }).catch(err=> {              
        console.log(err);
      })
    }
  },
};
</script>

<style scoped>
.c-body {
  letter-spacing: 0.05rem;
}
.c-body h1 {
  font-size: 0.4rem;
  margin-top: 0.4rem;
}
.c-body p {
  font-size: 0.28rem;
  margin: 0.4rem 0;
}
.c-list .c-item {
  display: flex;
}
.c-list .c-item img {
  display: inline-block;
  width: 1.625rem;
  margin-top: 0.15rem;
}
.c-item span {
  display: block;
  font-size: 0.28rem;
}
.c-item .title {
  margin-top: 0.45rem;
}
.c-item .desc {
  margin-top: 0.25rem;
  color: #9a9a9a;
  line-height: 0.34rem;
}
.register {
  display: block;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  background: #161616;
  color: #fff;
  height: 0.8rem;
  line-height: 0.8rem;
  text-decoration: none;
  border-radius: 0.9rem;
  margin-top: 0.4rem;
}
h1 {
  font-size: 0.44rem;
  font-weight: bold;
  margin: 0.5rem 0;
}
.c-list1 {
  display: flex;
  border-bottom: 1px solid #d8d8d8;
}
.c-list1 .c-item1 {
  margin-right: 0.4rem;
  font-size: 0.28rem;
  margin-bottom: 0.4rem;
}
.insp {
  margin: 0.4rem 0;
  display: flex;
  justify-content: space-between;
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
.librarys_item a {
  color: #000;
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
.video-list {
  display: flex;
}
.citem {
  width: 50%;
  margin: .45rem 0;
  text-align: center;
}
.citem a {
  text-decoration: none;
  color: #000;
}
.citem video {
  width: 80%;
  object-fit: fill;
}
.citem .ileft {
  position: relative;
}
.citem .ileft .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: .48rem;
  width: .8rem;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  display: block;
}
.citem .title {
  display: block;
  font-size: .24rem;
  margin-bottom: 0.2rem;
  margin-top: 0.1rem;
}
</style>