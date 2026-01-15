# origo-urlmarker
Url marker plugin for Origo

Minified and compressed versions of the files are available [here](https://nightly.link/Kristianstad/origo-urlmarker/workflows/build-compress/main/urlmarker-compressed-assets.zip).

Initialize with:
`origo.on('load', urlmarker());`

Lägger till en eller flera markers i kartan utefter givna url-parametrar. Url-parametrar som kan ges är xyi<nummer>=<x-koordinat>,<y-koordinat>,<infotext> (tex. xyi1=14.1529,56.0354,txt1&xyi2=14.2529,56.1354,p2). Det finns även några legacy-parametrar, xym och diainfo (tex. xym=14.0953039,56.0017954&diainfo=Vä%20bibliotek). Koordinater anges i EPSG:4326 eller EPSG:3008. Sätter man bara ut en marker kommer denna att visas med info-popup om man inte även anger parametern hideSearchInfo=true. Urlmarker kan kombineras med pluginet urlzoomtolayer (ange zoomToLayer=markerLayer), men då måste urlzoomtolayer läggas efter urlmarker i plugins-listan.
