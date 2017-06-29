let galleryArr = [],
    imgArr = [],
    featuredImages = ['https://farm5.staticflickr.com/4241/34416111044_d25e9ce35a_b.jpg',
    'https://farm5.staticflickr.com/4179/34793727785_37ffbc4572_b.jpg',
    'https://farm5.staticflickr.com/4286/35361039702_aa323ac5a7_b.jpg']

const API_KEY = '4ca5d32fc4f8ce65c4b6e3fd1089c50c'

// takes an object with url and method properties as an argument
// and fetches an returns jsondata as a promise from that url
function makeRequest (opts) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open(opts.method, opts.url)
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject({ status: this.status, statusText: xhr.statusText })
      }
    }
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      })
    }
    let params = opts.params
    xhr.send(params)
  })
}
