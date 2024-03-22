
let  displayBtn = document.querySelector(".display-btn");
const image_input = document.querySelector('#imageInput');

displayBtn.addEventListener('click', () =>{
    image_input.click();
})

function furnitureSelection() {
    let furnitureFon = new Map([
        ['officeFurniture', '/static/media/png/Interior_01.png'],
        ['hallFurniture', '/static/media/png/Interior_02.png'],
        ['bedroomFurniture', '/static/media/png/Interior_04.png'],
        ['livingFurniture', '/static/media/png/Interior_03.png'],
        ['livingFurniture2', '/static/media/png/Interior_05.png'],
        ['kitchenFurniture', '/static/media/png/Interior_06.png'],
        ['kitchenFurniture2', '/static/media/png/Interior_07.png']
    ]);

    let displayButtons = document.querySelectorAll(".radio_furniture");
    let displayMain = document.querySelector(".display");
    let displayTop = document.querySelector(".display-top");
    let displayImg = document.querySelector(".display-furniture");
    displayTop.classList.add("d-opasity");


    displayButtons.forEach((button) => {
        furnitureFon.forEach((value,key) =>{
            button.addEventListener('click', () => {
            if (button.checked) {
                if (button.id === key) {
                    displayTop.classList.remove("d-opasity");
                    displayTop.classList.add("d-opasity-1");
                    displayMain.classList.add("display-two");
                    displayMain.classList.remove("display-one");
                    displayImg.src = value;
                }
                if (button.id === "noFurniture") {
                    displayTop.classList.add("d-opasity");
                    displayTop.classList.remove("d-opasity-1");
                    displayMain.classList.remove("display-two");
                    displayMain.classList.add("display-one");
                }
            }
        })
        })
        
    })
}

furnitureSelection();




const menuItems = document.querySelectorAll('.radio_account');
const products = document.querySelectorAll('.account_container');

showProducts = (id) => {
  products.forEach(product => {
    product.style.opacity = '0';
    product.style.zIndex = '1';
    product.classList.remove('active-dis');
  });

  const selectedProduct = document.getElementById('account_display-' + id);
  selectedProduct.style.opacity = '1';
  selectedProduct.style.zIndex = '10';
  selectedProduct.classList.add('active-dis');
}

menuItems.forEach(item => {
  item.addEventListener('click', function() {
    const itemId = this.id.replace('radio_', '');
    showProducts(itemId);
  });
});





function addToOrder() {
    let addOrderButtons = document.querySelectorAll(".custom-radio");
    addOrderButtons.forEach(button => {
        let buttonParent = button.parentNode;
        button.addEventListener('click', () => {
            if (buttonParent.classList.contains("add-order_item-check")) {
                buttonParent.classList.remove("add-order_item-check");
            }
            else if (button.checked) {
                buttonParent.classList.add("add-order_item-check")
            }
        })
    })
}

addToOrder();



stepNext = () => {
    let orderStepTwo = document.querySelector(".order-step-two");
    let calculaterInfo = document.querySelector(".account_calculater-info");
    let calculaterRegist = document.querySelector(".account_calculator-registration");
    orderStepTwo.addEventListener('click', () => {
        calculaterInfo.classList.add("d-none");
        calculaterRegist.classList.remove("d-none");
    });
}

stepBack = () => {
    let orderStepBack = document.querySelector(".account_buttin-back-item");
    let calculaterInfo = document.querySelector(".account_calculater-info");
    let calculaterRegist = document.querySelector(".account_calculator-registration");
    orderStepBack.addEventListener('click', () => {
        calculaterInfo.classList.remove("d-none");
        calculaterRegist.classList.add("d-none");
    });
}

stepNext();
stepBack();


accountSubmit = () => {
    let formSubmit = document.querySelector(".account_calculator-form");
    let calculaterInfo = document.querySelector(".account_calculater-info");
    let calculaterRegist = document.querySelector(".account_calculator-registration");
    let registrationСompleted = document.querySelector(".calculator-registration-completed");
    formSubmit.addEventListener('submit', (event) => {
        event.preventDefault();
        calculaterInfo.classList.add("d-none");
        calculaterRegist.classList.add("d-none");
        registrationСompleted.classList.remove("d-none");
    })
}

