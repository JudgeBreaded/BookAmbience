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
                    if (typeof bookTitles.cover_i === 'undefined') {
                        bookTitles.cover_i = ''
                        bookPicUrl = 'src="./images/imageMissing.png"'
                    }
                    let bookInfo = {
                        title: bookTitles.title,
                        cover: `https://covers.openlibrary.org/b/id/${bookTitles.cover_i}.jpg`,
                        moreInfo: `https://openlibrary.org${bookTitles.key}`
                    };
                    localStorage.setItem(bookTitles.title, JSON.stringify(bookInfo))
                    return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3'>
                    
                        <div class="card text-center h-100" style="width: 150px height: 150px;">
                            <img class="card-img-top h-75" ${bookPicUrl}${bookTitles.cover_i}-L.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${bookTitles.title}</h5>
                                <p class="card-text">${bookTitles.first_publish_year}</p>
                                <button onclick="newTab('${bookInfo.moreInfo}')" class="btn btn-primary">More Info</button>
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
                    return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3'>
                            <div class="card text-center h-100" style="width: 150px height: 150px;">
                                <img class="card-img-top h-75" src="${musicInfo.artworkUrl100}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${musicInfo.trackName}</h5>
                                    <p class="card-text">${musicInfo.artistName}</p>
                                    <audio controls volume style="width:100%">
                                            <source src="${musicInfo.previewUrl}" volume=0.2">
                                            </audio>
                                </div>
                            </div>
                        </div>`;
                });
                return musicData.join('');
            };
            bookShelf.innerHTML = musicLoad(data);
        })
})

document.getElementById('musicRandom').addEventListener('click', (e) => {
    e.preventDefault();
    let bookShelf = document.getElementById('book-container');
    const genreGenerator = () => {
        let genreList = ["Forest Escape", 'Ocean Landscape', 'Fable ost', 'medieval ambience', 'desert ambience', 'dungeon ambience', 'battle ambience', 'celtic ambience', 'how to train your dragon', 'scotland ambience', 'Space Ambience', 'cosmic horror']
        console.log(genreGenerator)
        let i = Math.floor(Math.random() * 11)
        console.log(i)
        return genreList[i]
    }
    //let searchInput = document.getElementById('searchInput1').value;
    fetch(`https://itunes.apple.com/search?media=music&attribute&term=${genreGenerator()}`)
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
                    return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3'>
                                <div class="card text-center h-100" style="width: 150px height: 125px;">
                                    <img class="card-img-top h-75" src="${musicInfo.artworkUrl100}" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">${musicInfo.trackName}</h5>
                                        <p class="card-text">${musicInfo.artistName}</p>
                                        <audio controls volume style="width:100%">
                                            <source src="${musicInfo.previewUrl}" volume=0.2">
                                            </audio>
                                    </div>
                                </div>
                            </div>`;
                });
                return musicData.join('');
            };
            bookShelf.innerHTML = musicLoad(data);
        })
})

document.getElementById('bookRandom').addEventListener('click', (e) => {
    e.preventDefault();
    let bookShelf = document.getElementById('book-container');
    const genreGenerator = () =>{
    let genreList = ["Love", 'Construction','Battle', 'Architecture','Fantasy', 'Dragons', 'Anime', 'History', 'Science', 'Future', 'Warhammer', 'Mystery', 'Heartbreak', 'Death']
    console.log(genreGenerator)
    let i = Math.floor(Math.random() * 13)
    console.log(i)
    return genreList[i]
    }
    //let searchInput = document.getElementById('searchInput1').value;
    fetch(`https://openlibrary.org/subjects/${genreGenerator().toLowerCase()}.json?limit=25`)
        .then(results => results.json())
        .then(data => {
            console.log(data);
            const bookLoad = (data) => {
                let bookData = data.works.map(bookTitles => {
                    if (typeof bookTitles.cover_id === 'undefined') {
                        bookTitles.cover_id = ''
                        bookPicUrl = 'src="./images/imageMissing.png"'
                    }
                    let bookInfo = {
                        title: bookTitles.title,
                        cover: `https://covers.openlibrary.org/b/id/${bookTitles.cover_id}-M.jpg`,
                        moreInfo: `https://openlibrary.org${bookTitles.key}`,
                    };    
                    localStorage.setItem(bookTitles.title, JSON.stringify(bookInfo))
                    return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-3'>
                        <div class="card text-center h-100" style="width: 150px height: 150px;">
                            <img class="card-img-top h-75" src="${bookInfo.cover}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${bookTitles.title}</h5>
                                <p class="card-text">${bookTitles.first_publish_year}</p>
                                <button onclick="newTab('${bookInfo.moreInfo}')" class="btn btn-primary">More Info</button>
                            </div>
                        </div>
                    </div>`;
                });
                return bookData.join('');

            };
            bookShelf.innerHTML = bookLoad(data);
            
        })
})
                function newTab(url) {
                    window.open(
                    url, "_blank");
                }
