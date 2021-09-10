<template>
    <div id="wrap">
        <h2>회원 가입</h2>
        <div id="terms_wrap">
            <p class="sub">사이트 약관</p>
            <div class="box">
                <p>1. 테스트 사이트입니다.</p>
                <p>2. 이 사이트에 개인정보를 기입하지 마십시오.</p>
                <p>3. 정보 입력 시 위 약관에 동의한 것으로 간주합니다.</p>
            </div>
            <router-link to="/regForm" class="nextBtn"><span>정보 입력</span></router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"RegTerms"
}
</script>
<style lang="scss" scoped>
    h2{
        text-align:center;
    }

    #terms_wrap{
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
            width:90%;
            height:200px;
            margin:0 auto;
            p{
                text-align: left;
                padding-left:2%;
            }
        }

        .nextBtn{
            display: block;
            width: 180px;
            height:35px;
            background-color:#f9f9f9dc;
            margin: 20px auto;
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

