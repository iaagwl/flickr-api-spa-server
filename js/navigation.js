let galleryNavEl = document.getElementById('gallery-nav'),
    popularNavEl = document.getElementById('popular-nav'),
    recentNavEl = document.getElementById('recent-nav'),
    contentDiv = document.getElementById('content')

// navigates to the home-page
function homeNav(){
  let sliderElement = createSlider()
  home(sliderElement.slider)
  initSlider(sliderElement)
  removeModal()
  window.scrollTo(0, 0)
}

//navigates to the gallery-page and scrolls to the top
function galleryPreNav(){
  galleryNav()
  window.scrollTo(0, 0)
}

// navigates to the gallery-page
function galleryNav(){
  contentDiv.classList.add('loading')
  let galleryElement = (galleryArr.length > 0) ?
                        createImgElements(galleryArr) :
                        emptyMessage('Your gallery is currently empty :(')

  removeModal()
  contentDiv.classList.remove('loading')
  gallery(galleryElement)
}

// navigates to the popular-page
function popularNav(){
  const popularURL =  'https://api.flickr.com/services/rest/'+
                      '?method=flickr.interestingness.getList'+
                      '&per_page=30&format=json&nojsoncallback=1'+
                      '&api_key='+API_KEY

  contentDiv.classList.add('loading')
  fetchData(popularURL)
  .then(data => createImgArr(data))
  .then(imagesArray => createImgElements(imagesArray))
  .then(DOMContent => {
    contentDiv.classList.remove('loading')
    removeModal()
    popular(DOMContent)
    window.scrollTo(0, 0)
  })
  .catch(err => console.log(err) /* Handle error */)
}

// navigates to the recent-page
function recentNav(){
  const recentURL = 'https://api.flickr.com/services/rest/'+
                    '?method=flickr.photos.getRecent&per_page=30'+
                    '&format=json&nojsoncallback=1'+
                    '&api_key='+API_KEY

  contentDiv.classList.add('loading')
  fetchData(recentURL)
  .then(data => createImgArr(data))
  .then(imagesArray => createImgElements(imagesArray))
  .then(DOMContent => {
    contentDiv.classList.remove('loading')
    removeModal()
    recent(DOMContent)
    window.scrollTo(0, 0)
  })
  .catch(err => console.log(err) /* Handle error */)
}

// takes a string as an argument navigates to the search-page and fetches data
// with that string
function searchNav(input){
  let searchURL = 'https://api.flickr.com/services/rest/'+
                  '?method=flickr.photos.search&format=json&nojsoncallback=1'+
                  '&sort=interestingness-desc&per_page=30'+
                  '&api_key='+API_KEY+'&tags='

  contentDiv.classList.add('loading')
  searchURL += input.replace(/\ /g, '+')
  fetchData(searchURL)
  .then(data => createImgArr(data))
  .then(imagesArray => {
    return  (imagesArray.length > 0) ?
      createImgElements(imagesArray) :
      emptyMessage('Could not find any matching results :(')
  })
  .then(DOMContent => {
    contentDiv.classList.remove('loading')
    removeModal()
    searchResult(DOMContent)
    window.scrollTo(0, 0)
  })
  .catch(err => console.log(err) /* Handle error */)
}

// handles active navigation with css class 'active'
function activeNav(){
  galleryNavEl.className = ''
  popularNavEl.className = ''
  recentNavEl.className = ''
  if(location.pathname.startsWith('/gallery')){
    galleryNavEl.className = 'active'
  }
  if(location.pathname.startsWith('/popular')){
    popularNavEl.className = 'active'
  }
  if(location.pathname.startsWith('/recent')){
    recentNavEl.className = 'active'
  }
}

// handles empty gallery, takes a string as an argument and returns an
// element with that message
function emptyMessage(message){
  let emptyWrapper = document.createElement('div'),
      emptyHeader = document.createElement('h1')

  emptyWrapper.id = 'empty-wrapper',
  emptyHeader.id = 'empty-header'
  emptyHeader.textContent = message
  emptyWrapper.appendChild(emptyHeader)
  return emptyWrapper
}
