const body = document.querySelector("body");
const city = document.querySelector("#city");

city.value = "Kigali";

async function getWeather() {

    let inputValue = city.value;
    let location = inputValue;


    let output = document.querySelector(".output");
    output.classList.add("outputOnclick");


    try {

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=154e5dff6dc142acbaf112503232707&q=${location}&aqi=yes`, { mode: 'cors' });
        const data = await response.json();

        const imgDescription = data.current.condition.text;
        const imgUrl = data.current.condition.icon;
        const time = data.location.localtime;

        body.style.backgroundImage = `url(${imgUrl})`;
        body.style.backgroundPosition = "center";
        body.style.backgroundSize = "cover";
        body.style.backgroundAttachment = "fixed";
        body.style.backgroundSize = "10%";

        const country = data.location.country;
        const locationElement = document.querySelector(".location");
        
        locationElement.textContent =  `${location}, ${country}`;
  


        const localTime = document.querySelector(".time");
        localTime.textContent  = time;

        const descriptionElement = document.querySelector(".imgDescription");
        descriptionElement.textContent = imgDescription;

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


document.addEventListener("DOMContentLoaded", () => {
    getWeather();  
    city.value = "";
});
