document.addEventListener("DOMContentLoaded", function () {
    const lightTheme = document.querySelector(".input__check");
    const root = document.documentElement;
  
    lightTheme.addEventListener("change", function () {
      if (lightTheme.checked) {
        changeToDark(root);
      } else {
        changeToLight(root);
      }
    });
    changeToDark(root);
    lightTheme.checked = true;
  
    window.onscroll = function () {
      stickyNav();
    };
  
    var navbar = document.querySelector("nav");
    var sticky = navbar.offsetTop;
  
    function stickyNav() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  
    var navLinks = document.querySelectorAll(".navigation a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var targetId = link.getAttribute("href").substring(1);
        document.getElementById(targetId).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  });
  
  function changeToDark(root) {
    root.style.setProperty("--main-color", "#1b262c");
    root.style.setProperty("--focus-color", "lightblue");
    root.style.setProperty("--text-color", "#ffffff");
    root.style.setProperty(
      "--h1-gradient",
      "linear-gradient(to right , #b3c8ff ,#7da5ff,#467cff,#0048ff)"
    );
    root.style.setProperty(
      "--home-h1-gradient",
      "linear-gradient(91deg, #caecff 39.76%, #78cfff 86.12%)"
    );
    root.style.setProperty(
      "--slider-color",
      "linear-gradient(91deg, #caecff 39.76%, #78cfff 86.12%)"
    );
    root.style.setProperty(
      "--card-air-bgcolor",
      "linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85))"
    );
  
    root.style.setProperty("--border-color", "hsla(183, 65%, 60%, 1)");
    root.style.setProperty("--text-color-head", "#fff");
    root.style.setProperty("--card-back", "#ffffff18");
  
    var cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
      card.style.boxShadow = "none";
      card.style.transition = "none";
    });
  
    var card = document.querySelectorAll(".car");
    card.forEach(function (card) {
      card.style.boxShadow = "none";
      card.style.border = "1px solid rgba(255, 255, 255, 0.089)";
    });
  }
  
  function changeToLight(root) {
    root.style.setProperty("--main-color", "#e7e7e7e9");
    root.style.setProperty("--focus-color", "black");
    root.style.setProperty("--text-color", "#000000");
    root.style.setProperty(
      "--h1-gradient",
      "linear-gradient(to right, #03045e, #023e8a, #0077b6)"
    );
    root.style.setProperty(
      "--home-h1-gradient",
      "linear-gradient(45deg,#2403fc, #2500c3,#1e028c, #140459)"
    );
    root.style.setProperty(
      "--slider-color",
      "linear-gradient(45deg,#2403fc,#2500c3,#1e028c,#140459)"
    );
    root.style.setProperty("--card-air-bgcolor", "#ffffffc3");
  
    root.style.setProperty("--border-color", "#000000");
    root.style.setProperty("--text-color-head", "#000");
    root.style.setProperty("--card-back", "#0000000f");
  
    var cards = document.querySelectorAll(".card");
  
    cards.forEach(function (card) {
      card.style.transition = "all 0.3s ease-in-out";
    });
  
    var cards = document.querySelectorAll(".car");
    cards.forEach(function (card) {
      card.style.boxShadow = "5px 5px 6px #727272";
      card.style.border = "1px solid rgba(0, 0, 0, 0.39)";
    });
  }
  let input = document.querySelector("#input");
  let button = document.querySelector(".button");
  // Accessing temperature-related elements
  let temperatureElement = document.querySelector("#temperature");
  let minTemperatureElement = document.querySelector("#min-temperature");
  let maxTemperatureElement = document.querySelector("#max-temperature");
  
  // Accessing solar-related elements
  let solarElement = document.querySelector("#solar");
  let sunriseElement = document.querySelector("#Sunrise");
  let sunsetElement = document.querySelector("#Sunset");
  
  // Accessing location-related elements
  let locationElement = document.querySelector("#location");
  let weatherIconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  
  // Accessing wind speed-related elements
  let windSpeedElement = document.querySelector("#windspeed");
  let moonPhaseElement = document.querySelector("#moonphase");
  let pressureElement = document.querySelector("#pressure");
  
  // Accessing humidity-related elements
  let humidityElement = document.querySelector("#humidity");
  let uvIndexElement = document.querySelector("#uv");
  let visibilityElement = document.querySelector("#visibility");
  
  button.addEventListener("click", () => {
    call();
  });
  
  async function call() {
    let inputCity = input.value;
    console.log(input.value);
  
    const apiKey = "W3HKV2YHGNRNN66UGXDWXKWS9";
  
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}?unitGroup=metric&key=${apiKey}&contentType=json`
      );
  
      console.log(response.data);
      locationElement.innerHTML = response.data.address.toUpperCase();
      weatherIconElement.innerHTML = response.data.days[0].icon.toUpperCase();
      temperatureElement.innerHTML = response.data.currentConditions.temp + "°";
      minTemperatureElement.innerHTML = response.data.days[0].tempmin + "°";
      maxTemperatureElement.innerHTML = response.data.days[0].tempmax + "°";
      solarElement.innerHTML = response.data.currentConditions.solarradiation;
      sunriseElement.innerHTML = response.data.currentConditions.sunrise;
      sunsetElement.innerHTML = response.data.currentConditions.sunset;
      descriptionElement.innerHTML = `<i>"${response.data.days[0].description}"</i>`;
      windSpeedElement.innerHTML = response.data.days[0].windspeed;
      moonPhaseElement.innerHTML = response.data.currentConditions.moonphase;
      pressureElement.innerHTML =
        response.data.currentConditions.pressure + "hPa";
      humidityElement.innerHTML = response.data.currentConditions.humidity + "%";
      uvIndexElement.innerHTML = response.data.currentConditions.uvindex;
      visibilityElement.innerHTML =
        response.data.currentConditions.visibility + "km";
    } catch (err) {
      console.error(err);
    }
  }
  