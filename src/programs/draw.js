
const posx = [150, 300, 450, 600, 750];
const posy = [50, 110, 170, 230, 290];//+30 +45 +15
const iposx = 50, dx = 67 / 12;
const iposy = [65, 95, 125, 155, 185, 215, 245, 275, 305, 335];

//In x, y + 10, 40 Out x + 73, y + 25
function And(ctx, x, y, flg = false){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 48, y);
    ctx.arc(x + 48, y + 25, 25, Math.PI * 1.5, Math.PI * 0.5);
    ctx.moveTo(x + 48, y + 50);
    ctx.lineTo(x, y + 50);
    ctx.lineTo(x, y);
    ctx.stroke();
    if(flg){
        ctx.beginPath();
        ctx.arc(x + 78, y + 25, 5, 0, Math.PI * 2.0);
        ctx.stroke();
    }
}

function Or(ctx, x, y, flg){//In x + 8, y + 10, 40 Out x + 70, y + 25
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 50, y - 2, x + 70, y + 25);
    ctx.quadraticCurveTo(x + 50, y + 52, x, y + 50);
    ctx.quadraticCurveTo(x + 25, y + 25, x, y);
    ctx.stroke();
    if(flg){
        ctx.beginPath();
        ctx.arc(x + 75, y + 25, 5, 0, Math.PI * 2.0);
        ctx.stroke();
    }
}

function Xor(ctx, x, y, flg){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 50, y - 2, x + 70, y + 25);
    ctx.quadraticCurveTo(x + 50, y + 52, x, y + 50);
    ctx.quadraticCurveTo(x + 25, y + 25, x, y);
    ctx.moveTo(x - 10, y);
    ctx.quadraticCurveTo(x + 15, y + 25, x - 10, y + 50);
    ctx.stroke();
    if(flg){
        ctx.beginPath();
        ctx.arc(x + 75, y + 25, 5, 0, Math.PI * 2.0);
        ctx.stroke();
    }
}

function connect(ctx, x1, y1, x2, y2, px = 0){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    if(y1 === y2) {
        ctx.lineTo(x2, y2);
    }else{
        if(px !== x1) ctx.lineTo(px, y1);
        ctx.lineTo(px, y2);
        ctx.lineTo(x2, y2);
    } 
    ctx.stroke();
}

const bufx = [2.0, 1.7, 1.3, 1.0, 0.9];
const bufy = [2.0, 1.4, 1.0, 0.9, 0.7];
const zbuf = 2.5;
export function draw (canvas, och, m, mr, dim) {
    if(canvas.getContext && och !== undefined && m !== undefined && mr !== undefined && dim !== undefined){
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio;
        canvas.width = 825 * dpr;
        canvas.height = 300 * dpr;
        let mn = (mr.length > 0) ? bufx[mr[mr.length - 1].dim] : zbuf;
        for(const i of mr){
            mn = Math.min(bufy[i.k], mn);
        }
        ctx.scale(dpr * mn, dpr * mn);//ここの倍率の調整
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "black";

        let t = 0;
        for(const i in m){
            ctx.fillText(i, iposx, iposy[m[i]]);
            t++;
        }
        if(mr.length === 0){
            connect(ctx, iposx + 15, iposy[0] - 5, iposx + 50, iposy[0] - 5);
            ctx.fillText(och, iposx + 55, iposy[0]);
            return;
        }
        for(const i of mr){
            switch(i.kind){
                case 0: And(ctx, i.x, i.i1y - 10, i.nflg); break;
                case 1: Or(ctx, i.x, i.i1y - 10, i.nflg); break;
                default: Xor(ctx, i.x, i.i1y - 10, i.nflg);
            }
        }
        //以下は残す
        const ix = Array(t).fill(iposx + 15);
        const dx = (t <= 6) ? 67 / 12 : 67 / (t + 6);
        for(let a = 0; a < dim.length; a++){
            const iyl = structuredClone(iposy);
            const iyh = structuredClone(iposy);
            for(const b of dim[a]){// bをiに
                let i = mr[b];
                let x1, y1, x2 = i.i1x, y2 = i.i1y, px;
                if(i.iflg1) {
                    ctx.beginPath();
                    if(i.kind === 0) ctx.arc(x2 + 5, y2, 5, 0, Math.PI * 2);
                    else ctx.arc(x2 + 5, y2, 5, 0, Math.PI * 2);
                    ctx.stroke();
                }
                if(Number.isNaN(i.i1 - 0)){
                    x1 = ix[m[i.i1]];
                    px = i.x - dx * (12 - (t - m[i.i1]));
                    if(iyl[m[i.i1]] - 5 < y2) {
                        y1 = iyl[m[i.i1]] - 5;
                        iyl[m[i.i1]] = y2 + 5;
                        if(x1 !== iposx + 15) {
                            ctx.beginPath();
                            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }else if(iyh[m[i.i1]] - 5 > y2) {
                        y1 = iyh[m[i.i1]] - 5;
                        iyh[m[i.i1]] = y2 + 5;
                        if(x1 !== iposx + 15) {
                            ctx.beginPath();
                            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }else {
                        y1 = y2;
                        if(x1 !== iposx + 15){
                            ctx.beginPath();
                            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    ix[m[i.i1]] = px;
                    if(a > 0 && x1 !== px && x1 !== iposx + 15) {
                        ctx.beginPath();
                        ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }else{
                    x1 = mr[i.i1].ox;
                    y1 = mr[i.i1].oy;
                    px = i.x - dx * (6 - mr[i.i1].k);
                }
                connect(ctx, x1, y1, x2, y2, px);
                x2 = i.i2x;
                y2 = i.i2y;
                if(i.iflg2) {
                    ctx.beginPath();
                    if(i.kind !== 0) ctx.arc(x2 + 5, y2, 5, 0, Math.PI * 2);
                    else ctx.arc(x2 + 5, y2, 5, 0, Math.PI * 2);
                    ctx.stroke();
                }
                if(Number.isNaN(i.i2 - 0)){
                    x1 = ix[m[i.i2]];
                    px = i.x - dx * (12 - (t - m[i.i2]));
                    if(iyl[m[i.i2]] - 5 < y2) {
                        y1 = iyl[m[i.i2]] - 5;
                        iyl[m[i.i2]] = y2 + 5;
                        if(x1 !== iposx + 15) {
                            ctx.beginPath();
                            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }else if(iyh[m[i.i2]] - 5 > y2) {
                        y1 = iyh[m[i.i2]] - 5;
                        iyh[m[i.i2]] = y2 + 5;
                        if(x1 !== iposx + 15) {
                            ctx.beginPath();
                            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }else {
                        y1 = y2;
                        if(x1 !== iposx + 15){
                            ctx.beginPath();
                            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                    ix[m[i.i2]] = px;
                    if(a > 0 && x1 !== px && x1 !== iposx + 15) {
                        ctx.beginPath();
                        ctx.arc(x1, y1, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }else{
                    x1 = mr[i.i2].ox;
                    y1 = mr[i.i2].oy;
                    px = i.x - dx * (6 - mr[i.i2].k);
                }
                connect(ctx, x1, y1, x2, y2, px);
            }
        }
        connect(ctx, mr[mr.length - 1].ox, mr[mr.length - 1].oy, mr[mr.length - 1].ox + 50, mr[mr.length - 1].oy);
        ctx.fillText(och, mr[mr.length - 1].ox + 55, mr[mr.length - 1].oy + 5);
    }
}
