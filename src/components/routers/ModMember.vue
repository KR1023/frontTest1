<template>
    <div class="wrap">
        <h1>정보 수정</h1>
        <hr />
        <div class="memberWrap">
            <div class="lineBox">
                    <span class="spanBox">아이디</span>
                    <input class="inputBox" id="inputId" type="text" name="id" maxlength="20" :value="this.member.id" disabled/>
            </div>
            <div class="infoBox">
                <span></span>
            </div>
            <div class="lineBox">
                    <span class="spanBox">비밀번호</span>
                    <input v-model="member.pwd"  @change="checkPwd" @blur="checkPwd" class="inputBox" id="inputPwd" type="password" name="pwd" maxlength="30" />
            </div>
            <div class="infoBox">
                <span v-if="pwdCheck">{{pwdMessage}}</span>
            </div>
            <div class="lineBox">
                    <span class="spanBox">이름</span>
                    <input v-model="member.name" @change="checkName" @blur="checkName" class="inputBox" id="inputName" type="text" name="name" maxlength="10" />
            </div>
            <div class="infoBox">
                <span v-if="nameCheck">{{nameMessage}}</span>
            </div>
            <div class="lineBox">
                    <span class="spanBox">이메일</span>
                    <input v-model="member.email" @change="checkEmail" @blur="checkEmail" class="inputBox" id="inputEmail" type="text" name="email" maxlength="20" />
            </div>
            <div class="infoBox">
                <span v-if="emailCheck">{{emailMessage}}</span>
            </div>
            <div class="submit">
                <span @click="modMember" >정보 수정</span><span @click="backToList">취&nbsp;&nbsp;&nbsp;소</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

const regPwd = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
const regName = /^[a-zA-Z가-힣]{2,10}$/;
const regEmail = /^[a-zA-Z0-9]*[@]{1}[a-zA-Z0-9]*[.]{1}[a-zA-Z]{1,3}$/;

export default{
    name: 'mod-member',
    data(){
        return{
            member:{
                id:'test', pwd:'', name:'', email:''
            },
            pwdMessage: "",
            nameMessage: "",
            emailMessage: "",
            pwdCheck: false,
            nameCheck: false,
            emailCheck: false
        }
    },
    beforeMount:function(){
        axios.get("/api/member/get-info")
        .then((response)=>{
            this.member = response.data;
        })
        .catch(()=>{
            alert("회원 정보를 불러오는 데 실패했습니다. 잠시 후에 다시 시도해 주세요.");
            this.$router.push('/home');
        })
    },
    methods: {
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

        modMember(){

            const fieldPwd = document.getElementById("inputPwd").value;
            const fieldName = document.getElementById("inputName").value;
            const fieldEmail = document.getElementById("inputEmail").value;

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

            if(confirm("정보를 수정하시겠습니까?")){
                if((fieldPwd!=='')&&(fieldName!=='')&&(fieldEmail!='')){
                    axios.put('/api/member/mod-member', this.member)
                    .then(()=>{
                        alert("정보 수정이 완료되었습니다!");
                        location.href='/home';
                    })
                    .catch(()=>{
                        alert("정보 수정에 실패하였습니다. 잠시 후에 다시 시도해 주세요.");
                    })
                }
            }
        },

        backToList(){
            location.href="/home";
        }
    }
}
</script>
<style lang="scss" scope>
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

        .memberWrap{
            width:100%;
            height:600px;
            background-color: transparent;
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
                    margin-left:235px;
                }
            }

            .submit{
                display:flex;
                justify-content: center;
                text-align: center;
                span{
                    display: inline-block;
                    width:100px;
                    height:40px;
                    line-height: 40px;
                    background-color: transparent;
                    font-size:20px;
                    cursor: pointer;
                    transition: .2s;
                    &:hover{
                        background-color:#ddd;
                        color: #0032ff;
                    }
                }
            }
        }
    }
</style>

