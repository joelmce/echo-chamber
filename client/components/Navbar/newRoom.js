import html from "/helpers/html.js";
import { POST } from "/helpers/http.js";
import { renderAllNavLinks } from "./render.js";

export function addNewRoomButton() {
  return html("form", { onsubmit: handleNewRoom }, [
    html("input", {
      className: "input",
      name: "roomName",
    }),
    html("button", "Create Room", {
      className: "room-name-secondary",
    }),
  ]);
}

async function handleNewRoom(e) {
  e.preventDefault();
  const roomName = new FormData(e.target).get("roomName");
  await POST("/api/room", { roomName });
  renderAllNavLinks();
}
