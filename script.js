
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault()
    let bookShelf = document.getElementById('book-container')
    let searchInput = document.getElementById('searchInput').value
    fetch(`https://openlibrary.org/search.json?q=${searchInput}`)
        .then(res => res.json())
        .then(data => { 
            console.log(data)
    })
})