import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";
import Notiflix from 'notiflix';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const toggleLoading = () => {
    loader.style.display = loader.style.display === 'none' ? 'block' : 'none';
};

const showError = () => {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  };

const handleBreedChange = event => {
  const breedId = event.target.value;

  catInfo.innerHTML = "";

  toggleLoading();
  fetchCatByBreed(breedId)
    .then(cat => {
        const img = new Image();
        img.src = cat.url;
        img.onload = () => {
          catInfo.innerHTML = `
            <img src="${cat.url}" alt="${cat.breeds[0].name}" width="400" height="400"/>
            <div class="cat-details">
              <h2>${cat.breeds[0].name}</h2>
              <p>${cat.breeds[0].description}</p>
              <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
            </div>
          `;
          toggleLoading();
        }
        img.onerror = showError;
    })
    .catch(showError);
};

breedSelect.addEventListener('change', handleBreedChange);

toggleLoading();
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(showError);
