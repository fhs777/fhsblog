<template>
  <a-layout>

    <a-layout-content :style="{ padding: '0 25px', marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
     <div class="article" >
       <a-list size="large" :pagination="pagination" :data-source="this.timelines">
          <template #renderItem="{ item }">

            <div v-for="(item1) in item"
            :key="item1.index">
            
            <a-list size="large"  :data-source="item1">
                <template #renderItem="{ item }">
                  <a-list-item>
                    <div class="container">
                      <div class="postdate">{{ item.post_date.slice(5) }}</div>
                      <span @click="readarticle(item.id)" class="title">{{ item.title }} </span>
                    </div>
                  </a-list-item>
                </template>
                <template #header>
                  <div class="listHeader">{{item1[0].post_date.slice(0,4)}}</div>
                </template>
            </a-list>
            </div>

          </template>
         
        </a-list>
      </div>
    </a-layout-content>

    <a-layout-sider width="29vw" :style="{ marginTop: '64px' ,minHeight: '100%', background:'rgb(244, 244, 244)'}">
      <div class="sider">
        <personalInfo></personalInfo>
      </div>
    </a-layout-sider>

  </a-layout>
</template>

<script>
import  personalInfo  from '../components/personalInfo.vue'
export default {
  data() {
    return {
      timelines: [],
    }
  },
  components: { personalInfo },
  setup() {
    const pagination = {
      onChange: page => {
        console.log(page);
      },
      pageSize: 1,
    };
    return {
      pagination
    }
  },
   methods: {
    readarticle(id) {
       this.$router.push({path: '/article',  query: { articleid: id } })
    }
  },
  created() {
    console.log(this.$store.state.timeline)
    let timeline
    let ind
    for(let i = 0; i < this.$store.state.timeline.length; i++) {
      if(i % 4 == 0 ) {
        this.timelines.push(timeline);
         timeline = [[]];
         ind = 0;
      }
      if(i % 4 != 0 && (this.$store.state.timeline[i].post_date.slice(0,4) != this.$store.state.timeline[i-1].post_date.slice(0,4))){
        ind++
        timeline.push([])
      }
      timeline[ind].push(this.$store.state.timeline[i])
    }
    this.timelines.push(timeline);
    this.timelines.shift();
    console.log(this.timelines);
  },
 
}
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

.container {
  width: 100%;
}

.postdate {
  display: inline-block;
  min-width: 50px;
}

.title {
  font-size: 1.1rem;
  cursor: pointer;
}

.listHeader {
  font-size: 1.8rem;
}
</style>