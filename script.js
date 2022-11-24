const addBox = document.querySelector(".add-box"),
    closePopBox = document.querySelector("header i"),
    addNote = document.querySelector("#addNote"),
    titleTag = document.querySelector("input"),
    desc = document.querySelector("textarea"),
    popupBox = document.querySelector(".popup-box");
    popupTitle = document.querySelector(".popup-box p");
const months = ["January", "February", "March","April","May", "June", "July", "August", "September", 'October', "November", "December"]

        // covert into js obj
        const notes = JSON.parse(localStorage.getItem("notes") || "[]")

let isUpdate = false, updateId;

closePopBox.addEventListener("click", () => {
    isUpdate = false;
    popupBox.classList.remove("show")
    titleTag.value = ''
    desc.value = ''
    addNote.innerHTML = "Add Note"
    popupTitle.innerHTML = 'Add a new  Note'
})
function showNotes() {
    document.querySelectorAll(".note").forEach((note)=> note.remove())
        notes.forEach((note,index) => {
            let liTag = `<li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.discription}</span>
                </div>
                <div class="bottom-contant">
                    <span>${note.date}</span>
                    <div class="setting">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul class="menu">
                            <li onclick="editNote(${index},'${note.title}','${note.discription}')"><i class="fa-solid fa-pen"></i>Edit</li>
                            <li onclick="deleteNote(${index})"><i  class="fa-solid fa-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>`
        addBox.insertAdjacentHTML("afterend",liTag)
        });
}
showNotes()
function showMenu(ele) {
    ele.parentElement.classList.add("show")
    document.addEventListener("click", (e) => {
        if (e.target.tagName != 'I' || e.target != ele) {
            ele.parentElement.classList.remove("show")
        }
    })
}
function editNote(nodeId, title, des) {
    isUpdate = true;
    addBox.click()
    updateId = nodeId
    addNote.innerHTML = "Update Note"
    popupTitle.innerHTML = 'Update a Note'
    titleTag.value = title
    desc.value = des
}
function deleteNote(nodeId) {
    notes.splice(nodeId, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes()
}
addNote.addEventListener("click", (e) => {
    e.preventDefault()
    let noteTitle = titleTag.value,
        noteDesc = desc.value;
    if (noteDesc || noteTitle) {
        let dateObj = new Date()
        let month = months[dateObj.getMonth()]
        let year = dateObj.getFullYear()
        let day = dateObj.getDate()
        let noteInfo = {
            title: noteTitle,
            discription: noteDesc,
            date:`${month} ${day} ${year}`
        }
        if (!isUpdate) {
            notes.push(noteInfo)
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo
        }
        localStorage.setItem("notes", JSON.stringify(notes))
        closePopBox.click()
        showNotes()
    }
    })
addBox.addEventListener("click", () => {
    popupBox.classList.add('show')
    titleTag.focus()
})