const searchField = document.getElementById('search-field'),
      searchIcon = document.getElementById('search-icon'),
      searchForm = document.getElementById('search-form'),
      searchInput = document.getElementById('search-input'),
      searchClose = document.getElementById('search-close'),
      leftMenu = document.getElementById('left-menu'),
      imgModal = document.getElementById('img-modal'),
      bodyElement = document.getElementsByTagName("BODY")[0]

function searchBar(){
  openSearch()
}

function openSearch(){
  searchField.classList.remove('hide')
  searchField.classList.add('unhide')
  searchIcon.classList.add('hide')
  leftMenu.classList.add('hide')
  searchInput.focus()

  searchForm.addEventListener('submit', searchFormEvent)
  searchClose.addEventListener('click', closeSearch)
}

function closeSearch(){
  searchField.classList.remove('unhide')
  searchField.classList.add('hide')
  searchIcon.classList.remove('hide')
  leftMenu.classList.remove('hide')
  searchInput.blur()

  searchForm.removeEventListener('submit', searchFormEvent)
  searchClose.removeEventListener('click', closeSearch)
}

function searchFormEvent(e){
  e.preventDefault()
  if(searchInput.value){
    searchNav(searchInput.value)
    searchInput.value = ''
    closeSearch()
  }
}

imgModal.addEventListener('click', () =>{
  removeModal()
})

function removeModal(){
  bodyElement.className = ''
  imgModal.innerHTML = ''
  imgModal.className = 'hide-modal'
}
