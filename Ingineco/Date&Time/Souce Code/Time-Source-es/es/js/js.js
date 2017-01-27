$('#date-time').hide();
$('#liveclock').hide();
$('#location').hide();
$('#loading').show();




function setText(e, t) {
	10 > t && (t = "0" + t), document.getElementById(e).innerHTML = t	
}
var request = new XMLHttpRequest;
request.open("GET", "https://www.wylog.com/ingenico/ws/weather/index.php/iploc/iplocation", !0), request.send(), request.onload = function () {

$('#loading').delay(400).fadeOut(400);

$('#date-time').delay(1000).show(500);
$('#liveclock').delay(900).show(500);
$('#location').delay(800).show(500);


	var e = JSON.parse(request.responseText);
	document.getElementById("stage1").innerHTML = e.time_zone, 
	document.getElementById("stage2").innerHTML = e.country_name;
	var t = e.time,
		n = t.split(":");

	setInterval(function () {

		n[2]++,
		r = (1 * n[0] + 1 * n[1] / 60) / 12 * 360, 
		a = 1 * n[1] / 60 * 360, 
		i = n[2] / 60 * 360, 60 == n[2] && (n[2] = 0, 
		n[1]++), 60 == n[1] && (n[1] = "00", n[0]++), 
		24 == n[0] && (n[0] = "00"), $hands.filter(".hour").css({
			transform: "rotate(" + r + "deg)"
		}), $hands.filter(".minute").css({
			transform: "rotate(" + a + "deg)"
		}), $hands.filter(".second").css({
			transform: "rotate(" + i + "deg)"
		});

		var t = new Date(e.date + " " + e.time),
			r = new Array;
		r[0] = "Enero", r[1] = "Febrero", r[2] = "Marzo", r[3] = "April", r[4] = "Mayo", r[5] = "Junio", r[6] = "Julio", r[7] = "Agosto", r[8] = "Septiembre", r[9] = "Octubre", r[10] = "Noviembre", r[11] = "Diciembre";
		var a = new Date(e.date + " " + e.time),
			i = r[a.getMonth()],
			o = new Array(7);
		o[0] = "Domingo", o[1] = "Lunes", o[2] = "Martes", o[3] = "Miércoles", o[4] = "Jueves", o[5] = "Viernes", o[6] = "Sábado";
		var s = o[a.getDay()],
			d = i + ", " + t.getDate(e.date + " " + e.time) + "  " + s;
		document.getElementById("currentDate").innerHTML = d, document.getElementById("hr").innerHTML = n[0], document.getElementById("min").innerHTML = n[1]
	}, 1e3)
};
var $hands = $("#liveclock div.hand");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
	setTimeout(e, 60)
};

