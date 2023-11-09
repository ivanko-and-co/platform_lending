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



