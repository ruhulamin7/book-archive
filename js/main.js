
// common variable declaration 
document.getElementById('spinner').style.display = 'none';
const spinner = document.getElementById('spinner');
const searchButton = document.getElementById('search-btn')
const message = document.getElementById('found-title');
const searchField = document.getElementById('search-field');
const searchResultDiv = document.getElementById('search-result');

// click event listener
searchButton.addEventListener('click', function () {
    spinner.style.display = 'block';
    const searchText = searchField.value;
    // searching keyword validation checking
    if (searchText === '') {
        message.innerText = `Please Type a book name.`;
        spinner.style.display = 'none';
        // clearing previus searched result
        searchResultDiv.textContent = ''
        return;
    }
    // getting API data
    const url = `http://openlibrary.org/search.json?q=$%7BsearchText%7D=${searchText}`
    // clearing input field
    searchField.value = ''
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
})

// desplaying search result
const displaySearchResult = books => {
    document.getElementById('search-result').textContent = ''
    if (books.numFound === 0) {
        message.innerText = `No books found !`;
        spinner.style.display = 'none';
    } else {
        message.innerText = `Total books found : ${books.numFound}, displaying books : ${books.docs.length}`;
        spinner.style.display = 'none';
    }

    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('card-style');
        div.classList.add('mb-5');
        //  adding innerHTML and swowing dynamic result
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Book Name : ${book.title}</h5> 
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Author Name : ${book.author_name}</li>
            <li class="list-group-item">Publisher : ${book.publisher}</li>
            <li class="list-group-item">First Publish : ${book.first_publish_year}</li>
        </ul>
        </div>
        `;
        searchResultDiv.appendChild(div);
    });
}