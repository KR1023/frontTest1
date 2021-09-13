<template>
    <div class="wrap">
        <h1>글 추가</h1>
    </div>
</template>
<script>
import axios from 'axios'

export default{

    name: "AddArticle"
    ,
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
}
</script>
<style lang="scss" scoped>
    .wrap{
        margin:0;
        padding:0;
        h1{
            display:inline;
            font-size: 38px;

        }
    }
</style>
