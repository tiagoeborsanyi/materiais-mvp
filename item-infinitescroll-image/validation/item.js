const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateItem(data) {
    let errors = {};

    data.nome = !isEmpty(data.nome) ? data.nome : '';

    if (Validator.isEmpty(data.nome)) {
        errors.nome = 'Nome é obrigatório';
    }  
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };