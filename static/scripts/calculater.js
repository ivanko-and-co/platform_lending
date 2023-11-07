
function furnitureSelection() {
    let displayButtons = document.querySelectorAll(".radio_furniture");
    let displayMain = document.querySelector(".display");
    let displayTop = document.querySelector(".display-top");
    let displayImg = document.querySelector(".display-furniture");
    displayButtons.forEach(button => {

        displayTop.classList.add("d-opasity");

        button.addEventListener('click', () => {
            if (button.checked) {
                if (button.id === "officeFurniture") {
                    displayTop.classList.remove("d-opasity");
                    displayTop.classList.add("d-opasity-1");
                    displayMain.classList.add("display-two");
                    displayMain.classList.remove("display-one");
                    displayImg.src = '/static/media/png/Interior_01.png';
                }
                if(button.id === "hallFurniture"){
                    displayTop.classList.remove("d-opasity");
                    displayTop.classList.add("d-opasity-1");
                    displayMain.classList.add("display-two");
                    displayMain.classList.remove("display-one");
                    displayImg.src = '/static/media/png/Interior_02.png';
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
}

furnitureSelection();


function typeSelection() {
    let accountButtons = document.querySelectorAll(".radio_account");
    let accountTexture = document.querySelector(".account_display-texture");
    let accountSmooth = document.querySelector(".account_display-smooth");
    let accountFrescoes = document.querySelector(".account_display-frescoes");
    accountButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.checked) {
                if (button.id === "textural") {
                    accountTexture.classList.remove("d-opasity");

                    accountSmooth.classList.add("d-opasity");
                    accountFrescoes.classList.add("d-opasity");
                }
                if (button.id === "smooth") {
                    accountSmooth.classList.remove("d-opasity");

                    accountTexture.classList.add("d-opasity");
                    accountFrescoes.classList.add("d-opasity");
                }
                if (button.id === "frescoes") {
                    accountFrescoes.classList.remove("d-opasity");

                    accountSmooth.classList.add("d-opasity");
                    accountTexture.classList.add("d-opasity");
                }
            }
        })
    })

}

typeSelection();



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
let addItem1 = document.querySelector('input[name="add-item-1"]');
let addItem2 = document.querySelector('input[name="add-item-2"]');
let addItem3 = document.querySelector('input[name="add-item-3"]');
let result = document.querySelector(".order-result-price");
let buttonStepTwo = document.querySelector(".order-step-two");

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



calculationMaterial = () => {
    let itemCheck = calculaterForm.querySelectorAll('input[name=radio-item]:checked');
    let size = getSize();
    for (i = 0; i < itemCheck.length; i++) {
        let item = itemCheck[i];
        let itemPrice = Number(item.value);
        resultPrice = size * itemPrice;
    }

    updateTotalPrice();


    let resultM = Number(result.dataset.result);
    if (addItem1.checked) {
        let addPrice = calculateService(addItem1, size);
        resultPrice = resultM + addPrice;
        resultM += addPrice;
    }

    if (addItem2.checked) {
        let addPrice2 = Number(addItem2.value);
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
        return;
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
    let itemCheck = calculaterForm.querySelectorAll('input[name=radio-item]:checked');
    for (i = 0; i < itemCheck.length; i++) {
        for (i = 0; i < itemCheck.length; i++) {
            let item = itemCheck[i];
            let itemPrice = Number(item.value);
            resultPrice = size * itemPrice;
        }
    
        updateTotalPrice();
    }
}

