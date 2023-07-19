document.getElementById('bookButton').addEventListener('click', (e) => {
    e.preventDefault();
    let bookShelf = document.getElementById('book-container');
    let searchInput = document.getElementById('searchInput1').value;
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
                    return `<div class='col-2 mb-3'>
                        <div class="card" style="width: 150px height: 150px;">
                            <img class="card-img-top" src="https://covers.openlibrary.org/b/id/${bookTitles.cover_i}-M.jpg" alt="Card image cap">
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

    document.getElementById('musicButton').addEventListener('click', (e) => {
        e.preventDefault();
        let bookShelf = document.getElementById('book-container');
        let searchInput = document.getElementById('searchInput1').value;
        fetch(`https://itunes.apple.com/search?media=music&term=${searchInput}`)
            .then(results => results.json())
            .then(data => {
                console.log(data)
                const musicLoad = (data) => {
                    let musicData = data.results.map(musicInfo => {
                        let musicExtra = {
                            title: musicInfo.trackName,
                            cover: musicInfo.artworkUrl100
                        };
                        localStorage.setItem(musicInfo.trackName, JSON.stringify(musicExtra))
                        return `<div class='col-2 mb-3'>
                            <div class="card" style="width: 150px height: 150px;">
                                <img class="card-img-top" src="${musicInfo.artworkUrl100}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${musicInfo.trackName}</h5>
                                    <p class="card-text">${musicInfo.artistName}</p>
                                    <a href="" class="btn btn-primary">More Info</a>
                                </div>
                            </div>
                        </div>`;
                    });
                    return musicData.join('');
                };
                bookShelf.innerHTML = musicLoad(data);
            })
        })