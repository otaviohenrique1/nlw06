import React from 'react';
import { ReactNode } from 'react';
function App() {
  return (
    <div>
      <h1 >Ola mundo</h1>
      {/* <a href="" target="_blank"></a> */}
      <Botao2>
        <Botao/>
      </Botao2>
    </div>
  );
}

export default App;

function Botao() {
  return (
    <button style={styles}>Teste</button>
  );
}

const styles: React.CSSProperties = {
  color: 'red',
  backgroundColor: 'lightblue'
};

type BotaoProps = { 
    children: ReactNode;
}

function Botao2(props: BotaoProps) {
  return (
    <div style={{ backgroundColor: 'lightblue' }}>{props.children}</div>
  );
}