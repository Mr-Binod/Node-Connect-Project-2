const getQuarry = () => {
    const str = parseInt(location.search.replace("?", "").split("=")[1])
    console.log(str)
    return str
}

const nickname = {
    nickname: "ming"
};

document.querySelector(".nickname").innerHTML = `${nickname.nickname}님 환영합니다`;

class Contentearr {
    constructor(index){
        this.arr=[];
        this.index=index
    }
}
class Comment {
    constructor(content, nickname, rating) {
        this.content = content;
        this.nickname = nickname;
        this.rating = rating;
    }
}

let data = JSON.parse(localStorage.getItem('comments')) || [];
const isData = () => {
    for (let i = 0; i < data.length; i++) {
        if(data[i].index === getQuarry())
            return data[i]
    }
}
console.log(data)
let selectedRating = 0;
let editSelectedRating = null;

const createRatingInput = () => {
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-input-container");
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.classList.add("star");
        star.dataset.rating = i;
        star.onclick = () => {
            selectedRating = i;
            updateRatingInput(ratingContainer, i);
        };
        ratingContainer.appendChild(star);
    }
    return ratingContainer;
};

const updateRatingInput = (container, rating) => {
    Array.from(container.children).forEach(star => {
        star.classList.toggle("selected", star.dataset.rating <= rating);
    });
};

document.getElementById("text_btn").onclick = (e) => {
    e.preventDefault();
    const content = document.getElementById("text_value").value.trim();
    if (selectedRating === 0 ) return;

    if(isData()){
        //[{"arr":[{"content":"","nickname":"ming","rating":5}],"index":1},{"arr":[{"content":"","nickname":"ming","rating":5}],"index":1}]
        const newComment = new Comment(content, nickname.nickname, selectedRating);
        isData().arr.push(newComment)
    }else{
        const newComment = new Comment(content, nickname.nickname, selectedRating);
        const newPage = new Contentearr(getQuarry())
        newPage.arr.push(newComment);
        data.push(newPage);
    }
    localStorage.setItem('comments', JSON.stringify(data));

    document.getElementById("text_value").value = "";
    selectedRating = 0;
    resetRatingInput();
    drawing();
};

const resetRatingInput = () => {
    const ratingContainer = document.querySelector(".rating-input-container");
    updateRatingInput(ratingContainer, 0);
};

const drawing = () => {
    const commentList = document.getElementById("comment_list");
    commentList.innerHTML = "";
console.log(isData())
    isData().arr.forEach((comment, index) => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");

        const nicknameSpan = document.createElement("span");
        nicknameSpan.classList.add("nickname");
        nicknameSpan.textContent = comment.nickname;

        const contentSpan = document.createElement("span");
        contentSpan.classList.add("content");
        contentSpan.textContent = comment.content;

        const ratingContainer = document.createElement("div");
        ratingContainer.classList.add("rating-container");
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.textContent = "★";
            star.classList.add("star");
            star.dataset.rating = i;
            if (i <= comment.rating) {
                star.classList.add("selected");
            }
            if(nickname.nickname === comment.nickname){
                star.onclick = () => {
                    editSelectedRating = i;
                    updateRatingInput(ratingContainer, i);
                }
            };
            ratingContainer.appendChild(star);
        }

        if (comment.nickname === nickname.nickname) {
            const editButton = document.createElement("button");
            editButton.textContent = "수정";
            editButton.onclick = () => editComment(index);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.onclick = () => deleteComment(index);

            commentItem.append(nicknameSpan, contentSpan, editButton, deleteButton, ratingContainer);
        } else {
            commentItem.append(nicknameSpan, contentSpan, ratingContainer);
        }

        commentList.append(commentItem);
    });
    updateAverageRating();
};

const editComment = (index) => {
    const newContent = prompt("댓글을 수정하세요:", isData().arr[index].content);
    if (newContent !== null) {
        isData().arr[index].content = newContent;
        if (editSelectedRating !== null) {
            isData().arr[index].rating = editSelectedRating;
            editSelectedRating = null;
        }
        localStorage.setItem('comments', JSON.stringify(isData().arr));
        drawing();
    }
};

const deleteComment = (index) => {
    if (confirm("정말 삭제하시겠습니까?")) {
        isData().arr.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(data));
        drawing();
    }
};

const updateAverageRating = () => {
    const totalRatings = isData().arr.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRatings / isData().arr.length || 0;
    document.getElementById("top").querySelector("span").textContent = `평균 별점: ${averageRating.toFixed(1)} ★`;
};

document.getElementById("text_btn").before(createRatingInput());

document.addEventListener("DOMContentLoaded", drawing);
