<template>
    <div class="wrap">
        <h1 class="page">글 보기</h1>
        <div id="articleWrap">
            <div class="title">
                <span>제목</span>
                <input type="text" id="title" placeholder="제목" :value="article.title" disabled/>
            </div>
            <div class="category">
                <span>카테고리</span>
                <span>{{article.category}}
            </div>
            <div class="content">
                <textarea  cols="150" rows="25" wrap="hard" maxlength="5000" disabled :value="article.content"></textarea>
            </div>
            <div class="submit">
                <span>글 등록</span><span>취&nbsp;&nbsp;&nbsp;소</span>
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
            article:{ArticleNO: null, title: null, category: null, content:null, writeDate: null}
        }
    },
    beforeMount: function(){
        axios.get("/api/board/viewArticle")
        .then((response)=>{
            console.log(response.data);
            this.article = response.data;
            console.log("this.article : ");
            console.log(this.article);

        })
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
