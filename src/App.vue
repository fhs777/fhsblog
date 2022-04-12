<template>

  <a-layout :style="{  minHeight: '100vh' }" >
    <transition name="header">
    <a-layout-header 
    class="header"
    :class="{header_fixed: header_show}">
    <div class="logo"></div>

      <div class="menu">
        <span @click="showSearchmodal()"><img style="height: 3.5vh" src="/search.svg">搜索</span>
        <span @click="handleClick('home')">主页</span>
        <span @click="handleClick('technology')">技术</span>
        <span @click="handleClick('daily')">随笔</span>
        <span @click="handleClick('time_line')">归档</span>
        <span v-if="userIsLogin == false" @click="showRegisterModal()">登录</span>
        <a-dropdown v-else>
          <a class="ant-dropdown-link" @click.prevent>
            {{ userName }}
          </a>
          <template #overlay>
            <a-menu @click="userOnClick">
              <a-menu-item key="logOut"> 
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <span @click="showSearchmodal()" class="s_svg"><img style="height: 5vh" src="/search.svg"></span>
        <span class="s_svg" @click="drawer_show(true)"><img style="height: 5vh" src="/menu.svg"></span>
      </div>
    </a-layout-header>
    </transition>



    <a-modal 
    v-model:visible="visible" 
    :footer="null">
    <template #title>
        <p>搜索信息</p> 
        <p style="margin-bottom: 0px;">
          <input 
          class="inputtext" 
          type="text" 
          placeholder="搜索文章"
          v-model="search_text"
          @keyup.enter="getcontent()">
        </p>
      </template>

      <a-list 
        size="small" 
        :locale= "loacle" 
        :data-source="contents"
        :pagination="pagination">
          <template  #renderItem="{ item }">
            <a-list-item 
              style="padding-left: 20px;margin: 0;"
              @click="readarticle(item.id)">
              {{ item.title }}
            </a-list-item>
          </template>
        </a-list>  
    </a-modal>

    <a-modal 
      v-model:visible="registerModalShow" 
      :title="modalStatusIsLogin ? '登录' : '注册账号'">

      <template #footer>
        <div class="modalButton">
          <span v-if="modalStatusIsLogin" style="flex: 1 1 auto; text-align: left" >
            <a-button key="back" @click="modalStatusChange">没有账号?去注册</a-button>
          </span>
          <a-button key="back" @click="submitHandleCancel">取消</a-button>
          <a-button key="submit" type="primary"  @click="submitOrlogin">
            {{ modalStatusIsLogin ? '登录' : '注册账号' }}
          </a-button>
        </div>
      </template> 

        <p style="margin-bottom: 15px;">
          <input 
          class="submit_class" 
          type="text" 
          placeholder="账号"
          v-model="submit_account">
        </p>
        <p style="margin-bottom: 5px;">
          <input 
          class="submit_class" 
          type="text" 
          placeholder="密码"
          v-model="submit_password">
        </p>
    </a-modal>

  
    <div class="mask"  v-show="d_show" :class="{mask_opacity: d_showcopy}"  @click="drawer_show(false)">
    </div>
    <div id="drawer" :class="{drawer_left: d_showcopy}">
        <personalInfo> </personalInfo>
        <div class="dividing_line"></div>
        <div class="menu_item">
          <a class="site_page" @click="handleClick('home')"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">主页</span></a>
          <a class="site_page" @click="handleClick('technology')"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">技术梳理</span></a>
          <a class="site_page" @click="handleClick('daily')"><img style="height: 24px; margin-top: -2x" src="/search.svg"><span class="drawer_item">随便说说</span></a>
          <a class="site_page" @click="handleClick('time_line')"><img style="height: 24px; margin-top: -2x" src="/menu.svg"><span class="drawer_item">文章归档</span></a>
        </div>
      </div>

   <router-view></router-view>

    <a-layout-footer :style="{ textAlign: 'center' }">
      fhs Blog ©2021 Created by fhs_7zw
    </a-layout-footer>
  </a-layout>

</template>
<script>
import { getarticles, accountSubmit, login } from './api/api'
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { message } from 'ant-design-vue';
import { throttle } from './utils';
const personalInfo = defineAsyncComponent(() => import('./components/personalInfo.vue'))


