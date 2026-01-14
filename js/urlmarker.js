const xym = getUrlParam('xym');
const xyiarray=[];
if (xym != null)
{
	let diainfo = getUrlParam('diainfo');
	if (diainfo != null)
	{
		String.prototype.trimLeft = function(charlist) {
			if (charlist === undefined) {
				charlist = "\s";
			}
			return this.replace(new RegExp("^[" + charlist + "]+"), "");
		};
		String.prototype.trimRight = function(charlist) {
			if (charlist === undefined) {
				charlist = "\s";
			}
			return this.replace(new RegExp("[" + charlist + "]+$"), "");
		};
		diainfo = diainfo.trimLeft('["').trimRight('"]');
	}
	else
	{
		diainfo = "";
	}
	xyiarray.push(xym + "," + diainfo);
}
const xyi1 = getUrlParam('xyi1');
if (xyi1 != null)
{
	let n=1;
	let value;
	while (value = getUrlParam('xyi' + n))
	{
		xyiarray.push(value);
		n++;
	}
}
if (xyiarray.length > 0)
{
	origo.api().addStyle('Marker', [[
		{
			"circle": {
				"radius": 10,
				"stroke": {
					"color": "rgba(0,0,0,1)",
					"width": 2.5
				},
				"fill": {
					"color": "rgba(255,255,255,0.9)"
				}
			}
		},
		{
			"circle": {
				"radius": 2.5,
				"stroke": {
					"color": "rgba(0,0,0,0)",
					"width": 1
				},
				"fill": {
					"color": "rgba(37,129,196,1)"
				}
			}
		}
	]]);

	function printXyi(xyi)
	{
		const xyiArray=xyi.split(',');
		if (xyiArray[2]=== undefined)
		{
			xyiArray[2]='';
		}
		let jsonxy = JSON.parse("[" + xyiArray[0] + "," + xyiArray[1] + "]");
		if (xyi.charAt(2) == '.')
		{
			jsonxy = origo.api().getMapUtils().transformCoordinate(jsonxy,'EPSG:4326','EPSG:3008');
		}
		origo.api().getMap().getView().setCenter( jsonxy );
		origo.api().addMarker(jsonxy,'',xyiArray[2],{style: 'Marker'});
	}
	xyiarray.forEach(printXyi);
	const hideSearchInfo=getUrlParam('hideSearchInfo');
	if (hideSearchInfo === "true" || xyiarray.length > 1) {
		const hideTimeoutDuration = 5000;
		/* Check and hide both #o-popup and #sidebarcontainer if they exist */
		const targets = ["#o-popup", "#sidebarcontainer"];
		targets.forEach(targetElement => {
			let hideObserver = new MutationObserver((hideMutations, hideObs) => {
				const element = document.querySelector(targetElement);
				if (element) {
					element.style.display = "none";
					hideObs.disconnect();
				}
			});
			hideObserver.observe(document.body, { childList: true, subtree: true });
			setTimeout(() => {
				hideObserver.disconnect();
				if (!document.querySelector(targetElement)) {
					console.warn(`finishSearch: Target element ${targetElement} not found after ${hideTimeoutDuration}ms.`);
				}
			}, hideTimeoutDuration);
		});
	}
}
