<template>
    <div id="wrap">
        <h1>{{id}}님, 로그인 되었습니다!</h1>
        <!-- <h2>SessionId는 {{info.sessionId}}입니다.</h2> -->
        <button id="logoutBtn" @click="logout"><span>로그아웃</span></button>
        <h2>{{this.$session.id()}}</h2>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LoginConfirm',
    data(){
        return{
            id:''
        }
    },
    beforeCreate: function(){
        axios.get("/api/getId")
        .then((response)=>{
            this.id = response.data
        })
        .catch(()=>{
            alert("정보를 불러오는 데 실패하였습니다. 다시 로그인 해주세요.");
        })
        if(!this.$session.exists()){
            alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
            location.replace("/");
        }
    },
    methods:{
        logout(){
            axios.post('/api/logout', this.id);
            this.$session.destroy();
            alert("로그아웃 되었습니다!");
            location.replace("/");
        }
    }
}
</script>