const ProdutoService = require('../services/produtoService');

const getAllProdutos = async (req, res) => {
  try {
    const produtos = await ProdutoService.getAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produtos', error });
  }
};

const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await ProdutoService.getById(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar produto' });
  }
};

const createProduto = async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const resultado = await ProdutoService.create(
      nome,
      descricao,
      preco,
      quantidade,
    );
    if (typeof resultado === 'string') {
      // Se retornar uma string, significa que houve um erro
      return res.status(400).json({ mensagem: resultado });
    }
    res
      .status(201)
      .json({ mensagem: 'Produto criado com sucesso', produto: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: 'Erro ao criar produto', error: error.message });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const resultado = await ProdutoService.update(
      nome,
      descricao,
      preco,
      quantidade,
      id,
    );
    if (typeof resultado === 'string') {
      return res.status(400).json({ mensagem: resultado });
    }
    res
      .status(200)
      .json({ mensagem: 'Produto atualizado com sucesso', produto: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: 'Erro ao atualizar produto', error: error.message });
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await ProdutoService.delete(id);
    if (typeof resultado === 'string') {
      return res.status(400).json({ mensagem: resultado });
    }
    res
      .status(200)
      .json({ mensagem: 'Produto deletado com sucesso', produto: resultado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar produto' });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};
