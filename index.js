const source_url = getParameterByName("source_url");

if ((source_url == null) || (source_url == undefined)) {
    window.location.replace("https://outline.com/");
} else {
    showLoading();
    makeRequest();
}

function showLoading() {
    document.getElementById("loading")
        .style
        .visibility = "visible";
}

function HideLoading() {
    document.getElementById("loading")
        .style
        .visibility = "hidden";
}

function showError() {
    HideLoading();
    document.getElementById("error")
        .style
        .visibility = "visible";
}

function makeRequest() {
    const xhr = new XMLHttpRequest()
    xhr.onload = handleRequest;
    xhr.open("GET", "https://outlineapi.com/parse_article?source_url=" + source_url, true);
    xhr.send();
}

function handleRequest() {
    if (this.DONE && this.status == 200) {
        try {
            json_data = JSON.parse(this.response);
            const short_code = json_data.data.short_code;
            if (short_code != undefined) {
                window.location.replace("https://outline.com/" + short_code);
            } else {
                showError();
            }
        } catch (e) {
            showError();
        }
    }
    showError();
}

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}