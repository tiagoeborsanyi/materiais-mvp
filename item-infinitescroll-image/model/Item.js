const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* teste para ver se a coleção aceita tipos diferentes de Number */

// Create Schema
const ItemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    imagem: {
        type: String
    },
    model: {
        type: String
    },
    brand: {
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
    qtdestock: {
        type: Number
    },
    descrition: {
        type: String
    },
    observation: {
        type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = User = mongoose.model('Items', ItemSchema);