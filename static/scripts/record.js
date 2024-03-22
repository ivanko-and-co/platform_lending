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

sending_form = () => {
  let popup = document.querySelector(".popup_inner");
  let calculatorRegistration = document.querySelector(".calculator-registration-mobail");
  popup.classList.add("d-none");
  calculatorRegistration.classList.remove("d-none");

  closedForm = () => {
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

  if (result === '200') {
    document.querySelector(".btn-closed").click();
  }
}

document.querySelectorAll("input[name=radioTex]").forEach(element => {
  element.addEventListener('change', event => {
    category_id(element)
  })
})

function category_id(element) {
  if (element.checked) {
    document.querySelector("input[name=category_id]").value = element.dataset.id;
  }
}

document.querySelectorAll("input[name=price-item]").forEach(element => {
  element.addEventListener('change', event => {
    price_item(element)
  })
})

function price_item(element) {
  if (element.checked) {
    document.querySelector("input[name=product_id]").value = element.dataset.id;
  }
}

document.querySelector("#accountHeight").addEventListener('change', event => {
  document.querySelector("input[name=height]").value = document.querySelector("#accountHeight").value;
})

document.querySelector("#accountWidth").addEventListener('change', event => {
  document.querySelector("input[name=width]").value = document.querySelector("#accountWidth").value;
})

document.querySelectorAll("input[type=checkbox]").forEach(element => {
  element.addEventListener('change', event => {
    extra()
  })
})

function extra() {
  let addItems = document.querySelectorAll("input[type=checkbox]");
  let selectedItems = [];
  for (let i = 0; i < addItems.length; i++) {
    if (addItems[i].checked) {
      selectedItems.push(Number(addItems[i].dataset.id));
    }
  }
  document.querySelector("input[name=extra]").value = JSON.stringify(selectedItems);
}
