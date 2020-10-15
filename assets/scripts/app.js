// DOM

const addMovieModal = document.getElementById("add-modal");

const addMovieButton = document.querySelector("header button");

const backdrop = document.getElementById("backdrop");

const cancelMovieButton = addMovieModal.querySelector(".btn--passive");

const confirmMovieButton = cancelMovieButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll("input");

const entryTextSection = document.getElementById("entry-text");

const listRootUl = document.getElementById("movie-list");

const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

// EVENTS FUNCTIONS

// UPPDATING THE UI
const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

// Cancel movie deletion
const cancelMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};
// Confirm delete movie
const confirmDeleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    listRootUl.children[movieIndex].remove();

    cancelMovieDeletion();
    updateUI();
};

// Delete movie event handler
const deleteMovie = (movieId) => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();

    const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");

    // Swaping the deletion button
    let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

    //Adding click events

    // Cancel
    cancelDeletionButton.removeEventListener("click", cancelMovieDeletion);
    cancelDeletionButton.addEventListener("click", cancelMovieDeletion);

    //Confirm

    confirmDeletionButton.addEventListener(
        "click",
        confirmDeleteMovie.bind(null, movieId)
    );
};

// CREATE NEW MOVIE
const createNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info>">
    <h2>${title}</h2>
    <p>${rating}/5 stars</P>
    </div>
    `;

    // Delete movie
    newMovieElement.addEventListener("click", deleteMovie.bind(null, id));

    // Appending movie

    listRootUl.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

// CLOSE MOVIE MODAL
const closeMovieModal = () => {
    addMovieModal.classList.remove("visible");
};

// SHOW MOVIE MODAL
const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const clearMovieInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = "";
    }
};

const cancelMovie = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
};

// ADDING MOVIE
const addMovie = () => {
    const movieTitleValue = userInputs[0].value;
    const movieImageValue = userInputs[1].value;
    const movieRatingValue = userInputs[2].value;

    if (
        movieTitleValue.trim() === "" ||
        movieImageValue === "" ||
        movieRatingValue === "" ||
        +movieRatingValue < 1 ||
        +movieRatingValue > 5
    ) {
        alert("Please enter valid values!");
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: movieTitleValue,
        image: movieImageValue,
        rating: movieRatingValue,
    };

    movies.push(newMovie);
    console.log(movies);

    // Close the modal
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    createNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInputs();
};

// Adding events

addMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelMovieButton.addEventListener("click", cancelMovie);
confirmMovieButton.addEventListener("click", addMovie);