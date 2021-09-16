<template>

  <a-layout>

    <a-layout-content :style="{ padding: '0 25px 0 60px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      
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
    <a-layout-sider width="29vw" :style="{ marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="sider">
       <personalInfo> </personalInfo>

      </div>
    </a-layout-sider>

  </a-layout>

</template>
<script>
import { defineComponent, ref } from 'vue';
import { getarticles } from '../api/api'

import  card  from '../components/card.vue'
import  personalInfo  from '../components/personalInfo.vue'
export default defineComponent({
  data() {
    return {
      contents: [
      ],
      contentspage: [],
      timelines: [],
      currentPage: 1,
      totalArts: 0,
    }
  },
  components: { card, personalInfo },
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
  }
});
</script>
<style scoped>







.sider {
  margin-top: 4vh;
  margin-right: 12vw;
  color: rgb(0, 0, 0);
  min-height: 60vh;
  line-height: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
}






</style>