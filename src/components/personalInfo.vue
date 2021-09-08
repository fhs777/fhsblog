<template>
   <img class="imgborder" src='/face.jpg' width="200">
        <p class="name">魏择齐</p>
        <div class="headcontainer">
        <span class="headline">文章</span>
        <br/>
        <span class="length">{{ this.$store.state.timeline.length }}</span>
        </div>
        <div class="headcontainer"  @click="toCategory()">
        <span class="headline">分类</span>
        <br/>
        <span class="length">{{ this.$store.state.category.length }}</span>
        </div>
         <div class="headcontainer" @click="toTags()">
        <span class="headline">标签</span>
        <br/>
        <span class="length"> {{ Object.keys(this.$store.state.tags).length }} </span>
        </div>
</template>

<script>

export default {
  
    methods: {
      toCategory() {
        this.$router.push('/category')
      },
      toTags() {
        this.$router.push('/tags')
      }
    },
    props: {
      
    },
    setup() {
        
    },
}
</script>

<style scoped>

.imgborder {
  margin-top: 4vh;
  width: 100px;
  border-radius: 50%;
}

.name {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1rem;
}

.headcontainer {
  display: inline-block;
  cursor: pointer;
  line-height: 4vh;
  font-weight: 600;
  margin: 0 6%;
  color: #666666;
}




</style>