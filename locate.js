const posx = [150, 300, 450, 600, 750];
const posy = [50, 110, 170, 230, 290];//+30 +45 +15

class Marks{
    constructor(k, flg, d, i1, i2, iflg){
        this.kind = k;
        this.nflg = flg; // 1 NOT
        this.dim = d;
        //A-Z 入力　/ 数字　素子番号
        this.i1 = i1;
        this.i2 = i2;
        if(k === 0){//AND
            this.i1x = this.i2x= 0;
            this.ox = (flg ? 83 : 73);
        }
        else{//OR XOR
            this.i1x = this.i2x = 8;
            this.ox = (flg ? 80 : 70);
        }
        //1 NOT
        this.iflg1 = Math.trunc(iflg / 2); 
        if(this.iflg1) this.i1x -= 10;
        this.iflg2 = iflg % 2;
        if(this.iflg2) this.i2x -= 10;
    }

    locate(k, l){
        let x = posx[this.dim], y = posy[k] + l;
        this.k = k;
        this.x = x;
        this.i1x += x;
        this.i2x += x;
        this.ox += x;
        this.i1y = y + 10;
        this.i2y = y + 40;
        this.oy = y + 25;
    }

    setd(n){
        if(this.todim === undefined) this.todim = n;
        else this.todim = Math.max(this.todim, n);
    }
};

function next_permutation(arr){
    let i = arr.length - 2;
    while(i >= 0 && arr[i] >= arr[i + 1]) i--;
    if(i < 0) return false;
    
    let j = arr.length - 1;
    while(j >= 0 && arr[j] <= arr[i]) j--;

    [arr[i], arr[j]] = [arr[j], arr[i]];

    let l = i + 1, r = arr.length - 1;
    while(l < r){
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++; r--;
    }
    return true;
}

const iposy = [65, 95, 125, 155, 185, 215, 245, 275, 305, 335];

