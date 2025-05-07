document.querySelectorAll('.car-types-nav a').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelectorAll('.car-types-nav a').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const type = this.dataset.type;
        let anyVisible = false;
        
        document.querySelectorAll('.Most-Searched .car-card').forEach(card => {
            if (card.dataset.type === type) {
                card.style.display = '';
                anyVisible = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        let noCars = document.getElementById('no-cars');
        if (!anyVisible) {
            if (!noCars) {
                noCars = document.createElement('div');
                noCars.id = 'no-cars';
                noCars.style.padding = '40px';
                noCars.style.textAlign = 'center';
                noCars.style.fontSize = '20px';
                noCars.style.color = '#888';
                document.querySelector('.Most-Searched .cars-container').appendChild(noCars);
            }
            noCars.textContent = 'Нет машин в этой категории';
            noCars.style.display = '';
        } else if (noCars) {
            noCars.style.display = 'none';
        }
    });
});

document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        btn.classList.toggle('favorited');
    });
});

const btnInfo = document.getElementById('btnInfo');
const btnReviews = document.getElementById('btnReviews');
const pageInfo = document.getElementById('pageInfo');
const pageReviews = document.getElementById('pageReviews');

function showPage(page) {
    if(page === 'info') {
        pageInfo.style.display = 'block';
        pageReviews.style.display = 'none';
        btnInfo.classList.add('active');
        btnInfo.setAttribute('aria-current', 'page');
        btnReviews.classList.remove('active');
        btnReviews.removeAttribute('aria-current');
    } else {
        pageInfo.style.display = 'none';
        pageReviews.style.display = 'block';
        btnReviews.classList.add('active');
        btnReviews.setAttribute('aria-current', 'page');
        btnInfo.classList.remove('active');
        btnInfo.removeAttribute('aria-current');
    }
}

btnInfo.addEventListener('click', () => showPage('info'));
btnReviews.addEventListener('click', () => showPage('reviews'));


showPage('info');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        openModal(img);
    });

    img.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(img);
        }
    });
});

function openModal(img) {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
    modalClose.focus();
}

modalClose.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const STORAGE_KEY = 'porscheCaymanReviews';

function loadReviews() {
    const savedReviews = localStorage.getItem(STORAGE_KEY);
    if (savedReviews) {
        const reviews = JSON.parse(savedReviews);
        reviewsContainer.innerHTML = '';
        reviews.forEach(({name, text, rating}) => {
            addReviewToDOM(name, text, rating);
        });
    }
}

function addReviewToDOM(name, text, rating) {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');

    const starsHtml = getStarsHtml(rating);

    reviewElement.innerHTML = `
        <h4>${escapeHtml(name)}</h4>
        <div class="stars" aria-label="Рейтинг: ${rating} из 5 звезд">${starsHtml}</div>
        <p>${escapeHtml(text)}</p>
    `;

    reviewsContainer.prepend(reviewElement);
}

function getStarsHtml(rating) {
    let stars = '';
    for(let i=1; i<=5; i++) {
        if(i <= rating) {
            stars += '&#9733;';
        } else {
            stars += '&#9734;'; 
        }
    }
    return stars;
}

function saveReview(name, text, rating) {
    let reviews = [];
    const savedReviews = localStorage.getItem(STORAGE_KEY);
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }
    reviews.push({name, text, rating});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const reviewText = document.getElementById('reviewInput').value.trim();
    const ratingInput = reviewForm.querySelector('input[name="rating"]:checked');
    const rating = ratingInput ? parseInt(ratingInput.value) : 0;

    if (name && reviewText && rating > 0) {
        addReviewToDOM(name, reviewText, rating);
        saveReview(name, reviewText, rating);
        reviewForm.reset();
    } else {
        alert('Пожалуйста, заполните все поля и выберите рейтинг.');
    }
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

loadReviews();