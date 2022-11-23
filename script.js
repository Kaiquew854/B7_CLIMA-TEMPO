document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=307d2ac6165b317b6dd903c29f500d71&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                temIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                winAngle: json.wind.deg
            })
        } else {
            clearInfo();
            showWarning('não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }

});





function showInfo(json) {
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.temIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.winAngle - 90}deg)`;
    document.querySelector('.resultado').style.display = "block";
}
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = "none";
}