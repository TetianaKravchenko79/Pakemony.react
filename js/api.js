export let resultAPI = null; //!!![] or {}

export function fetchData(API) {
    fetch(API)
    .then(responce => {
        return responce.json();
    })
    .then(data => {
        console.log(data); //!!!result or not

        resultAPI = data;
    });
}
