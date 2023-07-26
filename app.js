let openShopping = document.querySelector('.shopping');
let closeShpping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})

closeShpping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Product Name 1',
        image: 'Plate 1.png',
        price: 1200
    },
    {
        id: 2,
        name: 'Product Name 2',
        image: 'Plate 2.png',
        price: 1500
    },
    {
        id: 3,
        name: 'Product Name 3',
        image: 'Plate 3.png',
        price: 1000
    },
    {
        id: 4,
        name: 'Product Name 4',
        image: 'Plate 4.png',
        price: 1300
    },
    {
        id: 5,
        name: 'Product Name 5',
        image: 'Plate 5.png',
        price: 1400
    },
    {
        id: 6,
        name: 'Product Name 6',
        image: 'Plate 6.png',
        price: 1800
    }
];

let listCards = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src = "images/${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>
        `
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }else{
      
        listCards[key].quantity =listCards[key].quantity + 1;
        listCards[key].price = listCards[key].quantity * products[key].price;  
        
      
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value,key) =>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src = "/images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
             
                
                <div>
                    <button onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                   
                </div>
                

            `;
            listCard.appendChild(newDiv);
        }
  
    })
    total.innerText = totalPrice.toLocaleString();
     quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
        
    }
    reloadCard();
}


