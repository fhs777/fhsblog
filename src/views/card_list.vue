<template>
    <div class="cardlistContainer">
      <card 
          v-for="content in contentspage"
          :key="content.index"
          :content="content"></card>
          
      <a-pagination 
          :style="{ margin: '4vh 0 1vh 0'}"
          :total="totalArts" 
          :page-size="5"
          @change="onPagechange">
      </a-pagination>
    </div>
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
            totalArts: 0,  //warn修改未完成
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
        content.last_update = element.last_update;
        content.tags = element.tags;
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
  mounted() {
    this.getcontent()  
  }
    
}
</script>

<style lang="less" scoped>
  .cardlistContainer {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgb(242, 235, 235);
    box-shadow: white 0px 0px 10px;
    border-radius: 5px;
  }
</style>