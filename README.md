# origo-urlmarker
Url marker plugin for Origo

Minified and compressed versions of the files are available [here](https://nightly.link/Kristianstad/origo-urlmarker/workflows/build-compress/main/urlmarker-compressed-assets.zip).

Needs:
```
const urlParams = new URLSearchParams(window.location.search);
const hashParams = new URLSearchParams(window.location.hash.slice(1));
function getUrlParam(param) {
  return urlParams.get(param) ?? hashParams.get(param);
}
```

Then initialize with:
```
origo.on('load', urlmarker());
```

Lägger till en eller flera markers i kartan utefter givna url-parametrar. Url-parametrar som kan ges är xyi&lt;nummer&gt;=&lt;x-koordinat&gt;,&lt;y-koordinat&gt;,&lt;infotext&gt; (tex. xyi1=14.1529,56.0354,txt1&amp;xyi2=14.2529,56.1354,p2). Det finns även några legacy-parametrar, xym och diainfo (tex. xym=14.0953039,56.0017954&amp;diainfo=Vä%20bibliotek). Koordinater anges i EPSG:4326 eller EPSG:3008. Sätter man bara ut en marker kommer denna att visas med info-popup om man inte även anger parametern hideSearchInfo=true. Urlmarker kan kombineras med pluginet urlzoomtolayer (ange zoomToLayer=markerLayer), men då måste urlzoomtolayer läggas efter urlmarker i plugins-listan.

[https://kartor.kristianstad.se/kristianstadskartan/?xyi1=14.1529,56.0354,txt1&xyi2=14.2529,56.1354,p2](https://kartor.kristianstad.se/kristianstadskartan/?xyi1=14.1529,56.0354,txt1&xyi2=14.2529,56.1354,p2)
