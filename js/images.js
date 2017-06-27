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

function createImgElements(imagesArray){
  let wrapper = document.createElement('div')
  wrapper.id = 'image-wrapper'
  imagesArray.forEach((image) => {
    createImgEl(image, wrapper)
  })
  return wrapper
}

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
  wrapper.appendChild(imageContainer)
}

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
