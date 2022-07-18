<template>
  <div class="friendBox">
   <div class="friendContainer" @click="gotoFriend()">
     <div class="left">
       <div class="name">{{ friendInfo.name  }}</div>
       <div class="words">{{ friendInfo.words }}</div>
     </div>
     <img class="avatar"  :src= getAvatar() :onerror="errorImage">
   </div>
  </div>
</template>

<script>
export default {
  props: {
    friendInfo: Object,
  },
  methods: {
    getAvatar() {
      return this.friendInfo.avater
    },
     errorImage(e) {
        console.log('error!!!!!!!!!!!!',e)
        e.target.src = "http://localhost:7701/img/404notfound.jpeg"
      },
    gotoFriend() {
      window.open(this.friendInfo.website,'_blank');
    }
  }
}
</script>

<style lang="less" scoped>
.friendBox {
  display: inline-block;
  margin: 20px 40px 20px 0;
}
.friendContainer {
  border: 1px solid rgb(197, 197, 197);
  display: flex;
  width: 250px;
  height: 90px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;

  .left {
    display: inline-block;
    flex: 1 1 auto;

    .name {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .words {
      font-size: .6rem;
      margin-top: 10px;
    }
  }
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
   
  }
}
</style>>

