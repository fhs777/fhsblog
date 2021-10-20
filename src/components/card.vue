<template>
    <div class="card">
        <p @click="readarticle(content.id)">{{ content.title}}</p>
        <label>{{ content.introduction }}
        </label>
        <div class="footer">
        <span>{{ content.post_date }}</span>
        <span class="category">{{ content.category }}</span>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        readarticle(id) {
            console.log(id);
            this.$router.push({path: '/article',  query: { articleid: id } })
            
        }
    },
    props: {
        content: Object
    },
    setup() {
        
    },
}
</script>

<style scoped>

.card {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 4vh 0 0vh 6vw;
    min-height: 25vh;
    padding: 20px 20px 12px;
    background: #ffffff;
    border: 1px solid blue;
    box-shadow: 0px 0px 15px #b3b3b3;
    border-radius: 7px;
    
}

.card p {
    font-size: 1.5rem;
    font-weight: bold;
}

.card p:hover {
    cursor: pointer;
}

.card label {
    margin-top: -0.5rem;
    font-size: 0.8rem;
}

.card .footer {
    color: rgb(190, 190, 190);
    margin-top: 1.8rem;
}

span {
    margin: 0 0.5rem 0 0;
}

.category {
    color:rgb(19, 128, 252);
    font-weight: bold;
}


</style>