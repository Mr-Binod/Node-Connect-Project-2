

// -------------------------hamBtn extensions--------------------------
const activehamBtn = document.querySelector(".hamBtn")
activehamBtn.onclick = (e) => {
    if(wrap.classList.contains("isactive")) {
        wrap.classList.remove("isactive");
    }
    else {

        wrap.classList.add("isactive");
    }
}
const addContent = document.querySelector(".addContent")
addContent.onclick = () => {
    if(wrap.classList.contains("activeLogout")){
        wrap.classList.remove("activeLogout");
    }
    else {
        wrap.classList.add("activeLogout");
    }
}

// -----------------------page Contents---------------------------------

const saveBtn = document.querySelector(".saveBtn");
const inputContent = document.querySelector(".inputContent");

let datA = JSON.parse(localStorage.getItem("comment")) || [];
const Pagenum = 8;
let Pageindex = 1;

class Comment{
    constructor(_index, _name, _image, _details) {
        this.index = _index;
        this.name = _name;
        this.image = _image;
        this.details = _details;
        // this.date = _date;
    }
}

inputContent.onsubmit = (e) => {
    e.preventDefault();
    const {contentName, contentImage, contentDetails} = e.target;
    if(contentName.value.trim() === "" || contentImage.value.trim() === "" || contentDetails.value.trim() === ""){ 
        alert("이름, 사진, 내용 입력해주세요");
    }
    // const datE = 
    const newComment = new Comment(datA.length, contentName.value, contentImage.files[0].name, contentDetails.value);
    datA.push(newComment);
    const newComment_JSON = JSON.stringify(datA);
    localStorage.setItem("comment", newComment_JSON);
    // location.reload();
}

const drawing = (i, span) => {
    let {name, image, details} = datA[i];
    const updateform = document.createElement("form");
    const uploadImg = document.createElement("input");
    const uploadName = document.createElement("input");
    const uploadDetails = document.createElement("textarea");
    const saveBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const savedeleteBtn = document.createElement("li");

    uploadImg.name = "uploadImgname";
    uploadName.name = "uploadNamename";
    uploadDetails.name = "uploadDetailsname";
    saveBtn.name = "saveBtnname";
    deleteBtn.name = "deleteBtn";


    updateform.id = "updateForm";
    uploadImg.type = "file";
    saveBtn.classList.add("saveBtn");
    deleteBtn.classList.add("deleteBtn");

    uploadName.placeholder = "영화 이름";
    uploadDetails.placeholder = "영화 정보";

    saveBtn.innerHTML = "저장";
    deleteBtn.innerHTML = "취소";

    
   

    updateform.onsubmit = (e) => {
        e.preventDefault();
        console.log("yes");
        deleteBtn.onclick = () => {
         
            location.reload();
        }
        
        saveBtn.onclick = () => {
            
            const {uploadImgname, uploadNamename, uploadDetailsname, saveBtnname, deleteBtnname} = e.target;
            if(uploadImgname.value.trim() === "" || uploadNamename.value.trim() === "" || uploadDetailsname.value.trim === "") {
                alert("사진, 이름, 내용 입력해주세요")
            }

            datA[i].name = uploadNamename.value;
            datA[i].image = uploadImgname.files[0].name;
            datA[i].details = uploadDetailsname.value;
            console.log("nooooo");
            console.log(datA);
            const JSONdata = JSON.stringify(datA);
            localStorage.setItem("comment", JSONdata);
            console.log(datA)
            render(datA);
            
        }
        
    }
    

     
    
    savedeleteBtn.append(deleteBtn, saveBtn)
    updateform.append(uploadImg, uploadName, uploadDetails, savedeleteBtn);
    span.append(updateform);

}
const CancelBtn = document.querySelector(".closeBtn");
CancelBtn.onclick = () => {
    location.reload();
}

