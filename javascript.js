// open weather API
// selector
const container = document.querySelector(".container")
const input = document.querySelector("input")
const locationButton = document.querySelector(".location-btn")
const backButton = document.querySelector(".back-btn")
const firstPage = document.querySelector("#first-page")
const alert = document.querySelector(".alert")
const secondPage = document.querySelector("#second-page")


// addEventListener
input.addEventListener("keyup",(e) => {
    if(e.key === "Enter"&& input.value !==""){
        let cityName = input.value
        infoLoader(cityName)
    }
})
function infoLoader(name) {
    alert.innerHTML = "getting weather details..."
    alert.classList.add("pending")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5e5c067464735952de224143ff0e83e9`)
    .then(response => response.json())
    .then(infoObject =>{
        if(infoObject.cod === 200){
            console.log(infoObject)
            renderInfo(infoObject)
            firstPage.classList.add("deactive")
            secondPage.classList.add("active")
            backButton.classList.add("active")
        }
        if(infoObject.cod === '404'){
            alert.innerHTML = "please enter a valid city name!"
            alert.classList.remove("pending")
            alert.classList.add("error")
        }
    })
}
function renderInfo(info){
    function imgChecker(id){
        if(id >= 200 && id <= 232){
            return "/Weather Icons/storm.svg"
        }
        if(id > 800 && id <= 804){
            return "/Weather Icons/cloud.svg"
        }
        if(id == 800){
            return "/Weather Icons/clear.svg"
        }
        if(id >= 600 && id <=622){
            return "/Weather Icons/snow.svg"
        }
        if(id >= 500 && id <=531){
            return "/Weather Icons/rain.svg"
        }
        if(id == 721){
            return "/Weather Icons/haze.svg"
        }

    }
    let html = `<img src="${imgChecker(info.weather[0].id)}" alt="">
    <div class="temperature">
        <p><span class="degree">${Math.round(info.main.temp-273)}</span><span>°c</span></p>
    </div>
    <p class="status">${info.weather[0].description}</p>
    <div class="city-name">
        <i class="uil uil-map-marker"></i>
        <p class="city-name" id=${info.id}>${info.name},${info.sys.country}</p>
    </div>
    <div class="details">
        <div class="feels-like">
            <i class="uil uil-temperature-half"></i>
            <div class="feels-info">
                <p><span class="feels-degree">${Math.round(info.main.feels_like-273)}</span><span>°c</span></p>
                <p>feels like</p>
            </div>
        </div>
        <div class="humidity">
            <i class="uil uil-tear"></i>
            <div class="humidity-info">
                <p class="humidity-number">${info.main.humidity}%</p>
                <p>humidity</p>
            </div>
        </div>
    </div>`
    secondPage.innerHTML = html
}
backButton.addEventListener('click',(e) =>{
    firstPage.classList.remove("deactive")
    secondPage.classList.remove("active")
    backButton.classList.remove("active")
    input.value = ""
    alert.classList.remove("pending")
    alert.classList.remove("error")

})

// get user location with geolocation object and then show city info
locationButton.addEventListener('click',(e) =>{
    alert.classList.add("pending")
    alert.innerHTML = "getting weather details..."
    navigator.geolocation.getCurrentPosition((position) =>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=5e5c067464735952de224143ff0e83e9`)
        .then(response =>response.json())
        .then(infoObject =>{
            if(infoObject.cod === 200){
                console.log(infoObject)
                renderInfo(infoObject)
                firstPage.classList.add("deactive")
                secondPage.classList.add("active")
                backButton.classList.add("active")
            }
            if(infoObject.cod === '404'){
                alert.innerHTML = "please enter a valid city name!"
                alert.classList.remove("pending")
                alert.classList.add("error")
            }
        })
    })
    
    

})