import "./style.css";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);
const form = document.getElementById("form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const messages = document.getElementById("messages") as HTMLUListElement;
form?.addEventListener("submit", (e) => {
   e.preventDefault();
   if (input?.value) {
      socket.emit("chat message", input.value);
      input.value = "";
   }
});

socket.on("chat message", (msg) => {
   const item = document.createElement("li");
   item.textContent = msg;
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});
