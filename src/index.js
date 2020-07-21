// write your code here
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/images/1")
    .then((res) => res.json())
    .then((json) => addDog(json));
  function addDog(item) {
    const dogContainer = document.querySelector(".image-container");
    let card = document.createElement("div");
    card.innerHTML = `
      <div class="image-card">
      <h2 class="title">${item.title}</h2>
      <img src='${item.image}' class="image" />
      <div class="likes-section">
        <span class='"likes"'>${item.likes} likes</span>
        <button class="like-button">♥</button>
      </div>

      <form class="comment-form">
        <input
          class="comment-input"
          type="text"
          name="comment"
          placeholder="Add a comment..."
        />
        <button class="comment-button" type="submit">Post</button>
      </form>
    `;

    let buttonLike = card.querySelector(".like-button");
    buttonLike.addEventListener("click", (e) => fetchOne(`${item.id}`));

    let buttonCom = card.querySelector(".comment-button");
    buttonCom.addEventListener("click", (e) => addCom(e, item));
    dogContainer.appendChild(card);
  }

  fetch("http://localhost:3000/comments")
    .then((res) => res.json())
    .then((json) => json.forEach((item) => addComments(item)));

  function addComments(item) {
    const imageCard = document.querySelector(".image-card");
    let li = document.createElement("li");
    li.innerText = item.content;
    imageCard.appendChild(li);
  }

  function addCom(e, item) {
    let formCom = document.querySelector(".comment-form");
    let textCom = document.querySelector(".comment-input");
    textCom.textContent = e.target.value;

    let data = {
      content: e.target.value,
    };

    let arr = item.content;
    // arr.push({"id":${item.id}, "content":e.target.value})
    const imageCard = document.querySelector(".image-card");
    let li = document.createElement("li");
    li.innerText = e.target.value;
    fetch(`http://localhost:3000/comments/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  const fetchOne = (id) => {
    fetch(`http://localhost:3000/images/${id}`)
      .then((res) => res.json())
      .then((json) => increaseLike(json));
  };
  function increaseLike(obj) {
    obj.likes += 1;
    fetch(`http://localhost:3000/images/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: obj.likes,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        let currentDog = document.getElementById(json.id);
        let likes = currentDog.querySelector(".likes");
        likes.textContent = `${json.likes} Likes`;
      });
  }
});
