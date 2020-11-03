<template>
<!-- 创意学院 -->
  <div class="creative">
    <div class="himg">
      <img src="https://pic.topys.cn/editor/20200311/1171958153.png" alt="">
    </div>
    <!-- 轮播swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="https://pic.topys.cn/editor/20200224/2088842195.png?x-oss-process=image/resize,w_1980,limit_0/auto-orient,1/format,webp" alt="">
        </div>
        <div class="swiper-slide">
          <img src="https://pic.topys.cn/editor/20200224/603224491.png?x-oss-process=image/resize,w_1980,limit_0/auto-orient,1/format,webp" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <!-- tab切换 -->
    <ul class="tabs">
      <li class="tab-item" v-for="(tab,index) in tabs" :key="index">
        <!-- 跳转类别列表 -->
        <router-link :to="'/class/'+tab.txt">
          <img :src="tab.url" alt="">
          <span class="txt">{{tab.txt}}</span>
        </router-link>
      </li>
    </ul>
    <div class="new">
      <img src="../assets/img/new.jpg" alt="">
    </div>
    <!-- 热门课程列表 -->
    <h2>热门课程</h2>
    <ul class="clist">
      <li class="citem" v-for="(list,index) in lists" :key="index">
        <!-- 跳转课程详情 -->
        <router-link :to="'/classdetail/'+list.id">
          <div class="ileft">
            <video :src="list.cover" :poster="list.img"></video>
            <span class="iconfont icon-ziyuan"></span>
          </div>
          <div class="iright">
            <span class="title">{{list.title}}</span>
            <span class="author">{{list.desc}}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="new">
      <img src="../assets/img/new1.jpg" alt="">
    </div>
    <!-- 精选课程列表 -->
    <h2>精选课程</h2>
    <ul class="clist1">
      <li class="citem1" v-for="(list,index) in lists1" :key="index">
        <!-- 跳转课程详情 -->
        <router-link :to="'/classdetail/'+list.id">
        <div class="video">
          <video @click="jump(list.id)" :src="list.cover" :poster="list.img"></video>
          <span class="iconfont icon-ziyuan"></span>
        </div>
        <span class="title">{{list.title}}</span>
        <span class="author">{{list.desc}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Creative",
  data() {
    return {
      lists:[],
      lists1:[],
      tabs:[
        {
          url:require('../assets/img/1.jpg'),
          txt:"平面设计"
        },
        {
          url:require('../assets/img/2.jpg'),
          txt:"品牌策略"
        },
        {
          url:require('../assets/img/3.jpg'),
          txt:"美学教育"
        },
        {
          url:require('../assets/img/4.jpg'),
          txt:"内容营销"
        },
        {
          url:require('../assets/img/5.jpg'),
          txt:"新消费"
        },
        {
          url:require('../assets/img/6.jpg'),
          txt:"数字技术"
        },
        {
          url:require('../assets/img/7.jpg'),
          txt:"工业设计"
        },
        {
          url:require('../assets/img/8.jpg'),
          txt:"建筑空间"
        },
        {
          url:require('../assets/img/9.jpg'),
          txt:"优惠专区"
        },
        {
          url:require('../assets/img/10.jpg'),
          txt:"全部"
        }
      ]
    }
  },
  mounted() {
    new Swiper('.swiper-container', { 
      pagination: {
        el: '.swiper-pagination',
        clickable:true,
      },
    }),
    this.axios.get('http://localhost:3000/video').then(res=> {
      this.lists=res.data.data
    }).catch(err=> {
      console.log(err)
    })
    this.axios.get('http://localhost:3000/video1').then(res=> {
      this.lists1=res.data.data
    }).catch(err=> {
      console.log(err)
    })
    this.$nextTick(()=> {
      var swiper_pagination=document.getElementsByClassName('swiper-pagination-bullet')
      swiper_pagination.forEach(val => {
        val.style.background="#fff"
      });
    })
  }
}
</script>
<style scoped>
  @import '../assets/css/swiper.min.css';
  .creative {
    margin-bottom: 2rem;
  }
  .himg img {
    width: 60%;
    margin: .3rem 0;
  }
  .swiper-slide img {
    width: 100%;
  }
  .swiper-pagination {
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    bottom: 0;
  }
  h2 {
    margin: .2rem 0;
  }
  .citem {
    margin: .45rem 0;
  }
  .citem .ileft {
    width: 45%;
    margin-right: 0.3rem;
    flex-shrink: 0;
    position: relative;
  }
  .citem .ileft video {
    width: 100%;
    object-fit: fill;
  }
  .citem .ileft .iconfont, .citem1 .video .iconfont {
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
  .citem .iright .title {
    display: block;
    font-size: .28rem;
    margin-bottom: 0.2rem;
    margin-top: 0.1rem;
  }
  .citem .iright .author,.citem1 .author {
    font-size: .24rem;
    color:#666;
  }
  .citem1 a {
    text-decoration: none;
    color: #000;
  }
  .citem1 .video {
    position: relative;
  }
  .citem1 video {
    width: 100%;
    object-fit: fill;
  }
  .citem1 .video .iconfont {
    font-size: .58rem;
  }
  .citem1 span {
    display: block;
    margin: .2rem 0;
  }
  .citem1 .title {
    font-size: .28rem;
  }
  .tabs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .tab-item {
    width: 20%;
    flex-shrink: 0;
    font-size: .24rem;
    text-align: center;
  }
  .tab-item img {
    width: 80%;
  }
  .tab-item .txt {
    display: block;
    font-size: .24rem;
  }
  .new img {
    width: 100%;
    margin: .2rem 0;
  }
  .tab-item a {
    text-decoration: none;
    color: #000;
  }
  .citem a {
    display: flex;
    text-decoration: none;
    color: #000;
  }
</style>
