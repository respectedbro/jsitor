const input = document.getElementById("input");
const button = document.getElementById("btn");
const dialog = document.getElementById("dialog");
const content = document.querySelector(".content");
const footer = document.querySelector(".footer");

const getUserMessageHtml = (text) => {
  return `<div class="dialog__message-user">
            <p>${text}</p>  
            </div>`;
};

const handleInput = () => {
  const inpValue = input.value.trim();

  if (inpValue === "") {
    return;
  }

  if (inpValue) dialog.innerHTML += getUserMessageHtml(inpValue);
  input.value = "";

  content.classList.remove("clear");
  footer.classList.remove("clear");
  footer.classList.add("moved");
};

button.addEventListener("click", handleInput);

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleInput();
  }
});
