import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Layers, Zap, Box, Download, Video, Image as ImageIcon, ChevronRight, Menu, X, Github, ShoppingCart,
  ExternalLink, ShieldCheck, Settings, PlusSquare, Repeat, Info, BookOpen, MousePointer2, Save,
  Grid3X3, RotateCw, Eye, Type, Palette, RefreshCw, Maximize, Minimize, Play, Pause, Folder, Monitor, Sun, Moon
} from 'lucide-react';

// Import Normal Maps
import imgPerlin from '../assets/Normal/Perlin.png';
import imgBillow from '../assets/Normal/Billow.png';
import imgRidged from '../assets/Normal/RidgedMultifractal.png';
import imgCellular from '../assets/Normal/Cellular.png';
import imgVoronoi from '../assets/Normal/VeronoiF2.png';
import imgVoronoiF2F1 from '../assets/Normal/VoronoiF2MinusF1.png';
import imgMultifractal from '../assets/Normal/Multifractal.png';
import imgHybrid from '../assets/Normal/HybridMultifractal.png';
import imgHetero from '../assets/Normal/HeteroTerrain.png';
import imgChecker from '../assets/Normal/Checkerboard.png';
import imgGradLinear from '../assets/Normal/GradientLinear.png';
import imgGradRadial from '../assets/Normal/GradientRadial.png';
import imgFiber from '../assets/Normal/Fiber.png';
import imgLeather from '../assets/Normal/Leather.png';

// Import Guide Images
import imgGuide01 from '../assets/guide-01.png';
import imgGuide02 from '../assets/guide-02.png';
import imgGuide03 from '../assets/guide-03.png';
import imgGuide04 from '../assets/guide-04.png';

// --- Visual Diagram Components ---

const OctavesDiagram = () => (
  <div className="diagram-container">
    <div className="wave-sum">
      {[1, 2, 3].map(i => (
        <div key={i} className={`wave wave-${i}`}>
          <svg width="100%" height="40" viewBox="0 0 200 40">
            <path d={`M0 20 Q ${25 / i} ${20 - 20 / i}, ${50 / i} 20 T ${100 / i} 20 T ${150 / i} 20 T ${200 / i} 20`}
              fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.4 + (i * 0.2)} />
          </svg>
          <span>Octave {i}</span>
        </div>
      ))}
      <div className="wave-result">
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <path d="M0 30 Q 15 10, 30 30 T 60 45 T 90 20 T 120 35 T 150 15 T 180 40 T 200 30"
            fill="none" stroke="var(--primary)" strokeWidth="2.5" />
        </svg>
        <strong>Summed Result (Fractal)</strong>
      </div>
    </div>
  </div>
);

const PersistenceDiagram = () => (
  <div className="diagram-container">
    <div className="diagram-grid">
      <div className="diagram-item">
        <label>Low Persistence (0.3)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <path d="M0 30 Q 25 5, 50 30 T 100 30 T 150 30 T 200 30"
            fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path d="M0 30 Q 12.5 25, 25 30 T 50 30 T 75 30 T 100 30 T 125 30 T 150 30 T 175 30 T 200 30"
            fill="none" stroke="var(--primary)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">細部が弱い（滑らか）</span>
      </div>
      <div className="diagram-item">
        <label>High Persistence (0.8)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <path d="M0 30 Q 25 5, 50 30 T 100 30 T 150 30 T 200 30"
            fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path d="M0 30 Q 12.5 10, 25 30 T 50 30 T 75 30 T 100 30 T 125 30 T 150 30 T 175 30 T 200 30"
            fill="none" stroke="var(--accent)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">細部が強い（ノイズ感）</span>
      </div>
    </div>
  </div>
);

