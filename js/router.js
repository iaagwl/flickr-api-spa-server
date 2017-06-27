// renders an element to the page
function render(element) {
  const contentDiv = document.getElementById('content')
  contentDiv.innerHTML = ''
  contentDiv.appendChild(element)
  activeNav()
}

// Handle browser history
let historyRoutes = [],
    contentIdCounter = 1

function addToHistory(DOMContent){
  contentIdCounter++
  historyState = {content_id: contentIdCounter, content: DOMContent}
  historyRoutes.push(historyState)
  return historyState.content_id
}

function getFromHistory(content_id){
  route = historyRoutes.filter(item =>{
    return item.content_id === content_id
  })
  return route[0]
}

// handles forward and backwards browser navigation
window.onpopstate = (event) => {
  let content = {}
  if(event.state) {
    content = getFromHistory(event.state.content_id)
  }
  if(content.content){
    render(content.content)
  }
}

// Set initial routes
;(function(){
  if(location.pathname === '/'){
    homeNav()
  }
  if(location.pathname === '/home'){
    homeNav()
  }
  if(location.pathname.startsWith('/search')){
    homeNav()
  }
  if(location.pathname.startsWith('/gallery')){
    galleryNav()
  }
  if(location.pathname.startsWith('/popular')){
    popularNav()
  }
  if(location.pathname.startsWith('/recent')){
    recentNav()
  }
})()

// Routes
function home(content) {
  content_id = addToHistory(content)

  history.pushState({
    content_id: content_id,
    content: 'Home-content'
  }, null, '/')

  render(content)
}

function gallery(content) {
  content_id = addToHistory(content)

  history.pushState({
    content_id: content_id,
    content: 'Gallery-content'
  }, null, '/gallery')

  render(content)
}

function recent(content) {
  content_id = addToHistory(content)
  history.pushState({
    content_id: content_id,
    content: 'Popular-content'
  }, null, '/recent')

  render(content)
}

function popular(content) {
  content_id = addToHistory(content)

  history.pushState({
    content_id: content_id,
    content: 'Popular-content'
  }, null, '/popular')

  render(content)
}

function searchResult(content) {
  content_id = addToHistory(content)

  history.pushState({
    content_id: content_id,
    content: 'Search Content'
  }, null, '/search')

  render(content)
}
