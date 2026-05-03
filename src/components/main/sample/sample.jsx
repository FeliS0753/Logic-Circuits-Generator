import { InlineMath } from "react-katex";
import "./sample.css";

export default function Sample(){
    return (
        <section id="sample">
            <h3>サンプル</h3>
            出力例をいくつか紹介します。
            <div className='pictures'>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math="Z=A"/>
                    </div>
                    <img src="/src/assets/sample0.png" alt="出力例1" />
                </div>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math="Z=\overline{\overline{A\cdot A}\cdot \overline{B\cdot B}}"/>
                    </div>
                    <img src="/src/assets/sample1.png" alt="出力例2" />
                </div>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math="Z=\overline{\overline{A}+\overline{B}\cdot C}+\overline{B}\oplus(A+C)"/>
                    </div>
                    <img src="/src/assets/sample2.png" alt="出力例3" />
                </div>
                <div className='picture'>
                    <div className='pic-title'>
                        <InlineMath math="Z=A+B\cdot C+\overline{A\cdot B + D}\cdot E"/>
                    </div>
                    <img src="/src/assets/sample3.png" alt="出力例4" />
                </div>
            </div>
        </section>
    );
}