const render = (datA) => {
   
    
    displayContent.innerHTML = ""
    for (let i = 0; i < datA.length; i++) {
        // if (datA.length >= 0) {
        //     datA[i].index = i;
        // }
        
        const contentUl = document.createElement("ul");
        const Name = document.createElement("li");
        const Img = document.createElement("img");
        const span = document.createElement('span');
        const Details = document.createElement("li");
        const editdeletebtn = document.createElement("ul");
        const editbtn = document.createElement("li");
        const deletebtn = document.createElement("li");
        const spanclick = document.createElement("span");

        contentUl.id = "contentUl";
        Name.classList.add("Name");
        Img.classList.add("Img");
        Details.classList.add("Details");
        editdeletebtn.classList.add("Editdeletebtn");
        spanclick.classList.add("material-symbols-outlined");
        const {name, image, details} = datA[i];
        
        Name.innerHTML = name;
        Img.src = "./images/" + image;
        Details.innerHTML = details;
        editbtn.innerHTML = "수정";
        editbtn.classList.add("Edit");
        deletebtn.classList.add("Delete");
        deletebtn.innerHTML = "삭제";
        spanclick.innerHTML = "";

        editdeletebtn.append(spanclick,deletebtn, editbtn );
        span.append(Img, editdeletebtn, Name, Details)
        contentUl.append(span);
        displayContent.append(contentUl);
        
        // -----------------수정--------------
        deletebtn.onclick = (e) => {
            console.log("ii", i, datA[i])
            const deleteIndex = datA[i].index;
            const yes = confirm("삭제할래?");
            if (yes){
                paginationCreate(true, deleteIndex);
            }
                // location.reload();
              
            }
        
        editbtn.onclick = (e) => {
            console.log(i);
            drawing(i, span);
            console.log("clicked");
            if(span.classList.contains("edit")){
                span.classList.remove("edit")
            }else {
                span.classList.add("edit")
            }
        
        
        }
        Img.onclick = (e) => {
            console.log("imgclick")
            window.location.href = `../particular/particular.html?index=${i}`
        }
    }
}

const Delete = ( deleteIndex) => {
    console.log("pagi",  deleteIndex);
    datA.splice(deleteIndex, 1);    
    console.log(datA.splice(deleteIndex, 0));
    
    for (let i = 0; i < datA.length; i++) {
        datA[i].index = i;
        console.log(datA);    
        localStorage.setItem("comment", JSON.stringify(datA));
    }
    location.reload();
}
Home.onclick = () =>{
    location.reload();
}



const paginationCreate = (flag, deleteIndex) => {
    const total = datA.length;
    const pages = Math.floor(total) /Pagenum;
    
    console.log("pages",pages, total);
        if(!flag) {
            for (let i = 0; i < pages; i++) {
                const span1 = document.createElement("span");
                span1.id = "span01";
                
                span1.innerHTML = i + 1;
                span1.onclick = () =>  {
                    Pageindex = i + 1;
                    // span01.style.background-color ; "black";
                    paginationContent(Pageindex);
                }    
                pagination.append(span1);
            }
        }

        if (flag) {
            console.log(flag)
            flag = !flag;
            Delete(deleteIndex);
        }
        
}   

const paginationContent = (i) => {
    let pagingContent = [...datA].splice((i - 1) * Pagenum, Pagenum);
    const Index = ((i - 1) * Pagenum);
    console.log((i - 1) * Pagenum);
    console.log(pagingContent);
    render(pagingContent);
    console.log("pagingcontent",pagingContent)
    

}

inputSearch.onkeyup = (e) => {
    const arrTemp = [...datA];
    const searchArr =  [...datA].filter((el) => el.name.startsWith(e.target.value))
    console.log(searchArr);
    render(searchArr);
}




const init = () => {
    const getdatA = localStorage.getItem("comment");
    datA = JSON.parse(getdatA);
    console.log(datA);
    
   
    paginationContent(1);
    paginationCreate();

}
init();