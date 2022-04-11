var express = require('express');
var router = express.Router();

var db = 'mongodb+srv://nhatthanh:tH1Q6cm2DALowCiK@cluster0.bjchc.mongodb.net/cars?retryWrites=true&w=majority';

const mongoose = require('mongoose')
mongoose.connect(db).catch(error => {
    console.log("co loi say ra" + error)
})

var assCar = new mongoose.Schema({
    name: 'string',
    content: 'string',
    linkPhoto: 'string',
    date: 'string'
})

var CarAss = mongoose.model('CarASS', assCar)

/* GET home page. */
router.get('/', function (req, res, next) {
    CarAss.find({}, function (err, data) {
        res.render('index', {title: 'Home', assData: data});
    })
});

router.get('/add', function (req, res, next) {
    res.render('add');
});
router.get('/update', function (req, res, next) {
    res.render('update', {title: 'update'});
});
router.get('/updateanddelete', function (req, res, next) {
    CarAss.find({}, function (err, data) {
        res.render('updateanddelete', {title: '', assData: data});
    })
});

router.post('/ass-add', function (req, res, next) {

    var name = req.body.name
    var content = req.body.content
    var linkPhoto = req.body.linkPhoto
    var date = req.body.date

    const car = new CarAss({
        name: name,
        content: content,
        linkPhoto: linkPhoto,
        date: date
    })

    car.save(function (error) {
        var message;
        if (error == null) {
            message = 'successfully'
        } else {
            message = error
        }
      console.log(message)
        res.render('add');

    })

});

router.post('/update-car', function (req, res, next) {

    var name = req.body.name
    var content = req.body.content
    var linkPhoto = req.body.linkPhoto
    var date = req.body.date
    var id = req.body.idCar

        res.render('update', {title: 'Update', namecar: name, content: content, linkPhoto: linkPhoto,photoUp:linkPhoto, date: date, id: id});

});

router.post('/ass-update', function (req, res, next) {

    var name = req.body.name
    var content = req.body.content
    var linkPhoto = req.body.linkPhoto
    var date = req.body.date
    var id = req.body.idCar
    console.log(linkPhoto)
    CarAss.updateOne({_id: id}, {name: name, content: content, linkPhoto: linkPhoto, date: date}, function (error) {
        res.render('update', {title: 'Update', namecar: '', content: '', linkPhoto: '',photoUp:linkPhoto, date: '', id: ''});
    })

});

router.post('/delete-car', function (req, res, next) {

    var id = req.body.idCar
    CarAss.deleteOne({_id: id}, function (err) {
    })
    CarAss.find({}, function (err, data) {
        res.render('updateanddelete', {title: '', assData: data});
    })
});
router.get('/API',function (req,res) {
    CarAss.find({}, function (err, data) {
        res.send( data);
    })
})

module.exports = router;
