// takes fetched json data from flickr and returns an array with objects.
function createImgArr(data){
  imgArr = data.photos.photo.map((photo) => {
    imgObj = {
      addedToGallery: false,
      id:     photo.id,
      title:  photo.title,
      small:  'https://farm'+photo.farm+
              '.staticflickr.com/'+photo.server+
              '/'+photo.id+'_'+photo.secret+'_n.jpg',
      medium: 'https://farm'+photo.farm+
              '.staticflickr.com/'+photo.server+
              '/'+photo.id+'_'+photo.secret+'_z.jpg',
      large:  'https://farm'+photo.farm+
              '.staticflickr.com/'+photo.server+
              '/'+photo.id+'_'+photo.secret+'_b.jpg'
    }
    return imgObj
  })
  return imgArr
}

// takes an array of objects and returns a DOM element with images
function createImgElements(imagesArray){
  let wrapper = document.createElement('div'),
      imageContainer = ''
  wrapper.id = 'image-wrapper'
  imagesArray.forEach((image) => {
    imageContainer = createImgEl(image, wrapper)
    wrapper.appendChild(imageContainer)
  })
  return wrapper
}

// takes an array of image objects and returns a dom element with a single image
function createImgEl(image, wrapper){
  let imageContainer = document.createElement('div'),
      imageOverlay = document.createElement('div'),
      titleSpan = document.createElement('span'),
      galleryIcon = document.createElement('i'),
      img = new Image()

  img.src = image.medium
  imageContainer.className = 'image-cover'
  imageOverlay.className = 'image-overlay'
  titleSpan.textContent = image.title
  galleryIcon.className = 'pe-7s-photo-gallery font-icon'

  // check if image is in the gallery
  galleryArr.forEach((item) => {
    if(item.id === image.id){
      image.addedToGallery = true
      galleryIcon.className = 'pe-7s-check font-icon success'
    }
  })

  galleryIcon.addEventListener('click', (e) => {
    toggleGallery(e, image)
  })

  imageOverlay.addEventListener('click', () => {
    largeImageModal(image)
  })

  imageOverlay.appendChild(titleSpan)
  imageOverlay.appendChild(galleryIcon)
  imageContainer.appendChild(imageOverlay)
  imageContainer.appendChild(img)
  return imageContainer
}

// takes an image object as an argument and toggles a modal with a large image
function largeImageModal(image){
  let imgModal = document.getElementById('img-modal'),
      bodyElement = document.getElementsByTagName("BODY")[0],
      img = new Image()

  if(window.innerWidth < 768){
    img.src = image.medium
  } else {
    img.src = image.large
  }
  imgModal.appendChild(img)
  imgModal.className = 'display-modal'
  bodyElement.className = 'modal-open'
}

// takes an image object as an argument and adds/removes it from the gallery
function toggleGallery(e, image){
  if (!e) var e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()

  if(!image.addedToGallery){
    image.addedToGallery = true
    e.target.className = 'pe-7s-check font-icon success'
    galleryArr.push(image)
  }else{
    galleryArr = galleryArr.filter((item) => {
      return item.id != image.id
    })
    if(location.pathname === '/gallery'){
      galleryNav()
    }
    e.target.className = 'pe-7s-photo-gallery font-icon'
    image.addedToGallery = false
  }
}
