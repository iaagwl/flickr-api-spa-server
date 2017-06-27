// initializes the slider
function initSlider(sliderElements){
  const { slideFigure, leftButton, rightButton, dashContainer } = sliderElements
  let = firstSlide = document.getElementById('item-0'),
        centerSlide = document.getElementById('item-1'),
        lastSlide = document.getElementById('item-2'),
        firstDash = document.getElementById('dash-0'),
        secondDash = document.getElementById('dash-1'),
        thirdDash = document.getElementById('dash-2'),
        currentPos = 0,
        slideDistance = 0,
        windowWidth = window.innerWidth

  // update on window resize
  window.onresize = () => {
    slideFigure.style.transform = 'translateX(0)'
    currentPos = 0
    windowWidth = window.innerWidth
    updateSliderAll()
  }

  // updates the distance the slider translates on the X-axis
  function updateSlideDistance(){
    if(windowWidth < 750) slideDistance = 100
    if(windowWidth >= 750) slideDistance = 75
    if(windowWidth >= 1080) slideDistance = 65
    if(windowWidth >= 1280) slideDistance = 55
    if(windowWidth >= 1600) slideDistance = 45
  }

  function updateSliderAll(){
    updateSlideDistance()
    updateButtons()
    updateDash()
    updateOuterItem()
  }

  ;(function(){
    updateSliderAll()
  })()

  leftButton.addEventListener('click', () => {
    if(currentPos < slideDistance){
      slideLeft()
    }
  })

  rightButton.addEventListener('click', () => {
    if(currentPos > -(slideDistance)){
      slideRight()
    }
  })

  firstDash.addEventListener('click', () => {
    updateOuterDash(-(slideDistance), slideDistance, thirdDash)
  })

  secondDash.addEventListener('click', () => {
    currentPos = 0
    slideFigure.style.transform = 'translateX('+currentPos.toString()+'%)'
    updateButtons()
    updateDash()
    updateOuterItem()
  })

  thirdDash.addEventListener('click', () => {
    updateOuterDash(slideDistance, -(slideDistance), firstDash)
  })

  function slideLeft(){
    currentPos += slideDistance
    updateButtons()
    updateDash()
    updateOuterItem()
    slideFigure.style.transform = 'translateX('+currentPos.toString()+'%)'
  }

  function slideRight(){
    currentPos -= slideDistance
    updateButtons()
    updateDash()
    updateOuterItem()
    slideFigure.style.transform = 'translateX('+currentPos.toString()+'%)'
  }

  // hides or unhides the buttons depending on slide position
  function updateButtons(){
    if(currentPos === slideDistance){
      leftButton.style.opacity = '0'
      rightButton.style.opacity = '1'
    }
    if(currentPos === 0){
      leftButton.style.opacity = '1'
      rightButton.style.opacity = '1'
    }
    if(currentPos === -(slideDistance)){
      leftButton.style.opacity = '1'
      rightButton.style.opacity = '0'
    }
  }

  // update the dashes used to keep track of and navigate the slider
  function updateDash(){
    if(currentPos === slideDistance){
      firstDash.classList.add('active')
      secondDash.classList.remove('active')
      thirdDash.classList.remove('active')
    }
    if(currentPos === 0){
      firstDash.classList.remove('active')
      secondDash.classList.add('active')
      thirdDash.classList.remove('active')
    }
    if(currentPos === -(slideDistance)){
      firstDash.classList.remove('active')
      secondDash.classList.remove('active')
      thirdDash.classList.add('active')
    }
  }

  // updates outer slider-items and adds 'outer-item' class to them
  function updateOuterItem(){
    if(currentPos === slideDistance){
      firstSlide.className = ''
      centerSlide.className = 'outer-item'
      lastSlide.className = 'outer-item'
    }
    if(currentPos === 0){
      firstSlide.className = 'outer-item'
      centerSlide.className = ''
      lastSlide.className = 'outer-item'
    }
    if(currentPos === -(slideDistance)){
      firstSlide.className = 'outer-item'
      centerSlide.className = 'outer-item'
      lastSlide.className = ''
    }
  }

  // handles dash updating when making "double" jumps on the slider via the dashes.
  function updateOuterDash(pos, newPos, dash){
    if(currentPos === pos){
      dash.classList.remove('active')
      secondDash.classList.add('active')
      firstSlide.className = 'outer-item'
      centerSlide.className = ''
      lastSlide.className = 'outer-item'
      currentPos = newPos
      slideFigure.style.transform = 'translateX('+currentPos.toString()+'%)'
      setTimeout(() => {
        updateButtons()
        updateDash()
        updateOuterItem()
      }, 300)
    } else {
      currentPos = newPos
      slideFigure.style.transform = 'translateX('+currentPos.toString()+'%)'
      updateButtons()
      updateDash()
      updateOuterItem()
    }
  }
}
