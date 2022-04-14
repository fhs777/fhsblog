<template>
<div class="personal_info">
   <img class="imgborder" src='/face.jpg' width="200">
    <div class="authorName">魏择齐</div>

    <div class="authorInfo schoolInfo"> 软件工程</div>
    <div class="authorInfo schoolInfo"> 2018-2022 学生</div>

    <div class="authorInfo otherInfo" style="margin-top: 5px"> 浙江-嘉兴</div>
    <div class="authorInfo otherInfo">前端：Vue + AntdDesign</div>
    <div class="authorInfo otherInfo">后端：Node.js + MongoDB</div>
    <div class="authorInfo otherInfo">邮箱：1570573782@qq.com</div>

    <a-divider><span style="font-size: 15px; color: #1277d5">社交账号</span></a-divider>
    <div class="iconContainer">
      <img src='/QQ.svg' width="40">
      <img src='/微信.svg' width="40">
    </div>

    <div class="welcomeInfo">
      <div class="welcomeTitle">
      相见恨晚
      </div>
      <div>您的ip：{{' '+ this.userIp }}</div>
      <div>您的地址：{{' '+ this.userAddress}}</div>
    </div>
    

    <div style="margin-top: 5px">
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
      toCategory() {
        this.$router.push('/category')
      },
      toTags() {
        this.$router.push('/tags')
      }
    },
    
    computed: {
      userIp() {
        return this.$store.state.user.user_ip
      },
      userAddress() {
        return this.$store.state.user.address
       }
    }
}
</script>

<style lang="less" scoped >
@theme-color: rgb(14, 136, 250);

.personal_info {
  text-align: center;
  color: rgb(0, 0, 0);
  padding: 0 15px;
  min-height: 4vh;
  line-height: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgb(242, 235, 235);
  box-shadow: white 0px 0px 10px;
  border-radius: 5px;

  .welcomeInfo {
    text-align: left;
    .welcomeTitle{
      font-size: 16px;
      border-radius: 5px;
      border-bottom: 1px solid @theme-color;
    }
  }
}
.imgborder {
  margin-top: 4vh;
  width: 95px;
  border-radius: 50%;
}

.authorName {
  margin-top: 8px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1.15rem;
  color: #1277d5
}

.authorInfo {
  font-size: 13px;
  //height: 20px;
  line-height: 20px;
}

.schoolInfo {
  margin-top: 0;
  color: #119e82
}

.otherInfo {
  color: #7f7f7f;
}

.iconContainer {
  display: flex;
  height: 35px;
  line-height: 35px;
  justify-content: space-around;
  margin-bottom: 20px;
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