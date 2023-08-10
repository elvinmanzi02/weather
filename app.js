document.addEventListener("DOMContentLoaded", () => {

const city = document.querySelector("#city");
const celciusBtn = document.querySelector("#celciusBtn");
const fahneitBtn = document.querySelector("#fahneitBtn");

city.value = "Kigali";

async function getWeather() {

    let inputValue = city.value;
    let location = inputValue;


    let output = document.querySelector(".output");
    output.classList.add("outputOnclick");


    try {

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7302873955924156a9d151922230908&q=${location}&aqi=yes`, { mode: 'cors' });
        const data = await response.json();

        const imgDescription = data.current.condition.text;
        const imgUrl = data.current.condition.icon;
        const time = data.location.localtime;
        const humidity = data.current.humidity;
        const pressure = data.current.pressure_in;
        const wind = data.current.wind_degree;
        const mainElement = document.querySelector("main");
        mainElement.style.backgroundImage = `url(${imgUrl})`;
        mainElement.style.backgroundPosition = "center";
        mainElement.style.backgroundSize = "50px";
        console.log(data);
        


        const locationElement = document.querySelector(".location");
        const upperLocation = location[0].toUpperCase() + location.slice(1);
        
        locationElement.innerHTML =  `<b>${upperLocation}<b>`;

        document.querySelector(".humidityDisplay").innerHTML = `Humidity: ${humidity}<b>%</b>  /`;
        document.querySelector(".pressureDisplay").innerHTML = ` Pressure: ${pressure}<b>inHg</b>  /`;
        document.querySelector(".windDisplay").innerHTML = `  Wind: ${wind}<b>&#176</b>`;
  


        const localTime = document.querySelector(".time");
        localTime.textContent  = `${time}`;

        const descriptionElement = document.querySelector(".imgDescription");
        descriptionElement.innerHTML = `It is ${imgDescription}!<br> <br>`;

        const celciusElement = document.querySelector(".celcius");
        celciusElement.classList.add("degree");
        const celcius = data.current.temp_c;
        const fahrenheit = data.current.temp_f;
        celciusElement.innerHTML = `<p style = "font-size : 80px ; color : red ; padding : 0px ; margin : 0px">${celcius}</p>&#176;C`;

        celciusBtn.addEventListener("click", () => {
            celciusElement.innerHTML = `<p style = "font-size : 80px ; color : red ; padding : 0px ; margin : 0px">${celcius}</p> &#176;C`;
        })

        fahneitBtn.addEventListener("click", () => {
            celciusElement.innerHTML = `<p style = "font-size : 80px; color : red ; padding : 0px ; margin : 0px">${fahrenheit}</p> &#176;F`;
        })

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
