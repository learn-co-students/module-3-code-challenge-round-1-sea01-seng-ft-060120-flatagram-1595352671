// write your code here
document.addEventListener("DOMContentLoaded", function() {

    fetchImages()
    fetchComments()

})

const  fetchImages = () => {
    fetch('http://127.0.0.1:3001/images/1')
    .then(resp => resp.json())
    .then(image => displayImage(image))
}

const  fetchComments = () => {
    fetch('http://127.0.0.1:3001/comments')
    .then(resp => resp.json())
    .then(comments => comments.forEach(e => {
        displayComments(e)
    }))
}

function displayImage(image) {
    console.log(image)

    titleC = document.querySelector('h2')
    titleC.textContent = image.title

    imageC = document.querySelector('div > img')
    imageC.src = image.image

    likesC = document.querySelector('div > span')
    likesC.textContent = image.likes + ' likes'

    likesButton = document.querySelector('button')
    likesButton.addEventListener('click', () =>{
        likeImage(image);
    })
    console.log(likesButton)
}

function displayComments (comment) { //doesn't delete old comments
    commentsC = document.querySelector('ul')    
    li = document.createElement('li')
    li.textContent = comment.content
    commentsC.appendChild(li)
}


likeImage = (image) => { // unfinished

    likesC = document.querySelector('#likes')

    likesN = parseInt(likesC.textContent)
    likesN = likesC + 1;
    likesC.textContent = likesN

}
