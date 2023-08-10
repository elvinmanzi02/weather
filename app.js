document.addEventListener("DOMContentLoaded", () => {

const city = document.querySelector("#city");

city.value = "Kigali";

async function getWeather() {

    let inputValue = city.value;
    let location = inputValue;


    let output = document.querySelector(".output");
    output.classList.add("outputOnclick");


    try {

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7302873955924156a9d151922230908&q=${location}&aqi=yes`, { mode: 'cors' });
        const data = await response.json();

        const imgDescription = data.current.condition.text;
        const imgUrl = data.current.condition.icon;
        const time = data.location.localtime;
        const mainElement = document.querySelector("main");
        mainElement.style.backgroundImage = `url(${imgUrl})`;
        mainElement.style.backgroundPosition = "center";
        mainElement.style.backgroundSize = "50px";
        console.log(data);
        


        const country = data.location.country;
        const locationElement = document.querySelector(".location");
        const upperLocation = location[0].toUpperCase() + location.slice(1);
        
        locationElement.innerHTML =  `<b>${upperLocation}<b>`;
  


        const localTime = document.querySelector(".time");
        localTime.textContent  = `${time}`;

        const descriptionElement = document.querySelector(".imgDescription");
        descriptionElement.innerHTML = `It is ${imgDescription}!<br> <br>`;

        const celciusElement = document.querySelector(".celcius");
        const celcius = data.current.temp_c;
        celciusElement.innerHTML = `Celsius: ${celcius} <p style = " color : red ; padding : 0px ; margin : 0px ; width : 5px ; display : -webkit-inline-box">&#176;C </p>`;

        const fahrenheitElement = document.querySelector(".Fahneit");
        const fahrenheit = data.current.temp_f;
        fahrenheitElement.innerHTML = `Fahrenheit: ${fahrenheit} <p style = " color : red ; padding : 0px ; margin : 0px ; width : 5px ; display : -webkit-inline-box">&#176;F </p>`;

    } catch (error) {
        console.log("location not found", error);
        window.alert(`'${location}' not found,`) 
        
        };
    }


city.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        getWeather();
        city.value = "";
    }
});

const searchBtn =document.querySelector("#searchBtn");
searchBtn.addEventListener("click", () => {
    getWeather();
    city.value = "";
})

    getWeather();  
    city.value = "";
});
