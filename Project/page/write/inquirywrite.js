   // URL에서 index 값을 추출하는 함수
   const getIndexFromURL = () => {
    // rplace ? 쿼리 문자열 맨앞의 ? 없애고  &기준으로 배열을 분배 = 기준으로 또 분배 마지막 filter는 인덱스인것만 필터링한다.
const [searchArr] = location.search.replace("?", "").split('&').map((e) => e.split("=")).filter((e) => e[0] === "index");
//만약 searchArr가 존재한다면, 배열의 두 번째 요소(searchArr[1])는 index 값입니다.
// parseInt(searchArr[1]): 문자열인 index 값을 숫자로 변환합니다.
// 예를 들어, "5"는 숫자 5로 변환됩니다.
// 만약 searchArr가 없다면(index 값이 없으면), null을 반환합니다.
return searchArr ? parseInt(searchArr[1]) : null;
};

// 페이지 로드 시 실행
window.onload = () => {
const index = getIndexFromURL();

if (index === null) {
alert('데이터를 찾을 수 없습니다.');
return;
}

// localStorage에서 데이터 불러오기
const inquiryData = JSON.parse(localStorage.getItem('inquiry'))?.[index];

if (inquiryData) {
render(inquiryData);
} else {
alert('데이터를 찾을 수 없습니다.');
}
};

// 데이터를 HTML에 표시하는 함수
const render = (data) => {
document.getElementById('index').innerHTML = data.index + 1;  
document.getElementById('nickname').innerHTML = data.nickname;          
document.getElementById('title').innerHTML = data.title;      
document.getElementById('content').innerHTML = data.content;  
document.getElementById('date').innerHTML = data.date;       
};

// 수정 버튼 (모달 열기)
document.querySelector('.edit_button').onclick = () => {
document.querySelector('.edit').style.display = "flex";  
const index = getIndexFromURL();

const inquiries = JSON.parse(localStorage.getItem('inquiry')) || [];
const inquiryData = inquiries[index];

if (inquiryData) {
document.getElementById('edit-title').value = inquiryData.title;
document.getElementById('edit-content').value = inquiryData.content;
document.getElementById('current-date').innerHTML = inquiryData.date;
}
};

// 수정 저장 버튼
document.getElementById('save-changes').onclick = () => {
const index = getIndexFromURL();
if (index === null) {
alert('수정할 데이터를 찾을 수 없습니다.');
return;
}

const updatedTitle = document.getElementById('edit-title').value;
const updatedContent = document.getElementById('edit-content').value;
const updatedDate = new Date().toLocaleString(); // 현재 날짜와 시간

const inquiries = JSON.parse(localStorage.getItem('inquiry')) || [];

if (inquiries[index]) {
inquiries[index].title = updatedTitle;
inquiries[index].content = updatedContent;
inquiries[index].date = updatedDate; // 수정된 시간 저장

localStorage.setItem('inquiry', JSON.stringify(inquiries));

alert('수정되었습니다.');
location.href = '../inquirymain/inquiry.html';
} else {
alert('수정할 데이터를 찾을 수 없습니다.');
}
};

// 모달 닫기 버튼
document.getElementById('close-modal').onclick = () => {
document.querySelector('.edit').style.display = "none"; // 모달 숨기기
};

// 삭제 버튼 클릭 시
document.querySelector('.delete_button').onclick = () => {
const index = getIndexFromURL();
if (index === null) {
alert('삭제할 데이터를 찾을 수 없습니다.');
return;
}



const inquiries = JSON.parse(localStorage.getItem('inquiry')) || [];
inquiries.splice(index, 1); // 해당 인덱스 삭제

localStorage.setItem('inquiry', JSON.stringify(inquiries));

alert('삭제되었습니다.');
location.href = '../inquirymain/inquiry.html';
};

// 문의 게시판 이동
document.querySelector(".inquiry").onclick = () => {
location.href = "../inquirymain/inquiry.html";
};