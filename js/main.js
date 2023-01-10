//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch);

let storedData;
let imgBank = [];
let smallImgs = [];
let thumbnailImgs = [];



function sanitizeImages() {
  storedData.additionalImages.forEach( (elem, index) => {
    storedData.additionalImages[index] = elem.slice(0, elem.lastIndexOf('.') + 1) + 'jpg';
  });
}

function changeImageRight() {
  let currentImg = document.querySelector('img').src;

  if (smallImgs.indexOf(currentImg) === smallImgs.length - 1) {
    document.querySelector('img').src = smallImgs[0];
    document.querySelector('#big').href = imgBank[0];
  }
  else  {
    document.querySelector('img').src = smallImgs[smallImgs.indexOf(currentImg) + 1];
    document.querySelector('#big').href = imgBank[smallImgs.indexOf(currentImg) + 1];
  }
}

function changeImageLeft() {
  let currentImg = document.querySelector('img').src;

  if (smallImgs.indexOf(currentImg) === 0) {
    document.querySelector('img').src = smallImgs[smallImgs.length - 1];
    document.querySelector('#big').href = imgBank[smallImgs.length - 1];
  }
  else {
    document.querySelector('img').src = smallImgs[smallImgs.indexOf(currentImg) - 1];
    document.querySelector('#big').href = imgBank[smallImgs.indexOf(currentImg) - 1];
  }
}

function processData() {
  storeImages();
  document.querySelector('.slider').textContent = '';
  document.querySelectorAll('.swap').forEach( elem => elem.classList = 'swap hidden');
  document.querySelector('figure').classList = '';

  if (storedData.additionalImages[0]) {
    document.querySelector('#left').addEventListener('click', changeImageLeft);
    document.querySelector('#right').addEventListener('click', changeImageRight);
    document.querySelectorAll('.swap').forEach( elem => elem.classList = 'swap navBtt');
    sanitizeImages();
    storeImagesThumbnail();
    prepareThumbnails();
  }
  
  storeImagesPreview();
  document.querySelector('img').src = smallImgs[0];
  document.querySelector('#big').href = imgBank[0];
  document.querySelector('figcaption').textContent = `${storedData.title}${', ' + storedData.objectDate}`;
  if (storedData.artistDisplayName) document.querySelector('figcaption').textContent += `${' | ' + storedData.artistDisplayName}`;
  document.querySelector('aside').classList = '';
  document.querySelector('nav').classList = 'imgNav';
  document.querySelector('#moreInfo').href = storedData.objectURL;
}

function storeImages() {
  imgBank = [];
  imgBank.push(storedData.primaryImage);
  storedData.additionalImages.forEach( elem => imgBank.push(elem));
}

function storeImagesPreview() {
  smallImgs = [];
  imgBank.forEach( elem => {
    let small = elem.split('');
    small.splice(42, 8, 'web-large');
    smallImgs.push(small.join(''));
  });
}

function storeImagesThumbnail() {
  thumbnailImgs = [];
  imgBank.forEach( elem => {
    let thumbnail = elem.split('');
    thumbnail.splice(42, 8, 'web-additional');
    thumbnailImgs.push(thumbnail.join(''));
  });
}

function prepareThumbnails() {

  for (let i = 0; i < thumbnailImgs.length; i++) {
    let li = document.createElement('li');
    li.classList = 'thumbnailImg';
    li.style['background-image'] = `url(${thumbnailImgs[i]})`;
    li.style['background-size'] = 'cover';
    document.querySelector('.slider').appendChild(li);
  }
}

function getFetch() {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/464120`;
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if (data.primaryImage) {
          storedData = data;
          processData();
        }
        
        else getFetch();
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

let testFetch = 464120;
let randomFetch = `${Math.floor(Math.random() * 789811)}`;