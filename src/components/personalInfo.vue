<template>
<div class="personal_info">
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
</div>
</template>

<script>

export default {
    data() {
      return {
         fhsname: 'fhsfhs',
      }
       
    },
  
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


.personal_info {
  text-align: center;
  color: rgb(0, 0, 0);
  min-height: 4vh;
  line-height: 2rem;
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
}
.imgborder {
  margin-top: 4vh;
  width: 95px;
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



@media screen and (max-width: 800px) {

   .imgborder {
      width: 105px;
      margin-bottom: -1vh;
    }

    .personal_info {
      box-shadow: none;
    }

    .name {
      visibility: hidden;
    }

    .laycontent {
      flex-basis: 100vw;
      padding: 0 8vw 0 2vw;
      
    }

    .headcontainer {
      font-weight: 400;
      margin: -16% 11% 0;
      color: #000000;
    }

    .length {
      font-size: 1.05rem;
    }

   
}




</style>