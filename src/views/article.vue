<template>

  <a-layout>

    <a-layout-content :style="{ padding: '0 25px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
     
      <div class="article" >
        <articleinfo :articleinfo="this.article"> </articleinfo>
        <v-md-preview :text="text" ref="preview"></v-md-preview>

        <div id="vcomments"></div>
      </div>
    </a-layout-content>

    <a-layout-sider width="29vw" :style="{ marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="sider">
        <personalInfo></personalInfo>
      </div>

<a-affix :offset-top="60">
  
      <div class="anchor">
          <div
          v-for="(anchor, index)  in anchors"
          :key="anchor.index"
          :style="{ padding: `0 0 0 ${anchor.indent * 20}px` }"
          :class="{ list: this.activeAnchor == ('anchor'+index) }"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </div>
</a-affix>

    </a-layout-sider>

  </a-layout>

</template>
<script>
import { defineComponent,defineAsyncComponent } from 'vue';
import { getarticle } from '../api/api'

const personalInfo = defineAsyncComponent(() => import('../components/personalInfo.vue'))
const articleinfo = defineAsyncComponent(() => import('../components/articleinfo.vue'))
//import  personalInfo  from '../components/personalInfo.vue'
//import  articleinfo  from '../components/articleinfo.vue'


export default defineComponent({
  data() {
    return {
      text: '',
      article:{
        post_date: '',
        last_update: '',
        category: '',
        title: '',
        tags: [],

      },
      anchors: [],
      activeAnchor: '',
      scroll: '',
    }
  },
  setup() {
    return {
    };
  },

  components: { personalInfo, articleinfo },
  methods: {

    dataScroll () {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },

    handleAnchorClick(anchor) {
      console.log('scroll')
      console.log(anchor)
    
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
      console.log('heading',heading)

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },

    loadScroll() {
      var self = this;
        var sections = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
        for (var i = sections.length - 1; i >= 0; i--) {
          if (self.scroll >= sections[i].offsetTop - 100) {
            self.activeAnchor = 'anchor'+i
            break;
          }
        }
        console.log(this.activeAnchor)
    },

    throttle(fn, delay) {
        let last;
        return function() {
            let that = this;
            let _args = arguments;
            let now = +new Date()
            if(last && last + delay > now ) {
                return
            }
            else {
                last = now
                fn.apply(that,_args)
            }
        }
    },

    

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
    
  },
  mounted() {
     window.addEventListener('scroll', this.throttle(this.dataScroll,100));
     this.createValine()
  },
  watch: {
     scroll: 'loadScroll',
      
  },
  created() {
    console.log('created1')
    console.log(window.location.pathname);
     getarticle(this.$route.query.articleid)
      .then((res) => {
            this.text = res.data.text
            this.article.post_date = res.data.post_date
            this.article.last_update = res.data.last_update
            this.article.category = res.data.category
            this.article.title = res.data.title
            this.article.tags = res.data.tags

            console.log(res.data)
            this.$nextTick(function(){
              const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
              //console.log(anchors)
              const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
              //console.log(titles)
              if (!titles.length) {
                this.anchors = [];
                return;
              }

              const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

              this.anchors = titles.map((el) => ({
                title: el.innerText,
                lineIndex: el.getAttribute('data-v-md-line'),
                indent: hTags.indexOf(el.tagName),
              }));
              console.log(this.anchors)
               window.scrollTo(0, 0)
            })


            }).catch((error) => {
              console.log(error);
            })
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.click, false)
  }

  
});
</script>
<style scoped>

.article {
    text-align: left;
    margin: 4vh 0 2vh 8vw;
    min-height: 20vh;
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 0px 15px #b3b3b3;
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

.anchor {
  text-align: left;
  margin-top: 4vh;
  margin-right: 12vw;
  color: rgb(0, 0, 0);
  min-height: 20vh;
  background: #ffffff;
  box-shadow: 0px 0px 15px #b3b3b3;
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

.logo {
  width: 120px;
  height: 31px;
  background: rgb(252, 11, 11);
  margin: 16px 24px 16px 0;
  float: left;
}




</style>