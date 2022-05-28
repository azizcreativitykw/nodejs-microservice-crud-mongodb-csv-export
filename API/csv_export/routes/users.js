const express = require('express');
const {success, error} = require("../utils/response");
const {dbInit} = require("../db/conn");
const router = express.Router();
const {parse} = require('json2csv');
const fs = require("fs");


router.route('/')
    .get(async (req, res) => {
        try {
            const [client, collection] = await dbInit();
            const findResult = await collection.find({}).toArray();
            const fields = ['id', 'name', 'email', 'gender', 'status'];
            const opts = {fields};
            const csv = parse(findResult, opts);
            let unique = new Date().getTime();
            const url = `http://localhost:3000/api/export/export-${unique}.csv`;
            fs.writeFile(`${require('path').resolve(__dirname, '..')}/public/export-${unique}.csv`, csv, 'utf8', function (err) {
                if (err) {
                    error(res, [], err.toString())
                } else {
                    success(res, url, 'CSV exported successfully.');
                    client.close()
                }
            });
        } catch (e) {
            error(res, [], e.toString())
        }
    })

module.exports = router;


