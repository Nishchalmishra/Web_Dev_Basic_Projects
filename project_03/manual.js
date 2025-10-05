document.addEventListener("DOMContentLoaded", async() => { 

    async function fetchData() {
        const url = 'https://api.freeapi.app/api/v1/public/stocks?page=1&limit=2&inc=Symbol%252CName%252CMarketCap%252CCurrentPrice&query=tata'

        const response = await fetch(url)
        const data = await response.json()
        // console.log(data.data.data[0].Name)
        
        const products = data.data.data.map(item => ({
            id: item.Symbol,
            name: item.Name,
            price: item.CurrentPrice
        }))
        return products
    
    }

    const products = await fetchData()
    console.log(products)


    const cart = JSON.parse(localStorage.getItem("cart")) || []
    

    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartTotalMessage = document.getElementById("cart-total")
    const totalPriceDisplay = document.getElementById("total-price")
    const checkoutButton = document.getElementById("checkout-btn")


    cart.forEach(element => {
        renderCart(element)

    })

    products.forEach(element => {
        const productElement = document.createElement("div")
        productElement.classList.add("product")
        productElement.innerHTML = `
        <span>${element.name} - ${element.price}</span>
        <button data-id="${element.id}" class="button">Add to cart</button>
        `
        productList.appendChild(productElement)
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
           const productId = e.target.getAttribute("data-id")
           const product = products.find(p => p.id === productId)
           console.log(productId);
           
           addToCart(product)
        }
    })

    function addToCart(prod) {
        cart.push(prod)
        renderCart()
        saveTask()
    }

    console.log(cart)

    function renderCart() {
        cartItems.innerHTML = ""
        let totalPrice = 0

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden")
            cartTotalMessage.classList.remove("hidden")

            cart.forEach((item, index) => {
                console.log(item)
                totalPrice += parseInt(item.price.replace(/[^0-9.-]+/g, ""))
                console.log(parseInt(item.price.replace(/[^0-9.-]+/g, "")))
                const newElement = document.createElement("div")
                newElement.classList.add("cart-list")
                newElement.innerHTML = `
                <span class="list">${item.name}</span>
                <span class="price"> ${item.price}</span>
                <button data-index="${index}" class="del-button">Remove</button>
                `
                cartItems.appendChild(newElement)
                totalPriceDisplay.textContent = `${totalPrice}`
                saveTask()

                newElement.querySelector("button").addEventListener("click", (e) => {
                    // console.log("Daba")
                    const index = parseInt(e.target.getAttribute("data-index"))
                    cart.splice(index, 1)
                    renderCart()
                    saveTask()

                    if (cart.length === 0) {
                        cartItems.innerHTML = `
                        <span> Your cart is empty</span>
                        `
                        
                    }
                    
                })
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

    function saveTask() {
        localStorage.setItem("cart", JSON.stringify(cart))
    }

})