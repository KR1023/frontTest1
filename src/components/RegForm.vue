<template>
    <div id="wrap">
        <div id="form_wrap">
            <h1 class="sub">정보 입력</h1>
                
            <div class="lineBox">
                <span class="spanBox">아이디</span>
                <input class="inputBox" v-model="member.id" @keyup="checkId" @change="checkId();" @click="showResult" @keyup.tab="showResult" @blur="showResult" id="inputId" type="text" name="id" />
            </div>
            <div class="infoBox">
                <span v-if="idCheck">{{message}}</span>
            </div>
            <div class="lineBox">
                <span class="spanBox">비밀번호</span>
                <input class="inputBox" v-model="member.pwd" @blur="checkPwd" id="inputPwd" type="password" name="pwd" />
            </div>
            <div class="infoBox">
                <span  v-show="pwdIsNull" >비밀번호를 입력해 주세요!</span>
            </div>
            <div class="lineBox">
                <span class="spanBox">이름</span>
                <input class="inputBox" v-model="member.name"  @blur="checkName" id="inputName" type="text" name="name" />
            </div>
            <div class="infoBox">
                <span  v-show="nameIsNull" >이름을 입력해 주세요!</span>
            </div>
            <div class="lineBox">
                <span class="spanBox">이메일</span>
                <input class="inputBox" v-model="member.email"  @blur="checkEmail" id="inputEmail" type="email" name="email" />
            </div>
            <div class="infoBox">
                <span v-show="emailIsNull" >이메일을 입력해 주세요!</span>
            </div>
            <div class="regBtn"><span @click="register">회원 가입</span></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    
    name:"RegForm",
    data() {
        return{
            member:{
                id: '',
                pwd: '',
                name: '',
                email: ''
            },
            idCheck: false,
            message: "",

            result: null,
            pwdIsNull: false,
            nameIsNull: false,
            emailIsNull: false
        }
    },
    methods: {

        checkId(){
                if(this.member.id !== ''){
                    axios.post("/api/member/checkId",this.member.id)
                    .then((response)=>{
                        this.result = response.data;
                        if(this.result === 1){
                            this.message = "이미 존재하는 아이디입니다!";
                        }
                    })
                    .catch(()=>{
                        console.log("중복 확인 오류");
                    })
                }else{
                    this.message = "아이디를 입력해 주세요!"
                }

                
        },

        showResult(){
            if(this.member.id === null || this.member.id === ""){
                this.idCheck = true;
            }else{
                if(this.result === 1){
                    this.idCheck = true;
                }else{
                    this.idCheck = false;
                }
            }
        },

        checkPwd(){
            const form = document.getElementById("inputPwd");  
            if(form.value === null || form.value === ''){
                this.pwdIsNull = true;
            }else{
                 this.pwdIsNull= false;
            }
        },
        checkName(){
            const form = document.getElementById("inputName");  
            if(form.value === null || form.value === ''){
                this.nameIsNull = true;
            }else{
                 this.nameIsNull= false;
            }
        },
        checkEmail(){
            const form = document.getElementById("inputEmail");  
            if(form.value === null || form.value === ''){
                this.emailIsNull = true;
            }else{
                 this.emailIsNull= false;
            }
        },
        register(){
            const fieldId = document.getElementById("inputId").value;
            const fieldPwd = document.getElementById("inputPwd").value;
            const fieldName = document.getElementById("inputName").value;
            const fieldEmail = document.getElementById("inputEmail").value;
            if((fieldId!=='')&&(fieldPwd!=='')&&(fieldName!=='')&&(fieldEmail!='')){
                axios.post('http://localhost:8888/api/member/addMember', this.member)
            .then((response)=>{
                console.log(response);
                alert("회원가입이 완료되었습니다!");
                location.href='/';
            })
            .catch((e)=>{
                console.log(e);
                alert("Error!");
            })
            }else{
                if(fieldId===''){
                    alert("아이디를 입력해 주세요!");
                }else if(fieldPwd===''){
                    alert("비밀번호를 입력해 주세요!");
                }else if(fieldName===''){
                    alert("이름을 입력해 주세요!")
                }else if(fieldEmail===''){
                    alert("이메일을 입력해 주세요!")
                }
            }
            // obj.action("/regTerms");
            // obj.submit();
        }
    }
}
</script>
<style lang="scss" scoped>
    #wrap{
        margin-top: 140px;
        font-family: 'Noto Sans KR', sans-serif;
    }

    #form_wrap{
        width: 600px;
        height: 600px;
        background-color: #f9f9f9dc;
        margin: 0 auto;
        box-sizing: border-box;
        .sub{
            font-size:36px;
            text-align: left;
            margin: 20px;
        }

        

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
                font-size:26px;
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

            

        }

        .infoBox{
                width: 100%;
                height: 40px;
                span {
                    display: inline-block;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    text-align: left;
                    font-style: bold;
                    color: red;
                    margin-left:80px;
                }
            }

        .regBtn{
            display: block;
            width: 180px;
            height:40px;
            background-color:#f9f9f9dc;
            margin: 0 auto;
            margin-top:40px;
            text-decoration: none;
            transition: .2s;
            &:hover{
                background-color:#e0e0e0;
            }
            span{
                display:block;
                height:40px;
                font-size:28px;
                color: #cfcfcf;
                transition: .2s;
                &:hover{
                    color: #f9f9f9dc;
                }
            }
        }

    }
    
</style>

