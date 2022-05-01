<template>

    
      
      <div class="article" >
       <!-- <yibu></yibu>  -->
        <articleInfo :article_info = "article_info"></articleInfo>      

        <v-md-preview :text="text" ref="preview" style="font-size = 1rem" ></v-md-preview>

        <!--<div id="vcomments"></div>-->
        <comment :article_id = "article_id" :article_title = "article_info.title"></comment>
      </div>




</template>
<script>
import { defineComponent, defineAsyncComponent } from 'vue';
import { getarticle, set_articleViews } from '../api/api'
import { throttle } from '../utils/index'

//const yibu = () => import('./yibu.vue');
const articleInfo = defineAsyncComponent(() => import('../components/articleInfo'))
const comment = defineAsyncComponent(() => import('../components/comments'))
// articleInfo = defineAsyncComponent(() => import('../components/articleInfo.vue'))
//import  personalInfo  from '../components/personalInfo.vue'
//import  articleinfo  from '../components/articleinfo.vue'


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
      articleInfo,
      comment,
    },
  methods: {
    
/*
    createValine() {
      const Valine = require('valine');

      window.AV = require('leancloud-storage')
      new Valine({
        el: '#vcomments',
        appId: 'qTwYMGsk4pOVI6PFnAWR8Eta-gzGzoHsz',
        appKey: 'q7USnK8koma2flQSvxauK6HL',
        notify: false,
        verify: false,
        avatar: 'monsterid',
        path: window.location.pathname + this.$route.query.articleid,
        placeholder: '欢迎留言与我分享您的想法...',
      });
      this.valineRefresh = false
    },
 */
  

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
    document.documentElement.scrollTop = 0;
    console.log('created1')
    console.log(window.location.pathname);
    this.article_id = this.$route.query.articleid
     getarticle(this.article_id)
      .then((res) => {
            this.text = res.data.text
            this.article_info.post_date = res.data.post_date
            this.article_info.last_update = res.data.last_update
            this.article_info.category = res.data.category
            this.article_info.title = res.data.title
            this.article_info.tags = res.data.tags
            this.article_info.views = res.data.views
            this.article_info.comments = res.data.comments


            console.log(res.data)
            this.$nextTick(function(){
              this.imgList = [...this.$refs.preview.$el.querySelectorAll('img')].slice(4);
              this.imgcount = this.imgList.length
              console.log(this.imgcount)
              //console.log(this.imgList)
              const anchors = this.$refs.preview.$el.querySelectorAll('h2');
              //console.log(anchors)
              const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
              //console.log(titles)
              if (!titles.length) {
                this.anchors_info.item = [];
                return;
              }
              anchors.forEach((item) => {
                let rect = item.getBoundingClientRect()
                this.anchors_info.top.push(rect.top + window.scrollY)
              })
           

              const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

              this.anchors_info.item = titles.map((el) => ({
                title: el.innerText,
                lineIndex: el.getAttribute('data-v-md-line'),
                indent: hTags.indexOf(el.tagName),
              }));
              console.log(this.anchors_info.item)
              console.log('top')
              console.log(this.anchors_info.top)
              window.scrollTo(0, 0)
            })


            }).catch((error) => {
              console.log(error);
            })
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.click, false)
    let param = {
      article_id: this.article_id,
      views: this.article_info.views + 1,
    }
    set_articleViews(param).then(res => {   //更新文章浏览次数
      console.log('views res', res)
    }).catch((error) => {
      console.log(error)
    })
  },


  
});
</script>


<style scoped>

.article {
    width: 62vw;
    position: relative;
    padding-bottom: 2vh;
    text-align: left;
    min-height: 20vh;
    background: #ffffff;
    box-shadow: 0px 0px 15px #b3b3b3;
   
    
}



.anchor {
  position: sticky;
  top: 20vh;
  width: 15vw;
  float: right;
  margin-right: -19.3vw;
  text-align: left;
  color: rgb(0, 0, 0);
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
  z-index: 3000;
}

.anchor div {
  line-height: 1.5rem;
}

.anchor a {
  color: inherit; 
  border-left: 2px solid #787c80;
  font-size: 0.9rem;
  font-family: 'Noto Serif CJK TC',serif;
  border-color: inherit;
  padding-left: 3px;
  margin-left: 1rem;
}

.list {
  color: #1067eb;
  
}




@media screen and (max-width: 800px) {
    
    .article {
      width: 97.7vw;
      margin: 0 0vw 0 -2vw;
 
    }

}






</style>