let imgProducto = document.getElementById("imgProducto");
let miniaturas = document.querySelectorAll(".miniaturas img");

function setMini(pos) {

    if (pos == '0') {
        imgProducto.style.transform = "rotateZ(0deg)";

    }
    if (pos == '1') {
        imgProducto.style.transform = "rotateZ(35deg)";

    }
    if (pos == '2') {
        imgProducto.style.transform = "rotateZ(-55deg) scale(0.75)";

    }

    miniaturas[0].style.backgroundColor = "#fff1d9";
    miniaturas[1].style.backgroundColor = "#fff1d9";
    miniaturas[2].style.backgroundColor = "#fff1d9";
    miniaturas[pos].style.backgroundColor = "#fdc10e";
}

let sizes = document.querySelectorAll(".info-detalle button");

function setSize(pos) {
    sizes[0].style.backgroundColor = "#fff1d9";
    sizes[1].style.backgroundColor = "#fff1d9";
    sizes[2].style.backgroundColor = "#fff1d9";
    sizes[pos].style.backgroundColor = "#fdc10e";
}

//MENU RESPONSIVE
let menu_responsive_visible = false;
let nav_responsive = document.getElementById("nav-responsive");
let nav = document.getElementById("nav");
let close_responsive = document.getElementById("close-responsive");

nav_responsive.onclick = function () {
    if (menu_responsive_visible == false) {
        nav.className = "menu-responsive";
        menu_responsive_visible = true;
    }
}
close_responsive.onclick = function () {
    if (menu_responsive_visible == true) {
        nav.className = "";
        menu_responsive_visible = false;
    }
}





// eliminar elemnetos del carrito

document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".fa-solid.fa-xmark");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest(".fila");
            if (row) {
                row.remove();
                updateTotal();
            }
        });
    });

    function updateTotal() {
        const rows = document.querySelectorAll(".productos-carrito .fila");
        let total = 0;
        rows.forEach(row => {
            const priceElement = row.querySelector(".precio span");
            if (priceElement) {
                const price = parseFloat(priceElement.textContent.replace("$", "").replace(",", ""));
                total += price;
            }
        });
        document.querySelector(".total-compra").textContent = `$${total.toLocaleString()}`;
        document.querySelector(".finalizar-compra .monto").textContent = `$ ${total.toLocaleString()}`;
        document.querySelector(".total-item-carrito").textContent = rows.length;
    }
});














// añadir productos al carrito

document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".fa-solid.fa-bag-shopping");

    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".col");
            const productName = productElement.querySelector("h2").textContent;
            const productPrice = parseFloat(productElement.querySelector("h2:nth-of-type(2)").textContent.replace("$", "").replace(",", ""));
            const productImgSrc = productElement.querySelector("img").src;

            addToCart(productName, productPrice, productImgSrc);
            updateTotal();
        });
    });

    function addToCart(name, price, imgSrc) {
        const cartItems = document.querySelector(".productos-carrito");
        const cartRow = document.createElement("div");
        cartRow.classList.add("fila");

        const cartRowContents = `
            <div class="col descripcion">
                <img src="${imgSrc}" alt="">
                <span>${name}</span>
            </div>
            <div class="col talle">
                <span>42</span>
            </div>
            <div class="col color c1">
                <span> </span>
            </div>
            <div class="col cantidad">
                <button> - </button>
                <span class="total-cantidad">1</span>
                <button> + </button>
            </div>
            <div class="col eliminar">
                <span> <i class="fa-solid fa-xmark"></i> </span>
            </div>
            <div class="col precio">
                <span> $ ${price.toLocaleString()}</span>
            </div>
        `;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);

        cartRow.querySelector(".fa-solid.fa-xmark").addEventListener("click", (event) => {
            event.target.closest(".fila").remove();
            updateTotal();
        });

        cartRow.querySelector(".cantidad button:nth-of-type(1)").addEventListener("click", (event) => {
            const quantityElement = event.target.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantityElement.textContent = quantity - 1;
                updateTotal();
            }
        });

        cartRow.querySelector(".cantidad button:nth-of-type(2)").addEventListener("click", (event) => {
            const quantityElement = event.target.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = quantity + 1;
            updateTotal();
        });
    }

    function updateTotal() {
        const rows = document.querySelectorAll(".productos-carrito .fila");
        let total = 0;
        let itemCount = 0;
        rows.forEach(row => {
            const priceElement = row.querySelector(".precio span");
            const quantityElement = row.querySelector(".cantidad .total-cantidad");
            if (priceElement && quantityElement) {
                const price = parseFloat(priceElement.textContent.replace("$", "").replace(",", ""));
                const quantity = parseInt(quantityElement.textContent);
                total += price * quantity;
                itemCount += quantity;
            }
        });
        document.querySelector(".total-compra").textContent = `$${total.toLocaleString()}`;
        document.querySelector(".finalizar-compra .monto").textContent = `$ ${total.toLocaleString()}`;
        document.querySelector(".total-item-carrito").textContent = itemCount;
    }
});
