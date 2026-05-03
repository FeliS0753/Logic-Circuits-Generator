import "./attentions.css";
import { InlineMath } from 'react-katex';

export default function Attentions(){
    return (
        <div className="attention-card">
            <h3 className="attention-title">注意事項</h3>
            <ul className="attention-list">
                <li>出力を表す論理変数=（例: Z=）の形で始めてください。</li>
                <li>隣り合う演算子が同じ、または優先度(使い方参照)が同じ場合は左側から優先されます。</li>
                <li>出力された回路図の配線が見づらい場合がございます。</li>
                <li><code className="latex-command">\cdot</code>,
                    <code className="latex-command">\oplus</code>の後に論理変数を入れる場合は空白を入れてください。
                </li>
                <li>外部から<InlineMath math={`\\LaTeX`}/>の数式入力をペーストする際には()に
                    <code className="latex-command">\left</code>,
                    <code className="latex-command">\right</code>をつけないでください。
                </li>
                <li>論理変数は一文字で入力してください。</li>
            </ul>
        </div>
    );
}