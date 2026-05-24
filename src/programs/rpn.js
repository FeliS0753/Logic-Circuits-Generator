
const isalpha = (str) => /^[a-zA-Z]$/.test(str);
let countAlpha, countMark;

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
		case '$': r = 0; break;
		default: r = -1;
	}
	return r;
}

export function toRpn(str) {
	if(!Number.isNaN(str - 0)) return str;
	countAlpha = countMark = 0;
	str += "$";
	let rpn = "", i = 0, cn, sn;
	const st = ['$'];
	if(!isalpha(str[0]) || str[1] !== '=') return 2;
	while (true) {
		cn = pri(str[i]);
		sn = pri(st[st.length - 1], 1);
		if(cn === -1 || sn === -1) return 4;
		if (cn === 0 && sn === 0) break;
		if (cn === 0 && sn === 1) return 1;
		if (cn > sn) {
			st.push(str[i++]);
		} else if (cn < sn) {
			if(sn === 10) countAlpha++;
			else if(sn !== 8) countMark++;
			rpn += st.pop();
		} else {
			if(cn === 10) countAlpha++;
			st.pop();
			i++;
		}
	}
	if(countAlpha > countMark + 1) return 6;
	else if(countAlpha < countMark + 1) return 5;
	return rpn;
}
