<template>
    <div class="wrap">
        <h1 class="page">글 작성</h1>
        <hr />
        <div id="articleWrap">
            <div class="title">
                <span>제목</span>
                <input v-model="article.title" type="text" id="title" placeholder="제목"/>
            </div>
            <div class="category">
                <span>카테고리</span>
                <select v-model="article.category" @change="selectCategory" id="category">
                    <option value=null selected="selected">없음</option>
                    <option v-for="cat in categories" :key="cat" :value="cat.name" selected>{{cat.name}}</option>
                </select>
            </div>
            <div class="content">
                <textarea v-model="article.content" cols="150" rows="25" wrap="hard" maxlength="5000"></textarea>
            </div>
            <div class="submit">
                <span @click="addArticle">글 등록</span><span @click="backToList">취&nbsp;&nbsp;&nbsp;소</span>
            </div>
        
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default{

    name: "AddArticle"
    ,
    data(){
        return{
            getId: null,
            title: null,
            categories: [{name: null}],
            content: null,
            article: {id: null, title: null, content: null, category: null},
            selectedCat: null
        }
    },
    beforeMount: function(){
        // recieve ID
        if(this.getId === null){
        axios.post("/api/board/getId", this.$session.id())
        .then((response)=>{
            this.article.id = response.data
            // receive category List
            axios.post("/api/board/getCategory",this.$session.id())
            .then((response)=>{
                this.categories = response.data;
            })
            .catch(()=>{
                alert("데이터 수신 오류");
            })
        })
        .catch(()=>{
            alert("정보를 불러오는 데 실패하였습니다. 다시 로그인 해주세요.");
            location.href="/";
        })
        }
        if(!this.$session.exists()){
            alert("로그인이 필요합니다! 로그인 페이지로 이동합니다.");
            location.replace("/");
        }
    },

    methods: {
        selectCategory(){
            console.log("선택된 카테고리 : ");
            console.log(this.article.category);
            
        },
        

        // 글 등록
        addArticle(){
            axios.post("/api/board/addArticle",this.article)
            .then(()=>{
                alert('글을 등록했습니다!');
                location.href="/home";
            })
            .catch(()=>{
                alert("글 등록에 실패했습니다. 잠시 후에 다시 시도해 주세요.");
            })
        },

        backToList(){
            location.href="/home";
        }
    }
}
</script>
<style lang="scss" scoped>
    .wrap{
        display: block;
        flex-direction: row;
        flex-wrap: wrap;
        width:100%;
        height: 100%;
        margin: 0;
        padding: 0;
        text-align: left;
        h1{
            display:inline;
            font-size: 38px;

        }
        .page{
            font-size:38px;
            display:block;
            color:#000;
            text-align:start;
            padding: 0;
            margin: 0;
        }

        hr{
            border: 0px;
            border-bottom: 1px solid #000;
        }

        #articleWrap{
            width:100%;
            height:600px;
            background-color: transparent;
            margin-top:40px;
            font-size:28px;
            line-height: 40px;
            span{
                margin:1px 0;
                padding:0;
                margin-left:40px;
                display : inline-block;
                width: 110px;
            }


            p {
                padding: 0;
                margin: 0;
                margin-left: 40px;
                text-align: left;
            }
            
            input[type="text"]{
                border:0;
                border-bottom: 1px solid #aaa;
                margin-left: 10px;
                outline: none;
                width:400px;
                height: 40px;
                font-size:28px;
                background-color: transparent;
            }
            .title{
                height:40px;
                
            }

            .category{
                margin-top:10px;
                select{
                    width:200px;
                    font-size:22px;
                    font-family: inherit;
                    border:0px solid #eee;
                    background-color: transparent;
                    margin-left:10px;
                }
            }
            .content{
                textarea{
                    margin-top: 20px;
                    margin-left: 40px;
                    outline: none;
                    border: 1px solid #d9d9d9;
                    background-color: transparent;
                    resize: none;
                }
            }

            .submit{
                display:flex;
                justify-content: center;
                text-align: center;
                span{
                    display: inline-block;
                    width:100px;
                    height:36px;
                    line-height: 36px;
                    background-color: transparent;
                    font-size:20px;
                    cursor: pointer;
                    &:hover{
                        background-color:#ddd;
                        color: #0032ff;
                    }
                }
            }
        }
    }
</style>
