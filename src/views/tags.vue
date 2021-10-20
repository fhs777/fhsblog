<template>
   
        <div class="container">
        <a 
          v-for="(tag, values, index) in this.$store.state.tags"
          :key="index"
          @click="getarticleBytage(values, tag)"
          :style="{fontSize: getfontsize(tag) + 'px', color: getcolor(tag) }">
          {{ values }}
        </a>
        </div>

    
</template>

<script>





export default ({
  data() {
    return {
      contents: [
      ]
    }
  },
  components: { },
  setup() {
    return {
     
    };
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
  created() {
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

a {
  color: rgb(66, 66, 66);
  margin: 6px 8px;
  
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