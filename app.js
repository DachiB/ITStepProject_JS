//მთავარი ცვლადები
let content = document.getElementById("mainContent");
let mainSection = document.getElementById("mainSection");
let pages = document.getElementById("pages");
let seeMorePage = document.getElementById("seeMorePage");
let PageSize = 12;
let currentPage = 1;

// ფილტრი:
let reset = document.getElementById("reset");
let apply = document.getElementById("apply");
let capacitySlider = document.getElementById("capacitySlider");
let capacityText = document.getElementById("capacityText");
let selectCity = document.getElementById("selectCity");
let from = document.getElementById("from");
let until = document.getElementById("until");
capacityText.innerText = capacitySlider.value;
let clicked = false;
let currentID = 0;

// ფილტრი: ღილაკები
reset.addEventListener("click", () => {
  capacitySlider.value = 4;
  capacityText.innerText = `4`;
  selectCity.selectedIndex = 0;
  from.value = "";
  until.value = "";
});

apply.addEventListener("click", () => {
  mainSection.innerHTML = "";
  let capacity =
    capacitySlider.value == "" ? "" : `capacity=${capacitySlider.value}&`;
  let startYear = from.value == "" ? "" : `startYear=${from.value}&`;
  let endYear = until.value == "" ? "" : `endYear=${until.value}&`;
  fetch(
    `https://rentcar.stepprojects.ge/api/Car/filter?${capacity}${startYear}${endYear}pageIndex=1&pageSize=12`
  )
    .then((res) => res.json())
    .then((item) => {
      pages.innerHTML = "";
      addPage(item.totalPages);
      item.data.forEach((element) => {
        mainSection.innerHTML += addItem(element);
      });
    });
});

//დავამატე 10 გვერდი

// საიტის ჩატვირთვა

fetch(
  `https://rentcar.stepprojects.ge/api/Car/filter?capacity=${capacitySlider.value}&pageIndex=${currentPage}&pageSize=${PageSize}`
)
  .then((res) => res.json())
  .then((item) => {
    addPage(item.totalPages);
    item.data.forEach((element) => {
      mainSection.innerHTML += addItem(element);
    });
  });

// ქალაქების არჩევის ლოგიკა
fetch("https://rentcar.stepprojects.ge/api/Car/cities")
  .then((res) => res.json())
  .then((data) =>
    data.forEach((element, index) => {
      if (index >= 18) {
        selectCity.innerHTML += addCity(element);
      }
    })
  );

function addCity(city) {
  return `<option>${city}</option>`;
}

//ტევადობის სლაიდერის ლოგიკა
capacitySlider.addEventListener("input", function () {
  capacityText.innerText = capacitySlider.value;
});

// ქარდების დამატების ფუნქცია
function addItem(item) {
  return `<div class="parent">
    <div class="card">
  <img src="${item.imageUrl1}" alt="" class="cardImg"/>
  <div class="content-box">
    <span class="card-title">${item.brand} | ${item.model}</span>
    <p class="card-content">ქალაქი: ${item.city}</p> 
    <button class="see-more" onclick="test(${item.id})">See More</button>
  </div>
  <div class="date-box">
    <span class="month">${item.year}</span>
    <span class="date">${item.price}K$</span>
  </div>
</div>
</div>`;
}

//see more ფუნქცია
function test(id) {
  fetch(`https://rentcar.stepprojects.ge/api/Car/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (clicked && currentID == id) {
        seeMorePage.classList.remove("show");
        seeMorePage.classList.add("hide");
        clicked = false;
      } else {
        seeMorePage.classList.remove("hide");
        seeMorePage.classList.add("show");
        clicked = true;
      }
      mainSection.scrollIntoView({ behavior: "smooth" });
      currentID = id;
      seeMorePage.innerHTML = seeMore(data);
    });
}

function seeMore(item) {
  return `<p>ბრენდი: ${item.brand}</p>
  <p>მოდელი: ${item.model}</p>
  <p>ქალაქი: ${item.city}</p>
  <p>წელი: ${item.year}</p>
  <p>ფასი: ${item.price}K$</p>
  <p>ტევადობა: ${item.capacity}</p>
  <p>კოლოფი: ${item.transmission}</p>
  <p>საწვავი: ${item.fuelCapacity}<p>
  <button onclick="closeSeeMore()" style="padding: 5px 15px">დახურვა</button>`;
}

function closeSeeMore() {
  clicked = false;
  seeMorePage.classList.remove("show");
  seeMorePage.classList.add("hide");
}

// სასურველი რაოდენობის გვერდების დამატება
function addPage(num) {
  for (i = 1; i <= num; i++) {
    pages.innerHTML += `<li><button onclick="changePage(${i})">${i}</button></li>`;
  }
}

//გვერდის შეცვლის ფუნქცია
function changePage(i) {
  let capacity =
    capacitySlider.value == false ? "" : `capacity=${capacitySlider.value}&`;
  let startYear = from.value == "" ? "" : `startYear=${from.value}&`;
  let endYear = until.value == "" ? "" : `endYear=${until.value}&`;
  if (currentPage != i) {
    mainSection.innerHTML = "";
    fetch(
      `https://rentcar.stepprojects.ge/api/Car/filter?${capacity}${startYear}${endYear}pageIndex=${i}&pageSize=${PageSize}`
    )
      .then((res) => res.json())
      .then((item) =>
        item.data.forEach((element) => {
          mainSection.innerHTML += addItem(element);
        })
      );
  }
  currentPage = i;
}

// 'See Rentals' ღილაკის ფუნქციონალი
function seeProducts() {
  mainSection.scrollIntoView({
    behavior: "smooth",
  });
}

//პოპულარული
let popularCars = document.getElementById("popularCars");

fetch(`https://rentcar.stepprojects.ge/api/Car/popular`)
  .then((res) => res.json())
  .then((data) =>
    data.forEach((element) => {
      popularCars.innerHTML += addPopular(element);
    })
  );

function seePopular() {
  popularCars.scrollIntoView({
    behavior: "smooth",
  });
}

function addPopular(item) {
  return `<div class="parent">
    <div class="card">
  <img src="${item.imageUrl1}" alt="" class="cardImg"/>
  <div class="content-box">
    <span class="card-title">${item.brand} | ${item.model}</span>
    <p class="card-content">ქალაქი: ${item.city}</p> 
    <button class="see-more" onclick="test(${item.id})">See More</button>
  </div>
  <div class="date-box">
    <span class="month">${item.year}</span>
    <span class="date">${item.price}K$</span>
  </div>
</div>
</div>`;
}
