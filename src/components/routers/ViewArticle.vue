<template>
    <div class="wrap">
        <h1 class="page">{{article.title}}</h1>
        <div id="articleWrap">
            <div class="category">
                <span>카테고리</span>
                <span v-if="catIsNull">없음</span>
                <span v-if="visible" class="categoryBox">{{article.category}}</span>
            </div>
            <div class="writeDate">
                <span>작성일</span>
                <span>{{article.writeDate}}</span>
            </div>
            <div class="submit">
                <span @click="modifyArticle">수정</span>
                <span @click="deleteArticle">삭제</span>
                <span @click="backToList">글 목록</span>
            </div>
            <div class="content">
                <textarea  cols="150" rows="25" wrap="hard" maxlength="5000" disabled :value="article.content"></textarea>
            </div>
            
        
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default{

    name: "ViewArticle"
    ,
    data(){
        return{
            article:{ArticleNO: null, title: null, category: null, content:null, writeDate: "2021-09-15"},
            catIsNull: false,
            visible: true,
        }
    },
    beforeMount: function(){
        axios.get("/api/board/viewArticle")
        .then((response)=>{
            console.log(response.data);
            this.article = response.data;
            console.log("this.article : ");
            console.log(this.article);
            if(this.article.category === null){
                this.catIsNull = true;
                this.visible = false;
            }
        })
    },
    methods: {

        // 전체 글 목록 페이지로 이동
        backToList(){
            this.$router.push("list-article");
        },

        // 글 수정 페이지로 이동
        modifyArticle(){
            if(window.confirm("글을 수정하시겠습니까?")){
                axios.post("/api/board/send-article",this.article)
                .then(()=>{
                    this.$router.push("mod-article");
                })
                .catch(()=>{
                    alert("정보를 불러오는 데 실패했습니다. 잠시 후에 다시 시도해 주세요.");
                })
            }else{
                console.log("수정 취소");
            }
        },

        // 글 삭제
        deleteArticle(){
            if(confirm("글을 삭제하시겠습니까?")){
                axios.post("/api/board/delete-article",this.article.articleNO)
                .then(()=>{
                    alert("글을 삭제했습니다!");
                    this.$router.push("list-article");
                })
                .catch(()=>{
                    alert("글 삭제를 실패했습니다! 잠시 후에 다시 시도해 주세요.");
                })
            }
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
                font-size:24px;
                .categoryBox{
                    width:500px;
                }
            }

            .writeDate{
                font-size:24px;
                span{
                    &:nth-child(2){
                        width:200px;
                    }
                }
            }

            .content{
                textarea{
                    margin-top: 20px;
                    margin-left: 40px;
                    outline: none;
                    border: 0px solid #d9d9d9;
                    background-color: transparent;
                    resize: none;
                }
            }

            .submit{
                text-align: left;
                span{
                    display: inline-block;
                    text-align:center;
                    width:40px;
                    height:30px;
                    line-height: 30px;
                    background-color: transparent;
                    font-size:16px;
                    cursor: pointer;
                    &:hover{
                        background-color:#ddd;
                        color: #0032ff;
                    }
                    &:nth-child(2){
                        margin-left:0;
                    }
                    &:nth-child(3){
                        width:50px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>
