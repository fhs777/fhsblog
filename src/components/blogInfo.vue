<template>
<div class="bloginfo_info">
  <div class="title">
    网站资讯
  </div>
  <div class="webinfo">
    <div class="webinfo_item">
      <span class="itemname">文章数目：</span>
      <span class="itemcount">{{ bloginfo.articlesNumber }}</span>
    </div>
    <div class="webinfo_item">
      <span class="itemname">已运行时间：</span>
      <span class="itemcount">{{ bloginfo.onlineTime }} 天</span>
    </div>
    <div class="webinfo_item">
      <span class="itemname">本站总字数：</span>
      <span class="itemcount">{{ bloginfo.totalWords }}</span>
    </div>
    <div class="webinfo_item">
      <span class="itemname">最后更新时间：</span>
      <span class="itemcount">{{ bloginfo.lastUpdate > 0 ? bloginfo.lastUpdate + ' 天前' : '今天' }} </span>
    </div>
  </div>
</div>
</template>

<script>

import { get_bloginfo } from '../api/api'

export default {
    props: {
      
    },
    data() {
      return {
         fhsname: 'fhsfhs',
         bloginfo: {
           articlesNumber: Number,
           onlineTime: Number,
           lastUpdate: Number,
           totalWords: Number,
         }
      }
       
    },
  
    methods: {
     
    },
    
    computed: {
   
    },

    created() {
      get_bloginfo('basicinfo').then(res => {
        console.log('basicinfo')
        console.log(res)
        this.bloginfo.articlesNumber = res.data[0].articlesNumber
        let date1 = new Date()  //现在
        let date2 = new Date(res.data[0].onlineDate)  //网站上线时间
        this.bloginfo.onlineTime = Math.floor((date1.getTime() -  date2.getTime())/(1000 * 24 * 60 * 60))
        date2 = new Date(res.data[0].lastUpdate)  //最后更新时间
        this.bloginfo.lastUpdate = Math.floor((date1.getTime() -  date2.getTime())/(1000 * 24 * 60 * 60))
        this.bloginfo.totalWords = res.data[0].totalWords
      }).catch(error => {
        console.log(error);
      })  
    },
}
</script>

<style lang="less" scoped >


.bloginfo_info {
  margin-top: 20px;
  text-align: left;
  color: #32325d;
  padding: 15px 20px;
  min-height: 4vh;
  line-height: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.615);
  box-shadow: rgb(232, 232, 232) 0px 0px 10px;
  border-radius: 10px;

  .title {
    font-size: 1.2rem;
  }

  .webinfo {
    margin-top: 5px;
    padding-left: 10px;
    .webinfo_item {
      display: flex;
      .itemname {
        flex: 1 1 auto;
      }
    }
  }
}


</style>