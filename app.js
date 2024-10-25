let mainSection = document.getElementById("mainSection");
let pages = document.getElementById("pages");
let pagesQuantity = 10;
let PageSize = 10;
let currentPage;
let capacityTest = document.getElementById("capacityTest");

addPage(pagesQuantity); //დავამატე 10 გვერდი

// საიტის ჩატვირთვა
fetch(
  `https://rentcar.stepprojects.ge/api/Car/paginated?pageIndex=1&pageSize=${PageSize}`
)
  .then((res) => res.json())
  .then((item) =>
    item.data.forEach((element) => {
      mainSection.innerHTML += addItem(element);
    })
  );

function addItem(item) {
  return `<div class="parent">
    <div class="card">
  <img src="${item.imageUrl1}" alt="" class="cardImg"/>
  <div class="content-box">
    <span class="card-title">${item.brand} | ${item.model}</span>
    <p class="card-content">ქალაქი: ${item.city}</p> 
    <button class="see-more">Add To cart</button>
    <button class="see-more">See More</button>
  </div>
  <div class="date-box">
    <span class="month">${item.year}</span>
    <span class="date">${item.price}K$</span>
  </div>
</div>
</div>`;
}

// სასურველი რაოდენობის გვერდების დამატება
function addPage(num) {
  for (i = 1; i <= num; i++) {
    pages.innerHTML += `<li><button onclick="changePage(${i})">${i}</button></li>`;
  }
}

//გვერდის შეცვლის ფუნქცია
function changePage(i) {
  mainSection.innerHTML = "";
  fetch(
    `https://rentcar.stepprojects.ge/api/Car/paginated?pageIndex=${i}&pageSize=${PageSize}`
  )
    .then((res) => res.json())
    .then((item) =>
      item.data.forEach((element) => {
        mainSection.innerHTML += addItem(element);
      })
    );
  currentPage = i;
  console.log(currentPage);
}

// 'See Rentals' ღილაკის ფუნქციონალი
function seeProducts() {
  mainSection.scrollIntoView({
    behavior: "smooth",
  });
}

function filterCars(cap) {
  fetch(
    `https://rentcar.stepprojects.ge/api/Car/filter?capacity=1&startYear=1&endYear=1&<city=1>&pageIndex=1&${PageSize}`
  );
}

// function addItem(item) {
//   item.title.length > 24
//     ? (item.title = `${item.title.slice(0, 24)}...`)
//     : (item.title = item.title);
//   item.price.discountPercentage == 0
//     ? (item.price.discountPercentage = "")
//     : (item.price.discountPercentage = `-${item.price.discountPercentage}%`);
//   item.stock == 0
//     ? (item.stock = "Sold Out")
//     : (item.stock = `Stock: ${item.stock}`);
//   return `<div class="parent">
//     <div class="card">
//   <img src="" alt="" class="cardImg"/>
//   <div class="content-box">
//     <span class="card-title">${item.title}</span>
//     <p class="card-content">Rating: ${item.rating}/5 | ${item.stock} | Warr: ${item.warranty}</p>
//     <button class="see-more">Add To cart</button>
//     <button class="see-more">See More</button>
//   </div>
//   <div class="date-box">
//     <span class="month">${item.price.current}$</span>
//     <span class="date">${item.price.discountPercentage}</span>
//   </div>
// </div>
// </div>`;
// }
