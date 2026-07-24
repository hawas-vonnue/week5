export async function fetchJson(url: string, options: object): Promise<object> {
    let responseJson;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        responseJson = await response.json();
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
    return responseJson;
}

//------------------------------Test--------------------------------------

let url: string = "https://jsonplaceholder.typicode.com/todos/1";
fetchJson(url, {}).then((response) => {
    console.log(response);
});
