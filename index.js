let productName = document.getElementById("name");
let productCategory = document.getElementById("category");
let productModel = document.getElementById("model");
let productDescription = document.getElementById("description");
let searchInput = document.getElementById("searchInput");
let nameAlert = document.getElementById("nameAlert");
let modelAlert = document.getElementById("modelAlert");
let productList = [];
let currUpdateIndex = -1;
let localStorageItem = "productList";
if (localStorage.getItem(localStorageItem) !== null) {
  productList = JSON.parse(localStorage.getItem(localStorageItem));
  display(productList);
}

//add product logic start
function addProduct() {
  let currProduct = {
    name: productName.value,
    category: productCategory.value,
    model: productModel.value,
    description: productDescription.value,
  };
  if (allInputValidations()) {
    productList.push(currProduct);
    localStorage.setItem(localStorageItem, JSON.stringify(productList));
    console.log(productList);
    display(productList);
    formValuesStatus();
  }
}
//add product logic end

//update logic start
function updateProduct(index) {
  formValuesStatus(productList[index]);
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "inline-block";
  document.getElementById("cancelUpdate").style.display = "inline-block";
  currUpdateIndex = index;
}
function confirmUpdate() {
  let currProduct = {
    name: productName.value,
    category: productCategory.value,
    model: productModel.value,
    description: productDescription.value,
  };
  console.log(allInputValidations());
  if (allInputValidations() === true) {
    productList.splice(currUpdateIndex, 1, currProduct);
    localStorage.setItem(localStorageItem, JSON.stringify(productList));
    display(productList);
    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("cancelUpdate").style.display = "none";
    formValuesStatus();
  }
}
function cancelUpdate() {
  formValuesStatus();
  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("updateBtn").style.display = "none";
  document.getElementById("cancelUpdate").style.display = "none";
}
//update logic end

//delete logic start
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem(localStorageItem, JSON.stringify(productList));
  display(productList);
}
//delete logic end

//search logic start
searchInput.addEventListener("input", () => {
  let newCartona = [];
  let cartona = productList.filter((item) => {
    return item.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });

  newCartona = cartona.map((item) => {
    return { ...item, name: item.name.toLowerCase() };
  });
  for (let i = 0; i < newCartona.length; i++) {
    newCartona[i].name = newCartona[i].name.replace(
      searchInput.value.toLowerCase(),
      `<span class="text-success fw-bolder">${searchInput.value.toLowerCase()}</span>`
    );
  }
  console.log(newCartona);
  searchInput.value === "" ? display(cartona) : display(newCartona);
});
//search logic end

//shared logic start
function display(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].category}</td>
    <td>${list[i].model}</td>
    <td>${list[i].description}</td>
    <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update </button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete </button></td>
    </tr>`;
  }
  document.getElementById("tBody").innerHTML = cartona;
}
function formValuesStatus(flag) {
  productName.value = flag ? flag.name : "";
  productCategory.value = flag ? flag.category : "";
  productModel.value = flag ? flag.model : "";
  productDescription.value = flag ? flag.description : "";
}
productName.addEventListener("input", () => {
  validateNameAndCategory(productName);
});
productCategory.addEventListener("input", () => {
  validateNameAndCategory(productCategory);
});
productModel.addEventListener("input", () => {
  validateModel();
});
productDescription.addEventListener("input", () => {
  validateDescription();
});
function validateNameAndCategory(flag) {
  let regex = /^[A-Z]([a-zA-Z]|\s){3,}/g;
  if (regex.test(flag.value)) {
    flag.style.border = "solid 0.2px rgba(230, 230, 250, 0.358)";
    nameAlert.style.display = "none";
    return true;
  } else {
    nameAlert.style.display = "block";
    flag.style.border = "solid 3px red";
    return false;
  }
}
function validateModel() {
  let regex = /^((1995|1996|1997|1998|1999)|(20[0,1,2][0-9]))$/dg;
  if (regex.test(productModel.value)) {
    productModel.style.border = "solid 0.2px rgba(230, 230, 250, 0.358)";
    modelAlert.style.display = "none";
    return true;
  } else {
    modelAlert.style.display = "block";
    productModel.style.border = "solid 3px red";
    return false;
  }
}
function validateDescription() {
  let regex = /^[A-Za-z]{2,}/;
  if (regex.test(productDescription.value)) {
    productDescription.style.border = "solid 0.2px rgba(230, 230, 250, 0.358)";
    return true;
  } else {
    productDescription.style.border = "solid 3px red";
    return false;
  }
}
function allInputValidations() {
  return (
    validateNameAndCategory(productName) &&
    validateNameAndCategory(productCategory) &&
    validateModel() &&
    validateDescription()
  );
}
//shared logic end
