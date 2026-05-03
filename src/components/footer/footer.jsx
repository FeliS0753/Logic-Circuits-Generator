import "./footer.css";

export default function Footer(){
    return (
        <footer className="tool-footer">
            <div className="footer-left">
                <span>v1.0.0</span>
            </div>
            <div className="footer-right">
                <span>2026.5</span>
                <span className="separator">|</span>
                <span>Powered by MathLive & KaTeX</span>
            </div>
        </footer>
    );
}