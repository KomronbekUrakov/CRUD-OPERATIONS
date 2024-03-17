let elAddButton = document.querySelector(".add-btn");
let Tbody = document.querySelector(".tbody");
let tHead = document.querySelector(".thead");

let elModalWrapper = document.querySelector(".modal-wrapper");
let elModal = document.querySelector(".modal");

elModalWrapper.addEventListener("click", function (evt) {
  if (evt.target.id == "modal-wrapper") {
    elModalWrapper.classList.remove("open-modal");
  }
});

let students = JSON.parse(window.localStorage.getItem("students")) || [];

elAddButton.addEventListener("click", function (evt) {
  elModalWrapper.classList.add("open-modal");
  elModal.innerHTML = `
      <form class= "add-form pt-[150px]">
  <label>
  <div class="w-[40%] bg-white mx-auto rounded-[50%]">
  <img class="add-input-img render-img" src="./images/choose-img.png" width="100%" heigth="100%" />
  </div>
  <input required class="visually-hidden get-img" type="file"/>
  </label>
  <div class=" bg-white mt-5 flex flex-col justyfy-between">
  <div class="w-[49%]" flex  gap-5>
  <div class="inp-WRAPPER">
  <label class="flex flex-col">
  <span class="">
  Enter your name
  </span>
  <input required class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter your name"/>
  </label>
  <label class="flex flex-col">
  <span class="">
  Enter Email
  </span>
  <input required class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Email"/>
  </label>
  </div>
  <div class="inp-WRAPPER">
  <label class="flex flex-col">
  <span class="">
  Enter your Phone
  </span>
  <input required class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter your Phone"/>
  </label>
  <label class="flex flex-col">
  <span class="">Enter Enroll Number</span>
  <input required class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Enroll Number"/>
  </label>
  </div>
  </div>
  
  
  <button class="add-btn mx-auto my-5">Submit</button>
  </div>
    </form>    `;
  let elForm = document.querySelector(".add-form");
  let elInputChange = document.querySelector(".get-img");
  let elRenderImg = document.querySelector(".render-img");

  elInputChange.addEventListener("change", function (evt) {
    elRenderImg.src = URL.createObjectURL(evt.target.files[0]);
  });

  elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let newTime = `${timeData.getDate().toString().padStart(2, "0")}.${(
      timeData.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${timeData.getFullYear()} ${timeData
      .getHours()
      .toString()
      .padStart(2, "0")}:${timeData.getMinutes().toString().padStart(2, "0")}`;
    let data = {
      id: students.length ? students[students.length - 1].id + 1 : 1,
      img: URL.createObjectURL(evt.target[0].files[0]),
      name: evt.target[1].value,
      Email: evt.target[2].value,
      PhoneNumbre: evt.target[3].value,
      EnrollNumber: evt.target[4].value,
      time: newTime,
    };
    students.push(data);
    console.log(students);
    renderStudents(students, Tbody);
    elModalWrapper.classList.remove("open-modal");
    window.localStorage.setItem("students", JSON.stringify(students));
  });
});

let timeData = new Date();

function renderStudents(arr, list) {
  list.innerHTML = "";

  arr.filter((item) => {
    let elTr = document.createElement("tr");
    elTr.innerHTML = `
              <td class="text-center p-1 bg-white rounded-l-[8px]">
              <img class="mx-auto" src=${item.img} alt="Render img" width="65" heigth="65"/>
              </td>
              <td class="text-center p-1 bg-white text-[20px]">
              ${item.name}
              </td>
              <td class="text-center p-1 bg-white ">
              ${item.Email}
              </td>
              <td class="text-center p-1 bg-white">${item.PhoneNumbre}</td>
              <td class="text-center p-1 bg-white">${item.EnrollNumber}</td>
              <td class="text-center p-1 bg-white">${item.time}</td>
              
              <td class="text-center p-1 bg-white rounded-r-[8px]">
              <button onclick="updateStudents(${item.id})" class="p-1 text-white rounded-md">
    <img src="./Images/pen.svg" width="19" height="19"></button>
              <button  onclick="deleteStudents(${item.id})" class="p-1 text-white rounded-md"><img src="./Images/trash.svg" width="16" height="18"></button>
              </td>
              `;
    list.appendChild(elTr);
  });
}

renderStudents(students, Tbody);

