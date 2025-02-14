document.querySelector(".signup-btn").addEventListener("click", () => {
    
    // 회원 정보 입력값 가져오기
    let _nickname = document.getElementById("nickname").value;
    let _myid = document.getElementById("myid").value;
    let _password = document.getElementById("password").value;

    // 정규식 패턴 정의
    const regex = {
        nickname: /^[a-zA-Z0-9가-힣]{2,10}$/,  // 닉네임: 2~10자 (한글, 영문, 숫자)
        userId: /^[a-z][a-z0-9]{4,14}$/,     // 아이디: 영문 소문자로 시작 + 5~15자 (숫자 가능)
        password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/ // 비밀번호: 8~20자 (영문+숫자+특수문자)
    };

    // 입력값 검증 
    function validateInput(type, value) {
        return regex[type].test(value);
    }

    // 검증 실행
    if (!validateInput("nickname", _nickname)) {
        alert("닉네임은 2~10자의 한글, 영문, 숫자만 가능합니다.");
        return;
    }

    if (!validateInput("userId", _myid)) {
        alert("아이디는 영문 소문자로 시작하며, 5~15자의 영문 소문자 및 숫자만 가능합니다.");
        return;
    }

    if (!validateInput("password", _password)) {
        alert("비밀번호는 8~20자의 영문, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.");
        return;
    }


    // 로컬 스토리지에서  nickname의 value, myid의 value, password의 value 데이터를 가져온다.
    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    class User {
        constructor(_nickname, _myid, _password) {
            this.nickname = _nickname;
            this.myid = _myid;
            this.password = _password;
        }
    }
   // 새로운 유저 객체 생성 후 배열에 추가
   const newUser = new User(_nickname, _myid, _password);
   userData.push(newUser);

   // 로컬 스토리지에 저장
   localStorage.setItem("userData", JSON.stringify(userData));
   alert("회원가입이 완료되었습니다!");
    // 3초 뒤 로그인 페이지로 이동
    setTimeout(() => {
        window.location.href = "../login/login.html";
    }, 3000);
});

// 로그인 페이지로 이동하는 버튼
document.querySelector(".login-home").addEventListener("click", () => {
    window.location.href = "../login/login.html";
});
