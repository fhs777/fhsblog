<template>


  <div class="main_container">

    <div class="laycontent"> 
      <router-view></router-view>
    </div>
    
    <div class="sider">
      <personalInfo> </personalInfo>
      <router-view name="sider_item"></router-view>
    </div>

  </div>

</template>
<script>
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { getarticles } from '../api/api'




const personalInfo = defineAsyncComponent(() => import('../components/personalInfo.vue'))

export default defineComponent({
  data() {
    return {
      contents: [],
      contentspage: [],
      timelines: [],
      totalArts: 0,
    }
  },
  components: { 
      personalInfo,
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
  background-color: white;
  display: flex;
  flex-wrap: nowrap;

}

.laycontent {
  text-align: center;
  flex: 0 5 70vw;
  width: 100%;
  padding: 0vh 0.5vw 2vh 14vw;
  margin-top: 11vh ;
  min-height: 100%;

 
 
}



.sider {
  flex: 0 3 15vw;
  padding-top: 11vh;
  margin-right: 6vw;
  color: rgb(0, 0, 0);
  min-height: 60vh;
  line-height: 3vh;
  background-color: rgb(255, 255, 255);
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
      padding: 0 2vh 0 2vh;
      
    }

    .drawer {
      display: unset;
      min-height: 100vh;
      background-color: rgb(255, 255, 255);
      z-index: 9999;
    }
}



</style>