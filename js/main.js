//Using api to get the isbn of book from user. This finds the book name, author and displays the cover page and allows user to add book to local storage

const btn = document.querySelector('button');

if (btn) {
  btn.addEventListener('click', getFetch);
  document.querySelector('#addBookBtn').addEventListener('click', addToStorage)
}

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`
  const bookcoverURL = `https://covers.openlibrary.org/b/isbn/${choice}.jpg`


  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.querySelector("span#isbn").innerText = choice
        document.querySelector("span#bookName").innerText = data.title
        if (bookcoverURL != null){
          document.querySelector("img").src= bookcoverURL
        }
        else document.querySelector("img").src="Invalid Link"
        //document.querySelector("h3").querySelectorAll("span").forEach(x => x.innerText = data.number_of_pages )

        if (data.number_of_pages != undefined){
              document.querySelector("span#numberOfPages").innerText= data.number_of_pages
        }
        else document.querySelector("span#numberOfPages").innerText=  "Unknown number of pages"

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}



function addToStorage(){
  let startCountFrom = countNumberOfBooksInLocalStorage()
  let key = `localBookNumber${startCountFrom}`
  console.log(`key is ${key}`) //debug
  localStorage.setItem(key, [
    document.querySelector("span#isbn").innerText, document.querySelector("span#bookName").innerText,
    document.querySelector("img").src,
    document.querySelector("span#numberOfPages").innerText
  ])
  //console.log("successfully added to local storage")
  console.log(localStorage)
}

function countNumberOfBooksInLocalStorage(){
  let count = 1
  let continueCounting = true
  while (continueCounting){
    let key = `localBookNumber${count}`
    if (localStorage.getItem(key) == null){
      continueCounting = false
      break
    }
    count++ //If no books, this is skipped. So put book at 1. It was not working before because if count start
  }
  console.log(`There are this many books ${count} in local storage from the countNum of book function`)
  return count
}


const showBooksBtn = document.querySelector('#showbooks');

if (showBooksBtn) {
  showBooksBtn.addEventListener('click', showBooks()); //we want this to autoload on page open so we use function. instead of defining callback function
}

function showBooks(){
  let numOfBooks = countNumberOfBooksInLocalStorage()

  for (i = numOfBooks-1; i>0; i--){
    let key = `localBookNumber${i}`
    let arr = localStorage.getItem(key).split(",")

//this only displays one row of data. May have to use ejs to have table be dependent on data in local storage
    document.querySelector("#bookID").innerText = i
    document.querySelector("#bookISBN").innerText = arr[0]
    document.querySelector("#bookName").innerText = arr[1]
    // if using document image -> document.querySelector("#bookImgUrl").src = arr[2]
    document.querySelector("#bookImgUrl").innerText = arr[2]
    document.querySelector("#bookNumPages").innerText = arr[3]
  }
}
