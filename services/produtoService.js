const Produto = require('../models/produtoModel');

const ProdutoService = {
  getAll: async () => {
    return await Produto.findAll();
  },
  getById: async (id) => {
    return await Produto.findByPk(id);
  },
  create: async (nome, descricao, preco, quantidade) => {
    if (preco <= 0) {
      return 'Preço deve ser maior que zero.';
    } else if (quantidade <= 0) {
      return 'Quantidade deve ser maior que zero.';
    }
    const produtoExistente = await Produto.findOne({ where: { nome } });
    if (produtoExistente) {
      return 'Produto já existe';
    }
    return await Produto.create({ nome, descricao, preco, quantidade });
  },
  update: async (nome, descricao, preco, quantidade, id) => {
    if (preco <= 0) {
      return 'Preço deve ser maior que zero.';
    } else if (quantidade <= 0) {
      return 'Quantidade deve ser maior que zero.';
    }

    const produtoExistente = await Produto.findOne({ where: { nome } });
    if (produtoExistente) {
      return 'Já existe produto com esse nome';
    }

    const produtoEncontrado = await Produto.findByPk(id);
    if (!produtoEncontrado) {
      return 'Produto não encontrado';
    }
    return produtoEncontrado.update({ nome, descricao, preco, quantidade });
  },
  delete: async (id) => {
    const produtoEncontrado = await Produto.findByPk(id);
    if (!produtoEncontrado) {
      return 'Produto não encontrado';
    }
    return produtoEncontrado.destroy();
  },
};

module.exports = ProdutoService;
