import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [disponivel, setDisponivel] = useState(true);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
    setProdutos(produtosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  const handleAdicionarProduto = (e) => {
    e.preventDefault();

    if (!nome || !valor) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome,
      descricao,
      valor: parseFloat(valor),
      disponivel,
    };

    setProdutos([...produtos, novoProduto]);
    limparFormulario();
  };

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setValor("");
    setDisponivel(true);
  };

  const handleExcluirProduto = (id) => {
    const novosProdutos = produtos.filter((produto) => produto.id !== id);
    setProdutos(novosProdutos);
  };

  return (
    <div className="App">
      <h2>Gerenciamento de Produtos</h2>

      <div id="product-list">
        <h3>Listagem de Produtos:</h3>
        <ProductList
          produtos={produtos}
          onExcluirProduto={handleExcluirProduto}
        />
      </div>

      <div id="product-form">
        <h3>Cadastro de Produto:</h3>
        <ProductForm
          nome={nome}
          descricao={descricao}
          valor={valor}
          disponivel={disponivel}
          setNome={setNome}
          setDescricao={setDescricao}
          setValor={setValor}
          setDisponivel={setDisponivel}
          onAdicionarProduto={handleAdicionarProduto}
        />
      </div>
    </div>
  );
}

function ProductList({ produtos, onExcluirProduto }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.nome}</td>
            <td>R$ {produto.valor.toFixed(2)}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => onExcluirProduto(produto.id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProductForm({
  nome,
  descricao,
  valor,
  disponivel,
  setNome,
  setDescricao,
  setValor,
  setDisponivel,
  onAdicionarProduto,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAdicionarProduto(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="nome">Nome do Produto:</label>
      <input
        type="text"
        id="nome"
        name="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label htmlFor="descricao">Descrição:</label>
      <input
        type="text"
        id="descricao"
        name="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <label htmlFor="valor">Valor:</label>
      <input
        type="number"
        id="valor"
        name="valor"
        step="0.01"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />

      <label htmlFor="disponivel">Disponível para venda:</label>
      <select
        id="disponivel"
        name="disponivel"
        value={disponivel}
        onChange={(e) => setDisponivel(e.target.value === "true")}
      >
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>

      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}

export default App;
