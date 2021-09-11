<template>
    <div id="wrap">
        <h1>{{info.accId}}님, 로그인 되었습니다!</h1>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginConfirm',
    data(){
        return{
            info:{accId:'', sessionId:''}
        }
    },
    created: function(){
        axios.get('/api/getId')
        .then((response)=>{
            this.info = response.data;
            this.info.accId = response.data.accId;
            this.info.sessionId = response.data.sessionId;
        })
    }


    

}
</script>