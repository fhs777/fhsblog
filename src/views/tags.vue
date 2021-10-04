<template>
     <a-layout>

    <a-layout-content :style="{ padding: '0 25px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
        <div class="container">
        <a 
          v-for="(tag, values, index) in this.$store.state.tags"
          :key="index"
          @click="getarticleBytage(values, tag)"
          :style="{fontSize: getfontsize(tag) + 'px', color: getcolor(tag) }">
          {{ values }}
        </a>
        </div>
    </a-layout-content>
    <a-layout-sider width="29vw" :style="{ marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="sider">
       <personalInfo> </personalInfo>

      </div>
    </a-layout-sider>

  </a-layout>
</template>

<script>

import { defineAsyncComponent } from 'vue';
const personalInfo = defineAsyncComponent(() => import('../components/personalInfo.vue'))


export default ({
  data() {
    return {
      contents: [
      ]
    }
  },
  components: { personalInfo},
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