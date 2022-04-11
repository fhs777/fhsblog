<template>
  <div class="anchor" :class="{anchormove: !anchor_move}">
              <div
              v-for="(anchor, index)  in anchors_info.item"
              :key="anchor.index"
              :style="{ padding: `0 0 0 ${anchor.indent * 20}px` }"
              :class="{ list: this.anchors_info.active_anchor == ('anchor'+index) }"
              @click="handleAnchorClick(index)"
            >
              <a style="cursor: pointer">{{ anchor.title }}</a>
            </div>
          </div>
</template>

<script>
import { throttle } from '../utils/index'

export default ({
    data() {
      return {
        anchors_info: {},
        scroll: 0,
      }
    },

    methods: {
         dataScroll () {
          this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
        },

        handleAnchorClick(index) {
          //console.log('scroll'+index)
          //console.log(this.anchors_info.top[index])
          document.documentElement.scrollTop = this.anchors_info.top[index] + 2
          this.anchors_info.active_anchor = 'anchor'+index
        },
        loadScroll() {
          let self = this;
            let sections = this.anchors_info.top;
            //console.log(sections,document.documentElement.scrollTop)
            for (let i = sections.length - 1; i >= 0; i--) {
              if (self.scroll >= sections[i]) {
                self.anchors_info.active_anchor = 'anchor'+i
                break;
              }
            }
            //console.log(this.anchors_info.active_anchor)
        },

    },



    computed: {
      anchor_move() {
        return this.$store.state.header_show  
      }
    },

    mounted() {

        window.addEventListener('scroll', throttle(this.dataScroll,100));
        //console.log('anchors_info')
        //console.log(this.$store.state.anchors_info)
        let that = this;
        setTimeout(() => {
          that.anchors_info = that.$store.state.anchors_info
        }, 0)
      },

    watch: {
        scroll: 'loadScroll',   
    },


})
</script>

<style scoped>
  .anchor {
    position: sticky;
    top: 5vh;
    margin-top: 2vh;
    width: 100%;
    text-align: left;
    color: rgb(0, 0, 0);
    background: #ffffff;
    transition: all 0.2s;
    box-shadow: 0px 0px 15px #b3b3b3;
  }

  .anchormove {
    top: 15vh;
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
</style>
