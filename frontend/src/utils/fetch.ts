type ReturnType = "json" | "blob";

export async function request<T>(
  path: string,
  returnType: ReturnType,
  options: RequestInit = {}
): Promise<T> {
  console.log("Options: ", options);
  return await fetch(path, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      if (returnType === "json") {
        return res.json();
      }
      return res.blob();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}
