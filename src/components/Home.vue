<template>
    <div id="wrap">
        <header>
            <router-link class="router" to="/"><span class="material-icons">house</span></router-link>
            <div class="setting">
                <div id="info">{{id}}test &nbsp;&#124;&nbsp;</div>
                <div id="logout" @click="logout" ><span class="material-icons">sensor_door</span></div>
            </div>
        </header>
        <div class="sideBar">
            <ul class="leftSide">
                <li>전체 글</li>
                <li>글 작성</li>
                <li>글 관리</li>
                <li>카테고리</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',
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
<style lang="scss" scoped>

    #wrap{
        header{
            width:100%;
            height: 40px;
            background-color:red;

            .router{
                float: left;
                margin:5px 0px 5px 10px;
                display:block;
                width:30px;
                height:30px;
                
                .material-icons{
                text-decoration: none;
                color: gray;
                font-size:30px;
                }
            }
           
            .setting{
                display: flex;
                width:150px;
                height:40px;
                line-height:40px;
                background-color:yellow;
                float:right;
                margin-right: 20px;
                justify-content: center;
                #logout{
                    line-height:53px;
                    cursor: pointer;
                }
            }

            
        }

        .sideBar{
            display:block;
            width:200px;
            height:1080px;
            background-color:green;

        }
    }
</style>