const LacunarityDiagram = () => (
  <div className="diagram-container">
    <div className="diagram-grid">
      <div className="diagram-item">
        <label>Low Lacunarity (1.5)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <path d="M0 30 Q 50 10, 100 30 T 200 30"
            fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path d="M0 30 Q 33 50, 66 30 T 132 30 T 198 30"
            fill="none" stroke="var(--primary)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">波の周期が近い</span>
      </div>
      <div className="diagram-item">
        <label>High Lacunarity (3.5)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <path d="M0 30 Q 50 10, 100 30 T 200 30"
            fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <path d="M0 30 Q 14 50, 28 30 T 56 30 T 84 30 T 112 30 T 140 30 T 168 30 T 196 30"
            fill="none" stroke="var(--accent)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">波が急激に細かくなる</span>
      </div>
    </div>
  </div>
);



const HeightRangeDiagram = () => (
  <div className="diagram-container">
    <div className="diagram-grid">
      <div className="diagram-item">
        <label>Input (0.0 - 1.0)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
          <path d="M0 50 Q 50 10, 100 50 T 200 50"
            fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </svg>
        <span className="diagram-note">フルレンジ</span>
      </div>
      <div className="diagram-item">
        <label>Remapped (0.3 - 0.7)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
          {/* Original Ghost */}
          <path d="M0 50 Q 50 10, 100 50 T 200 50"
            fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
          {/* Compressed */}
          <path d="M0 40 Q 50 20, 100 40 T 200 40"
            fill="none" stroke="var(--success)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">コントラスト圧縮</span>
      </div>
    </div>
  </div>
);

const NormalStrengthDiagram = () => (
  <div className="diagram-container">
    <div className="diagram-grid">
      <div className="diagram-item">
        <label>Weak (0.1)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          {/* Ground */}
          <rect x="0" y="50" width="200" height="10" fill="currentColor" opacity="0.05" />
          {/* Surface */}
          <path d="M0 50 Q 100 45, 200 50"
            fill="none" stroke="var(--secondary)" strokeWidth="2" />
          {/* Normal Vectors */}
          <line x1="100" y1="47.5" x2="100" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
        <span className="diagram-note">緩やかな凹凸</span>
      </div>
      <div className="diagram-item">
        <label>Strong (2.0)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          {/* Ground */}
          <rect x="0" y="50" width="200" height="10" fill="currentColor" opacity="0.05" />
          {/* Surface */}
          <path d="M0 50 Q 100 10, 200 50"
            fill="none" stroke="var(--primary)" strokeWidth="2" />
          {/* Normal Vectors */}
          <line x1="100" y1="30" x2="100" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
        <span className="diagram-note">深い凹凸</span>
      </div>
    </div>
  </div>
);



const MaskDiagram = () => (
  <div className="diagram-container">
    <div className="diagram-grid grid-3">
      <div className="diagram-item">
        <label>Mask Source (Layer A)</label>
        <svg width="100%" height="60" viewBox="0 0 100 60">
          <defs>
            <radialGradient id="maskGradient">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100" height="60" fill="black" />
          <circle cx="50" cy="30" r="25" fill="url(#maskGradient)" />
        </svg>
        <span className="diagram-note">白=表示 / 黒=透明</span>
      </div>
      <div className="diagram-item">
        <label>Layer Below (Layer B)</label>
        <svg width="100%" height="60" viewBox="0 0 100 60">
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--primary)" strokeWidth="1" />
          </pattern>
          <rect x="0" y="0" width="100" height="60" fill="url(#gridPattern)" />
        </svg>
        <span className="diagram-note">ノイズやパターン</span>
      </div>
      <div className="diagram-item">
        <label>Result</label>
        <svg width="100%" height="60" viewBox="0 0 100 60">
          <mask id="maskCircle">
            <rect x="0" y="0" width="100" height="60" fill="black" />
            <circle cx="50" cy="30" r="25" fill="white" />
          </mask>
          <rect x="0" y="0" width="100" height="60" fill="url(#gridPattern)" mask="url(#maskCircle)" />
        </svg>
        <span className="diagram-note">型抜きされて合成</span>
      </div>
    </div>
  </div>
);

