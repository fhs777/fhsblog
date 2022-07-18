<template>
    <div id="vcomments">
      <div class="input_and_submit">
        <a-textarea v-model:value="value" placeholder="Basic usage" :rows="6" />
        <a-button type="primary" class="submit" @click="write_comment()">发表评论</a-button>
      </div>

    <a-modal 
      v-model:visible="reply_comment" >
        <p>评论框</p> 
          <a-input v-model:value="reply" disabled placeholder="Basic usage" style="margin-bottom: 10px" />
        <a-textarea v-model:value="value" placeholder="Basic usage" :rows="6" />   
       <template #footer>
        <!-- <a-button key="back" @click="handleCancel">取消</a-button> -->
        <a-button key="submit" type="primary"  @click="reply_to()">确认</a-button>
      </template>
    </a-modal>
    
    <div class="comments">
    <a-list
        class="comment-list"
        :header="`${this.comments_number} replies`"
        item-layout="horizontal"
        :data-source="this.data1"
    >

    <template #renderItem="{ item }">

      <a-list-item>
        <a-comment 
          :author="item.user_name" 
          :avatar="item.avatar"
          :content="item.content">

          <template #actions>
            <span v-for="(action, index) in item.actions" :key="index" @click="show_reply(item)">{{ action }}</span>
          </template>

          <template #datetime>
            <a-tooltip :title="item.date">
              <span>{{ item.date }}</span>
            </a-tooltip>
          </template>
            
            <!-- 嵌套子评论-->
        <a-comment
            v-for="subcom in item.subcomment"
            :key="subcom.index"
            :subcom="subcom"
            :avatar="subcom.avatar"
            :author="subcom.user_name"
            :datetime="subcom.date">

            <template #content>
              <p>
                <span v-if="subcom.reply" class="reply_comment">
                  @{{ subcom.reply}}
                </span>
                {{ subcom.content}}
              </p>
            </template>

            <template #actions>
            <span v-for="(action, index) in subcom.actions" @click="show_reply(subcom)" :key="index">{{ action }}</span>
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
import { defineComponent, } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import { get_comments, comment_write, set_articleComments } from '../api/api'
import { message } from "ant-design-vue";
dayjs.extend(relativeTime);

export default defineComponent({

    data() {
      return {
        value: '',
        reply_comment: null,
        edit_comment: {},
        reply: '',  //回复人
        parent_id: null,  //子评论父级评论id
        comments_number: 0,
        data1: [
        {
          actions: ['Reply to'],
          user_name: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          date: '2021-10-11',
          subcomment: [
              {
                actions: ['回复'],
                user_name: 'ffhs',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:'just say fhs all right.',
                date: '2021-10-11',
              },
              {
                actions: ['回复'],
                user_name: 'qzw',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content:'我不知道要说些什么，但是我知道我必须要做点什么。',
                date: '2021-10-11',
              }
          ]
        },
        {
          actions: ['Reply to'],
          user_name: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          date: '2021-10-11',
        },
      ], 
      }
    },

    props: {
        article_id: String,
        article_title: String,
    },

    methods: {
      write_comment(parent_id, reply) {
        if(!this.loginState) {
          alert('请先登录');
          return 
        }
        if(this.value == '') {
          message.info('评论内容不可为空')
          return 
        }
        this.edit_comment = {
          article_id: this.article_id,
          article_title: this.article_title,
          user_name: this.user_name,
          user_id: this.user_id,
          date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          address: this.address,
          equipment: this.equipment,
          content: this.value,
          parent_id: parent_id || null,
          reply: reply || null,
          avatar: this.user_qq,
          subcomment: [],
        }
        //console.log(this.article_id, this.article_title, dayjs().format('YYYY-MM-DD HH:mm:ss'))
        console.log('this.edit_comment', this.edit_comment)
        comment_write(this.edit_comment).then((res) => {
          console.log(res)
          if(res.data) {
            message.success('评论成功')
            this.value = '';

            let param = {           //更新文章评论数量
              article_id: this.article_id,
              comments: this.comments_number + 1,
            }
            set_articleComments(param).then(res => {   
              console.log('views res', res)
            }).catch((error) => {
              console.log(error)
            })
            this.get_comment()

          }
          else {
            alert('评论失败');
          }
        }).catch((error) => {
          message.error('评论失败')
          console.log(error);
        })
        this.edit_comment = {}
      },

      show_reply(item) {
        console.log(item)
        this.value = ''
        this.reply = item.user_name
        this.parent_id = item.parent_id || item._id
        this.reply_comment = true

      },

      reply_to() {
        this.write_comment(this.parent_id, this.reply)
         this.reply = null
        this.parent_id = null
      },

      get_comment() {
        get_comments(this.article_id)
        .then(res => {
          this.data1 = (res.data)
          console.log('data1',res.data)
          let comments_number = 0
          res.data.forEach(element => {
            comments_number += element.subcomment.length
          });
          this.comments_number = res.data.length + comments_number
        }).catch(error => {
          console.log(error);
        }) 
      }
       
    },

    computed: {
      address() {
        return this.$store.state.user.address
      },
      equipment() {
        return this.$store.state.user.equipment
      },
      user_name() {
        return this.$store.state.user.user_name
      },
      user_id() {
        return this.$store.state.user.user_id
      },
      user_qq() {
        return this.$store.state.user.user_qq ?  'https://q1.qlogo.cn/g?b=qq&nk='+this.$store.state.user.user_qq+'&s=100' : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      },
      loginState() {
        return this.$store.state.user.loginState
      }
    },

    created() {
      this.get_comment()
      
    }

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
  text-align: left;
    width: 100%;
}

.reply_comment {
  color: rgb(12, 12, 206);
  font-size: small;
}
</style>
