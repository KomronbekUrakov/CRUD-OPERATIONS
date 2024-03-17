let elForm = document.querySelector(".login__form");
let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(evt.target[0].value);
  console.log(evt.target[1].value);

  if (
    evt.target[0].value == "Komronbek@gmail.com" &&
    evt.target[1].value == 12345
  ) {
    const data = {
      login: evt.target[0].value,
      password: evt.target[1].value,
    };
    window.localStorage.setItem("user", JSON.stringify(data));
    elForm.innerHTML = `
<img class="px-[130px] py-[200px]" src="./Images/Infinity-1s-200px.svg">
    
    `;
    setTimeout(() => {

      window.location = "./index.html";
    }, 400);
  }
});
