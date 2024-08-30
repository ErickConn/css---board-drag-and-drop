const columns = [...document.getElementsByClassName('column__cards')]
const cards = [...document.getElementsByClassName('card')]

let draggedCard

const dragStart = (e) => {
    console.log("drag started")
    draggedCard = e.target 
    e.dataTransfer.effectAllowed = "move"
    
}

const dragOver = (e) => {
    e.preventDefault()
    console.log("drag over")
}

const dragEnter = (e) => {
    console.log("drag enter")
    if (e.target.classList.contains("column__cards"))
    e.target.classList.add('column--highlight')
}

const dragLeave = (e) => {
    console.log("drag leave")
    e.target.classList.remove('column--highlight')
}

const dragDrop = (e) =>{
    console.log("drag drop")
    e.preventDefault()
    if (e.target.classList.contains("column__cards")) {
        e.target.appendChild(draggedCard)
        e.target.classList.remove('column--highlight')
    }
 
}

const createCard = (e) =>{
    if (e.target.classList.contains("column__cards")) {
        const newCard = document.createElement('div')
        newCard.classList.add('card')
        
        e.target.appendChild(newCard)
        newCard.addEventListener("dragstart", dragStart)
        
        newCard.focus()

        newCard.draggable = true
        newCard.contentEditable = true

        newCard.addEventListener("focusout", ()=>{
            newCard.contentEditable = false
            if (!newCard.textContent) newCard.remove()
        })
    }
    console.log("create Card")
}


cards.forEach((card)=>{
    card.addEventListener("dragstart", dragStart)
})

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver)
    column.addEventListener("dragenter", dragEnter)
    column.addEventListener("dragleave", dragLeave)
    column.addEventListener("drop", dragDrop)
    column.addEventListener("dblclick", createCard)
})