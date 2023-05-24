import produtos from "../../data/produtos";
import { useState } from 'react';

const Pedido = () => {
  const [pedido, setPedido] = useState({});
  const [valor, setValor] = useState(0);

  function adicionarProduto(event) {
    const index = parseInt(event.target.dataset.index);
    const nomeProduto = event.target.dataset.nome;
    setPedido((prevValue) => {
      const chave = `${nomeProduto}-${index}`;
      if (chave in prevValue) {
        return {
          ...prevValue,
          [chave]: prevValue[chave] + 1,
        };
      } else {
        return {
          ...prevValue,
          [chave]: 1,
        };
      }
    });
    setValor((prevValue) => prevValue + produtos[event.target.dataset.categoria][index].preco);
  }
  
  function decrementarProduto(event) {
    const index = parseInt(event.target.dataset.index);
    const nomeProduto = event.target.dataset.nome;
    setPedido((prevValue) => {
      const chave = `${nomeProduto}-${index}`;
      if (prevValue[chave] > 1) {
        return {
          ...prevValue,
          [chave]: prevValue[chave] - 1,
        };
      } else {
        const updatedPedido = { ...prevValue };
        delete updatedPedido[chave];
        return updatedPedido;
      }
    });
    setValor((prevValue) => prevValue - produtos[event.target.dataset.categoria][index].preco);
  }
  
  function displayProduto(produtos, categoria) {
    return produtos.map((elemento, index) => (
      <li key={`${elemento.nome}-${index}`}>
        {elemento.nome} - R${elemento.preco.toFixed(2)}
        {pedido[`${elemento.nome}-${index}`] ? (
          <>
            <button onClick={decrementarProduto} data-nome={elemento.nome} data-index={index} data-categoria={categoria}>
              -
            </button>
            <span>{pedido[`${elemento.nome}-${index}`]}</span>
            <button onClick={adicionarProduto} data-nome={elemento.nome} data-index={index} data-categoria={categoria}>
              +
            </button>
          </>
        ) : (
          <button onClick={adicionarProduto} data-nome={elemento.nome} data-index={index} data-categoria={categoria}>
            Adicionar
          </button>
        )}
      </li>
    ));
  }

  function enviarPedidoWhatsapp() {
    let mensagem = "Cliente escolheu:\n";
    Object.keys(pedido).forEach((chave) => {
      const [nomeProduto] = chave.split("-");
      const quantidade = pedido[chave];
      mensagem += `${nomeProduto}: ${quantidade}\n`;
    });
    mensagem += "Valor total: R$ " + valor.toFixed(2);
  
    const numeroWhatsApp = "5562994357455";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp);
  }
  
  console.log(valor)
  console.log(pedido)
  return (
    <section id="pedido">
      <div className="bolo-no-pote">
        <h2>Bolo no Pote</h2>
        <ul>{displayProduto(produtos.bolosNoPote, "bolosNoPote")}</ul>
      </div>
      <div className="trufa-tradicional">
        <h2>Trufas</h2>
        <ul>{displayProduto(produtos.trufasTradicionais, "trufasTradicionais")}</ul>
      </div>
      <div className="trufa-personalizada">
        <h2>Trufas Personalizadas</h2>
        <ul>{displayProduto(produtos.trufasPersonalizadas, "trufasPersonalizadas")}</ul>
      </div>
      <div className="tortas">
        <h2>Tortas</h2>
        <ul>{displayProduto(produtos.tortas, "tortas")}</ul>
      </div>
      <div className="tortas-personalizadas">
        <h2>Tortas Personalizadas</h2>
        <ul>{displayProduto(produtos.tortaPersonalizadas, "tortaPersonalizadas")}</ul>
      </div>

      <button onClick={enviarPedidoWhatsapp}>Enviar via WhatsApp</button>
    </section>
  );
};

export default Pedido;
