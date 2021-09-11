<template>
    <div id="wrap">
        <h2>회원 가입</h2>
        <div id="form_wrap">
            <p class="sub">정보 입력</p>
            <div class="box">
                <form method="POST" action="/member/addMember">
                <table align="center">
                
                    <tr>
                        <td>아이디</td>
                        <td><input  v-model="member.id"  @blur="checkId" id="inputId" type="text" name="id" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td  v-show="idIsNull" >아이디를 입력해 주세요!</td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input v-model="member.pwd" @blur="checkPwd" id="inputPwd" type="password" name="pwd" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td  v-show="pwdIsNull" >비밀번호를 입력해 주세요!</td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td><input v-model="member.name"  @blur="checkName" id="inputName" type="text" name="name" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td  v-show="nameIsNull" >이름을 입력해 주세요!</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input v-model="member.email"  @blur="checkEmail" id="inputEmail" type="email" name="email" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td  v-show="emailIsNull" >이메일을 입력해 주세요!</td>
                    </tr>
                </table>
                </form>
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
                id:"",
                pwd:"",
                name:"",
                email:""
            },
            idIsNull: false,
            pwdIsNull: false,
            nameIsNull: false,
            emailIsNull: false
        }
    },
    methods: {

        checkId(){
            const form = document.getElementById("inputId");
            
            if(form.value == null || form.value == ''){
                this.idIsNull = true;
            }else{
                 this.idIsNull= false;
            }
        },
        checkPwd(){
            const form = document.getElementById("inputPwd");  
            if(form.value == null || form.value == ''){
                this.pwdIsNull = true;
            }else{
                 this.pwdIsNull= false;
            }
        },
        checkName(){
            const form = document.getElementById("inputName");  
            if(form.value == null || form.value == ''){
                this.nameIsNull = true;
            }else{
                 this.nameIsNull= false;
            }
        },
        checkEmail(){
            const form = document.getElementById("inputEmail");  
            if(form.value == null || form.value == ''){
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
    h2{
        text-align:center;
    }

    #form_wrap{
        font-family: 'Noto Sans KR', sans-serif;
        width: 400px;
        height: 400px;
        background-color: #f9f9f9dc;
        margin: 0 auto;
        .sub{
            padding:18px;
            font-size:20px;
            text-align: left;
        }

        .box{
            border:1px solid #e1e1e1;
            // border-top: 0px;
            // border-bottom: 0px;
            width:90%;
            height:300px;
            margin:0 auto;
            p{
                text-align: left;
                padding-left:2%;
            }

            table{
                margin-top: 30px;
                tr{
                    td{
                        padding:2px;
                        &:first-child{
                            text-align:left;
                        }
                        
                        input{
                            border: 1px solid #e1e1e1;
                            height: 20px;
                            width:180px;
                            font-size:17px;
                            
                            &:focus{
                                outline: solid 1px #a7a7a7;
                            }
                        }
                        
                        
                    }
                    &:nth-child(2n){
                        color:red;
                        font-size:12px;
                        text-align: left;
                    }
                }
            }
        }

        .regBtn{
            display: block;
            width: 180px;
            height:35px;
            background-color:#f9f9f9dc;
            margin: 5px auto;
            text-decoration: none;
            transition: .2s;
            &:hover{
                background-color:#e0e0e0;
            }
            span{
                display:block;
                height:35px;
                font-size:20px;
                color: #cfcfcf;
                transition: .2s;
                &:hover{
                    color: #f9f9f9dc;
                }
            }
        }

    }
    
</style>

