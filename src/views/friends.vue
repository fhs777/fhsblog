<template>
    <div class="friendsContainer">
        <h1>友情链接</h1>
        <h3>顺序随机，不分先后</h3>
        <hr class="partline">
        <friend 
            v-for="item in friends"
            :key ="item.index"
            :friendInfo = item>
        </friend>


        <friendApply></friendApply>
        <div class="personalInfo">
            <h1>本站格式</h1>
            <div>标题：fhs_qzw</div>
            <div>网址：http://120.27.150.44/</div>
            <div>logo：http://localhost:7701/img/face.jpg</div>
            <div>描述：随便记录一些东西</div>
        </div>
        <hr class="partline">


        
        <comment article_id = "friends_page" article_title = "友链页面"></comment>
    </div>
    
</template>

<script>

import { defineAsyncComponent } from 'vue';
import { get_friends } from '../api/api';
const friend = defineAsyncComponent(() => import('../components/friend.vue'))
const comment = defineAsyncComponent(() => import('../components/comments.vue'))
const friendApply = defineAsyncComponent(() => import('../components/friendApply.vue'))
export default {
    data(){
        return {
            friends: [
                {
                    name: 'fhs_7zw1',
                    words: '随便记录一些东西',
                    avater: 'http://localhost:7701/img/face.jpg',
                    website: 'http://120.27.150.44/'
                }
            ]
        }
    },
    components: {
        friend,
        comment,
        friendApply,   
    },

    created() {
        get_friends(true).then(res => {
            console.log('get friend', res)
            this.friends = res.data
        })
    }
}
</script>
<style lang="less" scoped>
    .friendsContainer {
        background-color: rgba(255, 255, 255, 0.634);
        border: 1px solid rgb(242, 235, 235);
        box-shadow: white 0px 0px 10px;
        border-radius: 5px;
        padding: 0 30px 30px;

        .personalInfo {
            margin-top: 100px;
            text-align: left;
            h1 {
                font-weight: bold;
                color: rgb(0, 102, 255);
            }
            div {
                color: rgb(95, 95, 95);
            }
        }

        .partline { 
            height: 4px;
            border: 0px;
            background-color: rgb(221, 221, 221);
            margin: 20px 0px;
            background-image: repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 87, 119) 5px, transparent 0px, transparent 8px);

        }
    }
</style>

