<template>

  <a-layout :style="{  minHeight: '100vh' }" >
    <transition name="header">
    <a-layout-header 
    class="header"
    v-if="show">
    <div class="logo"></div>
     <!-- <a-menu
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        @click="handleClick"
        class="menu">
        <a-menu-item key="home">主页</a-menu-item>
        <a-menu-item key="technology">技术</a-menu-item>
        <a-menu-item key="daily">随笔</a-menu-item>
        <a-menu-item key="time_line">归档</a-menu-item>
      </a-menu>
      -->
      <div class="menu">
        <span @click="handleClick('home')">主页</span>
        <span @click="handleClick('technology')">技术</span>
        <span @click="handleClick('daily')">随笔</span>
        <span @click="handleClick('time_line')">归档</span>
        <span class="s_svg"><img style="height: 5vh" src="/search.svg"></span>
        <span class="s_svg" @click="drawer_show(true)"><img style="height: 5vh" src="/menu.svg"></span>
      </div>
    </a-layout-header>
    </transition>



    <div id="mask" @click="drawer_show(false)"></div>
    <div id="drawer">
        <personalInfo> </personalInfo>
        <div class="dividing_line"></div>
        <div class="menu_item">
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">主页</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">技术梳理</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">项目踩坑</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">面试八股</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">主页</span></a>
        </div>
      </div>

   <router-view></router-view>

    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>

</template>
<script>
import { defineComponent, ref, defineAsyncComponent } from 'vue';
const personalInfo = defineAsyncComponent(() => import('./components/personalInfo.vue'))


export default defineComponent({
  data() {
    return {
      contents: [],
      head_show: 'fixed',
      scroll_top: 0,
      show: true,
      d_show: true,
    }
  },

  components: { 
      personalInfo,
    },

  methods: {

    handleClick(e) {
      console.log('/'+e)
      this.$router.push({path: '/'+e})
    },
    headershow() {
      let scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let scroll = scrolltop - this.scroll_top
      this.scroll_top = scrolltop
      if(scroll < 0) {
        this.show = true
      }
      else {
        this.show = false
      }
    },
    
    drawer_show(state) {
      let right_drawer = document.getElementById('drawer');
      let mask = document.getElementById('mask');
      if(state) {
        right_drawer.style.transform ="translateX(-300px)";
        document.body.style.overflowY = "hidden"
        mask.style.display = "unset"
         setTimeout(() => {
          mask.style.opacity = "0.8"
        },10)
        
      }
      else {
        right_drawer.style.transform ="translateX(300px)";
        document.body.style.overflowY = "unset"
        mask.style.opacity = "0"
        setTimeout(() => {
          mask.style.display = "none"
        },500)
        
      }
      
    }

  },
  setup() {

    const selectedKeys = ref(['1']);
    return {
      selectedKeys,
    };
  },
  created() {
    
    this.$store.dispatch('initialize_category')
  },

  mounted() {
     window.addEventListener('scroll', this.headershow);
  }

 
});
</script>
<style scoped>

.header {
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  z-index: 4;
  height: 10vh;
  width: 100%;
  animation: ease-in 1s;
  z-index: 100;
}

.header-enter-active {
  transition:  0.5s ease;
  opacity:0.7
}

.header-leave-active {
  transition: opacity 0.5s ease;
}

.header-enter-from,
.header-leave-to {
  opacity: 0;
}

.container {
  width: 200px;
  border-radius: 20px;
  float: right;


}
.menu {
  font-size: 0.95rem;
  float: right;
  position: relative;
  line-height: 10vh;
  
}

.menu > span {
  display: inline-block;
  height: 10vh - 2px;
  margin: 0 1vw 0 1vw;
  cursor: pointer;
}

.menu > span:hover {
  color: rgb(19, 93, 252);
  border-bottom: 2px solid rgb(19, 93, 252);
}

.menu > .s_svg {
  
  display: none;
  
}

/* 抽屉组件*/
#drawer {
  position: fixed;
  width: 300px;
  height: 100vh;
  top: 0;
  right: -300px;
  overflow: scroll;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  transition:all 0.5s ease-in-out;
  z-index: 9999;
}


.dividing_line {
  width: 95%;
  margin: 2vh auto;
  border-bottom: 3px  rgba(85, 164, 255, 0.596) ;
  border-bottom-style: dashed;
}

.menu_item {
  display: flex;
  flex-direction: column;
  font-size: 1rem;

}

.site_page {
  display: inline-block;
  width: 100%;
  margin: 10px 50px 10px;
  height: 25px;
  vertical-align: middle;

}

.drawer_item {
  margin-left: 40px;
    color: black;
}

#mask {
 
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  border: olive 2px solid;
  transition: 0.5s ease-out ;
  z-index: 9999;
  opacity: 0;
  display: none;

}


@media screen and (max-width: 800px) {
    .menu > span {
      display: none;
    }
    .menu > span:hover {
      color: rgb(19, 93, 252);
      border-bottom: 2px solid rgb(19, 93, 252);
  }

    .menu > .s_svg {
      display: unset;
      display: inline-block;
      height: 10vh - 2px;
      margin: 0 1vw 0 1vw;
      cursor: pointer;

    }
}




 .logo {
  width: 120px;
  height: 31px;
  background: rgb(252, 11, 11);
  margin: 16px 0 16px 0;
  float: left;
}




</style>