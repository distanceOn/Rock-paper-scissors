const noop = () => {};

const request = ({
    method = 'GET',
    url = 'https://skypro-rock-scissors-paper.herokuapp.com',
    path,
    type = 'json',
    onSuccess = noop,
    onError = noop,

}) => {
    const req = new XMLHttpRequest();
    req.open(method, `${url}/${path}`);
    req.responseType = type;
    req.addEventListener('load', (event) => {
        const target = event.target;
        
        onSuccess(target.response);
    });

    req.send();
}