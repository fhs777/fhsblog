<template>

  <a-layout>

    <a-layout-content :style="{ padding: '0 25px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <card 
        v-for="content in contents"
        :key="content.index"
        :content="content"></card>
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
      timelines: [],
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
      this.$store.commit('initialize_timeline',this.timelines);
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
  min-height: 70vh;
  line-height: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
}






</style>