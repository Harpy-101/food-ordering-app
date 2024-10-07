import { menuItems } from "./data"

const menueEl = document.getElementById(`menue-el`)
const cartEl = document.getElementById(`cart-el`)
let cartArr = []
let categoris = []

function renderMenue(category) {
    const menueCategories = `
        <div class="menue-categories">${getCategories(categoris)}</div>
    ` 
    const menuHtml = menuItems.filter(item => item.category === category).map(item => {
            return`<div class="item-container">
                    <img src="media/pancake-stack.jpg" alt="pancake-stack">
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

    // document.querySelectorAll('.category').forEach(categoryElement => {
    //     categoryElement.addEventListener('click', e => {
    //         const selectedCategory = e.currentTarget.dataset.category;
    //         console.log('Category clicked:', selectedCategory);
    //         renderMenue(selectedCategory); // Re-render menu with the clicked category
    //     });
    // });

    return menueCategories +  menuHtml
}


function getCategories(categoris) {
    for (let i = 0; i < menuItems.length; i++) {
        if (!categoris.includes(menuItems[i].category)) {
            categoris.push(menuItems[i].category)
        }
    }

    return categoris.map(category => {
        //console.log(category)
        return `
            <div class="category" data-category="${category}">
                <h2>${category}</h2>
            </div>
        `
    }).join(``)
}

// document.addEventListener(`click`, e => {
//     if (e.target.dataset.add) {
//         console.log(`add`)
//         addToCart(e.target.dataset.add)
//     }
//      if (e.target.dataset.category) {
//          console.log(`here`)
//          menueEl.innerHTML = renderMenue(e.target.dataset.category)
//     }
// })

// Event delegation on the parent container
document.addEventListener('click', e => {
    if (e.target.closest('.category')) {
        const category = e.target.closest('.category').dataset.category
        console.log('Category clicked:', category)
        menueEl.innerHTML = renderMenue(category)  // Call renderMenu with the category
    }

    if (e.target.dataset.add) {
        console.log('Add to cart:', e.target.dataset.add)
        addToCart(e.target.dataset.add)
    }

    if (e.target.dataset.checkout || e.target.dataset.closeform) {
        console.log("Clicked checkout btn")
        document.getElementById(`payment-form`).classList.toggle(`active`)
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
            <h2>${item.name}</h2>
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


menueEl.innerHTML = renderMenue('breakfast')

console.log(document.querySelectorAll('.category'));

// document.querySelectorAll('.category').forEach(categoryElement => {
//     categoryElement.addEventListener('click', e => {
//         const selectedCategory = e.currentTarget.dataset.category;
//         console.log('Category clicked:', selectedCategory);
//         renderMenue(selectedCategory); // Call the function with the correct category
//     });
// });


