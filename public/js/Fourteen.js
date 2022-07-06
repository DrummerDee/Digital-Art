const createTextField = document.querySelector("#createText");
const createBtn = document.querySelector("#createBtn");

const textField = document.querySelector("#updateText");
const updateBtn = document.querySelector("#updateBtn");

// update form
const updateForm = document.querySelector("#updateCommmentForm");
const createForm = document.querySelector("#form");

//delete variable
const remove = document.getElementsByClassName("fa-trash-alt");

async function createComment(comments) {
  try {
    await fetch("/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comments,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

// edit comment
async function updateComment(id, comment) {
  try {
    const request = await fetch("/editComment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        comment,
      }),
    });

    response = await request.json();
  } catch (err) {
    console.log(err);
  }
}

const buttons = document.querySelectorAll(".fa-edit");
for (const button of buttons) {
  button.addEventListener("click", function (event) {
    updateCommmentForm.classList.toggle("hidden");
    updateCommmentForm.classList.toggle("form-visible");

    createForm.classList.toggle("form-visible");
    createForm.classList.toggle("hidden");

    event.preventDefault();

    const target = event.target;

    if (target) {
      const comment = event.target.parentElement.parentNode;
      const commentText = target.parentElement.parentNode.children[0].innerText;

      textField.value = commentText;

      if (!comment) {
        console.log("could not update comment");
      }

      updateBtn.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("text field", textField.value);

        updateComment(
          comment.getAttribute("data-commentId"),
          textField.value
        ).then(() => {
          location.reload();
        });
      });
    }
  });
}

createBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  createComment(createTextField.value).then(() => location.reload());
});


//event listener for delete
Array.from(remove).forEach((element) => {
  element.addEventListener("click", deleteComment);
});

//delete comment
async function deleteComment() {
  const comments = this.parentNode.parentNode.childNodes[1].innerText;
  console.log(comments);
  try {
    const response = await fetch("deleteComment", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comments: comments,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}