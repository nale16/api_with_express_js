"use strict";

const userRoutes = (app, fs) => {

    // req data.json
    const dataPath = './json/data.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // List Data : GET
    app.get('/books', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // Tambah Data : POST
    app.post('/books', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            // Tambah Data
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({ "msg" : "Tambah Buku Berhasil" }));
            });
        },
            true);
    });


    // Update Data : PUT
    app.put('/books/:id', (req, res) => {

        readFile(data => {

            // Perbaharui Data
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({ "msg" : "Data Berhasil Diperbaharui" }));
            });
        },
            true);
    });


    // Hapus Data : DELETE
    app.delete('/books/:id', (req, res) => {

        readFile(data => {

            // Delete Data
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({ "msg" : "Data Berhasil Dihapus" }));
            });
        },
            true);
    });
};

module.exports = userRoutes;