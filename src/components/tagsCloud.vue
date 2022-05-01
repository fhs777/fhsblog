<template>
<div class="bloginfo_info">
  <div class="title">
    标签云
  </div>
  <div class="webinfo">
    <a 
      v-for="(tag, values, index) in this.$store.state.tags"
      :key="index"
      @click="getarticleBytage(values, tag)"
      :style="{fontSize: getfontsize(tag) + 'px', color: getcolor(tag) }">
      {{ values }}
    </a>

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
      getcolor(tag) {
          
        let color = 'rgb('+ (66 + ((tag*2)) * 19) +','+ (66 - ((tag*2)) * 11) +','+ (66 + ((tag*2)) * 15) +')'
        console.log(color)
        return color
      },
      getfontsize(tag) {
        let fontsize = (14 + tag*3) ;
        return fontsize 
      },
      getarticleBytage(values) {
        console.log(values);
        this.$router.push({ path: `/tags/${values}` })

        
      },
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
    overflow: hidden;
    width: 100%;
    margin-top: 6px;
    a {
      padding: 0 5px;
    }
  }
}


</style>