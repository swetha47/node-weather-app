console.log("Testing the js file");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  if (!address) {
    messageOne.textContent = "Please enter an address.";
    messageTwo.textContent = "";
    console.log("Please enter an address.");
  } else {
    fetch(`/weather?address=${address}`).then((response) => {
      response.json().then((data) => {
        messageOne.textContent = "Place: " + data.place;
        messageTwo.textContent = "Temperature: " + data.temperature;
        console.log(data);
      });
    });
  }
});
