<template>
    <div class="wrap">
        <h1 class="page">전체 글</h1>
        <hr />
        <div id="searchBox">
            <select id="selectSearch">
                <option value="title" selected>제목</option>
                <option value="category">카테고리</option>
            </select>
            <input v-model="word.keyword" @keyup.enter="searchArticle" type="text" id="inputSearch" placeholder="검색어 입력" /><span @click="searchArticle" class="material-icons">search</span>
        </div>
        <div id="articles">
            <table border="0" align="center" >
                <tr class="columns">
                    <td>번호</td><td>제목</td><td>카테고리</td><td>작성일</td>
                </tr>
                <tr></tr>
                <tr class="articleRow" @click="viewArticle(article.articleNO)" v-for="(article, index) in articles" :key="article" :index="index">
                    <td width="10%">{{index + 1}}</td>
                    <td width="50%" align="left">{{article.title}}</td>
                    <td width="20%">{{article.category}}</td>
                    <td width="20%">{{article.writeDate}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'



export default {
    name: "ArticleList",
    data(){
        return{
            id: null,
            articles:[
                { articleNO: null, title:null, category:null, writeDate:null}
            ],
            word:{keyword:''}
        }
    },

    beforeMount: function(){
        if(this.id === null){
            axios.post("/api/board/getId",this.$session.id())
            .then((response)=>{
                this.id = response.data;
                axios.post('/api/listArticles',this.id)
                .then((response)=>{
                    this.articles = response.data;
                })
                .catch(()=>{
                    alert("정보를 불러오는 데 실패했습니다.");
                })
            })
            .catch(()=>{
                console.log("Failed Recieving ID");
            })
        }
        
        console.log(this.id);
    },
    methods: {
        viewArticle(payload){
            axios.post("/api/board/sendArticleNO", payload)
            .then(()=>{
                console.log(payload);
                this.$router.push("view-article")            
            })
        },

        searchArticle(){
            const selectBox = document.getElementById("selectSearch").value;

            if(this.word.keyword === ''){
                axios.post("/api/board/getId",this.$session.id())
                .then((response)=>{
                    this.id = response.data;
                    axios.post('/api/listArticles',this.id)
                    .then((response)=>{
                        this.articles = response.data;
                    })
                    .catch(()=>{
                        alert("정보를 불러오는 데 실패했습니다.");
                    })
                })
                .catch(()=>{
                    console.log("Failed Recieving ID");
                })
            }else{
                axios.post("api/board/getId",this.$session.id())
                .then((response)=>{
                    this.id = response.data;

                    if(selectBox == "title"){
                        axios.post("/api/board/search-title",this.word)
                        .then((response)=>{
                            this.articles = response.data;
                        })
                        .catch(()=>{
                            alert("검색을 실패했습니다. 잠시 후에 다시 시도해 주세요.");
                        })
                    }else if(selectBox == "category"){
                        axios.post("/api/board/search-category",this.word)
                        .then((response)=>{
                            this.articles = response.data;
                        })
                        .catch(()=>{
                            alert("검색을 실패했습니다. 잠시 후에 다시 시도해 주세요.");
                        })
                    }
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

        #searchBox{
            width: 100%;
            height: 40px;
            display:flex;
            justify-content:flex-end;
            margin-top:20px;
            #selectSearch{
                width:100px;
                height:30px;
                border:0px;
                background-color: transparent;
                margin:2px;
                font-size:14px;
                font-family: inherit;
            }

            #inputSearch{
                width:250px;
                height:25px;
                display:block;
                font-family: inherit;
                border: 0;
                border-bottom: 1px solid #aaa;
                background-color: transparent;
                outline: 0;
                font-size:22px;
                color:#444;
                line-height: 40px;
                margin-top:5px;
            }

            .material-icons{
                display:inline-block;
                font-size:30px;
                line-height:40px;
                margin-right:10px;
                cursor: pointer;
            }
        }

        #articles{
            margin-top: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            table{
                tr{
                    &:nth-child(2){
                        height:10px;
                        border-bottom:1px solid gray;
                    }
                    
                }
                width:100%;
                border-collapse: collapse;
                .columns{
                    height:30px;
                    font-size:22px;
                }

                .articleRow{
                    color:#333;
                    font-size:20px;
                    &:hover{
                        background-color:#eeeeee;
                    }
                }

            }
        }
    }
</style>