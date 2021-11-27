<template>
    <div id="vcomments">
      <div class="input_and_submit">
        <a-textarea v-model:value="value" placeholder="Basic usage" :rows="6" />
        <a-button type="primary" class="submit">发表评论</a-button>
      </div>
    
    <div class="comments">
    <a-list
        class="comment-list"
        :header="`${data.length} replies`"
        item-layout="horizontal"
        :data-source="data"
    >

    <template #renderItem="{ item }">

      <a-list-item>
        <a-comment 
          :author="item.author" 
          :avatar="item.avatar"
          :content="item.content">

          <template #actions>
            <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
          </template>

          <template #datetime>
            <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
              <span>{{ item.datetime.fromNow() }}</span>
            </a-tooltip>
          </template>
            
            <!-- 嵌套子评论-->
        <a-comment
            v-for="subcom in item.subcomments"
            :key="subcom.index"
            :subcom="subcom"
            :avatar="subcom.avatar"
            :author="subcom.author"
            :content="subcom.content"
            :datetime="subcom.datetime +' '+ subcom.datetime">

            <template #actions>
            <span v-for="(action, index) in subcom.actions" :key="index">{{ action }}</span>
            </template>

        </a-comment>

          
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
  </div>

    </div>
</template>

<script>
import dayjs from 'dayjs';
import { defineComponent, ref } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default defineComponent({
    setup() {

      const likes = ref(0);
      const dislikes = ref(0);
      const action = ref();
      const value = ref('');

      const like = () => {
        likes.value = 1;
        dislikes.value = 0;
        action.value = 'liked';
      };


    return {
      value,
         data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: dayjs().subtract(1, 'days'),
          subcomments: [
              {
                actions: ['回复'],
                author: 'ffhs',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:'just say fhs all right.',
                datetime: '2021-10-11',
              },
              {
                actions: ['回复'],
                author: 'qzw',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:'我不知道要说些什么，但是我知道我必须要做点什么。',
                datetime: '2021-10-11',
              }
          ]
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: dayjs().subtract(2, 'days'),
        },
      ],
      likes,
      dislikes,
      action,
      like,   
      dayjs,
    };
    },
    components: {
  },
})
</script>

<style scoped>

#vcomments {
    position: relative;
    margin: 0 auto 2vh ;
    width: 58vw;
    padding: 2vh 1vw 0;

}

.input_and_submit {
  text-align: right;
}


.submit {
    margin-top: 12px;
}

.comments {
    width: 100%;
}
</style>
