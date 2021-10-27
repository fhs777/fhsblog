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
        <span @click="showSearchmodal()"><img style="height: 3.5vh" src="/search.svg">搜索</span>
        <span @click="handleClick('home')">主页</span>
        <span @click="handleClick('technology')">技术</span>
        <span @click="handleClick('daily')">随笔</span>
        <span @click="handleClick('time_line')">归档</span>
        <span @click="showSearchmodal()" class="s_svg"><img style="height: 5vh" src="/search.svg"></span>
        <span class="s_svg" @click="drawer_show(true)"><img style="height: 5vh" src="/menu.svg"></span>
      </div>
    </a-layout-header>
    </transition>



    <a-modal 
    v-model:visible="visible" 
    :footer="null">
    <template #title>
        <p>搜索信息</p> 
        <p style="margin-bottom: 0px;">
          <input 
          class="inputtext" 
          type="text" 
          placeholder="搜索文章"
          v-model="search_text"
          @keyup.enter="getcontent()">
        </p>
      </template>

      <a-list 
        size="small" 
        :locale= "loacle" 
        :data-source="contents"
        :pagination="pagination">
          <template  #renderItem="{ item }">
            <a-list-item style="padding-left: 20px;margin: 0;">{{ item.title }}</a-list-item>
          </template>
        </a-list>  
    </a-modal>

    <div id="mask" @click="drawer_show(false)">
      <input >
    </div>
    <div id="drawer">
        <personalInfo> </personalInfo>
        <div class="dividing_line"></div>
        <div class="menu_item">
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">主页</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">技术梳理</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">项目踩坑</span></a>
          <a class="site_page"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">随便说说</span></a>
        </div>
      </div>

   <router-view></router-view>

    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>

</template>
<script>
import { getarticles } from './api/api'
import { defineComponent, ref, defineAsyncComponent } from 'vue';
const personalInfo = defineAsyncComponent(() => import('./components/personalInfo.vue'))


export default defineComponent({
  data() {
    return {
      contents: [],
      contents_page:[],
      head_show: 'fixed',
      scroll_top: 0,
      show: true,
      d_show: true,
      search_text:'',
      loacle: {
        emptyText: '暂无数据'
      }
    }
  },

  setup() {
    const visible = ref(false);
    const selectedKeys = ref(['1']);

    const showSearchmodal = () => {
      visible.value = true;
      console.log('showmodal')
    };

    const pagination = {
      pageSize: 5,
    };


     return {
      visible,
      selectedKeys,
      pagination,
      showSearchmodal,

    };

  },

  components: { 
      personalInfo,

    },

  methods: {

    handleClick(e) {
      console.log('/'+e)
      this.$router.push({path: '/'+e})
    },
    headershow1() {
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

    headershow() {
      console.log('headershow')
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
          console.log(document.documentElement.scrollTop)
          
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
    },

    async getcontent() {
      let search_text = this.search_text
      console.log('stext')
      console.log(search_text)
      const articles = await getarticles();
      console.log(articles.data);
      this.contents =[];
      let search_reg = new RegExp(search_text)
      console.log(search_reg)
      let screen_art = articles.data.filter(item => {
        return (item.title.search(search_reg) != -1)
      })
      screen_art.forEach(element => {
        let content = {};
        content.id = element._id;
        content.title = element.title;
        this.contents.push(content)
      });
      console.log(this.contents)
    },

  },

  created() {
    console.log('initialize_category1')
    this.$store.dispatch('initialize_category')
  },

  Mounted() {  //不触发，原因暂时未知
     window.addEventListener('scroll', this.headershow);
     console.log('initialize_category2')
     this.$store.dispatch('initialize_category')
  }

 
});
</script>
<style scoped>

.header {
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 4;
  height: 10vh;
  width: 100%;
  animation: ease-in 1s;
  z-index: 100;
  box-shadow: 0px 0px 5px  black;
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

.inputtext {
  height: 40px;
  width: 100%;
  border-radius: 15px;
  padding-left: 20px;
}



/* 抽屉组件*/
#drawer {
  position: fixed;
  width: 300px;
  height: 100vh;
  right: -300px;
  overflow: scroll;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  transition:all 0.5s ease-in-out;
  z-index: 9999;
  display: none;
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
 
  position: fixed;
  width: 150vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  transition: 0.5s ease-in-out ;
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

    #drawer {
      z-index: 9999;
      display: unset;
    }

    #mask {
      display: unset;
    }

  
}




 .logo {
  width: 120px;
  height: 31px;
  background: rgb(252, 11, 11);
  margin: 16px 0 16px 0;
  display: inline-block;
}




</style>