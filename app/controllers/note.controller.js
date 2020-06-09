const db = require("../models");
const Note = db.notes;

// Get all data
exports.findAll  = (req, res) => {
    Note.find()
        .then(result => {
            res.send({
                status: 'success',
                message: 'Successfully fetch data!',
                data: result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something error!"
            })
        })
};

// Create new data
exports.create = (req, res) => {
    if (!req.body.title || !req.body.title) {
        res.status(400).send({message: "Title and content must be filled"});
        return;
    }

    const requestBody = req.body;
    const note = new Note({
        title: requestBody.title,
        content: requestBody.content
    });

    note
        .save(note)
        .then(result => {
            res.send({
                status: 'success',
                message: 'Successfully added data!',
                data: result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something error!"
            })
        })
};

// Get single data
exports.findById = (req, res) => {
    const id = req.params.id;

    Note.findById(id)
        .then(result => {
            res.send({
                status: 'success',
                message: 'Successfully get a data!',
                data: result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something error!"
            })
        })
};

// Update data
exports.update = (req, res) => {
    if (!req.body.title || !req.body.title) {
        res.status(400).send({message: "Title and content must be filled"});
        return;
    }

    const id = req.params.id;

    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(result => {
            if (!result) {
                res.status(404).send({
                    status: 'failed',
                    message: 'Unable to retrieve the item!',
                });
            } else {
                res.send({
                    status: 'success',
                    message: 'Successfully updated data!',
                    data: result
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something error!"
            })
        });
};

// Delete data
exports.delete = (req, res) => {
    const id = req.params.id;

    Note.findByIdAndRemove(id)
        .then(result => {
            if (!result) {
                res.status(404).send({
                    status: 'failed',
                    message: 'Unable to retrieve the item!',
                });
            } else {
                res.send({
                    status: 'success',
                    message: 'Successfully deleted data!',
                    data: result
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something error!"
            })
        });
};

// Delete all data
exports.deleteAll = (req, res) => {
    Note.deleteMany({})
        .then(result => {
            res.send({
                status: 'success',
                message: 'Successfully deleted all data!',
            })
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something error!"
            })
        })
};
