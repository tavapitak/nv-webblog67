const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const TentController = require('./controllers/TentController');

let multer = require("multer");

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});
let upload = multer({ storage: storage }).array("userPhoto", 10);

module.exports = (app) => {
    // User routes
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);

    // User authentication
    app.post('/login', UserAuthenController.login);

    // Tent routes
    app.post('/tents', TentController.createTent);
    app.get('/tents', TentController.getAllTents);
    app.get('/tents/:id', TentController.getTentById);
    app.put('/tents/:id', TentController.updateTent);
    app.delete('/tents/:id', TentController.deleteTent);

    // Upload file
    app.post("/upload", function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

    // Delete uploaded file
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename);

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete successful");
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to delete the file.'
            });
        }
    });
};
