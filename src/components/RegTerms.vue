<template>
    <div id="wrap">
        <div id="terms_wrap">
            <h2>사이트 이용약관</h2>
            <div class="box">
                <p>1. 이 사이트는 테스트 사이트입니다.</p>
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

    #wrap{
        margin-top: 140px;
        font-family: 'Noto Sans KR', sans-serif;
    }
    h2{
        text-align:center;
        font-size:36px;
            text-align: left;
            margin: 20px;
    }

    #terms_wrap{
         width: 600px;
        height: 600px;
        background-color: #f9f9f9dc;
        margin: 0 auto;
        box-sizing: border-box;

        .box{
            border:1px solid #e1e1e1;
            width:90%;
            height:200px;
            margin:0 auto;
            p{
                text-align: left;
                padding-left:2%;
                margin: 5px 0;
            }
        }

        .nextBtn{
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

