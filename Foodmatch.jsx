import { useState, useEffect, useRef, useCallback } from "react";

// ── API ──────────────────────────────────────────────────────────────────────
async function fetchMeal() {
  const r = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const d = await r.json();
  return d.meals[0];
}

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const SWIPE_THRESHOLD = 100;
const ROTATION_FACTOR = 0.12;
const FLY_DISTANCE = 900;
const FLY_DURATION = 400;

// ── GITHUB README MODAL ───────────────────────────────────────────────────────
function ReadmeModal({ onClose }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:100,
      display:"flex",alignItems:"center",justifyContent:"center",padding:16,
      backdropFilter:"blur(6px)",animation:"fadeIn .2s ease"
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#0d1117",border:"1px solid #30363d",borderRadius:12,
        width:"100%",maxWidth:680,maxHeight:"85vh",overflow:"auto",
        fontFamily:"'SFMono-Regular',Consolas,monospace",fontSize:13,
        color:"#e6edf3",animation:"slideUp .25s ease",
      }}>
        {/* repo header */}
        <div style={{padding:"16px 20px",borderBottom:"1px solid #21262d",display:"flex",alignItems:"center",gap:10}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/></svg>
          <span style={{color:"#58a6ff",fontWeight:600}}>yourname</span>
          <span style={{color:"#8b949e"}}>/</span>
          <span style={{color:"#58a6ff",fontWeight:600}}>foodmatch</span>
          <span style={{marginLeft:8,background:"transparent",border:"1px solid #30363d",borderRadius:99,padding:"1px 8px",fontSize:11,color:"#8b949e"}}>Public</span>
        </div>
        {/* tabs */}
        <div style={{display:"flex",gap:0,padding:"0 20px",borderBottom:"1px solid #21262d"}}>
          {["Code","Issues 0","Pull requests 0","Actions","Settings"].map((t,i)=>
            <div key={t} style={{padding:"10px 14px",fontSize:13,color:i===0?"#e6edf3":"#8b949e",borderBottom:i===0?"2px solid #f78166":"none",cursor:"pointer"}}>{t}</div>
          )}
        </div>
        {/* stats */}
        <div style={{display:"flex",gap:16,padding:"12px 20px",borderBottom:"1px solid #21262d",flexWrap:"wrap"}}>
          {[["⭐","Star","142"],["🍴","Fork","28"],["👁","Watch","8"]].map(([e,l,n])=>
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,color:"#8b949e",fontSize:12}}>
              <span>{e}</span><span>{l}</span>
              <span style={{background:"#21262d",borderRadius:99,padding:"1px 7px",fontSize:11,color:"#e6edf3"}}>{n}</span>
            </div>
          )}
        </div>
        {/* README */}
        <div style={{padding:"20px 24px"}}>
          <div style={{background:"#161b22",border:"1px solid #30363d",borderRadius:8,padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,color:"#8b949e",fontSize:12}}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.062 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75zm8.5 9.trimester a3.75 3.75 0 013.75-3.75H14.5V2.5h-3.495a2.25 2.25 0 00-2.005 1.225V11.5z"/></svg>
              README.md
            </div>

            <h1 style={{margin:"0 0 4px",fontSize:28,fontWeight:700,color:"#e6edf3"}}>🍽️ FoodMatch</h1>
            <p style={{color:"#8b949e",marginTop:4,fontSize:14}}>Tinder, but make it food. Swipe to decide what you're eating tonight.</p>

            <div style={{display:"flex",gap:8,margin:"12px 0 20px",flexWrap:"wrap"}}>
              {["React","TheMealDB API","Swipe Gestures","No Backend"].map(b=>
                <span key={b} style={{background:"#1f6feb22",border:"1px solid #1f6feb55",color:"#58a6ff",borderRadius:99,padding:"2px 10px",fontSize:11}}>{b}</span>
              )}
            </div>

            <div style={{height:1,background:"#21262d",margin:"16px 0"}}/>

            <h2 style={{fontSize:16,color:"#e6edf3",margin:"0 0 10px"}}>✨ Features</h2>
            <ul style={{margin:0,padding:"0 0 0 20px",color:"#8b949e",fontSize:13,lineHeight:2}}>
              <li>🔥 Swipe right to add to your eat list</li>
              <li>😐 Swipe left to pass</li>
              <li>📸 Real food photos via TheMealDB free API</li>
              <li>📊 Live stats — how hungry are you really?</li>
              <li>🌍 Dishes from 30+ countries</li>
            </ul>

            <div style={{height:1,background:"#21262d",margin:"16px 0"}}/>

            <h2 style={{fontSize:16,color:"#e6edf3",margin:"0 0 10px"}}>🚀 Getting Started</h2>
            <div style={{background:"#010409",borderRadius:8,padding:"12px 16px",fontSize:12,color:"#e6edf3",fontFamily:"monospace"}}>
              <div><span style={{color:"#8b949e"}}>$ </span><span style={{color:"#7ee787"}}>git clone</span> https://github.com/yourname/foodmatch</div>
              <div><span style={{color:"#8b949e"}}>$ </span><span style={{color:"#7ee787"}}>cd</span> foodmatch</div>
              <div><span style={{color:"#8b949e"}}>$ </span><span style={{color:"#7ee787"}}>npm install</span></div>
              <div><span style={{color:"#8b949e"}}>$ </span><span style={{color:"#7ee787"}}>npm run dev</span></div>
            </div>

            <div style={{height:1,background:"#21262d",margin:"16px 0"}}/>

            <div style={{fontSize:12,color:"#8b949e",textAlign:"center"}}>
              Made with ❤️ and hunger · MIT License · <span style={{color:"#58a6ff"}}>Live Demo →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SWIPE CARD ────────────────────────────────────────────────────────────────
