const images = [
  "images/t-shirt.jpg",
  "images/jeans.jpg",
  "images/short.jpg",
  "images/jacket.jpg",
];

const btn = document.querySelector("#shopBtn");
const content = document.querySelector(".products-content");

btn.addEventListener("click", () => {
  fetch("https://api.jsoning.com/mock/ijh9msyqyd/products")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("Data:", data);

      data.forEach((product, index) => {
        let card = document.createElement("div");
        let Dimage = document.createElement("img");
        let Dname = document.createElement("h3");
        let Dprice = document.createElement("h3");

        card.classList.add("product-card");

        Dimage.src = images[index];
        Dimage.alt = product.name;

        Dname.innerText = product.name;
        Dprice.innerText = product.price;

        card.append(Dimage, Dname, Dprice);

        content.append(card);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
