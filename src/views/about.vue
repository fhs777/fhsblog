<template>

    
      
      <div class="article" >
       <!-- <yibu></yibu>  -->

        <v-md-preview :text="text" ref="preview" style="font-size = 1rem" ></v-md-preview>

      </div>




</template>
<script>
import { defineComponent } from 'vue';
import { get_about } from '../api/api'
import { throttle } from '../utils/index'




export default defineComponent({
  data() {
    return {
      article_id: '',
      text: '',
      article_info:{
        post_date: '',
        last_update: '',
        category: '',
        title: '',
        tags: ['',''],
        views: 1,
        comments: 0,
        lazy_img: null,

      },
      anchors_info: {
        item: [],
        top: [],
        active_anchor: 'anchor0',
      },
      imgList: [],
      imgcount: 0, //记录图片懒加载个数
    }
  },
  setup() {
    return {
    };
  },

  components: {  
      //yibu,
    
     
    },
  methods: {
    
  

    imgLazyLoad() {
      //console.log('imglazy')
      let deleteIndex = []
      this.imgList.forEach((item, index) => {

        let rect = item.getBoundingClientRect()
        if((rect.top + window.scrollY - 720) < document.documentElement.scrollTop || document.body.scrollTop) {
          item.src = item.dataset.src
          console.log(item.dataset.src)
          deleteIndex.push(index)
          this.imgcount--;
          }
          })
          if(this.imgcount == 0) {
            window.removeEventListener('scroll', this.lazy_img)
          }
          this.imgList = this.imgList.filter((item, index) => !deleteIndex.includes(index))
    },

    aa() {
      throttle(this.imgLazyLoad, 100)
    }



    
  },
  mounted() {
    console.log('this.imgList')
    this.lazy_img = throttle(this.imgLazyLoad, 100)
    //window.addEventListener('scroll', throttle(this.imgLazyLoad,100));
    window.addEventListener('scroll',this.lazy_img);
     //his.createValine()  Valine评论系统
     //锚点初始化
     this.$store.commit('init_anchorsinfo',this.anchors_info);
  },

  created() {
    
     get_about()
      .then((res) => {
        console.log(res)
        this.text = res.data.about
        })
        .catch((error) => {
            console.log(error);
        })
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.click, false)
  
  },


  
});
</script>


<style scoped>

.article {
    width: 55vw;
    position: relative;
    padding-bottom: 2vh;
    text-align: left;
    min-height: 20vh;
    background: #ffffffc4;
    box-shadow: 0px 0px 15px #b3b3b3;
   
    
}












@media screen and (max-width: 800px) {
    
    .article {
      width: 97.7vw;
      margin: 0 0vw 0 -2vw;
 
    }

}






</style>