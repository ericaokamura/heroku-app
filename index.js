window.onload = function() {
    var mapa = document.createElement("img");
    mapa.src = `https://www.mapquestapi.com/staticmap/v5/map?key=tM2t0S2QKRlFMmVE7uqcu6BmgkuLY0nO&center=New+York&size=360,350`;
    document.querySelector('#mapa').appendChild(mapa);
}