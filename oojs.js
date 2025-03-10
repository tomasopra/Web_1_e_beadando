// Alaposztály: Termék
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getInfo() {
        return `${this.name} - ${this.price} Ft`;
    }
}

// Bevásárlókosár osztály (öröklődés az Array-ből)
class ShoppingCart extends Array {
    constructor() {
        super();
    }

    addProduct(product) {
        this.push(product);
        this.renderList();
    }

    removeProduct(index) {
        this.splice(index, 1);
        this.renderList();
    }

    renderList() {
        const listElement = document.getElementById("shoppingList");
        listElement.innerHTML = "";

        this.forEach((product, index) => {
            const li = document.createElement("li");
            li.textContent = product.getInfo();

            const removeButton = document.createElement("button");
            removeButton.textContent = "Törlés";
            removeButton.onclick = () => this.removeProduct(index);

            li.appendChild(removeButton);
            listElement.appendChild(li);
        });
    }
}

// Alkalmazás inicializálása
const cart = new ShoppingCart();

document.getElementById("addItem").addEventListener("click", () => {
    const name = document.getElementById("itemName").value.trim();
    const price = document.getElementById("itemPrice").value.trim();

    if (name && price && !isNaN(price)) {
        const product = new Product(name, parseFloat(price));
        cart.addProduct(product);

        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";
    }
});
