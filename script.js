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
                    let bookPicUrl = 'src="https://covers.openlibrary.org/b/id/'
                    if (typeof bookTitles.cover_i === 'undefined'){
                        bookTitles.cover_i = ''
                        bookPicUrl = 'src="./images/imageMissing.png"'
                    }
                    let bookInfo = {
                        title: bookTitles.title,
                        cover: `https://covers.openlibrary.org/b/id/${bookTitles.cover_i}.jpg`
                    };
                    localStorage.setItem(bookTitles.title, JSON.stringify(bookInfo))
                    return `<div class='col-sm-6 col-md-4 col-lg-3 mb-3'>
                        <div class="card" style="width: 150px height: 150px;">
                            <img class="card-img-top" ${bookPicUrl}${bookTitles.cover_i}-L.jpg" alt="Card image cap">
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
                        return `<div class='col-sm-6 col-md-4 col-lg-3 mb-3'>
                            <div class="card" style="width: 150px height: 150px;">
                                <img class="card-img-top" src="${musicInfo.artworkUrl100}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${musicInfo.trackName}</h5>
                                    <p class="card-text">${musicInfo.artistName}</p>
                                    <a href="${musicInfo.previewUrl}" class="btn btn-primary">Preview</a>
                                </div>
                            </div>
                        </div>`;
                    });
                    return musicData.join('');
                };
                bookShelf.innerHTML = musicLoad(data);
            })
        })