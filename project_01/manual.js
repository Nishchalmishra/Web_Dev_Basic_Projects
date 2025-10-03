document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list")
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-btn")

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach(task => renderSave(task)) 

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim()
        if (taskText === "") return
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed : false
        }

        tasks.push(newTask)
        saveTask()
        renderSave(newTask)
        todoInput.value = ""
    })

    function renderSave(task) {
        const li = document.createElement('li')
        li.setAttribute("data-id", task.id)
        if (task.completed) li.classList.add("completed")
        li.innerHTML = `
        <span>${task.text}</span>
        <Button class="del-btn">Delete</Button>
        `

        li.addEventListener("click", (e) => {
            e.stopPropagation()
            if (e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTask()
        })

        li.querySelector(".del-btn").addEventListener("click", (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTask()
        })

        todoList.appendChild(li)

    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

})