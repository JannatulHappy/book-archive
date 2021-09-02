const searchResult = document.getElementById('search-result');
const errorMsg = document.getElementById('error-message')
errorMsg.style.display = 'none';
const spinner = document.getElementById('spinner')
spinner.style.display = 'none';
const bookNumbers = document.getElementById('book-numbers')
// taking input value
const searchBook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
//    clear data
    searchField.value = ''
    // handle empty search result
    if(searchText === ''){
        displayError()
    }
    else{
         // Display Spinner
         spinner.style.display = 'block';
         // Hide error
         errorMsg.style.display = 'none';
        //  // Clear Search Result
         searchResult.textContent = ''
        //  clear book numbers
        bookNumbers.textContent = ''
         // load data
         const url =`https://openlibrary.org/search.json?q=${searchText} `;
         fetch(url)
             .then(res => res.json())
             .then(data => displaySearchResult(data));
    }
}
// showing error
const displayError = () => {
    errorMsg.style.display = 'block';
    spinner.style.display = 'none';
    bookNumbers.textContent = '';
    searchResult.textContent = ''
}
// Display Search Result
const displaySearchResult = data => {
    bookNumbers.textContent = '';
    searchResult.textContent = '';
    const bookList = data.docs;
    if (bookList === null) {
        displayError()
    }
    else {
        errorMsg.style.display = 'none';
        spinner.style.display = 'none';
        bookNumbers.innerText = `Books Found ${bookList.length}`;
        if (bookList.length === 0) {
            bookNumbers.innerHTML = `<p> No result found</p>`
        }
        //showing each book in a card
        bookList.slice(0,28).forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-75 h-50 rounded  p-2 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">${book.title}</h5>
                    <p class="card-text"><b>Author</b> :  ${book.author_name?book.author_name: 'Unknown author name'}</p>
                    <p class="card-text"><b>First Publish Year</b> : ${book.first_publish_year}</p>
                    <p class="card-text"><b>Publisher</b> : ${book.publisher}</p>
                </div>
                <div class="card-footer rounded text-center read">
                <small >Read</small>
              </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }

}