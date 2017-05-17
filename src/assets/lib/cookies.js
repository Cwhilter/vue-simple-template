var Cookies = {};
Cookies.set = function(G, _, E) {
	var D = arguments, H = arguments.length, F = "2010-07-01", C = (H > 3) ? D[3]
			: "/", A = (H > 4) ? D[4] : null, Y = (H > 5) ? D[5] : false, B = E;
	if (!B) {
		B = new Date();
		B.setTime(B.getTime() + 10* 60 * 1000)
	}
	document.cookie = G + "=" + escape(_)
			+ ((F == null) ? "" : ("; expires=" + B.toGMTString()))
			+ ((C == null) ? "" : ("; path=" + C))
			+ ((A == null) ? "" : ("; domain=" + A))
			+ ((Y == true) ? "; secure" : "")
};
Cookies.get = function(B) {
	var _ = B + "=", D = _.length, C = document.cookie.length, Y = 0, A = 0;
	while (Y < C) {
		A = Y + D;
		if (document.cookie.substring(Y, A) == _)
			return Cookies.getCookieVal(A);
		Y = document.cookie.indexOf(" ", Y) + 1;
		if (Y == 0)
			break
	}
	return null
};
Cookies.clear = function(_) {
	if (Cookies.get(_)) {
		var Y = new Date();
		Y.setTime(Y.getTime() - (86400 * 1000 * 1));
		Cookies.set(_, "", Y)
	}
};
Cookies.getCookieVal = function(_) {
	var Y = document.cookie.indexOf(";", _);
	if (Y == -1)
		Y = document.cookie.length;
	return unescape(document.cookie.substring(_, Y))
};
module.exports=Cookies;