accountSubmit();


//получение цены 
transforNumber = (price) => {
    price = price.replace(/[^0-9]/g, '');
    price = Number(price);
    return price;
}


let calculaterForm = document.querySelector(".account_calculator-form");
let accountOrder = document.querySelector(".account_item-three");
let addItem1 = document.querySelector('input[name="add-latex"]');
let addItem2 = document.querySelector('input[name="add-glue"]');
let addItem3 = document.querySelector('input[name="add-lacquer"]');
let result = document.querySelector(".order-result-price");
let buttonStepTwo = document.querySelector(".order-step-two");
const addPriceLatex = document.querySelector("#addPriceLatex");
const labelGlue = document.querySelector(".label-glue");

let resultPrice = 0;
buttonStepTwo.classList.add("block");

function updateTotalPrice() {
    result.dataset.result = resultPrice;
    resultOutput = resultPrice.toLocaleString();
    result.textContent = resultOutput + "₽";
}





getSize = () => {
    let getWidth = document.querySelector("#accountWidth");
    let getHeight = document.querySelector("#accountHeight");
    let width = Number(getWidth.value) / 100;
    let height = Number(getHeight.value) / 100;

    let sizeResult = Math.ceil(width * height);
    return sizeResult;
}

checkingLatex = (itemCheck, addItem1) =>{
    addItem1.value = Number(itemCheck[0].dataset.latex);
    addPriceLatex.dataset.resultLatex = addItem1.value;
    newLetexPrice = addPriceLatex.dataset.resultLatex;
    addPriceLatex.textContent = newLetexPrice + " ₽/М²";
};

calculationMaterial = () => {
    let itemCheck = calculaterForm.querySelectorAll('input[name=price-item]:checked');
    let categoryCheck = calculaterForm.querySelectorAll('input[name=radioTex]');
    let size = getSize();
    for (let i = 0; i < itemCheck.length; i++) {
        let item = itemCheck[i];
        let itemPrice = Number(item.value);
        resultPrice = size * itemPrice;
    }

    for(let j = 0; j < categoryCheck.length; j++){
        let category = categoryCheck[j];
        let checkItem = category.checked;
        if(checkItem && category.dataset.id > 3){
            addItem2.disabled = true;
            addItem2.checked = false;
            labelGlue.classList.add("block-add");
        }
        if(checkItem && category.dataset.id <= 3){
            addItem2.disabled = false;
            labelGlue.classList.remove("block-add");
        }
    }

    updateTotalPrice();



    let resultM = Number(result.dataset.result);
    if (addItem1.checked) {
        checkingLatex(itemCheck, addItem1);
        let addPrice = calculateService(addItem1, size);
        resultPrice = resultM + addPrice;
        resultM += addPrice;
    }

    if (addItem2.checked) {
        let addPrice2 = calculateService(addItem2, size);
        resultPrice = resultM + addPrice2;
        resultM += addPrice2;
    }
    if (addItem3.checked) {
        let addPrice3 = calculateService(addItem3, size);
        resultPrice = resultM + addPrice3;
        resultM += addPrice3;
    }

    updateTotalPrice();


    if (resultM < 2000) {
        buttonStepTwo.classList.add("block");
    }
    else {
        buttonStepTwo.classList.remove("block");
    }
}


calculateService = (addItem, size) => {
    servicePrice = Number(addItem.value);
    let priceItem = servicePrice * size;
    return Number(priceItem);
}

calculaterForm.addEventListener('change', () => {
    calculationMaterial();
})



getCheck = () => {
    let itemCheck = calculaterForm.querySelectorAll('input[name=price-item]:checked');
    for (i = 0; i < itemCheck.length; i++) {
        for (i = 0; i < itemCheck.length; i++) {
            let item = itemCheck[i];
            let itemPrice = Number(item.value);
            resultPrice = size * itemPrice;
        }

        updateTotalPrice();
    }
}



// image


let uploaded_img = "";

image_input.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        uploaded_img = reader.result;
        document.querySelector(".display_calculater").style.backgroundImage = `url(${uploaded_img})`;
    });
    reader.readAsDataURL(event.target.files[0]);
})