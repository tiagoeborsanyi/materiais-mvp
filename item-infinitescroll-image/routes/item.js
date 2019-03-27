const express = require('express');
const router = express.Router();

// Load models
const Item = require('../model/Item');

// Load validations
const validateItem = require('../validation/item');



// @route   GET api/item/test
// @desc    Tests item route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'API Item Works' }));

// @route   GET api/item
// @desc    Get items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .skip(+req.query.start)
        .limit(+req.query.count)
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ noitemsfound: 'No items found' }));
});

// @route   GET api/item/upload
// @desc    Get items files
// @access  Public
router.post('/upload', (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log('files: ', __dirname);
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  const local = '/home/tiago/Documentos/Projetos/materiais-mvp/item-infinitescroll-image/client/src/assests/';
  uploadFile.mv(
    `${local}${fileName}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        name: fileName
      });
    });
});

// @route   POST api/item
// @desc    Create item
// @access  Public
router.post(
    '/',
    (req, res) => {
      const { errors, isValid } = validateItem(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
      //console.log(req.body);
      const tempItem = {
        name: req.body.nome,
        imagem: req.body.imagem,
        model: req.body.modelo,
        brand: req.body.marca,
        specification: req.body.especificacao,
        codrefproduct: req.body.codigo,
        packingtype: req.body.tipodepacote,
        qtdpacking: req.body.quantidadepacote,
        descrition: req.body.descricao,
        observation: req.body.observacao
      }
  
      const newItem = new Item(tempItem);

      const _id = req.body._id;
      if (_id) {
        // Update
        Item.findByIdAndUpdate(
            { _id },
            { $set: tempItem }
        ).exec().then(item => res.status(200).json(tempItem));
      } else {
        newItem.save().then(item => res.json(item));
      }      
    }
);

// @route   GET api/item/:id
// @desc    Get item by id
// @access  Public
router.get(
  '/:id', 
  (req, res) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err =>
        res.status(404).json({ itemnotfound: 'Item não encontrado' })
      );
});

// @route   DELETE api/item/:id
// @desc    Delete item
// @access  Public
router.delete(
  '/:id',
  (req, res) => {
      Item.findById(req.params.id)
        .then(item => {
          // Delete
          item.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ itemnotfound: 'Item não encontrado' }));
  });


module.exports = router;