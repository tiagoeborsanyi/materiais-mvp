const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* teste para ver se a coleção aceita tipos diferentes de Number */

// Create Schema
const ItemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    specification: {
        type: String
    },
    codrefproduct: {
        type: String
    },
    packingtype: {
        type: String
    },
    qtdpacking: {
        type: String
    },
    descrition: {
        type: String
    },
    observation: {
        type: String
    },
    imagem: {
        type: String
    },
    qtdestock: {
        type: Number
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = User = mongoose.model('Items', ItemSchema);