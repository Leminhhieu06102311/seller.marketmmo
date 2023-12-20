import api from "./api";

export function updateUsernameSeller(access_token: string, userName: string) {
  const url = `https://ultimate-implicitly-hound.ngrok-free.app/settings/username?username=${userName}`;
  const headers = {
    Authorization: "Bearer " + access_token,
  };

  return fetch(url, {
    method: "PATCH",
    headers: headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating username");
    }
    return response.json();
  });
}
export async function updateEmailSeller(access_token: string, email: string) {
  const url = `https://ultimate-implicitly-hound.ngrok-free.app/settings/email?email=${email}`;
  const headers = {
    Authorization: "Bearer " + access_token,
  };

  return fetch(url, {
    method: "PATCH",
    headers: headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error updating email");
    }
    return response.json();
  });
}
