<template>
    <div id="wrap">
        <div id="form_wrap">
            <h1 class="sub">정보 입력</h1>
                
            <div class="lineBox">
                <span class="spanBox">아이디</span>
                <input class="inputBox" v-model="member.id" @keyup="checkId" @change="checkId();" @click="showResult" @keyup.tab="showResult" @blur="showResult" id="inputId" type="text" name="id" maxlength="20"/>
            </div>
            <div class="infoBox">
                <span v-if="idCheck">{{idMessage}}</span>
            </div>
            <div class="lineBox">
                <span class="spanBox">비밀번호</span>
                <input class="inputBox" v-model="member.pwd" @change="checkPwd" @blur="checkPwd" id="inputPwd" type="password" name="pwd" maxlength="30"/>
            </div>
            <div class="infoBox">
                <span  v-show="pwdCheck" >{{pwdMessage}}</span>
            </div>
            <div class="lineBox">
                <span class="spanBox">이름</span>
                <input class="inputBox" v-model="member.name" @change="checkName" @blur="checkName" id="inputName" type="text" name="name" maxlength="10"/>
            </div>
            <div class="infoBox">
                <span  v-show="nameCheck" >{{nameMessage}}</span>
            </div>
            <div class="lineBox">
                <span class="spanBox">이메일</span>
                <input class="inputBox" v-model="member.email"  @change="checkEmail" @blur="checkEmail" id="inputEmail" type="email" name="email" maxlength="50"/>
            </div>
            <div class="infoBox">
                <span v-show="emailCheck" >{{emailMessage}}</span>
            </div>
            <div class="regBtn"><span @click="register">회원 가입</span></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

const regId = /^[a-z0-9]{4,20}$/;
const regPwd = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
const regName = /^[a-zA-Z가-힣]{2,10}$/;
const regEmail = /^[a-zA-Z0-9]*[@]{1}[a-zA-Z0-9]*[.]{1}[a-zA-Z]{1,3}$/;

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
            idMessage: "",
            pwdMessage: "",
            nameMessage: "",
            emailMessage: "",
            result: null,
            pwdCheck: false,
            nameCheck: false,
            emailCheck: false
        }
    },
    methods: {

        checkId(){
            if(this.member.id !== '' && regId.test(this.member.id)){
                axios.post("/api/member/checkId",this.member.id)
                .then((response)=>{
                    this.result = response.data;
                    if(this.result === 1){
                        this.idMessage = "이미 존재하는 아이디입니다!";
                    }
                })
                .catch(()=>{
                    console.log("중복 확인 오류");
                })
            }else if(this.member.id !== '' && (regId.test(this.member.id) === false)){
                this.idMessage = "4~20 자리의 소문자와 숫자만 사용할 수 있습니다.";
            }else{
                this.idMessage = "아이디를 입력해 주세요!";
            }
        },

        showResult(){
            if(this.member.id === null || this.member.id === ""){
                this.idCheck = true;
            }else{
                if(this.result === 1){
                    this.idCheck = true;
                }else if(!regId.test(this.member.id)){
                    this.idCheck = true;
                }else{
                    this.idCheck = false;
                }
            }
        },

        checkPwd(){
            const form = document.getElementById("inputPwd").value;  
            if(form === null || form === ''){
                this.pwdMessage="비밀번호를 입력해 주세요!";
                this.pwdCheck = true;
            }else if(form !== null && (regPwd.test(this.member.pwd)===false)){
                this.pwdMessage="8~30 자리의 대소문자, 특수문자를 입력해 주세요.";
                this.pwdCheck = true;
            }else{
                 this.pwdCheck= false;
            }
        },

        checkName(){
            const form = document.getElementById("inputName").value;  
            if(form === null || form === ''){
                this.nameMessage="이름을 입력해 주세요!";
                this.nameCheck = true;
            }else if(form !== null && (regName.test(this.member.name)===false)){
                this.nameMessage="영문 또는 한글만 입력해 주세요.";
                this.nameCheck = true;
            }else{
                this.nameCheck = false;
            }
        },
        checkEmail(){
            const form = document.getElementById("inputEmail").value;  
            if(form === null || form === ''){
                this.emailMessage="이메일을 입력해 주세요!";
                this.emailCheck = true;
            }else if(form !== null && (regEmail.test(this.member.email)===false)){
                this.emailMessage = "올바른 이메일 형식을 입력해 주세요.";
                this.emailCheck= true;
            }else{
                this.emailCheck = false;
            }
        },
        register(){
            const fieldId = document.getElementById("inputId").value;
            const fieldPwd = document.getElementById("inputPwd").value;
            const fieldName = document.getElementById("inputName").value;
            const fieldEmail = document.getElementById("inputEmail").value;
            if(this.idCheck == true){
                alert("아이디를 확인해 주세요!");
                return;
            }

            if(this.pwdCheck == true){
                alert("비밀번호를 확인해 주세요!");
                return;
            }

            if(this.nameCheck == true){
                alert("이름을 확인해 주세요!");
                return;
            }

            if(this.emailCheck == true){
                alert("이메일을 확인해 주세요!");
                return;
            }

            if((fieldId!=='')&&(fieldPwd!=='')&&(fieldName!=='')&&(fieldEmail!='')){
                axios.post('/api/member/addMember', this.member)
                .then((response)=>{
                    console.log(response);
                    alert("회원가입이 완료되었습니다!");
                    location.href='/';
                })
                .catch((e)=>{
                    console.log(e);
                    alert("Error!");
                })
            }
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

            

        }

        .infoBox{
                width: 100%;
                height: 40px;
                span {
                    display: inline-block;
                    width: 270px;
                    height: 40px;
                    font-size:12px;
                    line-height: 40px;
                    text-align: left;
                    font-style: bold;
                    color: red;
                    margin-left:120px;
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

