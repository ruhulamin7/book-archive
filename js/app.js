
// common variable declaration 
document.getElementById('spinner').style.display = 'none';
const spinner = document.getElementById('spinner');
const searchButton = document.getElementById('search-btn');
const message = document.getElementById('found-title');
const searchField = document.getElementById('search-field');
const searchResultDiv = document.getElementById('search-result');

// click event listener
searchButton.addEventListener('click', function () {
    spinner.style.display = 'block';
    const searchText = searchField.value;
    // searching keyword validation checking
    if (searchText === '') {
        message.innerText = `Please input a book name.`;
        spinner.style.display = 'none';
        // clearing previus searched result
        searchResultDiv.textContent = '';
        return;
    };
    // getting API data
    const url = `https://openlibrary.org/search.json?q=$%7BsearchText%7D=${searchText}`
    // clearing input field
    searchField.value = '';
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
});

// desplaying search result
const displaySearchResult = books => {
    searchResultDiv.textContent = '';
    if (books.numFound === 0) {
        message.innerText = `No result found !`;
        spinner.style.display = 'none';
    } else {
        message.innerText = `Total books found : ${books.numFound}, Displaying books : ${books.docs.length}`;
        spinner.style.display = 'none';
    }

    books.docs.forEach(book => {
        // create div
        const div = document.createElement('div');
        div.classList.add('card-style');
        div.classList.add('card')
        //  adding innerHTML and swowing dynamic result
        const imgFound = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const imgNotFound = `images/MM63611493626166.png`;

        div.innerHTML = `
        <div class="card-img-top">
         ${book.cover_i ? `<img src=${imgFound}>` : `<img src=${imgNotFound}>`}
        </div>
        <div class="card-body">
            <h5 class="card-title">Book Name : ${book.title}</h5> 
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Author Name</strong> : ${book.author_name}</li>
            <li class="list-group-item"><strong>Publisher</strong> : ${book.publisher}</li>
            <li class="list-group-item"><strong>First Publish</strong> : ${book.first_publish_year}</li>
        </ul>
        `;
        searchResultDiv.appendChild(div);
    });
};