function SwipeCard({ meal, onSwipe, isTop, index }) {
  const cardRef = useRef(null);
  const stateRef = useRef({ dragging: false, startX: 0, startY: 0, curX: 0, curY: 0 });
  const animRef = useRef(null);
  const [visualX, setVisualX] = useState(0);
  const [visualY, setVisualY] = useState(0);
  const [flying, setFlying] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = useCallback((x, y, transition = "") => {
    if (!cardRef.current) return;
    const rot = x * ROTATION_FACTOR;
    cardRef.current.style.transition = transition;
    cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    setVisualX(x);
    setVisualY(y);
  }, []);

  const fly = useCallback((dir) => {
    const targetX = dir === "right" ? FLY_DISTANCE : -FLY_DISTANCE;
    const targetY = (Math.random() - 0.5) * 200;
    applyTransform(targetX, targetY, `transform ${FLY_DURATION}ms cubic-bezier(.4,0,.2,1), opacity ${FLY_DURATION}ms ease`);
    if (cardRef.current) cardRef.current.style.opacity = "0";
    setFlying(dir);
    setTimeout(() => onSwipe(dir), FLY_DURATION);
  }, [applyTransform, onSwipe]);

  const onDown = useCallback((e) => {
    if (!isTop || flying) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    stateRef.current = { dragging: true, startX: clientX, startY: clientY, curX: 0, curY: 0 };
    setIsDragging(true);
    if (cardRef.current) cardRef.current.style.transition = "none";
  }, [isTop, flying]);

  const onMove = useCallback((e) => {
    if (!stateRef.current.dragging) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - stateRef.current.startX;
    const dy = clientY - stateRef.current.startY;
    stateRef.current.curX = dx;
    stateRef.current.curY = dy;

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(() => {
      applyTransform(dx, dy * 0.4);
    });
  }, [applyTransform]);

  const onUp = useCallback((e) => {
    if (!stateRef.current.dragging) return;
    stateRef.current.dragging = false;
    setIsDragging(false);
    const dx = stateRef.current.curX;

    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      fly(dx > 0 ? "right" : "left");
    } else {
      // snap back with spring
      applyTransform(0, 0, "transform 0.5s cubic-bezier(.175,.885,.32,1.275)");
    }
  }, [fly, applyTransform]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.addEventListener("touchstart", onDown, { passive: false });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onUp);
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [onDown, onMove, onUp]);

  const hintDir = isTop && isDragging
    ? visualX > 50 ? "eat" : visualX < -50 ? "pass" : null
    : null;
  const hintOpacity = Math.min(Math.abs(visualX) / 80, 1);

  const stackScale = 1 - index * 0.04;
  const stackY = index * -10;

  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 20,
        overflow: "hidden",
        transform: isTop ? "translate(0,0) rotate(0deg)" : `translateY(${stackY}px) scale(${stackScale})`,
        transformOrigin: "bottom center",
        zIndex: 10 - index,
        cursor: isTop ? (isDragging ? "grabbing" : "grab") : "default",
        willChange: "transform",
        boxShadow: isTop
          ? "0 24px 80px rgba(0,0,0,0.6)"
          : "0 8px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* photo */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
      />

      {/* gradient */}
      <div style={{ position:"absolute",inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)", pointerEvents:"none" }} />

      {/* EAT hint */}
      {hintDir === "eat" && (
        <div style={{
          position:"absolute",top:28,left:22,
          border:"4px solid #ff6b00",borderRadius:12,
          padding:"6px 18px",color:"#ff6b00",fontWeight:900,
          fontSize:28,fontFamily:"'Georgia',serif",letterSpacing:3,
          transform:"rotate(-15deg)",
          opacity: hintOpacity,
          pointerEvents:"none",
          textShadow:"0 2px 8px rgba(255,107,0,0.5)",
        }}>JE MANGE</div>
      )}

      {/* PASS hint */}
      {hintDir === "pass" && (
        <div style={{
          position:"absolute",top:28,right:22,
          border:"4px solid rgba(255,255,255,0.7)",borderRadius:12,
          padding:"6px 18px",color:"rgba(255,255,255,0.9)",fontWeight:900,
          fontSize:28,fontFamily:"'Georgia',serif",letterSpacing:3,
          transform:"rotate(15deg)",
          opacity: hintOpacity,
          pointerEvents:"none",
        }}>PASS</div>
      )}

      {/* info */}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"24px 22px 28px", pointerEvents:"none" }}>
        <div style={{ fontSize:22,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:8,fontFamily:"'Georgia',serif",textShadow:"0 2px 12px rgba(0,0,0,0.8)" }}>
          {meal.strMeal}
        </div>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
          {meal.strCategory && (
            <span style={{ background:"rgba(255,107,0,0.25)",backdropFilter:"blur(8px)",color:"#ffaa55",border:"1px solid rgba(255,107,0,0.4)",borderRadius:99,padding:"3px 12px",fontSize:11,letterSpacing:1,fontWeight:600 }}>
              {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span style={{ background:"rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",color:"#ccc",border:"1px solid rgba(255,255,255,0.15)",borderRadius:99,padding:"3px 12px",fontSize:11,letterSpacing:1 }}>
              🌍 {meal.strArea}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function FoodMatch() {
  const [deck, setDeck] = useState([]);        // current visible cards (max 3)
  const [eats, setEats] = useState([]);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("swipe");
  const [showReadme, setShowReadme] = useState(false);
  const [bursts, setBursts] = useState([]);
  const loadingRef = useRef(false);

  const fillDeck = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    const needed = 3;
    const meals = await Promise.all(Array.from({ length: needed }, fetchMeal));
    setDeck(prev => {
      const ids = new Set(prev.map(m => m.idMeal));
      return [...prev, ...meals.filter(m => !ids.has(m.idMeal))];
    });
    loadingRef.current = false;
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fillDeck();
      setLoading(false);
    })();
  }, [fillDeck]);

  const handleSwipe = useCallback((meal, dir) => {
    if (dir === "right") {
      setEats(prev => [...prev, meal]);
      const id = Date.now();
      setBursts(prev => [...prev, id]);
      setTimeout(() => setBursts(prev => prev.filter(b => b !== id)), 700);
    } else {
      setPasses(prev => [...prev, meal]);
    }
    setDeck(prev => {
      const next = prev.filter(m => m.idMeal !== meal.idMeal);
      if (next.length < 2) fillDeck();
      return next;
    });
  }, [fillDeck]);

  const triggerSwipe = useCallback((dir) => {
    if (!deck.length) return;
    const top = deck[deck.length - 1];
    handleSwipe(top, dir);
  }, [deck, handleSwipe]);

  const visibleDeck = deck.slice(-3).reverse(); // bottom→top for z-index
  const total = eats.length + passes.length;
  const eatPct = total ? Math.round((eats.length / total) * 100) : 0;

  return (
    <div style={{
      minHeight:"100dvh",
      background:"#0d0d0d",
      display:"flex",flexDirection:"column",alignItems:"center",
      fontFamily:"'Georgia','Times New Roman',serif",
      color:"#fff",
      overflow:"hidden",
      userSelect:"none",
    }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes pop { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes burst { 0%{transform:scale(1);opacity:1} 100%{transform:scale(3);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .action-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .action-btn:hover { transform: scale(1.1) !important; }
        .action-btn:active { transform: scale(0.95) !important; }
      `}</style>

      {showReadme && <ReadmeModal onClose={() => setShowReadme(false)} />}

      {/* burst effects */}
      {bursts.map(id => (
        <div key={id} style={{
          position:"fixed",top:"50%",left:"50%",
          width:120,height:120,marginLeft:-60,marginTop:-60,
          borderRadius:"50%",background:"radial-gradient(circle, rgba(255,107,0,0.4) 0%, transparent 70%)",
          animation:"burst 0.7s ease-out forwards",
          pointerEvents:"none",zIndex:50,
        }}/>
      ))}

      {/* ── HEADER ── */}
      <div style={{
        width:"100%",maxWidth:440,
        padding:"18px 20px 0",
        display:"flex",justifyContent:"space-between",alignItems:"center",
      }}>
        <div>
          <div style={{ fontSize:24,fontWeight:700,letterSpacing:"-0.5px" }}>
            🍽️ <span style={{ color:"#ff6b00" }}>FoodMatch</span>
          </div>
          <div style={{ fontSize:10,color:"#555",letterSpacing:2,marginTop:2,textTransform:"uppercase" }}>Tu manges ou pas ?</div>
        </div>
        <button
          onClick={() => setShowReadme(true)}
          style={{
            display:"flex",alignItems:"center",gap:6,
            background:"#161b22",border:"1px solid #30363d",
            borderRadius:8,padding:"7px 13px",color:"#8b949e",
            fontSize:12,cursor:"pointer",fontFamily:"inherit",
            transition:"all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="#58a6ff"; e.currentTarget.style.color="#58a6ff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="#30363d"; e.currentTarget.style.color="#8b949e"; }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
        </button>
      </div>

      {/* ── TABS ── */}
      <div style={{
        display:"flex",width:"100%",maxWidth:440,
        borderBottom:"1px solid #1e1e1e",marginTop:14,padding:"0 20px",
      }}>
        {[["swipe","🔀 Swipe"],["list",`❤️ Liste (${eats.length})`]].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex:1,background:"none",border:"none",
            borderBottom: tab===id ? "2px solid #ff6b00" : "2px solid transparent",
            color: tab===id ? "#ff6b00" : "#555",
            padding:"10px 0",fontSize:12,cursor:"pointer",
            fontFamily:"inherit",letterSpacing:1,textTransform:"uppercase",
            transition:"all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {tab === "swipe" ? (
        <>
          {/* ── CARD STACK ── */}
          <div style={{
            position:"relative",
            width:"calc(100% - 40px)",maxWidth:400,
            height:480,
            margin:"20px auto 0",
          }}>
            {loading ? (
              <div style={{
                position:"absolute",inset:0,borderRadius:20,
                background:"#1a1a1a",display:"flex",
                alignItems:"center",justifyContent:"center",
                fontSize:48,animation:"pop 1s ease infinite alternate",
              }}>🍳</div>
            ) : deck.length === 0 ? (
              <div style={{
                position:"absolute",inset:0,borderRadius:20,
                background:"#111",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",gap:12,
                animation:"fadeUp 0.4s ease",
              }}>
                <div style={{fontSize:48}}>🥂</div>
                <div style={{fontSize:18,color:"#ff6b00",fontWeight:700}}>Chargement...</div>
              </div>
            ) : (
              visibleDeck.map((meal, i) => {
                const isTop = i === visibleDeck.length - 1;
                const stackIndex = visibleDeck.length - 1 - i;
                return (
                  <SwipeCard
                    key={meal.idMeal}
                    meal={meal}
                    isTop={isTop}
                    index={stackIndex}
                    onSwipe={(dir) => handleSwipe(meal, dir)}
                  />
                );
              })
            )}
          </div>

          {/* ── BUTTONS ── */}
          <div style={{ display:"flex",gap:20,marginTop:24,alignItems:"center" }}>
            <button className="action-btn" onClick={() => triggerSwipe("left")} style={{
              width:58,height:58,borderRadius:"50%",
              border:"2px solid #333",background:"#111",
              color:"#fff",fontSize:24,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 4px 20px rgba(0,0,0,0.5)",
            }}>✕</button>

            <button className="action-btn" onClick={() => triggerSwipe("left")} style={{
              width:50,height:50,borderRadius:"50%",
              border:"2px solid #333",background:"#111",
              color:"#888",fontSize:18,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>😐</button>

            <button className="action-btn" onClick={() => triggerSwipe("right")} style={{
              width:74,height:74,borderRadius:"50%",
              border:"none",
              background:"linear-gradient(135deg, #ff6b00, #ff2200)",
              color:"#fff",fontSize:30,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 6px 28px rgba(255,107,0,0.5)",
            }}>🔥</button>

            <button className="action-btn" onClick={() => triggerSwipe("right")} style={{
              width:50,height:50,borderRadius:"50%",
              border:"2px solid #333",background:"#111",
              color:"#888",fontSize:18,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>❤️</button>

            <button className="action-btn" onClick={() => triggerSwipe("right")} style={{
              width:58,height:58,borderRadius:"50%",
              border:"2px solid #333",background:"#111",
              color:"#ff6b00",fontSize:24,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 4px 20px rgba(255,107,0,0.2)",
            }}>★</button>
          </div>

          {/* ── SWIPE HINT ── */}
          <div style={{ marginTop:10,display:"flex",gap:60,color:"#444",fontSize:11,letterSpacing:1 }}>
            <span>← PASS</span>
            <span>MANGE →</span>
          </div>

          {/* ── STATS BAR ── */}
          {total > 0 && (
            <div style={{ width:"100%",maxWidth:360,padding:"16px 20px 0",animation:"fadeUp 0.3s ease" }}>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:"#555",marginBottom:5,letterSpacing:1 }}>
                <span style={{color:"#555"}}>{passes.length} passés</span>
                <span style={{color:"#ff6b00"}}>{eatPct}% yummy</span>
                <span style={{color:"#ff6b00"}}>{eats.length} mangés</span>
              </div>
              <div style={{ height:3,background:"#1a1a1a",borderRadius:2,overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${eatPct}%`,background:"linear-gradient(90deg,#ff2200,#ff6b00)",transition:"width 0.6s ease",borderRadius:2 }} />
              </div>
            </div>
          )}
        </>
      ) : (
        /* ── LIST TAB ── */
        <div style={{ width:"100%",maxWidth:440,padding:"20px 20px 60px",overflowY:"auto",flex:1 }}>
          {eats.length === 0 ? (
            <div style={{ textAlign:"center",padding:"60px 0",color:"#444" }}>
              <div style={{fontSize:48,marginBottom:12}}>🍽️</div>
              <div style={{fontSize:14}}>Swipe à droite pour ajouter des plats !</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize:11,color:"#555",letterSpacing:2,textTransform:"uppercase",marginBottom:16 }}>
                {eats.length} plat{eats.length>1?"s":""} dans ta liste
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {eats.map((meal, i) => (
                  <div key={meal.idMeal+i} style={{
                    display:"flex",gap:14,alignItems:"center",
                    background:"#111",borderRadius:14,padding:10,
                    border:"1px solid #1e1e1e",animation:"fadeUp 0.3s ease",
                  }}>
                    <img src={meal.strMealThumb} style={{ width:66,height:66,borderRadius:10,objectFit:"cover",flexShrink:0 }} />
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontWeight:600,fontSize:14,lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{meal.strMeal}</div>
                      <div style={{ display:"flex",gap:6,marginTop:5,flexWrap:"wrap" }}>
                        {meal.strCategory && <span style={{fontSize:10,color:"#ff9944"}}>{meal.strCategory}</span>}
                        {meal.strArea && <span style={{fontSize:10,color:"#555"}}>· {meal.strArea}</span>}
                      </div>
                    </div>
                    <span style={{fontSize:18}}>🔥</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
