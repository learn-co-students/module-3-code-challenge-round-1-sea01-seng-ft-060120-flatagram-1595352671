// write your code here


fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    .then(json => renderImage(json))


const renderImage = (images) => {
    
    let title = document.getElementsByClassName('title')

    title.innerHTML = `${images.title}`

    let likes = document.getElementsByClassName('likes-section')
    
    likes.innerHTML = `${images.likes}`
  
}

