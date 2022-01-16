const PEXELS_API_KEY = "563492ad6f917000010000015c8087c770e34b159eb82741c921624c";
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.more');
const searchTermContainer = document.querySelector('#search-term');

let searchValue = '';
let currentSearch = '';
let loadMoreCounter = 1;

loadMore.addEventListener('click', loadMorePictures);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchValue = searchInput.value;
    currentSearch = searchValue;
    // console.log(searchValue);
    searchPictures(searchValue);
    searchInput.value = '';
});

async function fetchData(fetchURL) {
    try {
        let response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: PEXELS_API_KEY
            }
        });

        let data = await response.json();
        data.photos.forEach(photo => {
            const galleryImg = document.createElement('div');
            galleryImg.classList.add('gallery-img');
            galleryImg.innerHTML = `<img src = ${photo.src.large}></img>
                <div class="photographer-info">
                <p id="photographer"><i class="fas fa-user"></i> ${photo.photographer}</p>
                </div>
            `;
            gallery.appendChild(galleryImg);
        });

        searchTermContainer.innerText = currentSearch !== '' ? `Search: ${currentSearch}` : '';

    } catch (e) {
        console.log(e);
    }
}

function curatedPictures() {
    const fetchURL = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
    fetchData(fetchURL);
}

curatedPictures();

function searchPictures(query = "Nature") {
    clear();
    const fetchURL = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    fetchData(fetchURL);
}

function clear() {
    gallery.innerHTML = '';
}

function loadMorePictures() {
    loadMoreCounter++;
    let fetchURL;
    if (currentSearch === '') {
        fetchURL = `https://api.pexels.com/v1/curated?per_page=15&page=${loadMoreCounter}`;
        fetchData(fetchURL);
    } else {
        fetchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${loadMoreCounter}`;
        fetchData(fetchURL);
    }
}