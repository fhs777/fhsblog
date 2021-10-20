<template>
    
        <div class="container">
        <div 
          class="category"
          v-for="(item, index) in this.$store.state.category"
          :key="index">
          <FolderAddTwoTone twoToneColor="#eb2f96" />
          <span class="catename" @click="getarticleBycate(item)">{{item}}</span>
        <span> 【{{ this.$store.state.account[index] }}】</span>
        </div>
        </div>
  

</template>

<script>




import {
  FolderAddTwoTone,
} from '@ant-design/icons-vue';

export default ({
  data() {
    return {
      contents: [
      ]
    }
  },
  components: { FolderAddTwoTone},
  setup() {
    return {
     
    };
  },

  methods: {
    getarticleBycate(cate) {
            console.log(cate);
            this.$router.push({ path: `/category/${cate}` })
            
        },
  },
  created() {
    console.log(this.$store.state.category)
    console.log(this.$store.state.tags)
  }
});
</script>
<style scoped>


.container {
    text-align: left;
    margin: 4vh 0 2vh 8vw;
    min-height: 20vh;
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 0px 15px #b3b3b3;
}

.category {
  font-size: 1.1rem;
  margin-top: 1vh;
}

.catename {
  cursor: pointer;
  margin-left: 1rem;
  margin-right: .6rem;
}



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