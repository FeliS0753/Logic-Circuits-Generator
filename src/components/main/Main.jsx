import { useState, useRef, useEffect } from 'react';
import './canvas.css';
import { draw } from '/src/programs/draw.js';
import Attentions from './attentions/attentions.jsx';
import Math_field from './mathfield/mathfield.jsx';
import How_to_use from './how-to-use/how-to-use.jsx';
import Sample from './sample/sample.jsx';

function download() {
  const canvas = document.getElementById("drawer");
  let n = Number(localStorage.getItem("n") ?? 1);

  canvas.toBlob(function(blob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `circuit${n}.png`;
    link.click();

    URL.revokeObjectURL(link.href); // メモリ解放
  }, "image/png");
  localStorage.setItem("n", n + 1);
}


export default function Main() {
    const canvasRef = useRef(null);
    const [object, setObject] = useState({});

    useEffect(()=>{
        if(Object.keys(object).length === 0) return;

        const canvas = canvasRef.current;
        draw(canvas, object.outc, object.chars, object.marks, object.mdims);
    }, [object]);

    return (
        <main>
            <Attentions />

            <Math_field setObject={setObject} />
            
            <div className="canvas-container">
                <canvas id="drawer" ref={canvasRef}></canvas>
                <button type="button" onClick={download} className='download-button'>PNGでダウンロード</button>
            </div>

            <How_to_use />

            <Sample />
        </main>  
    );
}