export default defineComponent({
  data() {
    return {
      contents: [],
      contents_page:[],
      head_show: 'fixed',
      scroll_top: 0,
      header_show: false,    //header头部
      d_show: false, //控制遮罩显示与否
      d_showcopy: false, //控制遮罩淡入淡出效果
      search_text:'',
      registerModalStatus: 'login',
      loacle: {
        emptyText: '暂无数据'
      },
      
    }
  },

   props: {
    title: String
  },  

  setup() { 
    const visible = ref(false);
    const registerModalShow = ref(false); //注册登录弹窗状态控制
    const selectedKeys = ref(['1']);
    const submit_account = ref('')  //注册账号
    const submit_password = ref('')  //注册密码

    const showSearchmodal = () => {
      visible.value = true;
      console.log('showmodal')
    };

    const showRegisterModal = () => {
      registerModalShow.value = true;
    }

    const submitHandleCancel = () => {
      registerModalShow.value = false;
    }

    const pagination = {
      pageSize: 5,
    };

     return {
      visible,
      registerModalShow,
      selectedKeys,
      pagination,
      submit_account,
      submit_password,
      showSearchmodal,
      showRegisterModal,
      submitHandleCancel,

    };

  },

  components: { 
      personalInfo,

  },

 watch: {
     
      // //控制遮罩的显示与抽屉拉开与收起
      d_show(newState) {
        let that = this

        if(newState) {
          setTimeout(function(){
            that.d_showcopy = newState
          },0)
        }
      },

      header_show(newState) {
        this.$store.commit('change_headershow',newState)
      }
},

  methods: {

    handleClick(e) {
      console.log('/'+e)
      if(this.d_show) {
        this.drawer_show(false)
      }
      this.$router.push({path: '/'+e})
    },

    readarticle(id) {
        console.log(id);
        //this.$router.push({path: '/article',  query: { articleid: id } })
            
    },

    headershow() {
      let scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let scroll = scrolltop - this.scroll_top
      this.scroll_top = scrolltop
      //console.log('scroll')
      if(scroll > 0) {
        this.header_show = true
      }
      else {
        this.header_show = false
      }
    },

    
    drawer_show(state) {  //控制遮罩的显示与抽屉拉开与收起
      let that = this;
     
      if(state) {
        that.d_show = state;
        document.body.style.overflowY = "hidden" 
      }
      else {
        document.body.style.overflowY = "unset"
        that.d_showcopy = state;
        setTimeout(function(){
          that.d_show = state;
        },500)
      }
    },

    async getcontent() {
      let search_text = this.search_text
      console.log('stext')
      console.log(search_text)
      const articles = await getarticles();
      console.log(articles.data);
      this.contents =[];
      let search_reg = new RegExp(search_text)
      console.log(search_reg)
      let screen_art = articles.data.filter(item => {
        return (item.title.search(search_reg) != -1)
      })
      screen_art.forEach(element => {
        let content = {};
        content.id = element._id;
        content.title = element.title;
        this.contents.push(content)
      });
      console.log(this.contents)
    },


    submitOrlogin() {
      if( this.registerModalStatus == 'login') {
        //console.log('login')
        this.loginHandleOk();
      }
      else {
        //console.log('reg')
        this.submitHandleOk();
      }
    },


    modalStatusChange () { //改变注册登录弹窗显示状态
      this.registerModalStatus = 'register'
    },


    loginHandleOk() {
      let params = {account: this.submit_account, pass: this.submit_password}
      console.log('params', params);
      
      if(params.account && params.pass) {
        login (params).then(res => {
          console.log('res', res)
          if(res.data.code == 1) {
            message.success('登录成功')
            this.submitHandleCancel()
            this.submit_account = ''
            this.submit_password = ''

            let userInfo = {
              user_name: params.account,
              user_id: res.data.user_id,
            }

            window.localStorage.setItem('fhsblogUser', JSON.stringify(userInfo))
            userInfo['address'] = '浙江省嘉兴市'
            userInfo['equipment'] = 'chrome'

            this.$store.commit('user/userInfoSet', userInfo)
            this.$store.commit('user/loginStateChange', true)
            

          }
          else {
            message.warning('账号或密码错误，登陆失败');
          }
        })
      }
      else {
        message.warning('请将账号信息填写完整');
      }
    },


     submitHandleOk() {   //调用注册/登录接口
      let params = {account: this.submit_account, pass: this.submit_password}
      console.log('params', params);
      
      if(params.account && params.pass) {
        accountSubmit(params).then(res => {
          console.log('res', res)
          if(res.status == 200) {
            message.success('注册成功')
            this.submitHandleCancel()
            this.submit_account = ''
            this.submit_password = ''

          }
        })
      }
      else {
        message.warning('请将账号信息填写完整!');
      }
      
      
    },

    userOnClick(click) {
      console.log('user状态管理 啊我是key', click.key)
      console.log(this.$store.state.user)
      if(click.key == 'logOut') {
        this.$store.commit('user/loginStateChange', false)
        this.$store.commit('user/initUserInfo')
        window.localStorage.clear()
        
      }
      
    }

  },
  
  computed: {
    modalStatusIsLogin() {
      return this.registerModalStatus == 'login' 
    },
    userIsLogin() {
      return this.$store.state.user.loginState
    },
    userName() {
      return this.$store.state.user.user_name
    }
  },

  created() {
    //console.log('initialize_category1')
   // this.$store.dispatch('initialize_category')
    //window.addEventListener('scroll', throttle(this.headershow),200);
    let userInfo = JSON.parse(window.localStorage.getItem('fhsblogUser'))
    if(userInfo) {
      console.log(111)
      userInfo['address'] = '浙江省嘉兴市'
      userInfo['equipment'] = 'chrome'
      this.$store.commit('user/userInfoSet', userInfo)
      this.$store.commit('user/loginStateChange', true)
    }
    console.log('userinfo')
    console.log(userInfo)
  },

  mounted() {  //不触发，原因暂时未知
     console.log('initialize_category1')
    this.$store.dispatch('initialize_category')
    window.addEventListener('scroll', throttle(this.headershow,100));
  }

 
});
</script>
<style scoped>

