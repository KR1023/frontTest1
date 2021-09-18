<template>
    <div class="wrap">
        <h1>카테고리 관리</h1>
        <hr />
        <div class="categoryWrap">
            <div class="lineBox">
                <span class="spanBox">카테고리</span>
                <input class="inputBox" type="text" maxlength="10" v-model="category.name" @keyup="checkReg" />
                <span class="btnCategory" @click="addCategory">추&nbsp;&nbsp;가</span>
            </div>
            <div class="categoryList">
                <span class="spanBox">카테고리 목록</span>
                <div class="listItem">
                    <div class="itemBox" v-for="item in categoryList" :key="item">
                        <span class="categoryItem" >{{item.name}}</span>
                        <span class="deleteCategory" @click="deleteCategory(item)">X</span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>    
</template>

<script>
import axios from 'axios'

const regCategory = /^[a-zA-Z0-9가-힣]{2,10}$/;

export default {
    name:'Category',
    data(){
        return{
            category:{ name:'',id:''},
            categoryList:{ name:'', id:''}
        }
    },
    beforeMount: function(){
        axios.post("/api/board/getId",this.$session.id())
        .then((response)=>{
            this.category.id = response.data;
        })
        .catch(()=>{
            alert("ID 수신 실패");
        })

         axios.post("/api/board/getCategory",this.$session.id())
            .then((response)=>{
                this.categoryList = response.data;
            })
            .catch(()=>{
                alert("데이터 수신 오류");
            })
    },

    methods: {
        checkReg(){
            console.log(regCategory.test(this.category.name));
        },
        addCategory(){
            if(this.category.name !== '' && (regCategory.test(this.category.name))){
                axios.post('/api/board/add-category',this.category)
                .then(()=>{
                    alert("카테고리를 추가했습니다!");
                    
                    axios.post("/api/board/getId",this.$session.id())
                    .then((response)=>{
                        this.category.id = response.data;
                    })
                    .catch(()=>{
                        alert("ID 수신 실패");
                    })

                    axios.post("/api/board/getCategory",this.$session.id())
                        .then((response)=>{
                            this.categoryList = response.data;
                        })
                        .catch(()=>{
                            alert("데이터 수신 오류");
                        })
                })
                .catch(()=>{
                    alert("카테고리 추가에 실패했습니다. 잠시 후에 다시 시도해 주세요.");
                })
            }else if(this.category.name === ''){
                alert("카테고리를 입력해 주세요!");
                return;
            }else if(regCategory.test(this.category.name) === false){
                alert("2~10 자리의 한글, 영문, 숫자만 입력 가능합니다!");
                return;
            }
        },

        deleteCategory(payload){
            axios.post('/api/board/delete-category',payload)
            .then(()=>{
            console.log("삭제한 카테고리 : ", payload);
            axios.post("/api/board/getId",this.$session.id())
            .then((response)=>{
                this.category.id = response.data;
            })
            .catch(()=>{
                alert("ID 수신 실패");
            })

            axios.post("/api/board/getCategory",this.$session.id())
                .then((response)=>{
                    this.categoryList = response.data;
                })
                .catch(()=>{
                    alert("데이터 수신 오류");
                })    
            })
        }
    }
}
</script>

<style lang="scss">
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

        hr{
            border: 0px;
            border-bottom: 1px solid #000;
        }

        .categoryWrap{
            width:100%;
            height:600px;
            margin-top:40px;
            font-size:28px;
            line-height: 40px;
            
       
            .lineBox{
                width: 100%;
                height:50px;
                text-align: left;
                margin:0;
                padding: 0;
                

                .spanBox{
                    display:inline-block;
                    width:200px;
                    height:40px;
                    font-size:22px;
                    text-align: left;
                    margin:1px;
                    margin-left:30px;

                    &:nth-child(1){
                    margin-top: 10px;
                    }
                }

                .inputBox{
                    width:330px;
                    height:40px;
                    outline: 0;
                    border: 0;
                    font-family: 'PT Sans', sans-serif;
                    border-bottom: 1px solid #d9d9d9;
                    background-color: transparent;
                    font-size: 26px;
                }

                .btnCategory{
                    display: inline-block;
                    width:80px;
                    height: 40px;
                    margin-left:10px;
                    text-align: center;
                    font-size:20px;
                    font-family: inherit;
                    background-color: transparent;
                    cursor: pointer;
                    transition: .2s;
                    &:hover{
                        background-color:#d8d8d8;
                        color:#00dd99;
                    }

                }
            }

            .categoryList{
                width:100%;
                height:535px;
                margin-top: 10px;
                .spanBox{
                    font-size: 24px;
                    margin-left:30px;
                }

                .listItem{
                    display: flex;
                    flex-wrap: wrap;
                    position: relative;
                    width:93%;
                    height: auto;
                    margin:5px auto;
                    .itemBox{
                        width:auto;
                        height:40px;
                        margin:5px;
                        .categoryItem{
                            display: inline-block;
                            box-sizing: border-box;
                            padding:5px;
                            width: 100px;
                            height:40px;
                            font-size: 20px;
                            line-height:30px;
                            margin:10px;
                            text-align: center;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .deleteCategory{
                            display: block;
                            color:#d9d9d9;
                            font-size:18px;
                            margin-top:8px;
                            margin-left:-10px;
                            float:right;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>