export default function Die(prop) {
  return (
    <button
      style={{
        backgroundColor: prop.isHeld ? "#59E391" : "white",
      }}
      onClick={()=>prop.hold(prop.id)}
      aria-pressed={prop.isHeld}
       aria-label={`die with value ${prop.value},${prop.isHeld ? ' held' : ' not held'}`} 
    >
      {prop.num}
    </button>
  );
}
