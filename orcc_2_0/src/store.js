import { writable } from "svelte/store";
import io from "socket.io-client";
import { api_url } from "./envVars.js";

const messageStore = writable(JSON.stringify([]));
export class socketHelper {
  constructor(board) {
    this.board = board;    
    this.socket = io(api_url, { query: "owner=" + board });

    this.socket.on("message", function (msg) {
      console.log("received message", msg);
      messageStore.set(msg);
    });
  }
  sendMessage(message) {
    this.socket.emit("message", message);
  }
  leaveBoard(board) {
    this.socket.emit("leave", board);
    messageStore.set(JSON.stringify([]));
  }
}

export default {
  subscribe: messageStore.subscribe,
};