const BoothIcon = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    {/* BOOTH Logo: House + Alpaca */}
    <path d="M4.5 9v12h4v-5c0-1.66 1.34-3 3-3s3 1.34 3 3v5h5V9l-6.5-6L8 7.5V6H5V7.5L4.5 9z M5 6V3h3v3H5z" fill="none" />
    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm1 14h-2v-4h2v4z" style={{ display: 'none' }} /> {/* Reference only */}

    {/* Corrected Outline for BOOTH (Approximation of the house-llama) */}
    {/* Chimney/Neck (Left), Roof (Ears), Door (Arch) */}
    <path d="M6 5.5v-2h2v2H6zm0 0H4v6h2V5.5z M6 11.5v6h-2v-6H6z M8 17.5h8v-4a4 4 0 00-8 0v4z M16 11.5v6h2v-6h-2z M8 3l4-2 4 2v6H8V3z" fill="none" />

    {/* Better approximation of official logo: Blocky House with Neck */}
    <path d="
      M4 22V9l-2 0V6h3V4h3v2h1.5l3.5-3.5 7 7V22h-5v-6a2 2 0 00-4 0v6H4z
    " />
  </svg>
);

const InvertDiagram = () => (
  <div className="diagram-container">
    <div className="diagram-grid">
      <div className="diagram-item">
        <label>Original (0.0 to 1.0)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <line x1="0" y1="50" x2="200" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <path d="M0 50 Q 50 40, 100 20 T 200 10"
            fill="none" stroke="var(--primary)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">低い → 高い</span>
      </div>
      <div className="diagram-item">
        <label>Inverted (1.0 to 0.0)</label>
        <svg width="100%" height="60" viewBox="0 0 200 60">
          <line x1="0" y1="10" x2="200" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <path d="M0 10 Q 50 20, 100 40 T 200 50"
            fill="none" stroke="var(--accent)" strokeWidth="2" />
        </svg>
        <span className="diagram-note">高い → 低い（反転）</span>
      </div>
    </div>
  </div>
);

