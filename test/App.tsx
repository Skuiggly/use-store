import { useState } from "react";
import { useNumberStore } from "../src/lib/useNumberStore";

function App() {
  const [input, setInput] = useState(0);
  const { numberStore, addToStore, removeFromStore, clearStore } =
    useNumberStore("favorites");
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <h1>notes</h1>
      <input
        type="number"
        onChange={(e) => setInput(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addToStore(input);
          }
        }}
      />
      <div>
        <button onClick={() => addToStore(input)}>add</button>
        <button onClick={clearStore}>clear</button>
      </div>
      <ul style={{ margin: 0 }}>
        {numberStore.map((v, i) => (
          <li key={i}>
            {v}
            <button style={{ color: "red" }} onClick={() => removeFromStore(v)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
