export function request<T>(path: string, options = {}): Promise<T> {
  return fetch(path, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    });
}
