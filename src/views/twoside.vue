<template>


  <div class="main_container">

    <div class="laycontent"> 

      <router-view></router-view>

     <!--<card 
        v-for="content in contentspage"
        :key="content.index"
        :content="content"></card>
        
      <a-pagination 
        :style="{ marginTop: '30px'}"
        v-model:current="currentPage" 
        :total="totalArts" 
        :page-size="5"
        @change="onPagechange">
      </a-pagination>
      -->
    </div>
    
    <!--
       <a-layout-content 
        :style="{ padding: '0 25px 0 60px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}" 
        :class="laycontent">
      
     <card 
        v-for="content in contentspage"
        :key="content.index"
        :content="content"></card>
        
      <a-pagination 
        :style="{ marginTop: '30px'}"
        v-model:current="currentPage" 
        :total="totalArts" 
        :page-size="5"
        @change="onPagechange"></a-pagination>
    </a-layout-content>
     -->

     

      <div class="sider">
       <personalInfo> </personalInfo>
       <router-view name="sider_item"></router-view>
      </div>

<!--
      <div class="drawer">
        <personalInfo> </personalInfo>
        <div class="dividing_line"></div>
        <div class="menu_item">
          <a class="site_page"><img style="height: 24px" src="/search.svg"><span>主页</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>技术梳理</span></a>
          <a class="site_page"><img style="height: 24px" src="/search.svg"><span>项目踩坑</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>面试八股</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/menu.svg"><span>随便说说</span></a>
          <a class="site_page"><img style="height: 24px" src="/search.svg"><span>主页</span></a>
        </div>
      </div>

-->
    

   <!--
    <a-layout-sider width="29vw" :style="{ marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="sider">
       <personalInfo> </personalInfo>
      </div>
    </a-layout-sider> 
    -->

  </div>

</template>
<script>
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { getarticles } from '../api/api'

//const card = defineAsyncComponent(() => import('../components/card.vue'))

//const articleInfo = defineAsyncComponent(() => import('../components/articleInfo.vue'))
const personalInfo = defineAsyncComponent(() => import('../components/personalInfo.vue'))
//import  card  from '../components/card.vue'
//import  personalInfo  from '../components/personalInfo.vue'
export default defineComponent({
  data() {
    return {
      contents: [],
      contentspage: [],
      timelines: [],
      currentPage: 1,
      totalArts: 0,
    }
  },
  components: { 
      //card,
      personalInfo,
      //articleInfo,
    },
  setup() {
     
    return {
      selectedKeys: ref(['2']),
    
    };
  },

  methods: {
    async getcontent() {
      const articles = await getarticles();
      console.log(articles.data);
      this.contents =[];
      articles.data.forEach(element => {
        let content = {};
        let timeline = {};
        content.id = element._id;
        content.title = element.title;
        content.category = element.category;
        content.introduction = element.introduction;
        content.post_date = element.post_date;
        this.contents.push(content)

        timeline.id = element._id;
        timeline.title = element.title;
        timeline.post_date = element.post_date;
        this.timelines.push(timeline);
      });
      this.totalArts = this.contents.length
      this.$store.commit('initialize_timeline',this.timelines);
      this.onPagechange(1);
    },

     onPagechange(current) {
      console.log(current);
      this.contentspage = this.contents.slice(current * 5 - 5, current * 5)
    },

   
  },
  created() {
    this.getcontent()  
  },
  mounted() {
    console.log('123')
    console.log(personalInfo.fhsname)
  }
});
</script>
<style scoped>


.main_container {
  display: flex;
  flex-wrap: nowrap;

}

.laycontent {
  text-align: center;
  flex: 0 5 80vw;
  width: 100%;
  padding: 0 4vw 0 2vw;
  margin-top: 8vh ;
  min-height: 100%;
  background: rgb(244, 244, 244);
  border: 1px solid red;
 
}



.sider {
  flex: 0 3 18vw;
  padding-top: 12vh;
  margin-right: 6vw;
  color: rgb(0, 0, 0);
  min-height: 60vh;
  line-height: 3vh;
  background-color: rgb(244, 244, 244);
  border: 1px solid rgb(6, 93, 255);
}

.drawer {
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  overflow: scroll;
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

span {
  margin-left: 40px;
    color: black;
}

img {
  margin-top: -2px;
}




@media screen and (max-width: 800px) {
  
    .sider {
      display: none;
    }

    .laycontent {
      flex-basis: 100vw;
      padding: 0 8vw 0 2vw;
      
    }

    .drawer {
      display: unset;
      min-height: 100vh;
      background-color: rgb(255, 255, 255);
      z-index: 9999;
    }
}



</style>