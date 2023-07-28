const body = document.querySelector("body");
const city = document.querySelector("#city");

city.value = "kigali";


async function getWeather() { 

    let inputValue = city.value;
    let location = inputValue;

    let output = document.querySelector(".output");
    output.classList.add("outputOnclick");
    try {

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=154e5dff6dc142acbaf112503232707&q=${location}&aqi=yes`, {mode: 'cors'});
        const data = await response.json();

        console.log(data);

        const celcius = data.current.temp_c;
        const fahneit = data.current.temp_f;
        const imgDescription = data.current.condition.text;
        const imgUrl = data.current.condition.icon;

        body.style.backgroundImage = `url(${imgUrl})`;
        body.style.backgroundPosition = "center";
        body.style.backgroundSize = "cover";
        body.style.backgroundAttachment = "fixed";
        body.style.backgroundSize = "75px";
        

        output.innerHTML = `${location} <br> ${imgDescription} <br><br> Celcius: ${celcius} <br> Fahneit: ${fahneit} <br>`;
        

    } catch (error) {
        console.log("location not found", error);
        output.textContent = `'${location}' not found`;
    }
}


city.addEventListener("keypress", function(event) {
   if(event.keyCode === 13) {
       getWeather();
   }
});

document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    city.value = "";
});

