console.log('hello from site');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = "data.location";
    messageOne.textContent = "data.location";
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        let jsondata = response.json();
        console.log(jsondata);

        jsondata.then((data) => {
            console.log(data);
            if (data.error) {
                console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast ;
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    })

    

    console.log(location);
})