const XIcon = ({ className, size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [manualTab, setManualTab] = useState('params');

  // Theme State
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    // Then check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light'; // Default
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
      return;
    }
    document.startViewTransition(() => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    });
  };

  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#" className="logo">
            <Layers className="logo-icon ic-primary" />
            <span>ElevaN</span>
          </a>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features" onClick={() => setIsMenuOpen(false)}>機能</a>
            <a href="#how-to-use" onClick={() => setIsMenuOpen(false)}>使い方</a>
            <a href="#manual" onClick={() => setIsMenuOpen(false)}>マニュアル</a>
            <a href="#noise-gallery" onClick={() => setIsMenuOpen(false)}>ギャラリー</a>



            <a href="https://mametarovv.booth.pm/items/7966219" className="btn-primary">
              <ShoppingCart size={18} /> BOOTHで購入
            </a>
          </div>

          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-content">
          <div className="badge">Commercial Release by 豆々庵</div>
          <h1>理想の質感を、最速で。<br /><span className="text-gradient">Unity Editor拡張 ElevaN</span></h1>
          <p>
            複雑なノイズの組み合わせを直感的なレイヤーで。
            Unity上でのテクスチャ制作時間を劇的に短縮し、アーティストの想像力を解き放ちます。
          </p>
          <div className="hero-btns">
            <a href="https://mametarovv.booth.pm/items/7966219" className="btn-primary btn-lg shadow-primary">
              <ShoppingCart /> BOOTHで購入
            </a>
            <a href="#manual" className="btn-outline btn-lg">詳細マニュアル</a>
          </div>
        </div>
        <div className="container hero-visual">
          <div className="video-container premium-border shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/BWjYODe2t98"
              title="ElevaN Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: '12px' }}
            ></iframe>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="section bg-gradient-subtle">
        <div className="container">
          <h2 className="section-title">制作を加速させる4つのコア</h2>
          <div className="features-grid">
            <div className="card feature-card">
              <Layers className="feature-icon ic-primary" />
              <h3>マルチレイヤー・ワークフロー</h3>
              <p>非破壊的なレイヤー構造を採用。試行錯誤を繰り返し、納得のいく質感を最短距離で追求できます。</p>
            </div>
            <div className="card feature-card">
              <Zap className="feature-icon ic-accent" />
              <h3>瞬時のリアルタイム・プレビュー</h3>
              <p>2D/3Dのプレビューを秒間60回更新。マテリアルの変化を即座に確認し、直感的な調整が可能です。</p>
            </div>
            <div className="card feature-card">
              <Box className="feature-icon ic-secondary" />
              <h3>14種の強力なノイズ・エンジン</h3>
              <p>PerlinからVoronoi、特殊なLeatherまで。プリセットを組み合わせるだけで、無限のパターンを生み出せます。</p>
            </div>
            <div className="card feature-card">
              <Download className="feature-icon ic-info" />
              <h3>プロダクション品質の出力</h3>
              <p>最大4K解像度、16bit/32bit(EXR)出力に対応。ハイエンドなゲーム制作環境にもそのまま導入可能です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section (Quick Start) */}
      <section id="how-to-use" className="section bg-white">
        <div className="container">
          <h2 className="section-title">使い方ガイド</h2>
          <p className="section-intro">導入から書き出しまで、ElevaNを使いこなすためのクイックガイドです。</p>

          <div className="how-to-grid">
            <div className="how-to-step">
              <div className="how-to-content">
                <div className="how-to-meta">
                  <span className="step-num">01</span>
                  <h3>導入</h3>
                </div>
                <p className="text-muted">BOOTHからダウンロードした <code>ElevaN.unitypackage</code> をプロジェクトへ導入します。依存パッケージは不要で、単体で動作します。</p>
              </div>
              <div className="how-to-media">
                <img src={imgGuide01} alt="unitypackageのインポート" className="premium-img shadow-md" />
              </div>
            </div>

            <div className="how-to-step">
              <div className="how-to-content">
                <div className="how-to-meta">
                  <span className="step-num">02</span>
                  <h3>ウィンドウの起動</h3>
                </div>
                <p className="text-muted">上部メニューの <code>Tools &gt; Mame2an &gt; ElevaN</code> を選択すると、専用のエディタウィンドウが開きます。タブとしてUnity上の好きな場所にドッキング可能です。</p>
              </div>
              <div className="how-to-media">
                <img src={imgGuide02} alt="メニューの場所" className="premium-img shadow-md" />
              </div>
            </div>

            <div className="how-to-step">
              <div className="how-to-content">
                <div className="how-to-meta">
                  <span className="step-num">03</span>
                  <h3>レイヤーの構築</h3>
                </div>
                <p className="text-muted">起動時には <code>BaseLayer</code> が既に設定されています。「Add Layer」から新規レイヤーを作成し、14種類のエンジンを組み合わせて複雑な質感を構築していきます。</p>
              </div>
              <div className="how-to-media">
                <img src={imgGuide03} alt="レイヤー構築" className="premium-img shadow-md" />
              </div>
            </div>

            <div className="how-to-step">
              <div className="how-to-content">
                <div className="how-to-meta">
                  <span className="step-num">04</span>
                  <h3>書き出し</h3>
                </div>
                <p className="text-muted">プレビューで満足いく結果が得られたら、解像度(最大4K)、保存先、および出力形式(PNG/TGA/EXR等)を指定して「Export」を実行。瞬時に生成されます。</p>
              </div>
              <div className="how-to-media">
                <img src={imgGuide04} alt="エクスポート設定" className="premium-img shadow-md" />
              </div>
            </div>

            <div className="how-to-step">
              <div className="how-to-content" style={{ gridColumn: '1 / -1' }}>
                <div className="how-to-meta">
                  <span className="step-num">VIDEO</span>
                  <h3>操作解説動画</h3>
                </div>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>実際の操作画面を見ながら、ElevaNの基本的な使い方をマスターしましょう。</p>
                <div className="video-container premium-border shadow-md">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/sGRho9QAY1c"
                    title="ElevaN Instruction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ borderRadius: '12px' }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Section */}
      <section id="manual" className="section manual-section">
        <div className="container">
          <h2 className="section-title">全機能マニュアル</h2>
          <p className="section-intro">ElevaNの持つポテンシャルを最大限に引き出すための、完全リファレンスガイドです。</p>

          <div className="manual-tabs-container">
            <div className="manual-tabs">
              <button className={`tab-btn ${manualTab === 'params' ? 'active' : ''}`} onClick={() => setManualTab('params')}>
                <Settings size={18} className={manualTab === 'params' ? '' : 'ic-primary'} /> レイヤー設定
              </button>
              <button className={`tab-btn ${manualTab === 'blends' ? 'active' : ''}`} onClick={() => setManualTab('blends')}>
                <Repeat size={18} className={manualTab === 'blends' ? '' : 'ic-accent'} /> 合成モード
              </button>
              <button className={`tab-btn ${manualTab === 'noises' ? 'active' : ''}`} onClick={() => setManualTab('noises')}>
                <BookOpen size={18} className={manualTab === 'noises' ? '' : 'ic-secondary'} /> ノイズ図鑑
              </button>
              <button className={`tab-btn ${manualTab === 'preview' ? 'active' : ''}`} onClick={() => setManualTab('preview')}>
                <Eye size={18} className={manualTab === 'preview' ? '' : 'ic-info'} /> プレビュー
              </button>
              <button className={`tab-btn ${manualTab === 'presets' ? 'active' : ''}`} onClick={() => setManualTab('presets')}>
                <Save size={18} className={manualTab === 'presets' ? '' : 'ic-success'} /> プリセット
              </button>
            </div>
          </div>

          <div className="manual-content card shadow-lg glassmorphism">
            {manualTab === 'params' && (
              <div className="manual-tab-content anim-fade-in">
                <h3>レイヤープロパティ完全解説</h3>
                <div className="params-detailed-grid">
                  <div className="param-group">
                    <h4 className="border-primary">基本・レイヤー管理</h4>
                    <div className="p-item">
                      <strong>Layer Name / 名前の変更</strong>
                      <p>レイヤー名の横にあるペンアイコン、またはテキストを直接クリックして名前を変更できます。複雑な構成では「雲」「岩肌」など名前を付けると管理が容易になります。</p>
                    </div>
                    <div className="p-item">
                      <strong>Opacity / 不透明度</strong>
                      <p>レイヤーの透過度を調整します。下のレイヤーとどの程度馴染ませるかを決定する最も基本的な項目です。</p>
                    </div>
                    <div className="p-item">
                      <strong>Seed / シード値とランダムボタン</strong>
                      <p>ノイズ生成の「種」となる数値です。 <code>Randomize Seed</code> ボタンで個別に変更できるほか、レイヤーリスト上部の <code>Randomize All Seeds</code> を押すと全レイヤーのシードを一括変更できます。</p>
                    </div>
                  </div>

                  <div className="param-group">
                    <h4 className="border-accent">形状とフラクタル</h4>
                    <div className="grid-2">
                      <div className="p-item">
                        <strong>Scale / スケール</strong>
                        <p>ノイズの密度。<strong>「整数スナップ」</strong>をONにすると、タイリング時のシームレス性が保証されます。</p>
                      </div>
                      <div className="p-item">
                        <strong>Offset & Angle</strong>
                        <p>位置のズレと、回転(0-360°)を調整します。レイヤーを重ねる際のバリエーション作成に重要です。</p>
                      </div>
                    </div>
                    <div className="p-item">
                      <strong>Octaves (1 - 8)</strong>
                      <p>重ね合わせる波の数。多いほど緻密になります。</p>
                    </div>
                    <OctavesDiagram />
                    <div className="grid-2 mt-4">
                      <div className="p-item">
                        <strong>Persistence (0.1 - 1.0)</strong>
                        <p>小さなオクターブの振幅（影響度）の減少率。1に近いほど細部が強調され、0に近いほど滑らかになります。</p>
                        <PersistenceDiagram />
                      </div>
                      <div className="p-item">
                        <strong>Lacunarity (1.0 - 4.0)</strong>
                        <p>各オクターブの周波数（密度）の倍率。通常2.0。増やすとより「粗い」「密な」質感になります。</p>
                        <LacunarityDiagram />
                      </div>
                    </div>
                  </div>

                  <div className="param-group">
                    <h4 className="border-secondary">出力と特殊効果</h4>
                    <div className="p-item">
                      <strong>Height Range / 高さの範囲</strong>
                      <p>生成された0.0〜1.0の高さ値を、特定の範囲に再マッピングします。コントラストの調整や、高さの制限に使用します。</p>
                      <HeightRangeDiagram />
                    </div>
                    <div className="p-item">
                      <strong>Normal Strength / 法線の強さ</strong>
                      <p>高さマップから生成される「法線（ノーマル）」の凹凸の深さを調整します。3Dプレビューでの陰影に直接影響します。</p>
                      <NormalStrengthDiagram />
                    </div>
                    <div className="p-item">
                      <strong>Invert / 高さの反転</strong>
                      <p>高さの値を反転させます（白と黒を入れ替え）。凹凸を逆にしたい場合や、マスクの適用範囲を反転させる際に便利です。</p>
                      <InvertDiagram />
                    </div>
                    <div className="p-item accent-box glass-accent mt-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck size={24} className="ic-secondary shrink-0" />
                        <div>
                          <strong>Is Mask (マスクとして使用)</strong>
                          <p>このレイヤー自体を描画せず、<strong>直下のレイヤーの透過マスク</strong>として機能させます。</p>
                        </div>
                      </div>
                      <MaskDiagram />
                    </div>
                  </div>
                </div>
              </div>

            )}

            {manualTab === 'blends' && (
              <div className="manual-tab-content anim-fade-in">
                <h3>全16種の合成モード</h3>
                <div className="blends-category-grid">
                  <div className="blend-cat cat-darken">
                    <h4>暗化・削り取り</h4>
                    <div className="blend-list">
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Multiply</strong>
                          <p className="blend-desc">乗算。最も一般的な影の追加。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Subtract</strong>
                          <p className="blend-desc">減算。形状を鋭く削り取る。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Min</strong>
                          <p className="blend-desc">比較暗。暗い方の値のみを採用。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blend-cat cat-lighten">
                    <h4>加算・ハイライト</h4>
                    <div className="blend-list">
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Add</strong>
                          <p className="blend-desc">加算。光や高さを積み上げる。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Max</strong>
                          <p className="blend-desc">比較明。明るい方の値のみを採用。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Screen</strong>
                          <p className="blend-desc">スクリーン。柔らかく明るさを重ねる。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blend-cat cat-contrast">
                    <h4>コントラスト・オーバーレイ</h4>
                    <div className="blend-list">
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Overlay</strong>
                          <p className="blend-desc">基本的なコントラスト強化。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Soft / Hard Light</strong>
                          <p className="blend-desc">ライトの当たり方をシミュレート。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Vivid / Linear / Pin Light</strong>
                          <p className="blend-desc">強力なコントラスト変化。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Hard Mix</strong>
                          <p className="blend-desc">0か1に極端化する特殊な質感。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blend-cat cat-special">
                    <h4>特殊・反転</h4>
                    <div className="blend-list">
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Override</strong>
                          <p className="blend-desc">上書き。下層を完全に隠す。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Difference</strong>
                          <p className="blend-desc">差分。サイケデリックな形状変化。</p>
                        </div>
                      </div>
                      <div className="blend-item">
                        <div>
                          <strong className="blend-name">Exclusion</strong>
                          <p className="blend-desc">除外。Differenceよりマイルドな反転。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {manualTab === 'noises' && (
              <div className="manual-tab-content anim-fade-in">
                <h3>全14種のノイズ・ライブラリ</h3>
                <div className="noise-grid-detailed">
                  {[
                    {
                      cat: "スタンダード", items: [
                        { n: "Perlin", d: "最も汎用的で自然な連続ノイズ。", c: "ic-primary" },
                        { n: "Billow", d: "うねりのある有機的・液体的な質感。", c: "ic-primary" },
                        { n: "Ridged", d: "山の稜線や岩肌、鋭い隆起に最適。", c: "ic-primary" }
                      ]
                    },
                    {
                      cat: "ボロノイ・セル系", items: [
                        { n: "Cellular", d: "基本的な細胞状パターン。タイル状に。", c: "ic-secondary" },
                        { n: "VoronoiF2", d: "ボロノイの第2距離を利用した複雑な網目。", c: "ic-secondary" },
                        { n: "F2-F1", d: "ボロノイの距離差による鋭いひび割れ表現。", c: "ic-secondary" }
                      ]
                    },
                    {
                      cat: "地形・高度フラクタル", items: [
                        { n: "Multifractal", d: "場所によって複雑さが変わる高度な地形。", c: "ic-accent" },
                        { n: "Hybrid", d: "滑らかな部分と険しい部分が混在する地形。", c: "ic-accent" },
                        { n: "HeteroTerrain", d: "不均一なディテールを持つ有機的な高度マップ。", c: "ic-accent" }
                      ]
                    },
                    {
                      cat: "特殊・幾何学パターン", items: [
                        { n: "Checkerboard", d: "正確なチェッカーパターン。タイル作成に。", c: "ic-info" },
                        { n: "GradientLinear", d: "直線的なグラデーション。マスクとして多用。", c: "ic-info" },
                        { n: "GradientRadial", d: "円形のグラデーション。中央からの強調に。", c: "ic-info" },
                        { n: "Fiber", d: "繊維状の細長い質感。木目や筆跡に。", c: "ic-success" },
                        { n: "Leather", d: "革製品の表面のような特有の凹凸表現。", c: "ic-success" }
                      ]
                    }
                  ].map((group, gIdx) => (
                    <div key={gIdx} className="noise-group-container">
                      <h4 className="noise-cat-title">{group.cat}</h4>
                      <div className="noise-sub-grid">
                        {group.items.map((item, idx) => (
                          <div key={idx} className="noise-doc-card glass-hover">
                            <h5 className={item.c}>{item.n}</h5>
                            <p>{item.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {manualTab === 'preview' && (
              <div className="manual-tab-content anim-fade-in text-center">
                <h3>リアルタイム・ビューイング・出力</h3>
                <div className="features-showcase grid-2">
                  <div className="show-item glass-hover">
                    <div className="show-icon ic-primary-bg"><RotateCw /></div>
                    <h4>3Dインタラクティブ</h4>
                    <p>Sphere/Cube/Quadに法線を含む質感を貼り、自由に回転確認できます。</p>
                  </div>
                  <div className="show-item glass-hover">
                    <div className="show-icon ic-accent-bg"><Grid3X3 /></div>
                    <h4>2Dタイリング確認</h4>
                    <p>最大5x5の表示でシームレス性をチェックできます。</p>
                  </div>
                </div>
              </div>
            )}

            {manualTab === 'presets' && (
              <div className="manual-tab-content anim-fade-in">
                <h3>資産の管理：プリセットシステム</h3>
                <div className="preset-steps">
                  <div className="p-step glass-hover">
                    <span className="step-badge ic-success-bg">1</span>
                    <p><strong>Save Preset:</strong> 構成をJSONに保存。</p>
                  </div>
                  <div className="p-step glass-hover">
                    <span className="step-badge ic-primary-bg">2</span>
                    <p><strong>Load Preset:</strong> 以前の作業を瞬時に復元。</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Noise Gallery Section */}
      <section id="noise-gallery" className="section bg-gradient-dark">
        <div className="container">
          <h2 className="section-title">ノイズ・ギャラリー</h2>
          <p className="section-intro">主要なアルゴリズムの適用例。</p>
          <div className="gallery-grid">
            {[
              { id: 'Perlin', name: 'Perlin', desc: '自然な地形', c: 'ic-primary', img: imgPerlin },
              { id: 'Billow', name: 'Billow', desc: '雲・液体', c: 'ic-primary', img: imgBillow },
              { id: 'Ridged', name: 'Ridged', desc: '鋭い稜線', c: 'ic-primary', img: imgRidged },
              { id: 'Cellular', name: 'Cellular', desc: '細胞・石畳', c: 'ic-secondary', img: imgCellular },
              { id: 'Voronoi', name: 'Voronoi F2', desc: '網目状クラック', c: 'ic-secondary', img: imgVoronoi },
              { id: 'VoronoiDiff', name: 'F2 - F1', desc: 'クリスタル', c: 'ic-secondary', img: imgVoronoiF2F1 },
              { id: 'Multifractal', name: 'Multifractal', desc: '複雑な地形', c: 'ic-accent', img: imgMultifractal },
              { id: 'Hybrid', name: 'Hybrid', desc: '複合地形', c: 'ic-accent', img: imgHybrid },
              { id: 'Hetero', name: 'Hetero', desc: '侵食地形', c: 'ic-accent', img: imgHetero },
              { id: 'Checker', name: 'Checker', desc: 'タイル', c: 'ic-info', img: imgChecker },
              { id: 'GradL', name: 'Linear', desc: '線形勾配', c: 'ic-info', img: imgGradLinear },
              { id: 'GradR', name: 'Radial', desc: '円形勾配', c: 'ic-info', img: imgGradRadial },
              { id: 'Fiber', name: 'Fiber', desc: '繊維・木目', c: 'ic-success', img: imgFiber },
              { id: 'Leather', name: 'Leather', desc: '皮革のシワ', c: 'ic-success', img: imgLeather }
            ].map(type => (
              <div key={type.id} className="gallery-item card glass-hover">
                <div className="gallery-thumb media-placeholder sm" style={{ padding: 0, overflow: 'hidden' }}>
                  <img src={type.img} alt={type.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </div>
                <div className="gallery-info">
                  <h4 className={type.c}>{type.name}</h4>
                  <p>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Banner */}
      <section className="section bg-dark commercial-cta">
        <div className="container text-center">
          <ShieldCheck className="cta-icon ic-success" />
          <h2 className="text-white">あなたの制作に、ElevaNの力を。</h2>
          <p className="text-slate-400">商用利用をご検討の場合や、法人での導入に関するご相談は、<br />BOOTHのメッセージ機能よりお気軽にお問い合わせください。</p>
          <div className="cta-btns">
            <a href="https://mametarovv.booth.pm/" className="btn-primary btn-lg shadow-primary">
              <ShoppingCart /> BOOTHで問い合わせ / 購入
            </a>
          </div>
          <p className="license-info">※個人・同人制作での利用については、BOOTHでのご購入のみで即座に開始いただけます。</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <Layers className="ic-primary" /> <span>ElevaN</span>
            </div>
            <p className="footer-desc">Unityテクスチャ生成のニュー・スタンダード。</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Official</h4>
              <a href="https://mametarovv.booth.pm/"><BoothIcon size={16} /> BOOTH Store</a>
              <a href="https://x.com/mametaro_vv"><XIcon size={16} /> @mametaro_vv</a>

            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© 2026 豆々庵 (Mame2an). Powering Creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
