function createSlider(){
  let slider = document.createElement('div'),
      slideFigure = document.createElement('figure'),
      leftButton = document.createElement('button'),
      rightButton = document.createElement('button'),
      dashContainer = document.createElement('div'),
      header = document.createElement('h1')

  slider.id = 'slider'
  slideFigure.id = 'slide-figure'
  leftButton.id = 'left-button'
  leftButton.className = 'pe-7s-angle-left'
  rightButton.className = 'pe-7s-angle-right'
  rightButton.id = 'right-button'
  dashContainer.id = 'dash-container'
  header.textContent = 'Featured'

  featuredImages.forEach((image, i) => {
    let = slideDiv = document.createElement('div'),
    dash = document.createElement('div'),
    img = new Image()
    img.src = image
    img.id = 'item-'+i.toString()
    slideDiv.className = 'slide'
    slideDiv.appendChild(img)
    slideFigure.appendChild(slideDiv)
    dash.id = 'dash-'+i.toString()
    dash.className = 'dash'
    dashContainer.appendChild(dash)
  })

  slider.append(header)
  slider.appendChild(leftButton)
  slider.appendChild(slideFigure)
  slider.appendChild(dashContainer)
  slider.appendChild(rightButton)

  return {
    slider,
    slideFigure,
    leftButton,
    rightButton,
    dashContainer
  }
}
