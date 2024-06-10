let add_btn = document.querySelector('#add-btn')
let container = document.querySelector('#to-do-container')

// let todos = document.querySelector('#to-dos')

add_btn.addEventListener("click", () => {
    let add_text = document.querySelector('#add-text')
    
    if (add_text.value != "") {

        let todoTag = document.createElement('div')
        todoTag.classList.add('input-group', 'mb-2')
        
        let check = document.createElement('input')
        check.type = "checkbox"
        check.classList.add('form-check-input', 'm-3')

        let todos = document.createElement('input')
        todos.value = add_text.value
        todos.classList.add('border-0', 'form-control')
        todos.setAttribute('readonly', 'readonly')
        
        todos.innerHTML = add_text.value
        document.getElementById('add-text').value = ""
        // console.log(todos);

        let editBtn = document.createElement('button')
        editBtn.innerHTML = "EDIT"
        editBtn.classList.add('btn-light', 'btn', 'float-end')

        let deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "DELETE"
        deleteBtn.classList.add('btn-red', 'btn', 'float-end')

        check.addEventListener('click', () => {
            if (check.checked) {
                todos.setAttribute('style', 'text-decoration: line-through;')
                todos.classList.add('text-gray')
            } else {
                todos.removeAttribute('style', 'text-decoration: line-through;')
                todos.classList.remove('text-gray')
            }
        })

        editBtn.addEventListener('click', () => {
            if (editBtn.innerHTML == 'EDIT') {
                todos.removeAttribute('readonly', 'readonly')
                editBtn.innerHTML = 'SAVE'
                todos.classList.add('border-0')
                todos.focus()
                // console.log("edid");
            } else {
                editBtn.innerText = 'EDIT'
                todos.setAttribute('readonly', 'readonly')
            }
        })

        deleteBtn.addEventListener('click', () => {
            container.removeChild(todoTag)
        })

        container.appendChild(todoTag)
        todoTag.appendChild(check)
        todoTag.appendChild(todos)
        todoTag.appendChild(editBtn)
        todoTag.appendChild(deleteBtn)

    } else {

        alert("Enter what you wanna do!")
        add_text.focus()
    }
})

let date_day = document.querySelector('#date_day')
let date_date = document.querySelector('#date_date')

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let d = new Date();
let day = weekday[d.getDay()]

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let f_date = `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`


date_day.innerHTML = `${day},`;
date_date.innerHTML = f_date;