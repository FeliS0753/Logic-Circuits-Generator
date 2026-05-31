import {useEffect, useState, useRef} from "react";
import {toRpn, TeXtostr, locate} from "./index";
import "./mathfield.css";

export default function Math_field({ setObject }){
    const mfref = useRef(null);
    const [errors, setErrors] = useState(0);

    useEffect(()=>{
        const r1 = "QWERTYUIOP".split(""), r2 = "ASDFGHJKL".split(""), r3 = "ZXCVBNM".split("");
        const mf = mfref.current;
        if(!mf) return;

        mf.inlineShortcuts = {
            "*": "\\cdot",
            "^": "\\oplus",
            "!": "\\overline{#?}"
        }

        mf.smartFence = false;
        mf.smartMode = false;

        window.mathVirtualKeyboard.layouts = [
            {
                label: "ABC",
                rows:[
                    [
                    {label: "+", insert: "+"},
                    {latex: "\\cdot", insert: "\\cdot"},
                    {latex: "\\oplus", insert: "\\oplus"},
                    {latex: "\\overline{\\Box}", insert: "\\overline{#?}"},
                    {label: "(", insert: "("},
                    {label: ")", insert: ")"},
                    {label: "=", insert: "="},
                    {label: "<", command: ['moveToPreviousChar']},
                    {label: ">", command: ['moveToNextChar']},
                    {label: "⌫", command: ['deleteBackward']},
                    {label: "Clear", command: ['deleteAll']}
                    ],
                    [
                    ...r1.map(i => {return {label: i, insert: i};})
                    ],
                    [
                    ...r2.map(i => {return {label: i, insert: i};})
                    ],
                    [
                    ...r3.map(i => {return {label: i, insert: i};})
                    ],
                ]
            },
            {
                label: "abc",
                rows:[
                    [
                    {label: "+", insert: "+"},
                    {latex: "\\cdot", insert: "\\cdot"},
                    {latex: "\\oplus", insert: "\\oplus"},
                    {latex: "\\overline{\\Box}", insert: "\\overline{#?}"},
                    {label: "(", insert: "("},
                    {label: ")", insert: ")"},
                    {label: "=", insert: "="},
                    {label: "<", command: ['moveToPreviousChar']},
                    {label: ">", command: ['moveToNextChar']},
                    {label: "⌫", command: ['deleteBackward']},
                    {label: "Clear", command: ['deleteAll']}
                    ],
                    [
                    ...r1.map(i => { i = i.toLowerCase(); return {label: i, insert: i};})
                    ],
                    [
                    ...r2.map(i => { i = i.toLowerCase(); return {label: i, insert: i};})
                    ],
                    [
                    ...r3.map(i => { i = i.toLowerCase(); return {label: i, insert: i};})
                    ],
                ]
            }
        ];
    }, []);

    const handleKeyUp = () =>{
        const mf = mfref.current;
        if(!mf) return;
        mf.executeCommand("hideVirtualKeyboard");

        let str = toRpn(TeXtostr(mf.value)), data = {};
        if(Number.isNaN(str - 0)) data = locate(str);
        else {
            switch(str){
                case 1: setErrors(1); break;
                case 2: setErrors(2); break;
                case 3:
                case 4: setErrors(3); break;
                case 5: setErrors(4); break;
                case 6: setErrors(5); break;
                case 7: setErrors(6); break;
                default:;
            }
            return;
        }
        setErrors(0);
        setObject(data);
    };

    return (
        <div className='mf-container'>
            <math-field 
                ref={mfref}
                placeholder="式を入力する"
                onKeyUp={(e) =>{
                    if(e.key === "Enter") handleKeyUp();
                }}
            />
            <button type="button" onClick={handleKeyUp} className='generate-button'>生成</button>

            {errors === 1 && <p>( )の付け方が不正です。</p>}
            {errors === 2 && <p>(論理変数=)の形で始めてください。</p>}
            {errors === 3 && <p>未定義の演算子が入力されました。</p>}
            {errors === 4 && <p>演算子を挿入する場所が正しくありません。</p>}
            {errors === 5 && <p>論理変数は一文字にしてください。</p>}
            {errors === 6 && <p>式を入力してください。</p>}
        </div>
    );
}