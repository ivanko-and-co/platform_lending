let blur = document.querySelector(".blur");
let itemPopup = document.querySelector(".popup-container");
openPopup = () => {
    let buttonsPopup = document.querySelectorAll(".btn-popup");
    buttonsPopup.forEach(button => {
        button.addEventListener('click', () => {
            window.scrollTo(0, 0);
            blur.classList.remove("d-none");
            itemPopup.classList.remove("d-none");
        })
    })
}

openPopup();

closedPopup = () => {
    let btnClosed = document.querySelector(".btn-closed");
    btnClosed.addEventListener('click', () => {
        blur.classList.add("d-none");
        itemPopup.classList.add("d-none");
    })
}

closedPopup();


let burgerBtn = document.querySelector(".mobail_burger");

burgerMenu = () =>{
    let mobailMenu = document.querySelector(".mobail_menu"); 
    let closedMenu = document.querySelector(".mobail-closed");
    mobailMenu.classList.remove("d-none");

    closedMenu.addEventListener('click', () =>{
        mobailMenu.classList.add("d-none");
    })
}

burgerBtn.addEventListener('click', () => {
    burgerMenu();
})