.header {
  background-color: rgb(255, 255, 255);
  position: fixed;
  z-index: 4;
  height: 10vh;
  width: 100%;
  transition: all 0.5s ease 0.1s;
  z-index: 100;
  box-shadow: 0px 0px 5px  black;
}

.header_fixed {
  transform: translateY(-10.2vh);
}



.container {
  width: 200px;
  border-radius: 20px;
  float: right;



}
.menu {
  font-size: 0.95rem;
  float: right;
  position: relative;
  line-height: 10vh;
  
}

.menu > span {
  display: inline-block;
  height: 10vh - 2px;
  margin: 0 1vw 0 1vw;
  cursor: pointer;
}

.menu > span:hover {
  color: rgb(19, 93, 252);
  border-bottom: 2px solid rgb(19, 93, 252);
}

.menu > .s_svg {
  
  display: none;
  
}

.inputtext {
  height: 40px;
  width: 100%;
  border-radius: 15px;
  padding-left: 20px;
}

.submit_class {
  height: 35px;
  width: 100%;
  padding-left: 20px;
  border-radius: 5px;
  border: 2px solid rgb(141, 141, 141);
}

.modalButton {
  display: flex;
  justify-content: end;
}



/* 抽屉组件*/
#drawer {
  position: fixed;
  width: 300px;
  height: 100vh;
  right: -300px;
  overflow: scroll;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  transition:all 0.5s ease-in-out;
  z-index: 9999;
  display: none;
}


.dividing_line {
  width: 95%;
  margin: 2vh auto;
  border-bottom: 3px  rgba(85, 164, 255, 0.596) ;
  border-bottom-style: dashed;
}

.menu_item {
  display: flex;
  flex-direction: column;
  font-size: 1rem;

}

.site_page {
  display: inline-block;
  width: 80%;
  margin: 10px 50px 10px;
  height: 25px;
  vertical-align: middle;

}

.drawer_item {
  margin-left: 40px;
    color: black;
}

.mask {
 
  position: fixed;
  width: 150vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  transition:all 0.5s ease-in-out ;
  z-index: 9999;
  opacity: 0;

}

.mask_opacity {
    opacity: 0.8;
}




@media screen and (max-width: 800px) {
    .header_fixed {
      transform: translateY(0);
    }

    .menu > span {
      display: none;
    }

    .menu > span:hover {
      color: rgb(19, 93, 252);
      border-bottom: 2px solid rgb(19, 93, 252);
   }

    .menu > .s_svg {
      display: unset;
      display: inline-block;
      height: 10vh - 2px;
      margin: 0 1vw 0 1vw;
      cursor: pointer;

    }

    #drawer {
      z-index: 9999;
      display: unset;
    }

    .drawer_left {
     transform: translateX(-300px);
    }

  

  
}




 .logo {
  width: 120px;
  height: 31px;
  background: rgb(252, 11, 11);
  margin: 16px 0 16px 0;
  display: inline-block;
}




</style>