const buttonShow = document.querySelector(".show");
const inputById = document.querySelector(".quantity");
const divWrap = document.querySelector('wrap');
const divPost = document.querySelector(".post");
const commentList = document.querySelector(".commentList");
const addComment = document.createElement('button');
addComment.innerHTML = "Показать коментарии";
addComment.className = "comment";

function fillPost(post) {
  const title = document.createElement("span");
  const body = document.createElement("span");
  title.innerHTML = post.title;
  body.innerHTML = post.body;
  divPost.appendChild(title);
  divPost.appendChild(body);
  divPost.appendChild(addComment);
}

buttonShow.addEventListener("click", function () {
  if (parseInt(inputById.value) != isNaN && parseInt(inputById.value) >= 1 && parseInt(inputById.value) <= 100) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${inputById.value}`)
      .then(response => response.json())
      .then((response) => { fillPost(response);})
      .catch(error=>console.log(error));
  }
  else {
    inputById.value = "";
    inputById.placeholder = "Нужен диапазон от 1 до 100";
  }
});



addComment.addEventListener("click", function () {
  fetch(`https://jsonplaceholder.typicode.com/posts/${inputById.value}/comments`)
    .then(response => response.json())
    .then((response) => { fillComments(response, divPost); })
    .catch(error=>console.log(error));
}
);

function fillComments(comments, divParent) {
  comments.forEach(element => {
    divParent.append(fillComment(element));
    fillComment(element);
  });
}

function fillComment(currentComment) {
  const divWrap = document.createElement('div');
  divWrap.className="currentComment";
  const name = document.createElement('span');
  const email = document.createElement('span');
  const body = document.createElement('span');
  name.innerHTML = currentComment.name;
  email.innerHTML = currentComment.email;
  body.innerHTML = currentComment.body;
  divWrap.appendChild(name);
  divWrap.appendChild(email);
  divWrap.appendChild(body);
  return divWrap;
}









