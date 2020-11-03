<template>
<!-- 首页 -->
  <div class="home">
    <div class="title">
      <h1>TOPYS.</h1>
      <span class="iconfont icon-caidan"></span>
    </div>
    <!-- tab切换 -->
    <ul class="h-list">
      <li class="h-item" :class="{on:num==index}" v-for="(tab,index) in tabs" :key="index" @click="change(index,tab)">{{tab}}</li>
    </ul>
    <!-- 作品列表 -->
    <ul class="main-list">
      <li class="main-item" v-for="(list,index) in lists" :key="index">
        <!-- 跳转作品详情 -->
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      txt:'创意',
      tabs:['创意','设计','商业','艺术','文化','科技'],
      lists:[],
      num:''
    }
  },
  methods:{
    getData(i) {
      this.axios.get("http://localhost:3000/list?type="+i).then(res=> {
        this.lists=res.data.data
      }).catch(err=> {
        console.log(err)
      })
    },
    change(t,i) {
      this.num=t
      this.getData(i)
    }
  },
  mounted() {
    this.getData(this.txt)
  }
}
</script>

<style scoped>
  .home {
    margin-bottom: 1.5rem;
  }
  .title {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
  }
  .title h1 {
    font-size: .48rem;
    font-weight: bold;
  }
  .title .iconfont {
    font-size: .48rem;
  }
  .h-list {
    border-bottom: 1px solid #ddd;
    display: flex;
    width: 100%;
    overflow-x: auto;
    height: .92rem;
    line-height: .92rem;
  }
  .h-list .h-item {
    flex-shrink: 0;
    margin-right: .3rem;
    font-size: .28rem;
    color: #9a9a9a;
  }
  .h-list .h-item.on {
    color: #000;
    border-bottom: 2px solid #000;
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
</style>
