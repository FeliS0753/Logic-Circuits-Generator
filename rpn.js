
const isalpha = (str) => /^[a-zA-Z]$/.test(str);
function pri(c, st = 0) {
	if (isalpha(c)) return 10;
    let r;
	switch (c) {
		case '(': r = 9 - 8 * st; break;
		case ')': r = 1; break;
		case '=': r = 3; break;
		case '^':
		case '*': r = 6 + st; break;
		case '+': r = 4 + st; break;
		case '!': r = 8; break;
		default: r = 0;
	}
	return r;
}

export function toRpn(str) {
	str += "$";
	let rpn = "", i = 0, cn, sn;
	const st = ['$'];
	if(!isalpha(str[0]) || str[1] !== '=') return 2;
	while (true) {
		cn = pri(str[i]);
		sn = pri(st[st.length - 1], 1);
		if (cn == 0 && sn == 0) break;
		if (cn == 0 && sn == 1) return 1;
		if (cn > sn) {
			st.push(str[i++]);
		} else if (cn < sn) {
			rpn += st.pop();
		} else {
			st.pop();
			i++;
		}
	}
	return rpn;
}
