let imageContainer = document.getElementsByClassName('image-container')

const fetchImage = () => {
    fetch('http://localhost:3000/images/1')
    .then(res => res.json())
    .then(user => updateInfo(user))
}
fetchImage()

const updateInfo = (user) => {
    console.log(user)
    let imageCard = document.querySelector('.image-card')

    let title = imageCard.querySelector('h2') 
    title.innerText = user.title

    let image = imageCard.querySelector('img') 
    image.innerText = user.image
    // `
    //     <img src='${user.image}'class="image" />
    // `
    console.log(image)

    //Tried a couple ways to replace image, will come back
    
    let likes = imageCard.querySelector('.likes') 
    likes.innerText = `${user.likes} likes`


console.log(user.comments)
    const replaceComments = () => {
        let ul = imageCard.querySelector('ul')
        let li = imageCard.querySelector('li')

        user.comments.forEach(comment => {
            let com = li.textContent = comment.content
            ul.appendChild(com)
        })
    }
    replaceComments()

    //currently only returning the first comment in the array. I believe that I need to add something outside of this function to replace the other lis, maybe delete them first


    //Below is code that I started to write when I tried to replace the values w/ innerHTML rather than individually. Since that took too long and I figured I must be doing it wrong, I changed tactics and went for a patch. I didn't really believe this was correct either since I did have my info from the fetch at the top, but I didn't want to get stuck trying just one method.

    // data = {
    //     title: user.title
    //     img src: user.image
    //     likes: `${user.likes} likes`
    // }

    // const update = fetch('http://localhost:3000/images/1', {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //         Accept: 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(res => res.json)


}

//copy paste from index.html

/* <h2 class="title">Title of image goes here</h2>
<img src="./assets/image-placeholder.jpg" class="image" />
<div class="likes-section">
  <span class="likes">0 likes</span>
  <button class="like-button">♥</button>
</div>
<ul class="comments">
  <li>Get rid of these comments</li>
  <li>And replace them with the real ones</li>
  <li>From the server</li>
</ul> */

//comments are an array, need to pull those out
