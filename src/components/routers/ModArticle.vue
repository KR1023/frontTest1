<template>
    <div class="wrap">
        <h1 class="page">글 수정</h1>
        <hr />
        <div id="articleWrap">
            <div class="title">
                <span>제목</span>
                <input v-model="article.title" type="text" id="title" placeholder="제목"/>
            </div>
            <div class="category">
                <span>카테고리</span>
                <select v-model="article.category" @change="selectCategory" id="category">
                    <option value=null selected>없음</option>
                    <option v-for="cat in categories" :key="cat" :value="cat.name" selected>{{cat.name}}</option>
                </select>
            </div>
            <div class="content">
                <textarea v-model="article.content" cols="150" rows="25" wrap="hard" maxlength="5000"></textarea>
            </div>
            <div class="submit">
                <span @click="modArticle">수정하기</span><span @click="backToArticle">취&nbsp;&nbsp;&nbsp;소</span>
            </div>
        
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default{

    name: "ModArticle"
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
        // receive article.
        axios.get("/api/board/get-article")
        .then((response)=>{
            console.log(response.data);
            this.article = response.data;
            console.log("this.article : ");
            console.log(this.article);
            if(this.article.category === null){
                this.catIsNull = true;
            }
            // receive category List
            axios.post("/api/board/getCategory",this.$session.id())
            .then((response)=>{
                this.categories = response.data;
            })
            .catch(()=>{
                alert("데이터 수신 오류");
            })
        })
    },
    methods: {
        selectCategory(){
            console.log("선택된 카테고리 : ");
            console.log(this.article.category);
        },

        // 글 수정
        modArticle(){
            axios.post("/api/board/mod-article",this.article)
            .then(()=>{
                alert('글을 수정했습니다!');
                axios.post("/api/board/sendArticleNO",this.article.articleNO)
                .then(()=>{
                    this.$router.push("/view-article");
                })
            })
            .catch(()=>{
                alert("글 수정에 실패했습니다. 잠시 후에 다시 시도해 주세요.");
            })
        },

        // 글 수정 취소
        backToArticle(){
            axios.post("/api/board/sendArticleNO",this.article.articleNO)
            .then(()=>{
                this.$router.push("/view-article");
            })
            .catch(()=>{
                alert("오류가 발생했습니다! 잠시 후에 다시 시도해 주세요.");
            })
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
