<template>
    <card 
        v-for="content in contentspage"
        :key="content.index"
        :content="content"></card>
        
    <a-pagination 
        :style="{ margin: '4vh 0 1vh 0'}"
        v-model:current="currentPage" 
        :total="totalArts" 
        :page-size="5"
        @change="onPagechange">
    </a-pagination>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { getarticles } from '../api/api'


const card = defineAsyncComponent(() => import('../components/card.vue'))
export default {
    data() {
        return {
            content: [],
            timelines: [],
            contentspage: [],
        }
    },
    components: { 
      card,
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
    
}
</script>