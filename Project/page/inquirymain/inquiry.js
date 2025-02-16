            // 객체를 만들기 위한 클래스
            class Inquiry {
            constructor(title, content, index) {
                this.index = index;
                this.nickname = userData.nickname;
                this.title = title;
                this.content = content;
                this.date = new Date().toLocaleString(); // 작성일을 현재 시간으로
            }
        }
        
        const PAGENUM = 5;
        let pageInex = 1;
        
        // ---------------------node connect 클리크하면 홈 화면----------------
        Home.onclick = () => {
            window.location.href = `../main/index.html`;
        }
       
        // 예시 데이터
        //const inquiries = [];
        
        //----------------------------------------------------------------------

        const hamBtn = document.querySelector(".hamBtn");
        const hamBtnContent = document.querySelector("#hamBtnContent");

        hamBtn.onclick = () => {
            if (hamBtnContent.style.maxHeight) {
                hamBtnContent.style.maxHeight = null; // 닫힘
            } else {
                hamBtnContent.style.maxHeight = hamBtnContent.scrollHeight + "px"; // 펼쳐짐
            }
        };
        
        //----------------------------------------------------------------------

        // 쿠키에서 특정 이름의 값을 가져오는 함수
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        // 쿠키에서 User 값 가져오기
        const userCookie = getCookie('User'); // 예: "hi&abc1234"

        // '&' 앞의 값만 추출
        const userData = {
            nickname: userCookie ? userCookie.split('&')[0] : "익명"
        };

        const inquiries = JSON.parse(localStorage.getItem('inquiry')) || [];
        
        // 문의를 추가하는 함수
        const addInquiry = (title, content) => {
            const index = inquiries.length; 
            const newInquiry = new Inquiry(title, content, index);
            inquiries.push(newInquiry); 
            createContent(); 
            localStorage.setItem('inquiry', JSON.stringify(inquiries)); 

            console.log(localStorage.getItem('inquiry'));  // 저장된 데이터 확인
        }

            // 문의 목록을 HTML로 생성하는 함수
            const createContent = () => {
            const contentWrap = document.getElementById('content_wrap');
            contentWrap.innerHTML = ''; // 기존 내용 제거
        
            for (let i = 0; i < inquiries.length; i++) {
                const inquiry = inquiries[i];
        
                const ul = document.createElement('ul');
                const liIndex = document.createElement('li');
                const liUid = document.createElement('li');
                const liTitle = document.createElement('li');
                const liContent = document.createElement('li');
                const liDate = document.createElement('li');
        
                liIndex.innerHTML = i + 1 // 번호 (index + 1)
                liUid.innerHTML = inquiry.nickname; // 작성자   
                liTitle.innerHTML = inquiry.title;
                liContent.innerHTML = inquiry.content;
                liDate.innerHTML = inquiry.date; // 작성일
        
                ul.append(liIndex, liUid, liTitle, liContent, liDate);
        
                // 문의 목록에서 글 클릭 시 발생 
                ul.onclick = () => {
                    //localStorage.setItem('selectedInquiry', JSON.stringify(inquiry)); // 해당 문의 데이터를 inquiry 저장
                    location.href = `../write/inquirywrite.html?index=${i + (pageInex - 1 )* PAGENUM}`; // 페이지 이동
                };
                contentWrap.append(ul); // 문의 목록 추가
            }
        };

        // const paginationCreate = () => {
        //     const total = inquiries.length; // 전체 문의의 수
        //     const pages = Math.floor((total + PAGENUM - 1) / PAGENUM); // 전체 페이지 수 계산 (올림 처리)
            
        //     // 페이지 번호를 생성하는 부분
        //     for (let i = 0; i < pages; i++) {
        //         const span = document.createElement("span");
        //         span.innerHTML = i + 1; // 페이지 번호
        //         span.onclick = () => {
        //             pageIndex = i + 1;  // 클릭된 페이지 번호로 이동
        //             paginationContent(pageInex);  // 해당 페이지 내용 출력
        //         };
        //         pagination.append(span);  // 페이지 번호를 화면에 추가
        //     }
        // };
        
        // // 페이지별 콘텐츠를 출력하는 함수
        // const paginationContent = (index) => {
        //     const startIdx = (index - 1) * PAGENUM; // 현재 페이지의 시작 인덱스
        //     const endIdx = index * PAGENUM; // 현재 페이지의 끝 인덱스
        //     const pageContent = [];
        
        //     // 페이지에 맞는 문의 항목을 잘라서 가져오기
        //     for (let i = startIdx; i < endIdx && i < inquiries.length; i++) {
        //         pageContent.push(inquiries[i]);
        //     }
        
        //     // 해당 페이지의 내용만 화면에 렌더링
        //     createContent(pageContent);  // 변경된 부분
        // };
        
        // paginationCreate();
        // paginationContent(pageInex);

    
        
        // 초기 로드 시 예시 데이터로 문의 목록을 출력
        window.onload = () => {
            createContent(); 
        };

            // 글쓰기 버튼 클릭 시 글 작성 폼을 표시
            const openPopup = document.querySelector('.open_inquiry_form_btn');
            openPopup.onclick = () => {
                document.querySelector('.write').style.display = "flex";  // 팝업 표시
            };

            // 뒤로 가기 버튼 클릭 시 글쓰기 폼 숨기기
            const backButton = document.getElementById('close_inquiry_form');
            backButton.onclick = () => {
                document.querySelector('.write').style.display = "none";  // 팝업 숨기기
            };
        
        // 폼 제출 시 문의 추가
        const formWrap = document.getElementById('inquiry_form');
        formWrap.onsubmit = (e) => {
            e.preventDefault();  // 기본 폼 제출 동작을 막음
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            console.log("title:", title, "content:", content);  // 제목과 내용 확인
            //title.value= ""; 구현 x
            //content.value= ""; 구현 x
            if (title && content) {
                addInquiry(title, content); // 문의 추가
                document.querySelector('.write').style.display = "none"; // 이것도 글 등록버튼 누르면 팝업창이 닫혀짐 

            } else {
                alert("제목과 내용을 모두 입력하세요.");
            }
        };

        // 문의 게시판으로 가기 
        const inquiry = document.querySelector(".inquiry");
        inquiry.onclick = () => {
            location.href = "../main/inquiry.html";
        };