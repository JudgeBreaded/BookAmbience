document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    let bookShelf = document.getElementById('book-container');
    let searchInput = document.getElementById('searchInput').value;
    fetch(`https://openlibrary.org/search.json?q=${searchInput}`)
        .then(results => results.json())
        .then(data => {
            console.log(data);
            const bookLoad = (data) => {
                let bookData = data.docs.map(bookTitles => {
                    let bookInfo = {
                        title: bookTitles.title,
                        cover: `https://covers.openlibrary.org/b/id/${bookTitles.cover_i}.jpg`
                    };
                    localStorage.setItem(bookTitles.title, JSON.stringify(bookInfo))
                    return `<div class='col-4 mb-3'>
                        <div class="card" style="width: 18rem height: 18rem;">
                            <img class="card-img-top" src="https://covers.openlibrary.org/b/id/${bookTitles.cover_i}.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${bookTitles.title}</h5>
                                <p class="card-text">${bookTitles.first_publish_year}</p>
                                <a href="infoTable.html" class="btn btn-primary">More Info</a>
                            </div>
                        </div>
                    </div>`;
                });
                return bookData.join('');
            };
            bookShelf.innerHTML = bookLoad(data);
        })
    })