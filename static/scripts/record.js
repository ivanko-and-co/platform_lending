async function fetch_json(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки: ${response}`);
  }
  return await response.json()
}


sending_form = () =>{
  let popup = document.querySelector(".popup_inner");
  let calculatorRegistration = document.querySelector(".calculator-registration-mobail");
  popup.classList.add("d-none");
  calculatorRegistration.classList.remove("d-none");

  closedForm = () =>{
    calculatorRegistration.classList.add("d-none");
    popup.classList.remove("d-none");

    document.querySelector(".btn-closed").click();
  }

  setTimeout(closedForm, 2000);
}


async function post_form() {
  result = await fetch_json('/record', {
    name: document.querySelector("#registName").value,
    phone: document.querySelector("#registPhone").value,
    email: document.querySelector("#registEmail").value,
  });

  if (response.ok) {
    sending_form();
  }
}






async function post_order(form) {
  let addItems = document.querySelectorAll("input[type=checkbox]");
  let file = document.querySelector('input[type="file"]').files[0];
  let selectedItems = [];
  for(let i = 0; i < addItems.length; i++){
    if(addItems[i].checked){
      selectedItems.push(Number(addItems[i].dataset.id));
    }
  }


  const orderForm = new FormData(form);
  orderForm.delete('registration', 'agree');
  orderForm.set('width', document.querySelector("#accountWidth").value);
  orderForm.set('file', file);
  orderForm.set('height', document.querySelector("#accountHeight").value);
  orderForm.set('product_id', document.querySelector("input[name=price-item]:checked").dataset.id);
  orderForm.set('category_id', document.querySelector("input[name=radioTex]:checked").dataset.id);
  orderForm.set('extra', JSON.stringify(selectedItems));

  const response = await fetch("/order",  {
    method: 'POST',
    body: orderForm
  });
  content = response;

}

var content
