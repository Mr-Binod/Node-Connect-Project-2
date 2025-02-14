document.querySelector(".mypage-btn").addEventListener("click", () => { 
    // ------------- 마이페이지 버튼시 모달창이 생성되는 코드 --------------//
    // 모달창 생성
    let modal = document.createElement("div");
        modal.classList.add("modal");

    let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

    // 닉네임 입력 필드 생성
    let nicknameInput = document.createElement("input");
        nicknameInput.classList.add("nickname-input");
        nicknameInput.type = "text";
        nicknameInput.placeholder = "변경할 닉네임";

    // 아이디 입력 필드 생성
    let userIdInput = document.createElement("input");
        userIdInput.classList.add("userId-input");
        userIdInput.type = "text";
        userIdInput.placeholder = "변경할 아이디를 입력하세요";

    // 패스워드 필드 생성
    let passwordInput = document.createElement("input");
        passwordInput.classList.add("password-input");
        passwordInput.type = "password";
        passwordInput.placeholder = "변경할 비밀번호를 입력하세요";

      // 비밀번호 보기 버튼 생성
    let showPasswordButton = document.createElement("button");
      showPasswordButton.classList.add("btn", "show-password-btn");
      showPasswordButton.innerText = "비밀번호 보기";
      
      showPasswordButton.addEventListener("click", () => {
          if (passwordInput.type === "password") {
              passwordInput.type = "text";
              showPasswordButton.innerText = "비밀번호 숨기기";
          } else {
              passwordInput.type = "password";
              showPasswordButton.innerText = "비밀번호 보기";
          }
    });
    // 저장 버튼 요소 생성
    let saveButton = document.createElement("button");
        saveButton.innerText = "저장";
        saveButton.classList.add("btn","save-btn");

    //-------- 유저 정보 수정 기능 Update ----------------------//
    // 저장 버튼을 누르면 입력한 값을 수정할 수 있도록
    saveButton.addEventListener("click", () => {
        let saveNickname = nicknameInput.value;
        let saveUserid = userIdInput.value;
        let savePassword = passwordInput.value;

        let userData = JSON.parse(localStorage.getItem('userData')) || [];

        for (let i = 0; i < userData.length; i++) {
            let user = userData[i]; // 인덱스 배열로 접근해서 유저 정보를 가져온다.
            if(user.myid === saveUserid) {
                user.nickname = saveNickname;
                user.password = savePassword;
            }
        }
        // 수정된 userData를 다시 localStorage에 저장
        localStorage.setItem('userData', JSON.stringify(userData));
        alert("회원 정보가 저장되었습니다.");
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 1500)
    });

    // 닫기 버튼 생성
    let closeButton = document.createElement("button");
        closeButton.innerText = "닫기";
        closeButton.classList.add("btn","close-btn");
        closeButton.addEventListener("click", () => {
            modal.remove();
    });

    // 회원탈퇴 버튼 생성성
    let deleteAccountButton = document.createElement("button");
    deleteAccountButton.innerText = "회원탈퇴";
    deleteAccountButton.classList.add("btn","delete-btn");

    // ------ DELETE -------- //
    deleteAccountButton.addEventListener("click", () => {
        if (confirm("정말로 회원을 탈퇴하시겠습니까?")) {
            // 로컬 스토리지 데이터를 삭제
            localStorage.removeItem();
    
            // 쿠키 삭제
            function deleteCookie(User) {
                document.cookie = User + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
    
            deleteCookie("userId");
            deleteCookie("userNickname");
    
            alert("회원 탈퇴가 완료되었습니다.");
    
            // 모달 창 제거
            modal.remove();
            window.location.href = "/login.html";
        }
    });

    // modal 및 modalContent 의 자식요소로 각각 추가
    modalContent.appendChild(nicknameInput);
    modalContent.appendChild(userIdInput);
    modalContent.appendChild(passwordInput);
    modalContent.appendChild(showPasswordButton); 
    modalContent.appendChild(saveButton);
    modalContent.appendChild(deleteAccountButton); 
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // ---------- READ ------------------------------------- //
    // -------------회원가입 로컬스토리지에 보관된 데이터를 가져오는 코드 ------------------------------//
     let userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        console.log('회원가입 정보가 없습니다.');
    }
     console.log(userData); // 배열로 저장된다.
    // 배열을 순회하며 모든 유저 정보 처리
    for (let i = 0; i < userData.length; i++) {
        let user = userData[i]; // 인덱스 배열로 접근해서 유저 정보를 가져온다.

        nicknameInput.value = user.nickname;
        userIdInput.value = user.myid;
        passwordInput.value = user.password;

        console.log(`유저 ${i + 1}:`);
        console.log(`닉네임: ${user.nickname}`);
        console.log(`아이디: ${user.myid}`);
        console.log(`비밀번호: ${user.password}`);
}
 });
   