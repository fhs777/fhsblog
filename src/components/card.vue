<template>
    <div class="card" @mouseover="mouseOver" @mouseleave="mouseLeave" :class="{ cardActive: isActive }">
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
    props: {
        content: Object
    },
    data() {
        return {
            isActive: false,
        }
    },
    methods: {
        readarticle(id) {
            console.log(id);
            this.$router.push({path: '/article',  query: { articleid: id } })          
        },
        mouseOver() {
            console.log('mouseOver')
            this.isActive = true
        },
        mouseLeave() {
            this.isActive = false
        }
    },
    
}
</script>

<style scoped>

.card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-align: left;
    margin: 0 0 10px 0;
    min-height: 25vh;
    padding: 20px 20px 12px;
    background: #ffffff;
   
    /*box-shadow: 0px 0px 15px #b3b3b3;
    border-radius: 7px;*/
    
}

.cardActive {
    box-shadow: 0px 0px 10px 1px #b5b5b570;
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