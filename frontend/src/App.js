import React from "react";

function App() {
  const sayHello = () => {
    console.log("Hello Console from react App");
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={sayHello}>Click</button>
    </div>
  );
}

export default App;
