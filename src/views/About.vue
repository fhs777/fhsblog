<template>

  <a-layout :style="{  minHeight: '100vh' }" >
    <a-layout-header class="header">
      <div class="logo" />

       

      <a-menu
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        class="menu">
        <a-menu-item key="1">主页</a-menu-item>
        <a-menu-item key="2">技术</a-menu-item>
        <a-menu-item key="3">随笔</a-menu-item>
        <a-menu-item key="4">归档1</a-menu-item>
      </a-menu>

      <a-input-search
      v-model:value="value"
      placeholder="input search text"
      class="search"
      @search="onSearch"
    />
    </a-layout-header>
    <a-layout>
    <a-layout-content :style="{ padding: '0 25px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="content"></div>
      <card 
        v-for="content in contents"
        :key="content.index"
        :content="content"></card>
    </a-layout-content>
    <a-layout-sider width="29vw" :style="{ marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="sider">sieder</div>
    </a-layout-sider>
    </a-layout>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>

</template>
<script>
import { defineComponent, ref } from 'vue';
import { getarticles } from '../api/api'

import card from '../components/card.vue'
export default defineComponent({
  data() {
    return {
      contents: [
      {
        title: '这是一个新的标题1',
        introduction: '这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介',
        post_date: '2021/8/3',
        category: '不知道',
      },
      {
        title: '这是一个新的标题2',
        introduction: '这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介这是一个新的标题简介',
        post_date: '2021/8/3',
        category: '不知道',
      },
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
      console.log(articles.data);
      this.contents =[];
      articles.data.forEach(element => {
        let content = {};
        content.title = element.title;
        content.category = element.category;
        content.introduction = element.introduction;
        content.post_date = element.post_date;
        this.contents.push(content)
      });
    }
  },
  created() {
    this.getcontent()
  }
});
</script>
<style scoped>

.header {
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 1;
  width: 100%;
}

.search {
  width: 200px;
  height: 55%;
  border-radius: 20px;
  margin-left: 17vw;
  position: absolute;
  top: 50%;
  transform: translate(0 , -50%);

}
.menu {
  float: right;
  line-height: 64px;
  background-color: inherit;
}
.content {

 /*
  margin-top: 36px;
  margin-left: 8vw;
  min-height: 70vh;
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
*/
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