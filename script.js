const input = document.getElementById("input");
const button = document.getElementById("btn");
const dialog = document.getElementById("dialog");
const content = document.querySelector(".content");
const footer = document.querySelector(".footer");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

window.addEventListener("DOMContentLoaded", () => {
  restoreMessages();
});

const restoreMessages = () => {
  messages.forEach((msg) => {
    if (msg.role === "user") {
      dialog.innerHTML += getUserMessageHtml(msg.text);
    } else if (msg.role === "assistant") {
      dialog.innerHTML += getAiMessageHtml(msg.text);
    }
  });

  if (messages.length > 0) {
    content.classList.remove("clear");
    footer.classList.remove("clear");
    footer.classList.add("moved");
    content.scrollTop = content.scrollHeight;
  }
};

const getUserMessageHtml = (text) => {
  return `<div class="dialog__message-user">
            <p>${text}</p>  
          </div>`;
};

const getAiMessageHtml = (text) => {
  return `<div class="dialog__message-ai">
            <p>${text}</p>  
          </div>`;
};

const talk = function (data, success) {
  return $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "https://intensive-backend-technium.replit.app/talk",
    data: JSON.stringify({
      messages: data,
    }),
    success: success,
  });
};

const handleInput = () => {
  const inpValue = input.value.trim();

  if (inpValue === "") {
    return;
  }

  dialog.innerHTML += getUserMessageHtml(inpValue);
  input.value = "";

  content.classList.remove("clear");
  footer.classList.remove("clear");
  footer.classList.add("moved");
  content.scrollTop = content.scrollHeight;

  messages.push({
    role: "user",
    text: inpValue,
  });
  localStorage.setItem("messages", JSON.stringify(messages));

  talk(messages, function (data) {
    dialog.innerHTML += getAiMessageHtml(data.answer);
    content.scrollTop = content.scrollHeight;

    messages.push({
      role: "assistant",
      text: data.answer,
    });
    localStorage.setItem("messages", JSON.stringify(messages));
  });
};

button.addEventListener("click", handleInput);

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleInput();
  }
});
