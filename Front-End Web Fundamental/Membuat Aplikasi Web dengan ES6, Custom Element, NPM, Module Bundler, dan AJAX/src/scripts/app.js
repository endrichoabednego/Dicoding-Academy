import "../style/style.css";
import './footernyaiko.js';

const xhr = new XMLHttpRequest();

xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    const deaths = response.deaths;
    const recovered = response.recovered;
    const total = response.total;
    document.getElementById('deaths').innerHTML = deaths;
    document.getElementById('total').innerHTML = total;
    document.getElementById('recovered').innerHTML = recovered;
};

xhr.onerror = () => {
    console.log("API ERROR!");
};

xhr.open("GET", "https://cjyy6irjpkrthligbgnzssapa40zimvd.lambda-url.us-east-1.on.aws/");
xhr.send();