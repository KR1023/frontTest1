<template>
    <div id="wrap">
        <header>
            <router-link class="router" to="/home"><span class="material-icons">house</span></router-link>
            <div class="setting">
                <div id="info" @click="modMember">{{id}} &nbsp;&#124;&nbsp;</div>
                <div id="logout" @click="logout" ><span class="material-icons">sensor_door</span></div>
            </div>
        </header>
        <div class="sideBar">
            <ul class="leftSide">
                <router-link to="/list-article" class="listWrap"><li>전체 글</li></router-link>
                <router-link to="/add-article" class="listWrap"><li>글 작성</li></router-link>
                <router-link to="/manage-article" class="listWrap"><li>글 관리</li></router-link>
                <router-link to="/category" class="listWrap"><li>카테고리</li></router-link>
            </ul>
        </div>
        <section class="displayWrap">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import VueRouter from 'vue-router'
import ArticlesList from './routers/ArticlesList'
import AddArticle from './routers/AddArticle'
import ViewArticle from './routers/ViewArticle'
import ModArticle from './routers/ModArticle'
import ModMember from './routers/ModMember'
import Category from './routers/Category'

const router = new VueRouter({
    mode:'history',
    routes : [
        { name: 'home', path:'/home', component: ArticlesList},
        { name: 'list', path: '/list-article', component: ArticlesList},
        { name: 'add', path: '/add-article', component: AddArticle},
        { name: 'view', path: '/view-article', component: ViewArticle},
        { name: 'mod', path: '/mod-article', component: ModArticle},
        { name: 'modMember', path: '/mod-member', component: ModMember},
        { name: 'category', path: '/category', component: Category}
        
    ]
})
export default {
    router,

    name: 'Home',
    data(){
        return{
            id:''
        }
    },


    beforeCreate: function(){
        axios.post("/api/board/getId",this.$session.id())
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
            if(window.confirm("로그아웃 하시겠습니까?")){
            axios.post('/api/logout', this.id);
            this.$session.destroy();
            alert("로그아웃 되었습니다!");
            location.replace("/");
            }
        },

        modMember(){
            axios.post("/api/member/get-member",this.$session.id())
            .then(()=>{
                this.$router.push("mod-member");
            })
        }
    }
}
</script>
<style lang="scss" scoped>

    #wrap{
        display:flex;
        flex-wrap: wrap;
        font-family: 'Noto Sans KR', sans-serif;
        header{
            width:100%;
            height: 40px;
            background-color:#303030;

            .router{
                float: left;
                margin:5px 0px 5px 10px;
                display:block;
                width:30px;
                height:30px;
                
                .material-icons{
                text-decoration: none;
                color: #f0f0f0;
                font-size:30px;
                }
            }
           
            .setting{
                display: flex;
                width:150px;
                height:40px;
                color:#f0f0f0;
                line-height:40px;
                float:right;
                margin-right: 20px;
                justify-content: center;
                #info{
                    cursor: pointer;
                }
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
            background-color:#303030;
            .leftSide{
                float:left;
                .listWrap{
                    text-decoration: none;

                }
                li{
                    display:block;
                    width:200px;
                    height:50px;
                    background-color:#525252;
                    text-align:left;
                    line-height:50px;
                    margin-top:1px;
                    padding-left:20px;
                    box-sizing:border-box;
                    color:#eeeeee;
                    &:hover{
                        color:#525252;
                        background-color:#eeeeee;
                    }
                }
                
            }
        }

        .displayWrap{
            width:70%;
            height:800px;
            margin:100px 0 0 75px;
            padding: 0;
        }
        
    }
</style>