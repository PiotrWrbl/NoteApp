async function postNote(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  let returnData = await response.json()
  return returnData
}

async function deleteNote(url = "", data = {}) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  let returnData = await response.json()
  return returnData
}

const getAllNotes = () => {
  const User = JSON.parse(localStorage.getItem('User'))

  if (User && User.email) {
    const Notes =
      postNote('/getNotes', { email: User.email })

    let NoteContainer = document.querySelector(".YourNotes")


    NoteContainer.innerHTML = ""

    Notes.then((Notes) => {

      Notes.notes.forEach(element => {
        let Note = `
<div class="card mx-1 my-1" style="width: 17rem;">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.note}</p>
    <button data-id="${element._id}" type="submit" class="btn btn-primary delete-button">DELETE</button>
    <button data-id="${element._id}" type="submit" class="btn btn-primary edit">EDIT</button>
  </div>
</div>`
        NoteContainer.innerHTML += Note;
      });
      deleteButton()
      editNote()
    });


  }
  else {
    alert("Please login first!")
    window.location.href="/"
  }
}

getAllNotes()

let submit = document.getElementById("submit")
submit.addEventListener("click", async () => {
  let title = document.getElementById("title").value
  let note = document.getElementById("note").value
  let email = JSON.parse(localStorage.getItem("User"))?.email
  let id = JSON.parse(localStorage.getItem("editNote"))
  if (!email || !note || !title) {
    alert("Please add all information!")
  }
  else {
    console.log("Submitting data", title, note, email, id)
    let resp = await postNote("/addNote", { title, note, email, id })
    console.log(resp)
    if (resp.success) {
      // alert("New note added!")
      if(resp.Note){
      localStorage.setItem("Note", JSON.stringify(resp.Note))}
      if(resp.editNote){
      localStorage.setItem("Note", JSON.stringify(resp.editNote))
      }
   
      document.getElementById("title").value = ""
      document.getElementById("note").value = ""
      localStorage.removeItem("editNote")
      getAllNotes()
      id = JSON.parse(localStorage.getItem(""))
    }
  }
})


function deleteButton() {

  let deleteButtons = document.querySelectorAll(".delete-button")

  deleteButtons.forEach(deleteButton => {

    deleteButton.addEventListener("click", async () => {

      const noteID = deleteButton.getAttribute("data-id")

      const resp = await deleteNote(`/${noteID}`)
      console.log(resp)

      if (resp.success) {
        getAllNotes()
      }
    })
  })
}

function editNote() {
  let editNote = document.querySelectorAll(".edit")
  
  editNote.forEach(editNote => {

    editNote.addEventListener("click", async () => {

      const noteID = editNote.getAttribute("data-id")

      const resp = await postNote(`/${noteID}`)
      console.log(resp)
      document.getElementById("title").value = `${resp.Note.title}`
      document.getElementById("note").value = `${resp.Note.note}`
      localStorage.setItem("editNote", JSON.stringify(noteID))
    })
  })
}

let logout = document.getElementById("logout")
logout.addEventListener("click", async () => {
  alert("User logged out!")
  localStorage.removeItem("User")
  localStorage.removeItem("Note")
  window.location.href = "/"
})