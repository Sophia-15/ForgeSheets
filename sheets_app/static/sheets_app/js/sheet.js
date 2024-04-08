const imageLink = document.querySelector('input[name="image"]');
let regex = '^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s?]*)?(?:\?[^\s]*)?$';

const addImageBtn = document.querySelector('#addImageBtn');
const closeImageBtn = document.querySelector('#closeImageBtn');
const openImageModal = document.querySelector('.openImageBtn');
const imageModal = document.querySelector('.imageModal');

const chooseSheetModal = document.querySelector('.chooseSheetModal');
const createSheetBtn = document.querySelector('.createSheet');
const closeChooseSheetModalBtn = document.querySelector('#closeChooseSheet');

function openChooseSheetModal() {
  chooseSheetModal.style.display = "flex";
}

function closeChooseSheetModal() {
  chooseSheetModal.style.display = "none";
}

function closeImageModal() {
  imageModal.style.display = 'none';
}

function handleError_image(message, className) {
  const error =       
  `
    <span> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      ${message}
      </span>
      `
      const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
      document.querySelector(`.${className}`).appendChild(node);
}

function addImageToSheet(){
  image_test = imageLink.value
  
  if (image_test === ''){
    handleError_image('Esse campo não pode ser vazio', 'imageInput')
    return
  }
  
  if (!regex.image_test ){
    handleError_image('Insira uma URL válida', 'imageInput')
    return
  }
  

  closeImageModal();
}

closeChooseSheetModalBtn?.addEventListener('click', () => closeChooseSheetModal());
createSheetBtn?.addEventListener('click', () => openChooseSheetModal());
// openImageModal.addEventListener('click', () => {
//   imageModal.style.display = 'flex';
// });

// addImageBtn.addEventListener('click', () => addImageToSheet());
// closeImageBtn.addEventListener('click', () => closeImageModal());