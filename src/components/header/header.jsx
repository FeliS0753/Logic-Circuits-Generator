import "./header.css";

export default function Header(){
  return (
      <header>
      <div 
        className='logo-container'
        onClick={() => window.scrollTo({ top: 0})}
      >
        <img src="/logo.png" alt="ロゴ" />
        <h1 className="title">Logic Circuits Generator</h1>
      </div>
      <nav>
        <a href="#how-to-use">使い方</a>
        <a href="#sample">サンプル</a>
      </nav>
    </header>
  );
}