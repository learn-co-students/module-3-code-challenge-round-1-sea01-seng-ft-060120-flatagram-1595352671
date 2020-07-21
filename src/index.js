const findImageCard = document.querySelector('.image-card')
const img = findImageCard.querySelector('img')
const h2 = findImageCard.querySelector('h2')
const span = findImageCard.querySelector('span')
const comments = findImageCard.querySelector('.comments')
const button = findImageCard.querySelector('.like-button')
const form = findImageCard.querySelector('.comment-form')
const likesSection = findImageCard.querySelector('.likes-section')


async function getImage() {
  let response = await fetch('http://localhost:3000/images/1')
  let imageData = await response.json()
  renderImageData(imageData)
}
getImage()

const renderImageData = (image) => {
  img.src = image.image
  h2.innerText = image.title
  span.innerText = `${image.likes} likes`
  comments.innerHTML = ''
  image.comments.forEach(comment => buildComment(comment))
  let dislikeButton = document.createElement('button')
  dislikeButton.className = 'like-button'
  dislikeButton.innerText = '×'
  likesSection.appendChild(dislikeButton)

  dislikeButton.addEventListener('click', () => handleDislike(image))
  button.addEventListener('click', () => handleLike(image))
  form.addEventListener('submit', (e) => handleFormSubmit(e, image))
}

const buildComment = (comment) => {
  let commentLi = document.createElement('li')
  commentLi.id = `comment${comment.id}`
  commentLi.innerText = comment.content
  let deleteLi = document.createElement('button')
  deleteLi.textContent = 'Delete comment'
  deleteLi.style.display = 'none'
  commentLi.appendChild(deleteLi)
  comments.appendChild(commentLi)

  deleteLi.addEventListener('click', () => handleCommentDelete(comment))
  commentLi.addEventListener('click', () => {
    if (deleteLi.style.display === 'none') {
      deleteLi.style.display = 'block';
    } else {
      deleteLi.style.display = 'none';
    }
  })
}

async function handleLike(image) {
  let likeData = {
    likes: image.likes += 1
  }
  let response = await fetch(`http://localhost:3000/images/${image.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(likeData)
  })
  let newImageData = await response.json()
  span.innerText = `${newImageData.likes} likes`
}

async function handleDislike(image) {
  let likeData = {
    likes: image.likes -= 1
  }
  let response = await fetch(`http://localhost:3000/images/${image.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(likeData)
  })
  let newImageData = await response.json()
  span.innerText = `${newImageData.likes} likes`
}

async function handleFormSubmit(e, image) {
  e.preventDefault()
  let commentData = {
    imageId: image.id,
    content: e.target[0].value
  }
  let response = await fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
  let newComment = await response.json()
  buildComment(newComment)
  form.reset()
}

async function handleCommentDelete(comment) {
  let response = await fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: 'DELETE'
  })
  const deleteComment = document.getElementById(`comment${comment.id}`)
  deleteComment.parentNode.removeChild(deleteComment)
}