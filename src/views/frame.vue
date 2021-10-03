<template>

  <a-layout :style="{  minHeight: '100vh' }" >
    <transition name="header">
    <a-layout-header 
    class="header"
    v-if="show">
    <div class="logo"></div>
      <a-menu
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        @click="handleClick"
        class="menu">
        <a-menu-item key="home">主页</a-menu-item>
        <a-menu-item key="technology">技术</a-menu-item>
        <a-menu-item key="daily">随笔</a-menu-item>
        <a-menu-item key="time_line">归档</a-menu-item>
      </a-menu>
  <div class="container">
      <a-input-search
      v-model:value="value"
      placeholder="input search text"
      class="search"
      @search="onSearch"
    />
  </div>
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
      console.log(e.key)
      this.$router.push('/'+e.key)
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
  float: right;
  line-height: 64px;
  background-color: inherit;
  
}


.sider {
  margin-top: 4vh;
  margin-right: 12vw;
  color: rgb(0, 0, 0);
  min-height: 70vh;
  line-height: 120px;
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
}


 .logo {
  width: 120px;
  height: 31px;
  background: rgb(252, 11, 11);
  margin: 16px 24px 16px 0;
  float: left;
}




</style>