const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
let currentFilter = document.getElementById("filter");
const movieHistory = document.getElementById("movieHistoryCard")
let itemArray = localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")) : [];

clearInput = () => {
    inp.value = "";
}

clearMovies = () => {
    myMovieList.innerHTML = ""
}

currentFilter.addEventListener("input",function(){
    let movieList = myMovieList.children;
    for (let i = 0; i < movieList.length; i++) {
        let text = movieList[i].innerHTML;
        if (text.toLowerCase().includes(currentFilter.value.toLowerCase())){
            movieList[i].style.display = "block";
        }
        else{
            movieList[i].style.display = "none";
        }
    }
}) ;

addMovie = () => {
    const userTypedText = inp.value;
    let itemExist = false;
    let movieList = myMovieList.children;
    
    if (!(userTypedText == "")) {
        itemExist = false;
        for (element of movieList) {
            listText = element.innerHTML;
            if (String(listText).toLowerCase() == String(userTypedText).toLowerCase()) {
                itemExist = true;
            }
        }
        if (itemExist == false) {
            const li = document.createElement("li");
            li.setAttribute("style", "display: block")
            const textToInsert = document.createTextNode(userTypedText);
            li.appendChild(textToInsert);
            myMovieList.appendChild(li);
        }
    }
    else {
        alert("Invalid Input");
    }

    clearInput();

    for (element of itemArray) {
        if (String(Object.values(element)[0]).toLowerCase() == String(userTypedText).toLowerCase()) {
            itemExist = true;
        }
    }

    if (itemExist == false) {
        const tr = document.createElement("tr");
        const trData = document.createElement("td");
        const trData2 = document.createElement("td");
        tr.appendChild(trData);
        tr.appendChild(trData2);
        const textToTable = document.createTextNode(userTypedText);
        const watchCount = document.createTextNode(1);
        trData.appendChild(textToTable);
        trData2.appendChild(watchCount);
        createTable.appendChild(tr);
        itemArray.push({name:userTypedText, number:1});
        localStorage.setItem('items', JSON.stringify(itemArray));
    }
    else {
        for (element of table.children) {
            textLen = userTypedText.length;
            if (String((element.innerText).slice(0, textLen)).toLowerCase() == String(userTypedText).toLowerCase()) {
                newValue = (parseInt(element.children[1].innerText)) + 1;
                element.children[1].innerText = newValue;
                itemArray.filter(x=>x.name == userTypedText)[0].number++;
                localStorage.setItem('items', JSON.stringify(itemArray));
            }
        }
    }
}


const createTable = document.createElement("table");
createTable.classList.add("table");


for (let i=0 ; i < itemArray.length; i++) {
    const tr = document.createElement("tr");
    const trData = document.createElement("td");
    const trNum = document.createElement("td");
    tr.appendChild(trData);
    tr.appendChild(trNum);
    let textToTable = document.createTextNode(itemArray[i].name);
    let numberToTable = document.createTextNode(itemArray[i].number);
    trData.appendChild(textToTable);
    trNum.appendChild(numberToTable);
    createTable.appendChild(tr);
}

movieHistory.appendChild(createTable);

const table = document.getElementsByTagName("table")[0]
const header = table.createTHead();
const row = header.insertRow(0)
const movieTitle = row.insertCell(0)
const movieCount = row.insertCell(1)

movieTitle.innerHTML = "<b>Title</b>"
movieCount.innerHTML = "<b>Watched</b>"

console.log(movieHistory)