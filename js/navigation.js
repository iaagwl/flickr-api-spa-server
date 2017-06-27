let galleryNavEl = document.getElementById('gallery-nav'),
    popularNavEl = document.getElementById('popular-nav'),
    recentNavEl = document.getElementById('recent-nav')

function homeNav(){
  let sliderElement = createSlider()
  home(sliderElement.slider)
  initSlider(sliderElement)
  removeModal()
  window.scrollTo(0, 0)
}

function galleryPreNav(){
  galleryNav()
  window.scrollTo(0, 0)
}

function galleryNav(){
  let galleryElement = createImgElements(galleryArr)
  removeModal()
  gallery(galleryElement)
}

function popularNav(){
  const popularURL =  'https://api.flickr.com/services/rest/'+
                      '?method=flickr.interestingness.getList'+
                      '&per_page=30&format=json&nojsoncallback=1'+
                      '&api_key='+API_KEY

  fetchData(popularURL)
  .then(data => createImgArr(data))
  .then(imagesArray => createImgElements(imagesArray))
  .then(DOMContent => {
    removeModal()
    popular(DOMContent)
    window.scrollTo(0, 0)
  })
  .catch(err => console.log(err) /* Handle error */)
}

function recentNav(){
  const recentURL = 'https://api.flickr.com/services/rest/'+
                    '?method=flickr.photos.getRecent&per_page=30'+
                    '&format=json&nojsoncallback=1'+
                    '&api_key='+API_KEY

  fetchData(recentURL)
  .then(data => createImgArr(data))
  .then(imagesArray => createImgElements(imagesArray))
  .then(DOMContent => {
    removeModal()
    recent(DOMContent)
    window.scrollTo(0, 0)
  })
  .catch(err => console.log(err) /* Handle error */)
}

function searchNav(input){
  let searchURL = 'https://api.flickr.com/services/rest/'+
                  '?method=flickr.photos.search&format=json&nojsoncallback=1'+
                  '&sort=interestingness-desc&per_page=30'+
                  '&api_key='+API_KEY+'&tags='


  searchURL += input.replace(/\ /g, '+')
  fetchData(searchURL)
  .then(data => createImgArr(data))
  .then(imagesArray => createImgElements(imagesArray))
  .then(DOMContent => {
    removeModal()
    searchResult(DOMContent)
    window.scrollTo(0, 0)
  })
  .catch(err => console.log(err) /* Handle error */)
}

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
