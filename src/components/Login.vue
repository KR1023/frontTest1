<template>
  <div class="body">
    <img class="logo" src="../assets/logo.png" alt="logo"/>
    <p>
      Simple Web Note
    </p>
    <div id="loginForm" >
        <div id="inputWrapper">
            <input  @keydown.enter='login' v-model="info.id" @focus="focusId" @blur="focusIdOut" id="user_id" class="inputTxt" type="text" name="user_id" />
                <span id="span_id">아이디</span>
                <span v-show="idIsNull" id="warnId" class="inSpan">아이디를 입력해 주세요.</span>
            <input  @keydown.enter='login' v-model="info.pwd" @focus="focusPwd" @blur="focusPwdOut" id="user_pwd" class="inputTxt" type="password" name="user_pwd" />
                <span id="span_pwd">비밀번호</span>
                <span v-show="pwdIsNull" id ="warnPwd" class="inSpan">비밀번호를 입력해 주세요.</span>
            <div id="memInfo">
                <a href="#">아이디/비밀번호 찾기</a>&nbsp;&nbsp;|&nbsp;
                <router-link to="/register">회원가입</router-link>
            </div>
        </div>
        <div @click="login" id="loginBtn" class="formBtn"><span>로그인</span></div>     
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'Login',
  data() {
      return {
          count:0,
          info:{
            id:'',
            pwd:''
          },
          sessionId: '',
          result: null,
          idIsNull: false,
          pwdIsNull: false
      }
  },
  beforeMount: function(){
    if(this.$session.exists()){
        location.replace("/home");
    }
  },
  methods: {
      
      login(){
            const loginBtn = document.querySelector("#loginBtn");
            const wrapper = document.querySelector("#inputWrapper");
            const userId = document.getElementById("user_id").value;
            const userPwd = document.getElementById("user_pwd").value;
            loginBtn.style.top = "250px";
            wrapper.style.display = "block";
            if(this.count > 0){
                if(userId===''){
                    alert("아이디를 입력해 주세요!");
                }
                else if(userPwd === ''){
                    alert("비밀번호를 입력해 주세요!");
                }else{
                    axios.post("/api/login",this.info)
                    .then((response)=>{
                        console.log("로그인 정보 전송 성공");
                        this.result = response.data;
                        if(this.result === 1){
                            alert(this.info.id + "님, 로그인 되었습니다!");
                            this.$session.start();
                            this.$session.set(this.info.id,this.$session.id());
                            this.sessionId = this.$session.get(this.info.id);
                            
                            axios.post("/api/setSession",this.sessionId)
                            .then(()=>{
                                console.log("세션 값을 서버로 전송합니다.");
                                console.log(this.sessionId);
                            })
                            .catch(()=>{
                                alert("세션 ID를 설정할 수 없습니다. 다시 시도해 주세요.");
                            })
                            console.log(this.info.id);
                            location.href="/home";

                        }else if(this.result !== 1){
                            alert("아이디와 비밀번호를 확인해 주세요!");
                        }
                    })
                    .catch(()=>{
                        alert("오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.");
                    })
                    .catch(()=>{
                        console.log("Error!");
                        location.href='/home';
                    })
                }
            }
            this.count++;
      },
      focusId(){
          const spanId = document.getElementById("span_id");
          spanId.style.top="40px";
          spanId.style.fontSize="14px";
          spanId.style.zIndex="0";
      },
      focusPwd(){
          const spanPwd = document.getElementById("span_pwd");
          spanPwd.style.top="115px";
          spanPwd.style.fontSize="14px";
          spanPwd.style.zIndex="0";
      },
      focusIdOut(){
          const spanId = document.getElementById("span_id");
          const userId = document.getElementById("user_id");
          const warnId = document.getElementById("warnId");
          spanId.style.zIndex="-1";
          if(userId.value == null || userId.value ==''){
          spanId.style.top="63px";
          spanId.style.fontSize="16px";
          this.idIsNull=true;
          }else{
              this.idIsNull = false;
              warnId.style.display="none";
          }
      },
      focusPwdOut(){
          const spanPwd = document.getElementById("span_pwd");
          const userPwd = document.getElementById("user_pwd");
          const warnPwd = document.getElementById("warnPwd");
          spanPwd.style.zIndex="-1";
          if(userPwd.value == null || userPwd.value ==''){
          spanPwd.style.top="135px";
          spanPwd.style.fontSize="16px";
          this.pwdIsNull=true;
          }else{
              this.pwdIsNull = false;
              warnPwd.style.display="none";
          }
      },
  },
}
</script>

<style scoped>

.body{
    margin-top:10px;
}

.logo{
    width:80px;
    height:80px;
    margin-top:100px;
}

#loginForm{
    width:400px;
    height: 340px;
    margin:0 auto;
    position:relative;
    font-family: 'Noto Sans KR', sans-serif;
}

#span_id{
    color:#c5c5c5;
    display:block;
    position:absolute;
    top:63px;
    left:57px;
    transition:.2s;
    z-index:-1;
}

#span_pwd{
    color:#c5c5c5;
    display:block;
    position:absolute;
    top:140px;
    left:60px;
    transition:.2s;
    z-index:-1;
}

#inputWrapper{
    display:none;
}
.inputTxt{
    width:300px;
    height:45px;
    border:0px solid gray;
    border-radius: 1px;
    margin: 10px;
    font-size:22px;
    background-color:transparent;

}
.inputTxt:focus{
    outline: 1px solid #d9d9d9;
    
}
.inputTxt[type="text"]{
    margin-top:50px;
}

#user_pwd{
    margin-top:20px;
}
.inSpan{
    display:block;
    position:absolute;
    color:red;
    text-align:center;
    left:55px;
    top:95px;
    font-size:14px;
}

.inSpan#warnPwd{
    top:175px;
}


#memInfo{
    margin-top:35px;
}

.formBtn{
    width:250px;
    height:50px;
    left:75px; ;
    top:135px;
    background-color:#0032FF;
    position:absolute;
    cursor:pointer;
    transition: .2s;
}

.formBtn:hover{
    background-color:#fff;
    transition: .2s;
}

.formBtn span{
    display:block;
    line-height:50px;
    font-size:26px;
    color:#fff;
    transition: .2s;
}
.formBtn span:hover{
    color:#0032FF;
    transition: .2s;
}

</style>
