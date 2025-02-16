// ------------- 마이페이지 버튼 클릭 시 모달창 생성 --------------//
// 모달창 생성
let modal = document.createElement("div");
modal.classList.add("modal");

let modalContent = document.createElement("div");
modalContent.classList.add("modal-content");

let nodeconnect = document.createElement("h2");
nodeconnect.classList.add("nodeconnect");
nodeconnect.innerText = "NodeConnect";

// input, label 요소를 감싸는 요소 생성..
let inputlabel = document.createElement("div");
inputlabel.classList.add("inputlabel");

// 닉네임 라벨 필드 생성
let nicknamelabel = document.createElement("label");
nicknamelabel.classList.add("nickname-label");
nicknamelabel.innerText = "닉네임";

// 닉네임 입력 필드 생성
let nicknameInput = document.createElement("input");
nicknameInput.classList.add("nickname-input");
nicknameInput.type = "text";
nicknameInput.placeholder = "변경할 닉네임";

// 아이디 라벨 필드 생성
let userIdlabel = document.createElement("label");
userIdlabel.classList.add("userId-label");
userIdlabel.innerText = "아이디";

// 아이디 입력 필드 생성
let userIdInput = document.createElement("input");
userIdInput.classList.add("userId-input");
userIdInput.type = "text";
userIdInput.placeholder = "변경할 아이디를 입력하세요";

// 패스워드 입력 필드 생성
let passwordlabel = document.createElement("label");
passwordlabel.classList.add("password-label");
passwordlabel.innerText = "패스워드";

// 패스워드 입력 필드 생성
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

// 저장 버튼 생성
let saveButton = document.createElement("button");
saveButton.innerText = "저장";
saveButton.classList.add("btn", "save-btn");

// 닫기 버튼 생성
let closeButton = document.createElement("button");
closeButton.innerText = "닫기";
closeButton.classList.add("btn", "close-btn");

// 회원탈퇴 버튼 생성
let deleteAccountButton = document.createElement("button");
deleteAccountButton.innerText = "회원탈퇴";
deleteAccountButton.classList.add("btn", "delete-btn");

// modal 및 modalContent에 자식 요소 추가
modalContent.appendChild(nodeconnect);
inputlabel.appendChild(nicknamelabel);
inputlabel.appendChild(nicknameInput);
inputlabel.appendChild(userIdlabel);
inputlabel.appendChild(userIdInput);
inputlabel.appendChild(passwordlabel);
inputlabel.appendChild(passwordInput);
inputlabel.appendChild(showPasswordButton);
inputlabel.appendChild(saveButton);
inputlabel.appendChild(deleteAccountButton);

modalContent.appendChild(closeButton);
modalContent.appendChild(inputlabel);
modal.appendChild(modalContent);
document.body.appendChild(modal);

// ---------- READ ---------- //
let userData = JSON.parse(localStorage.getItem("userData"));

if (!userData) {
  console.log("회원가입 정보가 없습니다.");
}

console.log(userData); // 배열 형태로 저장됨

// 배열을 순회하며 모든 유저 정보 처리
for (let i = 0; i < userData.length; i++) {
  let user = userData[i]; // 유저 정보를 가져옴

  nicknameInput.value = user.nickname;
  userIdInput.value = user.myid;
  passwordInput.value = user.password;
}

// ---------- UPDATE: 유저 정보 수정 기능 ---------- //
saveButton.addEventListener("click", () => {
  let saveNickname = nicknameInput.value;
  let saveUserid = userIdInput.value;
  let savePassword = passwordInput.value;

  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  for (let i = 0; i < userData.length; i++) {
    let user = userData[i]; // 유저 정보를 가져옴
    if (user.myid === saveUserid) {
      user.nickname = saveNickname;
      user.password = savePassword;
    }
  }

  // 수정된 userData를 다시 localStorage에 저장
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("회원 정보가 저장되었습니다.");
  window.location.href = "../login/login.html";
});

// ---------- CLOSE: 닫기 버튼 기능 ---------- //
closeButton.addEventListener("click", () => {
  window.location.href = "../main/index.html";
  modal.remove();
});

// ---------- DELETE: 회원탈퇴 기능 ---------- //
deleteAccountButton.addEventListener("click", () => {
  if (confirm("정말로 회원을 탈퇴하시겠습니까?")) {
    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    for (let i = 0; i < userData.length; i++) {
      let user = userData[i]; // 현재 유저 정보 가져오기
      if (user.myid === userIdInput.value) {
        userData.splice(i, 1);
      }
    }

    //  삭제된 userData를 다시 로컬스토리지에 저장
    localStorage.setItem("userData", JSON.stringify(userData));

    // User 쿠키 삭제
    document.cookie = `User=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    console.log("삭제 후 쿠키:", document.cookie);
    alert("회원 탈퇴가 완료되었습니다.");

    setTimeout(() => {
      window.location.href = "../login/login.html";
    }, 2000);
  }
});
