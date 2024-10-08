import { menuItems } from "./data"

const menueEl = document.getElementById(`menue-el`)
const cartEl = document.getElementById(`cart-el`)
const paymentForm = document.getElementById(`payment-form`)
let cartArr = []
let categoris = []

function renderMenue(category) {
    const menueCategories = `
        <div class="menue-categories">${getCategories(categoris)}</div>
    ` 
    const menuHtml = menuItems.filter(item => item.category === category).map(item => {
            return`<div class="item-container">
                    <img src="${item.Image}" alt="pancake-stack" class="item-picture">
                    <div class="item-text">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                        <h2>${item.price}</h2>
                    </div>
                    <i class="fa-solid fa-plus" style="color: black;" data-add="${item.name}"></i>
                </div>
                ` 
    }).join(``)

    menueEl.innerHTML = menueCategories + menuHtml
    return menueCategories +  menuHtml
}


function getCategories(categoris) {
    for (let i = 0; i < menuItems.length; i++) {
        if (!categoris.includes(menuItems[i].category)) {
            categoris.push(menuItems[i].category)
        }
    }

    return categoris.map(category => {
        return `
            <div class="category" data-category="${category}">
                <h2>${category}</h2>
            </div>
        `
    }).join(``)
}

document.addEventListener('click', e => {
    if (e.target.closest('.category')) {
        const category = e.target.closest('.category').dataset.category
        menueEl.innerHTML = renderMenue(category)  
    }

    if (e.target.dataset.add) {
        addToCart(e.target.dataset.add)
    }

    if (e.target.dataset.checkout || e.target.dataset.closeform) {
        document.getElementById(`payment-form`).classList.toggle(`active`)
    }
    
    if (e.target.dataset.remove) {
        cartEl.innerHTML = removeItemFromCart(e.target.dataset.remove)
    }
})


function addToCart(product) {
    const targetProductObj = menuItems.filter(item => {
        return item.name === product
    })[0]
    cartArr.push(targetProductObj)
    cartEl.innerHTML = renderCart()
}

function renderCart() {
    let sum = 0
    const itemArr = cartArr.map(item => {
        sum += item.price
        return `
        <div class="items">
            <h2>${item.name} <span data-remove="${item.name}">Remove</span></h2>
            <h2>$${item.price}</h2>
        </div>
        `
    }).join(``)
 
    const cartTotal = `
        <div class="cart-total">
            <h2>Total price:</h2>
            <h2>$${sum.toFixed(2)}</h2>
        </div>
        <button data-checkout="true">Complete order</button>
    `

    return itemArr + cartTotal
}


function removeItemFromCart(item) {
    for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].name === item) {
            cartArr.splice(i,1)
        }
    }
    return renderCart()
}

paymentForm.addEventListener('submit', function(event) {
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get(`name`)
    event.preventDefault();
    
    if (this.checkValidity()) {
        cartArr = []
        document.getElementById(`payment-form`).classList.toggle(`active`) 
        document.getElementById('cart-el').innerHTML = `<h2 class="order-recived-text">Thanks, ${name}! Your order is on it's way!</h2>`;
    } else {
        this.reportValidity();
    }
});


menueEl.innerHTML = renderMenue('breakfast')






