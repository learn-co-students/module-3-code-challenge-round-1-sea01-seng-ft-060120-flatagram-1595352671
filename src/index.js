// // write your code here

const fetchImage = () => {
fetch(`http://localhost:3000/images/1`)
.then(res => res.json())
.then(json => getImage(json))}
fetchImage()

const updateLikes = (image) => {
    let data = {likes: image.likes+= 1}
    fetch(`http://localhost:3000/images/1`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    },
    body: JSON.stringify(data), 
  })
    .then(res => res.json())
    .then(json => {
      let currentImage = document.getElementById(json.id)
      let span = currentImage.querySelector('span')
      span.textContent = `${json.likes} likes`
    })
  }


const getImage = (image) => {
//     fetch(`http://localhost:3000/images/1`)
// .then(res => res.json())
// .then(json => getImage(json))}
    const imageContainer = document.getElementById('image-container')
  let div = document.createElement('div')
  div.className = "image-card"
  div.id = image.id
    div.innerHTML = `
    <h2>${image.title}</h2>
    <img src=${image.image_url} />
    <div class=${image.likes}"likes-section">
      <span class="likes">0 likes</span>
      <button class="like-button">♥</button>
    `
 imageContainer.appendChild(div)

 let imagecard = document.getElementById(image.id)
 let btn = imagecard.querySelector('button')
 btn.addEventListener('click', (e) => updateLikes(image))

}
