<template>

  <div class="cardlistContainer">
      <card 
        v-for="content in contents"
        :key="content.index"
        :content="content"></card>

  </div>
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
      let cate = (this.$route.path + '').split('/')[2];
      this.contents =[];
      let articlesBycate = articles.data.filter((item) => {
        return item.category == cate;
      })
      articlesBycate.forEach(element => {
        let content = {};
        content.id = element._id;
        content.title = element.title;
        content.category = element.category;
        content.introduction = element.introduction;
        content.post_date = element.post_date;
        content.last_update = element.last_update;
        content.tags = element.tags;
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

 .cardlistContainer {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgb(242, 235, 235);
    box-shadow: white 0px 0px 10px;
    border-radius: 5px;
  }






</style>