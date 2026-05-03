const isalpha = (str) => /^[a-z]$/.test(str);

export function TeXtostr(str){
    if(str.length === 0) return 7;
    let ret = "";
    for(let i = 0; i < str.length; i++){
        if(str[i] === "{") ret += "(";
        else if(str[i] === "}") ret += ")";
        else if(str[i] === "\\"){
            switch(str[i + 2]){
                case "d": ret += "*"; i += 4; break;
                case "p": ret += "^"; i += 5; break;
                case "v": ret += "!"; i += 8; break;
                default: return 3;
            }
        }else if(str[i] !== " "){
            ret += str[i];
        }
    }
    return ret;
}