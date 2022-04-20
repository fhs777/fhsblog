<template>
<div class="bloginfo_info">
  <div class="title">
    网站资讯
  </div>
  <div class="webinfo">
    <div class="webinfo_item">
      <span class="itemname">文章数目：</span>
      <span class="itemcount">13</span>
    </div>
    <div class="webinfo_item">
      <span class="itemname">已运行时间：</span>
      <span class="itemcount">55days</span>
    </div>
    <div class="webinfo_item">
      <span class="itemname">本站总字数：</span>
      <span class="itemcount">2221</span>
    </div>
    <div class="webinfo_item">
      <span class="itemname">最后更新时间：</span>
      <span class="itemcount">1tianqian</span>
    </div>
  </div>
</div>
</template>

<script>

export default {
    props: {
      
    },
    data() {
      return {
         fhsname: 'fhsfhs',
      }
       
    },
  
    methods: {
     
    },
    
    computed: {
   
    }
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