export function saveData(data: {
  [key: number]: string | number;
}): Promise<Response> {
  return fetch("http://localhost:8081", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
  });
}
