document.querySelector(".login-btn").addEventListener("click", () => {
    // 회원가입에 저장된 데이터를 로컬스토리지로 부터 가져온다 
    let users = JSON.parse(localStorage.getItem("userData")) || [];

    // 로그인의 입력요소의 value 값을 받는다.
    let _myid = document.getElementById("myid").value;
    let _password = document.getElementById("mypwd").value;

     
        const setLogin = (userName, userId, time) => {
            let date = new Date();
            date.setTime(date.getTime() + time * 60 * 60 * 1000); 
            // console.log(date.toUTCString());
            console.log(userName)
            document.cookie = `User=${userName}& ${userId}; expires=${date.toUTCString()}; path=/;`;
         

            // 메인 페이지로 이동
            location.href = "../main/main.html";
        };
    
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (_myid === user.myid && _password === user.password) {
                setLogin(user.nickname, user.myid, 4);
                return; 
            }
        }
        alert("로그인 실패!");
    });
    

const login = () => {
    const setCookie  = (userName, userId, time) => {
            let date = new Date();
            date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
            console.log(date.toUTCString());
            document.cookie = `userName=${userName}; & userId=${userId}; expires=${date.toUTCString()}; path=/;`;
        }
        
        const deleteCookie = (userName) => {
            document.cookie = `${userName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
        
        const getCookie = (userName) => {
            console.log(document.cookie);
            let result;
            let arr = document.cookie.trim().split(";");

            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].trim().split('='); // 빈 공백을 제거하고 = 구문을 잘라서 배열로 만든다
                if(userName === arr[i][0]) {
                    result = arr[i][1];
                }
            }
            console.log(result);
            return result;
        }
        
        
        if(getCookie('login')){
            login_user.innerHTML = getCookie('login');
            users.uid = getCookie('login');
            login();
        } 

        setCookie('login', login_input.value, 1);
        deleteCookie('login');
        location.reload(); // 페이지 새로고침
    }
