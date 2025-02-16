const getQuarry = () => {
    return parseInt(location.search.replace("?", "").split("=")[1]);
};

const nickname = {
    nickname: "ming"
};

document.querySelector(".hamBtn").addEventListener("click", () => {
    const menu = document.querySelector(".menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

document.querySelector(".nickname").textContent = `${nickname.nickname}님 환영합니다`;

class Contentearr {
    constructor(index) {
        this.arr = [];
        this.index = index;
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
    return data.find(item => item.index === getQuarry()) || null;
};

const updateMovieInfo = () => {
    const movieData = JSON.parse(localStorage.getItem("comment")) || [];
    const movieId = getQuarry();
    const movie = movieData.find(item => item.index === movieId);

    if (movie) {
        document.querySelector(".movie_title").textContent = movie.name || "영화 제목 없음";
        document.querySelector(".movie_value").textContent = movie.details || "내용 없음";

        const imgElement = document.getElementById("top_img");
        imgElement.innerHTML = "";

        if (movie.image) {
            const image = document.createElement("img");
            image.src = `./images/${movie.image}`;
            image.alt = movie.name || "영화 이미지";
            imgElement.appendChild(image);
        }
    }
};

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
    if (selectedRating === 0    ) return;

    let dataEntry = isData();

    if (dataEntry) {
        dataEntry.arr.push(new Comment(content, nickname.nickname, selectedRating));
    } else {
        const newPage = new Contentearr(getQuarry());
        newPage.arr.push(new Comment(content, nickname.nickname, selectedRating));
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

const updateAverageRating = () => {
    const dataEntry = isData();
    const averageRatingElement = document.querySelector(".average-star-rating");
    
    if (!dataEntry || dataEntry.arr.length === 0) {
        averageRatingElement.textContent = "평균 별점: 없음";
        return;
    }
    
    const totalRating = dataEntry.arr.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = (totalRating / dataEntry.arr.length).toFixed(1);
    averageRatingElement.textContent = `평균 별점: ${averageRating}`;
};

const drawing = () => {
    const commentList = document.getElementById("comment_list");
    commentList.innerHTML = "";

    const dataEntry = isData();
    if (!dataEntry) return;

    dataEntry.arr.forEach((comment, index) => {
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
            if (nickname.nickname === comment.nickname) {
                star.onclick = () => {
                    editSelectedRating = i;
                    updateRatingInput(ratingContainer, i);
                };
            }
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

document.getElementById("text_btn").before(createRatingInput());
document.addEventListener("DOMContentLoaded", () => {
    updateMovieInfo();
    drawing();
});
