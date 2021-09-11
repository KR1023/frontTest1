<template>
  <div class="body">
    <h1>Welcome</h1>
    <p>
      현재 사이트는 공사 중입니다.
    </p>
    <div id="loginForm" >
        <div id="inputWrapper">
            <input  v-model="info.id" @focus="focusId" @blur="focusIdOut" id="user_id" class="inputTxt" type="text" name="user_id" />
                <span id="span_id">아이디</span>
                <span v-show="idIsNull" id="warnId" class="inSpan">아이디를 입력해 주세요.</span>
            <input  v-model="info.pwd" @focus="focusPwd" @blur="focusPwdOut" id="user_pwd" class="inputTxt" type="password" name="user_pwd" />
                <span id="span_pwd">비밀번호</span>
                <span v-show="pwdIsNull" id ="warnPwd" class="inSpan">비밀번호를 입력해 주세요.</span>
            <div id="memInfo">
                <a href="#">아이디/비밀번호 찾기</a>&nbsp;&nbsp;|&nbsp;
                <router-link to="/register">회원가입</router-link>
            </div>
        </div>
        <div @click="login" id="loginBtn" class="formBtn"><span>Sign in</span></div>     
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
// import eventBus from '../eventBus.js'

export default {
  name: 'Login',
  data() {
      return {
          count:0,
          info:{
            id:'',
            pwd:''
          },
          sessionId: null,
          result: null,
          idIsNull: false,
          pwdIsNull: false
      }
  },
  methods: {
      getSession(){
          axios.get('/api/getSession')
          .then((response)=>{
              this.sessionId = response.data;
              console.log(this.sessionId);
          })
          .catch(()=>{
              console.log("getSession Error!");
          })
      },
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
                        console.log("전송 성공");
                        this.result = response.data;
                        console.log(this.result);
                        if(this.result === 1){
                            alert("로그인 성공!");
                            // eventBus.$emit('id',this.id);
                            this.getSession();
                            location.href="/home";

                        }else if(this.result !== 1){
                            alert("아이디와 비밀번호를 확인해 주세요!");
                        }
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
