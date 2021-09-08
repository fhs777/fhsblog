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
    margin: 4vh 0 2vh 8vw;
    min-height: 20vh;
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 0px 15px #b3b3b3;
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
    margin-top: 0.5rem;
}

span {
    margin: 0 0.5rem 0 0;
}

.category {
    color:rgb(19, 128, 252);
    font-weight: bold;
}


</style>