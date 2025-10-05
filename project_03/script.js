document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 85.55 },
        { id: 3, name: "Product 3", price: 84 }
    ]

    const cart = []

    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartTotalMessage = document.getElementById("cart-total")
    const totalPriceDisplay = document.getElementById("total-price")
    const checkoutButton = document.getElementById("checkout-btn")

    products.forEach(product => {
        const productElement = document.createElement("div")
        productElement.classList.add("product")
        productElement.innerHTML = `
        <span>${product.name} - ${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `
        productList.appendChild(productElement)
    })

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"))
            const product = products.find(p => p.id === productId)
            console.log(product)
            addToCart(product)
        }
    })

    function addToCart(prod) {
        cart.push(prod)
        renderCart()
    }

    function renderCart() {
        cartItems.innerHTML = ""
        let totalPrice = 0

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden")
            cartTotalMessage.classList.remove("hidden")

            cart.forEach((item, index) => {
                totalPrice += item.price
                const newElement = document.createElement("div")
                newElement.classList.add("cart-items")
                newElement.innerHTML = `
                <span>${item.name} - ${item.price.toFixed(2)}</span>
                <button data-index="${index}">Remove</button>
                `
                cartItems.appendChild(newElement)
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`

            })
        } else {
            emptyCartMessage.classList.remove("hidden")
            cartTotalMessage.classList.add("hidden")
        }
    }

    checkoutButton.addEventListener("click", () => {
        cart.length = 0
        alert("Checkout successfully!")
        renderCart()
    })

})