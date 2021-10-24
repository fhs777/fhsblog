<template>
    <p>technology</p>
     <p>technology</p>
      <p>technology</p>
       <p>technology</p>
        <p>technology</p>
         <p>technology</p>
          <p>technology</p>
           <p>technology</p>
            <p>technology</p>
             <p>technology</p>
              <p>technology</p>
               <p>technology</p>
</template>

<script>
export default {
    setup() {
        
    },
    created() {
        let date = new Date()
        console.log('123')
        console.log(date.getFullYear()+"-" + (date.getMonth()+1) +'-'+ date.getDate() +'')
    }
}
</script>