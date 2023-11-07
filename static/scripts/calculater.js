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
                    accountTexture.classList.remove("d-none");
                    accountSmooth.classList.add("d-none");
                    accountFrescoes.classList.add("d-none");
                }
                if (button.id === "smooth") {
                    accountSmooth.classList.remove("d-none");
                    accountTexture.classList.add("d-none");
                    accountFrescoes.classList.add("d-none");
                }
                if (button.id === "frescoes") {
                    accountFrescoes.classList.remove("d-none");
                    accountSmooth.classList.add("d-none");
                    accountTexture.classList.add("d-none");
                }
            }
        })
    })

}

typeSelection();

// let costMaterial;
// let costAddOrder;
// function materialSelect() {
//     let materialButtons = document.querySelectorAll(".texture-item-input");
//     let price;
//     for(i = 0; i < materialButtons.length; i++){
//         let button = materialButtons[i];
//         let buttonParent = button.parentNode;
//         button.addEventListener('click', () => {
//             if (button.checked) {
//                 let materialItemPrice = buttonParent.querySelector(".account_price");
//                 n = materialItemPrice.innerHTML;
//                 price = n;
//             } 
//         })
//         return console.log(price) 
//     }

// }

// materialSelect();
// console.log(materialSelect())


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
    formSubmit.addEventListener('submit', (event) =>{
        event.preventDefault();
        calculaterInfo.classList.add("d-none");
        calculaterRegist.classList.add("d-none");
        registrationСompleted.classList.remove("d-none");
    })
}

accountSubmit();