export function locate(str){
    let st = [];
    let isnot = [];
    let mr = [];
    let s = new Set();
    let dim = Array.from({length : 5}, () => Array());
    for(let i = 1, k, m = 0; str[i] != '='; i++){
        switch(str[i]){
            case '*': k = 0; break;
            case '+': k = 1; break;
            case '^': k = 2; break;
            case '!': k = -1; break;
            default: k = -2;
        }
        if(k >= 0){
            let flg = 0, i1, i2, p = st.length - 1, d = 0, f;
            if(str[i + 1] === '!'){
                flg = 1;
                i++;
            }
            i1 = st[p - 1];
            i2 = st[p];
            if(!Number.isNaN(st[p - 1] - 0)){
                i1 = st[p - 1] - 0;
                if(mr.length > i1) d =  mr[i1].dim + 1;
            }
            if(!Number.isNaN(st[p] - 0)){
                i2 = st[p] - 0;
                if(mr.length > i2) d =  Math.max(mr[i2].dim + 1, d);
            }
            if(!Number.isNaN(i1 - 0)) mr[i1].setd(d);
            if(!Number.isNaN(i2 - 0)) mr[i2].setd(d);
            f = isnot[p - 1] * 2 + isnot[p];
            mr.push(new Marks(k, flg, d, i1, i2, f));
            st.pop();
            st.pop();
            isnot.pop();
            isnot.pop();
            isnot.push(0);
            dim[d].push(m);
            st.push(m++);
            continue;
        }
        if(k === -1) {
            isnot.push((isnot.pop() + 1) % 2);
        }
        else {
            isnot.push(0);
            st.push(str[i]);
            s.add(str[i]);
        }
    }
    const t = [...s].sort();
    const m = {};
    for(let i = 0; i < t.length; i++){
        m[t[i]] = i;
    }
    const flg = Array(t.length).fill(true);
    let at = Array.from({length : 5}, () => Array(5).fill(0));
    for(let i = 4, tmp = Array(5).fill(0); i >= 0; i--){
        at[i] = structuredClone(tmp);
        if(i === 0) break;
        for(const j of dim[i]){
            if(Number.isNaN(mr[j].i1 - 0) && flg[m[mr[j].i1]]){
                flg[m[mr[j].i1]] = false;
                if(m[mr[j].i1] % 2 === 0){
                    tmp[m[mr[j].i1] / 2] = 15;
                    if(m[mr[j].i1] > 0) {
                        if(tmp[m[mr[j].i1] / 2 - 1] > 15) tmp[m[mr[j].i1] / 2 - 1] = 50;
                        else if(tmp[m[mr[j].i1] / 2 - 1]) tmp[m[mr[j].i1] / 2 - 1] = -16;
                        else tmp[m[mr[j].i1] / 2 - 1] = -1;
                    }
                }
                else tmp[(m[mr[j].i1] - 1) / 2] = 50;
            }
            if(Number.isNaN(mr[j].i2 - 0) && flg[m[mr[j].i2]]){
                flg[m[mr[j].i2]] = false;
                if(m[mr[j].i2] % 2 === 0){
                    tmp[m[mr[j].i2] / 2] = 15;
                    if(m[mr[j].i2] > 0) {
                        if(tmp[m[mr[j].i2] / 2 - 1] > 15) tmp[m[mr[j].i2] / 2 - 1] = 50;
                        else if(tmp[m[mr[j].i2] / 2 - 1]) tmp[m[mr[j].i2] / 2 - 1] = -16;
                        else tmp[m[mr[j].i2] / 2 - 1] = -1;
                    }
                }
                else tmp[(m[mr[j].i2] - 1) / 2] = 50;
            }
        }
    }
    let linef = Array.from({length : 5}, () => Array(5 * 4).fill(true));
    for(let i = 0; i < 5; i++){
        let tmp, mx = -1;
        do{
            const a = structuredClone(at[i]);
            const loc = {};
            let tm = 0, n;
            for(const j of dim[i]){
                n = 0;
                for(let k = 0; k < 5; k++){
                    if(a[k] < 0){
                        let l = -a[k] - 1, cnt;
                        if(!linef[i][k * 4 + l / 15]) continue;
                        cnt = 0;
                        if(Number.isNaN(mr[j].i1 - 0)){
                            if(iposy[m[mr[j].i1]] - 5 === posy[k] + l + 10) {
                                cnt++;
                            }
                        }else{
                            if(mr[mr[j].i1].oy === posy[k] + l + 10) cnt++;
                        }
                        if(Number.isNaN(mr[j].i2 - 0)){
                            if(iposy[m[mr[j].i2]] - 5 === posy[k] + l + 40) {
                                cnt++;
                            }
                        }else{
                            if(mr[mr[j].i2].oy === posy[k] + l + 40) cnt++;
                        }
                        if(n < cnt || loc[j] === undefined){
                            loc[j] = [k, l];
                            n = cnt;
                        }
                    }
                    else{
                        for(let l = a[k], cnt; l <= 45; l += 15){
                            if(!linef[i][k * 4 + l / 15]) continue;
                            cnt = 0;
                            if(Number.isNaN(mr[j].i1 - 0)){
                                if(iposy[m[mr[j].i1]] - 5 === posy[k] + l + 10) {
                                    cnt++;
                                }
                            }else{
                                if(mr[mr[j].i1].oy === posy[k] + l + 10) cnt++;
                            }
                            if(Number.isNaN(mr[j].i2 - 0)){
                                if(iposy[m[mr[j].i2]] - 5 === posy[k] + l + 40) {
                                    cnt++;
                                }
                            }else{
                            if(mr[mr[j].i2].oy === posy[k] + l + 40) cnt++;
                            }
                            if(n < cnt || loc[j] === undefined){
                                loc[j] = [k, l];
                                n = cnt;
                            }
                        }
                    } 
                    if(n === 2) break;
                }
                let k = loc[j][0], l = loc[j][1];
                a[k] = 50;
                if(k < 4) a[k + 1] = Math.max(a[k + 1], l);
                if(l === 0 && k > 0 && a[k - 1] === 0) a[k - 1] = -1;
                tm += n;
            }
            if(mx < tm){
                mx = tm;
                tmp = structuredClone(loc);
            }
        }while(next_permutation(dim[i]));
        for(const j of dim[i]){
            let k = tmp[j][0], l = tmp[j][1];
            mr[j].locate(k, l);
            if(mr[j].todim > i + 1){
                for(let a = i + 1, t; a < mr[j].todim; a++){
                    t = k * 4 + l / 15 - 1;
                    for(let b = t; b < 20 && b <= t + 2; b++){
                        if(b >= 0) linef[a][b] = false;
                    }
                }
            }
        }
    }
    return {
        outc: str[0],
        marks: mr,
        mdims: dim,
        chars: m
    };
}