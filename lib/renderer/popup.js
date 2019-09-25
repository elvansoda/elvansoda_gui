const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");

noButton.addEventListener("click", event => {
  window.close();
});

yesButton.addEventListener("click", event => {
  window.close();
});

function clear_data() {
  console.log("data clear request");
  socket.emit("clear data");
  self.close();
}

function pay() {}
