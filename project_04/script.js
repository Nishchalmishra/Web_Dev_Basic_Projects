document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form")
    const expenseLists = document.getElementById("expense-lists")
    const totalAmountDisplay = document.getElementById("total-amount")
    const expenseName = document.getElementById("expense-name")
    const expenseAmount = document.getElementById("expense-amount")

    let expenses = JSON.parse(localStorage.getItem("expenses")) || []
    expenses.forEach(expense => renderExpense(expense))

    calcaulateExpense()
    // console.log(totalAmount)

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = expenseName.value.trim()
        const amount = parseInt(expenseAmount.value.trim())
        // console.log("aha");
        if (name === "" || amount === 0) return;
        const newExpense = {
            id: Date.now(),
            name,
            amount
        }
        expenses.push(newExpense)
        expenseName.value = ""
        expenseAmount.value = ""
        calcaulateExpense()
        renderExpense(newExpense)
        saveToLocalStorage()

        // totalAmountDisplay.textContent = totalAmount
    })
    
    console.log(expenses);
    function renderExpense(expense) {
        const li = document.createElement("li")
        li.setAttribute("data-id", expense.id)
        li.innerHTML = `
        <span>${expense.name}</span>-
        <span>${expense.amount}</span>
        <Button class="del-btn">Remove</Button>
        `

        li.querySelector("Button").addEventListener("click", (e) => {
            e.stopPropagation()
            expenses = expenses.filter(t => t.id !== expense.id)
            li.remove()
            calcaulateExpense()
            saveToLocalStorage()
        })
        expenseLists.appendChild(li)
        saveToLocalStorage()
    }

    function calcaulateExpense() {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0)
        totalAmountDisplay.textContent = total
        // return total
    }

    function saveToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    } 


} )