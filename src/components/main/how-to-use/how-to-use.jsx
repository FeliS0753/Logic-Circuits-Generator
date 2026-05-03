import { InlineMath } from "react-katex";
import "./how-to-use.css";

export default function How_to_use(){
    return (
        <section id="how-to-use">
            <h3>使い方</h3>
            <ol className='how-to-list'>
                <li>
                    入力欄への論理式の入力を下記のいずれかの方法で行ってください。
                    <ul>
                        <li>入力欄横のキーボードマークを押し、画面上の仮想キーボードから入力をする。</li>
                        <li>論理式に対応するキー(下表参照)を、パソコンのキーボードから直接入力する。</li>
                        <li>論理式に対応した<InlineMath math={"\\LaTeX"}/>の数式入力(下表参照)を、入力欄にペーストする。</li>
                    </ul>
                </li>
                <li>Enterを押すと論理回路図が生成されます。</li>
                <li>"PNGでダウンロード" を押すと、PNG画像として回路図をダウンロードできます。</li>
            </ol>
            演算子の優先度、<InlineMath math={"\\LaTeX"}/>との対応は以下の通りです。「式」には論理式を入れてください。
            <table className="formula-table">
                <thead>
                    <tr>
                        <th>演算</th>
                        <th>仮想キーボードでの表記</th>
                        <th>対応するキー</th>
                        <th><InlineMath math={"\\LaTeX"} /></th>
                        <th>優先度</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>OR</td>
                        <td>+</td>
                        <td><kbd>Shift</kbd> + <kbd>;</kbd></td>
                        <td><code className="latex-command">+</code></td>
                        <td className="priority-cell">1</td>
                    </tr>
                    <tr>
                        <td>AND</td>
                        <td><InlineMath math="\cdot" /></td>
                        <td><kbd>Shift</kbd> + <kbd>:</kbd></td>
                        <td><code className="latex-command">\cdot</code></td>
                        <td className="priority-cell">2</td>
                    </tr>
                    <tr>
                        <td>XOR</td>
                        <td><InlineMath math={"\\oplus"} /></td>
                        <td><kbd>^</kbd></td>
                        <td><code className="latex-command">\oplus</code></td>
                        <td className="priority-cell">2</td>
                    </tr>
                    <tr>
                        <td>NOT</td>
                        <td><InlineMath math={"\\overline{\\Box}"} /></td>
                        <td><kbd>Shift</kbd> + <kbd>1</kbd></td>
                        <td><code className="latex-command">\overline{ '{' }式{ '}' }</code></td>
                        <td className="priority-cell">3</td>
                    </tr>
                    <tr>
                        <td>()</td>
                        <td>( )</td>
                        <td><kbd>Shift</kbd> + <kbd>8</kbd>, <kbd>Shift</kbd> + <kbd>9</kbd></td>
                        <td><code className="latex-command">(式)</code></td>
                        <td className="priority-cell">4</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}