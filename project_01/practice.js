document.addEventListener('DOMContentLoaded', function () {

    const todoList = document.getElementById('todo-list')
    const todoInput = document.getElementById('todo-input')
    const addTaskBtn = document.getElementById('add-task-btn')

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(task => renderTask(task))

    addTaskBtn.addEventListener('click', () => {
        
        const taskText = todoInput.value.trim()
        if (taskText === "") return
        
        const newTask = {
            id: Date.now(),
            text : taskText,
            completed : false
        }

        tasks.push(newTask)
        
        renderTask(newTask)
        saveTask()
        todoInput.value = ""

    })


    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute("data-id", task.id)
        if (task.completed) li.classList('completed')
        li.innerHTML = `
        <span>${task.text}</span>
        <Button class="del-btn">Delete </Button>
        `
        todoList.appendChild(li)

        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTask()
        })

        li.querySelector('.del-btn').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTask()
        })
    }


    function saveTask() {
        localStorage.setItem("tasks" , JSON.stringify(tasks))
    }

})