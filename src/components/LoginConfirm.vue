<template>
    <div id="wrap">
        <h1>{{id}}님, 로그인 되었습니다!</h1>
    </div>
</template>

<script>
// import eventBus from '../eventBus.js'
export default {
    name: 'LoginConfirm',
    created: function(){
        // eventBus.$on('id',(payload)=>{
        //     this.id = payload;
        // });
    },
    data(){
        return{
            id:''
        }
    }
    

}
</script>