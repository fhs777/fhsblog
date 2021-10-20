<template>

  
      <card 
        v-for="content in contents"
        :key="content.index"
        :content="content"></card>




</template>
<script>
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { getarticles } from '../api/api'

const card = defineAsyncComponent(() => import('../components/card.vue'))

export default defineComponent({
  data() {
    return {
      contents: [
      ]
    }
  },
  components: { card },
  setup() {
    return {
      selectedKeys: ref(['2']),
    };
  },

  methods: {
    async getcontent() {
      const articles = await getarticles();
      console.log(articles)
      let tag = (this.$route.path + '').split('/')[2];
      this.contents =[];
      let articlesBycate = articles.data.filter((item) => {
        return item.tags.includes(tag);
      })
      articlesBycate.forEach(element => {
        let content = {};
        content.id = element._id;
        content.title = element.title;
        content.category = element.category;
        content.introduction = element.introduction;
        content.post_date = element.post_date;
        this.contents.push(content)
      });
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