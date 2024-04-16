const config = [
    {
        modelID: 1,
        name: "Ihpne 11",
        price: 10000,
        image_src: "src/images/iphone11.jpg"
    },
    {
        modelID: 2,
        name: "mouse optical",
        price: 8000,
        image_src: "src/images/optical.jpg"
    }
    
];

let orders = document.getElementById("update")
orders.addEventListener("click", () => {
    console.log("update data")
    let url = 'https://krog-dev.kz/product'
    const options = {
        method: 'GET', // Change method to GET
        headers: {
          // Add any headers you need
        },
      };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        // Handle the response data here
        console.log(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });
})


let map = {}
let cart = []

function updateCartTotal(priceChange) {
    cartSumSpan = document.getElementById('cartSum');
    let cartTotal = parseInt(cartSumSpan.textContent);
    cartTotal += priceChange;
    cartSumSpan.innerText = cartTotal;
}

function changeSelectedItem(ProductIndex){
    let selectedItemNameElement = document.getElementById("selectedItemName");
    let selectedItemPricelement = document.getElementById("selectedItemPrice");
    let selectedItemImageElement = document.getElementById("selectedItemImage");

    selectedItemNameElement.textContent = config[ProductIndex].name;
    selectedItemPricelement.textContent = config[ProductIndex].price;
    selectedItemImageElement.src = config[ProductIndex].image_src;
}

let catalogueDiv = document.getElementsByClassName("catalogue")[0];

for (let i = 0; i < config.length; i++) {
    const item = config[i];
    console.log(`Name: ${item.name}, Price: ${item.price}`);

    map[item.modelID] = i;
    cart.push({
        modelID: item.modelID,
        quantity: 0
    });

    var itemDiv = document.createElement('div');
    itemDiv.className = "item";
    itemDiv.innerHTML = `
        <img src="${item.image_src}">
        <p> ${item.name} </p>
        <span> ${item.price} тг </span>
        <p style="vertical-align: bottom;">
            
            В Корзине: <span id="quantity-${item.modelID}"> 0 </span> 
            
        </p>
        <button class="removeButton" data-id="${item.modelID}"> - </button> 
        <button class="addButton" data-id="${item.modelID}"> + </button>
    `;

    let removeButton = itemDiv.querySelector('.removeButton');
    let addButton = itemDiv.querySelector('.addButton');

    addButton.addEventListener('click', function(){
        const modelID = this.getAttribute('data-id');
        const index = map[modelID];
        cart[index].quantity++;
        document.getElementById(`quantity-${modelID}`).innerText = cart[index].quantity;
        updateCartTotal(item.price);
        UpdateCartTable()
    });

    removeButton.addEventListener('click', function(){
        const modelID = this.getAttribute('data-id');
        const index = map[modelID];
        if (cart[index].quantity > 0) {
            cart[index].quantity--;
            document.getElementById(`quantity-${modelID}`).innerText = cart[index].quantity;
            updateCartTotal(-item.price);
            UpdateCartTable()
        }
    });

    catalogueDiv.appendChild(itemDiv);
}


//image_src = "assets/images/dendi/pic1.jpg";
let tg = window.Telegram.WebApp;
let buy = document.getElementById("buy")
let order = document.getElementById("order")
tg.expand()

/*
buy.addEventListener("click", () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("form").style.display = "block"
    document.getElementById("address").value = "Leepstick"
    document.getElementById("myname").value = "Test"
});
*/

let initdata = tg.initData
let dataunsave = tg.initDataUnsafe

let cartButton = document.getElementsByClassName("cartButton")[0];

cartButton.addEventListener("click", function(){
    console.log("Init data above")
    console.log(initdata)
    console.log(dataunsave)
    console.log(dataunsave.user)
    /*
    let address = document.getElementById("address").value
    let price = document.getElementById("price").value
    let code = document.getElementById("code").value
    console.log(address)
    
    let data = {
        address: address,
        query_id: tg.initDataUnsafe.query_id,
        price: price,
        code: code
    }
    */

    data = cart; 
    console.log(data);

    test_data = {"data": [{"modelID": 6, "quantity": 3}, {"modelID": 8, "quantity": 1}],
                "address": {"username":"Krog", "phone":"874720284373", "city": "astana", "post_index": "00001",
            "address": "st. Byqar ZHiray apt 45", "comment": "Don not work homephone", "deliver": true}}

    tg.sendData(JSON.stringify(test_data))
    tg.close()
    
    /*
    document.getElementById("shop").style.display = 'none';

    cart.forEach(cartItem => {
        const product = config.find(product => product.modelID === cartItem.modelID);
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cartItem';
        itemDiv.innerHTML = `
            <img src="${product.image_src}" alt="${product.name}">
            <p>${product.name}</p>
            <p>Цена: ${product.price} тг</p>
            <p>Количество: ${cartItem.quantity}</p>
        `;
        cartContent.appendChild(itemDiv);
    });
    */
    
});

function UpdateCartTable(){
    const cartContent = document.querySelector('#cartContent tbody');
    cartContent.innerHTML = "";

    cart.forEach(cartItem => {
        const product = config.find(product => product.modelID === cartItem.modelID);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} тг</td>
            <td>${cartItem.quantity}</td>
            <td>${product.price * cartItem.quantity} тг</td>
        `;
        cartContent.appendChild(row);
    });

    const cartTotal = cart.reduce((total, cartItem) => {
        const product = config.find(product => product.modelID === cartItem.modelID);
        return total + (product.price * cartItem.quantity);
    }, 0);
    document.getElementById('cartTotal').textContent = cartTotal + ' тг';
};

UpdateCartTable()