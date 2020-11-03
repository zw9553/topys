<template>
  <div id="app">
    <router-view />
    <div class="nav">
      <router-link :to="'/'+list.path" v-for="(list,index) in lists" :key="index" @click.native="bar(index)" :class="{on:num==index}">
        <span :class="'iconfont icon-'+list.icon"></span>
        <span class="txt">{{list.txt}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num:0,
      lists:[
        {
          path:"",
          icon:"shouye1",
          txt:"首页"
        },
        {
          path:"creative",
          icon:"xueyuan-dakakecheng",
          txt:"创意学院"
        },
        {
          path:"collect",
          icon:"shoucang1",
          txt:"收藏"
        },
        {
          path:"mine",
          icon:"wode",
          txt:"我的"
        }
      ]
    }
  },
  methods:{
    bar(i) {
      this.num=i
    }
  },
  watch: {
    $route:{
      handler(to) {
        to.path=='/creative'?this.num=1:to.path=='/collect'?this.num=2:to.path=='/mine'?this.num==3:this.num==0
      },
      immediate:true
    }
  }
};
(function() {
  function w() {
    var r = document.documentElement;
    var a = r.getBoundingClientRect().width;
    if (a > 750) {
      a = 750;
    }
    var rem = a / 7.5;
    r.style.fontSize = rem + "px";
  }
  w();
  var t;
  window.addEventListener(
    "resize",
    function() {
      clearTimeout(t);
      t = setTimeout(w, 300);
    },
    false
  );
})();
</script>

<style scoped>
#app {
  font-size: 0.32rem;
  width: 90%;
  margin-left: 5%;
}
.nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: .24rem 0;
    background: #fff;
    border-top: 1px solid #999;
}
.nav a {
  display: inline-block;
  width: 25%;
  text-align: center;
  text-decoration: none;
  color:#999;
}
.nav a span {
  display: block;
  margin-bottom: 5px;
}
.nav a .iconfont {
  font-size: .4rem;
  color: #999;
}
.nav a.on {
  color: #333;
}
.nav a.on .iconfont {
  color: #333;
}
.nav a .txt {
  font-size: .24rem;
}
</style>