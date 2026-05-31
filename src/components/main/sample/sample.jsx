import { InlineMath } from "react-katex";
import "./sample.css";
import sample0 from '/src/assets/sample0.png';
import sample1 from '/src/assets/sample1.png';
import sample2 from '/src/assets/sample2.png';
import sample3 from '/src/assets/sample3.png';

export default function Sample(){
    const str = [
        "Z = \\overline{\\overline{A\\cdot A}\\cdot \\overline{B\\cdot B}}",
        "Z = \\overline{\\overline{A}+\\overline{B}\\cdot C}+\\overline{B}\\oplus(A+C)",
        "Z = A + B \\cdot C + \\overline{A \\cdot B + D} \\cdot E"
    ]
    return (
        <section id="sample">
            <h3>サンプル</h3>
            出力例をいくつか紹介します。
            <div className='pictures'>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math="Z=A"/>
                    </div>
                    <img src={sample0} alt="出力例1" />
                </div>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math={str[0]}/>
                    </div>
                    <img src={sample1} alt="出力例2" />
                </div>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math={str[1]}/>
                    </div>
                    <img src={sample2} alt="出力例3" />
                </div>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math={str[2]}/>
                    </div>
                    <img src={sample3} alt="出力例4" />
                </div>
            </div>
        </section>
    );
}