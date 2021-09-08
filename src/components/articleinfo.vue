<template>
    <div style="text-align: center; line-height: 25px; ">
        <p> {{ articleinfo.title }} 站点 </p>
        <span> {{ articleinfo.post_date }} </span>
         <span> - </span>
        <span> {{ articleinfo.last_update }}</span>
        <br/>
        <span>  {{ articleinfo.category }} </span>
        <span> - </span>
        <span v-for="(tag, index) in articleinfo.tags"
        :key="index"
        >
        {{ tag }}
        </span>

         <v-md-preview :text="articleinfo.text" ref="preview"></v-md-preview>
    </div>
</template>

<script>

export default {
    methods: {
     
    },
    props: {
        articleinfo: Object
    },
    setup() {
        
    },
}
</script>

<style scoped>

p {
    font-family: 'Noto Serif CJK TC',serif;
    font-weight: 600;
    font-size: 2rem;
    margin-top: 2vh;
    margin-bottom: 4vh;
   
}

span {
    color: rgb(80, 80, 80);
    margin: 0 2px;
 
    
}


</style>