<template>
<!-- 创意学院的每一个tab的内容列表 -->
  <div class="class">
    <div class="types" v-show="isdis">
      <router-link
        :to="'/class/'+tab"
        class="txt"
        :class="{on:num==index||txt==tab}"
        @click.native="bar(index,tab)"
        v-for="(tab, index) in tabs"
        :key="index">{{ tab }}</router-link>
    </div>
    <ul class="con-list" v-show="isdis">
      <li class="con-item" v-for="(list,index) in lists" :key="index">
        <!-- 跳转到课程详情 -->
        <router-link :to="'/classdetail/'+list.id">
          <video :src="list.cover"></video>
          <span class="title">{{list.title}}</span>
          <span class="author">{{list.desc}}</span>
        </router-link>
      </li>
    </ul>
    <!-- 单独优惠专区 -->
    <div class="top" v-show="!isdis">
      <div class="quit">
        <span class="iconfont icon-icon-test1" @click="back"></span>
        <span class="iconfont icon-fenxiang_2"></span>
      </div>
    </div>
    <div class="top-con" v-show="!isdis">
      <h2 class="title">商业世界里的品牌设计法则</h2>
      <div class="price">
        <span class="newprice">￥68.00</span>
        <del class="oldprice">￥90</del>
      </div>
      <div class="desc">
        内含刘耕名、Tom Pearson、Daan Roosegaarde三位大设计师的 完整视频课程，组合购买即享优惠！
      </div>
      <div class="line"></div>
      <div class="title">课程介绍合集</div>
      <div class="intro">
        <p>Cyber类金狮奖和全场大奖；作为品牌主获得艾菲媒体策略实效金奖；以及凭借Anomaly创作并共同拥有的一个电视节目荣获两座美国艾美奖及英国水星音乐奖。</p><p>李巍是Anomaly上海办公室合伙人之一。<br>曾担任智威汤逊上海董事总经理，与周锦祥一起坚持推动该机构不断走在市场前沿——包括提高其互动营销能力并加深品牌管理深度。</p>
      </div>
    </div>
    <ul class="con-lists1" v-show="!isdis">
      <li class="con-item1" v-for="(list,index) in lists" :key="index">
        <h1>{{'0'+(++index)}}</h1>
        <div class="content">
          <router-link :to="'/classdetail/'+list.id">
            <div class="l">
              <span class="price">￥30.00</span>
              <span class="title">{{list.title.slice(0,4)}}</span>
              <span class="author">{{list.desc}}</span>
            </div>
            <div class="r">
              <video :src="list.cover"></video>
            </div>
          </router-link>
        </div>
        <div class="text" v-html="list.txt"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  name: "Class",
  data() {
    return {
      num:-1,
      txt:'',
      isdis:true,
      lists:[],
      tabs: [
        "全部",
        "平面设计",
        "品牌策略",
        "美学教育",
        "内容营销",
        "新消费",
        "数字技术",
        "工业设计",
        "建筑空间",
      ],
    }
  },
  methods: {
    back() {
      router.go(-1)
    },
    bar(i,t) {
      this.num=i
      this.txt=t
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.num=-1
        this.txt=to.params.type
        if (to.params.type!='优惠专区') {
          this.isdis=true
          this.axios.get("http://localhost:3000/class?type=" + to.params.type).then((res) => {
            this.lists=res.data.data
          }).catch((err) => {
            console.log(err);
          });
        }else {
          this.isdis=false
          this.axios.get("http://localhost:3000/class?type=" + to.params.type).then((res) => {
            this.lists=res.data.data
            this.$nextTick(()=> {
            var videos=document.getElementsByTagName('video')
            videos.forEach(val => {
              val.style.width="100%"
              val.style.height="4rem"
            });
            var imgs=document.getElementsByTagName('img')
            imgs.forEach(val => {
              val.style.display="none"
            });
            var tops=document.getElementsByClassName('minds-video-modal-left')
            tops.forEach(val => {
              val.style.display="none"
            });
          })
          }).catch((err) => {
            console.log(err);
          });
          
        }
      },
      immediate: true,
    },
  }
};
</script>

<style scoped>
.class {
  line-height: .42rem;
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
.types {
  display: flex;
  flex-wrap: wrap;
}
.types .txt {
  text-decoration: none;
  display: inline-block;
  margin: 0.2rem;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 1.36rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  border-radius: 0.4rem;
  box-sizing: border-box;
  font-size: 0.24rem;
}
.types .txt.on {
  background: #000;
}
.con-item {
  margin: .3rem 0;
}
.con-item a {
  text-decoration: none;
  color: #000;
}
.con-item a video {
  width: 100%;
  margin-bottom: 0.4rem;
}
.con-item a span {
  display: block;
  color: #9a9a9a;
}
.con-item a .author {
  font-size: .24rem;
  margin-top: 0.2rem;
}
.top {
  background: url("https://img-sz.topys.cn/2020-09-26/1601088621489.jpg?x-oss-process=style/article-pic-list-webp-1x") no-repeat;
  width: 110%;
  height: 4rem;
  margin-left: -5%;
  background-size: 100%;
}
.quit {
  display: flex;
  justify-content: space-between;
  padding: .3rem 5% 0 5%;
}
.quit span {
  display: inline-block;
  font-size: .42rem;
  color: #fff;
}
.top-con h2 {
  font-size: .34rem;
  margin: .3rem 0;
}
.top-con .price .newprice {
  font-size: .34rem;
  font-weight: bold;
}
.top-con .price .oldprice, .top-con .desc {
  font-size: .24rem;
  color: #9a9a9a;
}
.top-con .line {
  border-bottom: 1px solid #d8d8d8;
  margin-top:.4rem;
}
.top-con .title {
  font-size: .28rem;
  margin-top: 0.3rem;
}
.top-con .intro p {
  font-size: .28rem;
  color: #9a9a9a;
  margin-top: .4rem;
}
.con-item1 .content .r video {
  display: block;
  width: 2rem !important;
  height: 2rem !important;
  object-fit: fill;
}
.con-item1 h1 {
  font-size: .48rem;
  font-weight: bold;
  margin: .4rem 0 .2rem 0;
}
.con-item1 .content a {
  display: flex;
  justify-content: space-between;
  color: #000;
}
.con-item1 .l {
  position: relative;
  padding-left: .2rem;
  box-sizing: border-box;
  width: 100%;
  font-size: .24rem;
  background: #ccc;
}
.con-item1 .l span {
  position: absolute;
  display: block;
}
.con-item1 .l .price {
  font-weight: bold;
}
.con-item1 .l .title {
  bottom: .6rem;
  color: #333;
}
.con-item1 .l .author {
  bottom: .2rem;
  color: #666;
}
.con-item1 .text {
  margin-top: 0.2rem;
  color:#9a9a9a;
  font-size: .28rem;
}
</style>