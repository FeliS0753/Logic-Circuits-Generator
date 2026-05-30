import "./header.css";

export default function Header(){
  const scrollToSection = (e, id)=>{
    e.preventDefault();

    const element = document.getElementById(id);
    if(element){
      element.scrollIntoView();
    }
  }

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
        <a href="#how-to-use" onClick={(e)=>scrollToSection(e, "how-to-use")}>使い方</a>
        <a href="#sample" onClick={(e)=>scrollToSection(e, "sample")}>サンプル</a>
      </nav>
    </header>
  );
}