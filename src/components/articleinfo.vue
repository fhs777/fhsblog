<template>
    <div style="text-align: center; line-height: 1rem ">
        <p> {{ article_info.title }} 站点 </p>
        <span> {{ article_info.post_date }} </span>
         <span> - </span>
        <span> {{ article_info.last_update }}</span>
        <br/>
        <span>  {{ article_info.category }} </span>
        <span> - </span>
        <span v-for="(tag, index) in article_info.tags"
        :key="index"
        >
        {{ tag }}
        </span>
    </div>
</template>

<script>

export default {
    methods: {
     
    },
    props: {
        article_info: Object
    },
    setup() {
        
    },
    created() {
        console.log('title55555555555555555555');
        
    },
    mounted() {
        console.log('mounted----');
    }
}
</script>

<style scoped>

div {
    width: 100%;
    display: block;
    overflow: hidden;
    border: green 1px solid;
}
p {
    font-family: 'Noto Serif CJK TC',serif;
    font-weight: 600;
    font-size: 2rem;
    margin-top: 4vh;
    margin-bottom: 4vh;
   
}

span {
    color: rgb(80, 80, 80);
    margin: 0 2px;
 
    
}


</style>