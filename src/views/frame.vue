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
        <span class="s_svg"><img style="height: 5vh" src="/menu.svg"></span>
      </div>
      <!--
  <div class="container">
      <a-input-search
      v-model:value="value"
      placeholder="input search text"
      class="search"
      @search="onSearch"
    />
  </div>
  -->
    </a-layout-header>
    </transition>
   <router-view></router-view>

    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>

</template>
<script>
import { defineComponent, ref } from 'vue';


export default defineComponent({
  data() {
    return {
      contents: [],
      head_show: 'fixed',
      scroll_top: 0,
      show: true,
    }
  },

  methods: {

    handleClick(e) {
      this.$router.push('/'+e)
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