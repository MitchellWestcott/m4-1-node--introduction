// here there be JS, yarrr ☠️

const messageInput = document.querySelector("#user-input");

const conversationElem = document.querySelector("#conversation-container");

const handleFocus = () => {
  messageInput.focus();
};

const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();
  const message = { author: "user", text: messageInput.value };
  updateConversation(message);
  console.log(messageInput.value);

  fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      updateConversation(data.message);
    });
};

const updateConversation = (message) => {
  console.log(message);

  const { author, text } = message;
  const messageElem = document.createElement("p");
  messageElem.innerHTML = `<span>${text}</span>`;
  messageElem.classList.add("message", author);
  conversationElem.scrollTop = conversationElem.scrollHeight;
  if (author === "user") {
    messageInput.value = "";
  }
  conversationElem.appendChild(messageElem);

  handleFocus();
};

handleFocus();
