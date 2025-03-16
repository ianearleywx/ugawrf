const products = {"temperature": "2m Temperature", "dewp": "2m Dewpoint", "comp_reflectivity": "Composite Reflectivity", "wind": "10m Wind", "pressure": "MSLP", "cape": "CAPE", "cape_mu": "CAPE (Most Unstable)", "helicity": "Helicity", "total_precip": "Total Precipitation", "snowfall": "Snowfall", "echo_tops": "Echo Tops"};
const productSelector = document.getElementById('productSelector');
for (key in products) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = products[key];
    productSelector.appendChild(option);
}

const slider = document.getElementById('timeSlider');
const weatherImage = document.getElementById('weatherImage');
const timeLabel = document.getElementById('timeLabel');
const textForecast = document.getElementById('textForecast');
const sahn = document.getElementById('sahn');
const satl = document.getElementById('satl');
const sffc = document.getElementById('sffc');
const smcn = document.getElementById('smcn');
const srmg = document.getElementById('srmg');
const scsg = document.getElementById('scsg');
function updateImage() {
    const run = document.getElementById('runSelector').value;
    const product = productSelector.value;
    const timestep = slider.value;
    timeLabel.textContent = `Hour ${timestep}/24`;
    weatherImage.src = `runs/${run}/${product}/hour_${timestep}.png`;
    sahn.src = `runs/${run}/skewt/ahn/hour_${timestep}.png`;
    satl.src = `runs/${run}/skewt/atl/hour_${timestep}.png`;
    sffc.src = `runs/${run}/skewt/ffc/hour_${timestep}.png`;
    smcn.src = `runs/${run}/skewt/mcn/hour_${timestep}.png`;
    srmg.src = `runs/${run}/skewt/rmg/hour_${timestep}.png`;
    scsg.src = `runs/${run}/skewt/csg/hour_${timestep}.png`;
}
function updateTextForecast() {
    const textSelector = document.getElementById('textSelector').value;
    const run = document.getElementById('runSelector').value;
    fetch(`runs/${run}/text/${textSelector}/forecast.txt`)
    .then(response => response.text())
    .then((data) => {
        textForecast.textContent = data
      })
}
slider.addEventListener('input', updateImage);
productSelector.addEventListener('change', updateImage);
document.getElementById('runSelector').addEventListener('change', updateImage);
document.getElementById('textSelector').addEventListener('change', updateTextForecast)
updateImage();
updateTextForecast();

document.getElementById('weatherImage').addEventListener('click', function() {
    document.getElementById('timeSlider').focus();
});