function updateStudents(id) {
  let data = students.find((item) => item.id == id);

  elModalWrapper.classList.add("open-modal");
  elModal.innerHTML = `
    <form class= "update-form text-center pt-[150px]">
  <label>
  <div class="w-[40%] bg-white mx-auto rounded-[50%]">
  <img class="add-input-img rounded-[50%] upgrade-render-img" src="./images/choose-img.png" width="100%" heigth="100%" />
  </div>
  <input class="visually-hidden upgrade-get-img" type="file"/>
  </label>
  <div class=" p-3 bg-white mt-5 flex justyfy-between">
  <div class="w-[49%] flex flex-col gap-5 text-center">
  <div class="inp-WRAPPER">
  <label class="flex flex-col">
  <span class="">
  Enter your name
  </span>
  <input required value=${data.name} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter your name"/>
  </label>
  <label class="flex flex-col">
  <span class="">
  Enter Email
  </span>
  <input required value=${data.Email} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Email"/>
  </label>
  </div>
  <div class="inp-WRAPPER">
  
  <label class="flex flex-col">
  <span class="">
  Enter your Phone
  </span>
  <input required value=${data.PhoneNumbre} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter your Phone"/>
  </label>
  
  <label class="flex flex-col">
  <span class="">Enter Enroll Number</span>
  <input required value=${data.EnrollNumber} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter Enroll Number"/>
  </label>
  </div>
  
  </div>
  </div>
  <button class="add-btn mx-auto my-5">Submit</button>
    </form>    `;

  let elUpgradeform = document.querySelector(".update-form");
  let elUpdateImgInput = document.querySelector(".upgrade-get-img");
  let elUpdateImg = document.querySelector(".upgrade-render-img");

  elUpdateImgInput.addEventListener("change", function (evt) {
    elUpdateImg.src = URL.createObjectURL(evt.target.files[0]);
  });

  elUpgradeform.addEventListener("submit", function (evt) {
    evt.preventDefault();
    (data.img = elUpdateImg.src),
      (data.name = evt.target[1].value),
      (data.Email = evt.target[2].value),
      (data.PhoneNumbre = evt.target[3].value),
      (data.EnrollNumber = evt.target[4].value),
      renderStudents(students, Tbody);

    elModalWrapper.classList.remove("open-modal");
    window.localStorage.setItem("students", JSON.stringify(students));
  });
}

function deleteStudents(id) {
  let findObj = students.find((item) => item.id == id);
  let findedIndex = students.findIndex((item) => item.id == id);
  let Elconfirm = confirm("Вы точно хотите удалить?");

  if (Elconfirm == true) {
    students.splice(findedIndex, 1);
    renderStudents(students, Tbody);
    window.localStorage.setItem("students", JSON.stringify(students));
  } else {
    renderStudents(students, Tbody);
  }
}

let elSearchInput = document.querySelector(".search-bar");
let elSearchList = document.querySelector(".search-list");

elSearchInput.addEventListener("keyup", function (evt) {
  elSearchList.innerHTML = "";
  let data = students.filter((item) =>
    item.name.toLowerCase().includes(evt.target.value.toLowerCase())
  );
  data.map((item) => {
    let ellistItem = document.createElement("li");
    ellistItem.classList.add = `cursor-pointer`;
    ellistItem.dataset.id = item.id;
    ellistItem.textContent = `${item.name}`;
    elSearchList.appendChild(ellistItem);

    ellistItem.addEventListener("click", function (evt) {
      let clickedId = evt.target.dataset.id;
      let dataCick = students.find((item) => item.id == clickedId);
      elSearchInput.value = `${dataCick.name}`;

      let searchFilter = students.filter((item) => item.id == clickedId);
      renderStudents(searchFilter, Tbody);
    });
  });

  if (evt.target.value) {
    elSearchList.classList.add("open-list");
  } else {
    elSearchList.classList.remove("open-list");
    renderProducts(products, Tbody);
  }
});

elSearchInput.addEventListener("blur", function (evt) {
  elSearchList.classList.remove("open-list");
});

function getToLogin() {
  window.location = "./login.html";
}
let profPic = document.querySelector(".profile-pic1");
let elImgInput = document.querySelector(".profile-pic");
elImgInput.addEventListener("change", function (evt) {
  profPic.src = URL.createObjectURL(evt.target.files[0]);
});

var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};


function sortFunc(arr){
    const sortedArr = arr.sort((a, b) => (a.name < b.name ? -1 : 1));
    renderStudents(sortedArr, Tbody)
}
