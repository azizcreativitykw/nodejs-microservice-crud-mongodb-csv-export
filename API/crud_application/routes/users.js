const express = require('express');
const {success, error} = require("../utils/response");
const {dbInit} = require("../db/conn");
const axios = require("axios");
const {ObjectId} = require("mongodb");
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const [client, collection] = await dbInit();
            const findResult = await collection.find({}).toArray();
            success(res, findResult, 'data get successfully.');
            client.close()
        } catch (e) {
            error(res, [], e.toString())
        }
    })
    .post(async (req, res) => {
        const config = {
            method: 'get',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer d229df0075be6cdaef6fccc5bf6b5d9c3d83ff6faeb0a4b94460db40af4f23193'
            }
        };
        try {
            let response = await axios(config);
            if (response.status === 200){
                const [client, collection] = await dbInit();

                const insertResult = await collection.insertMany(response.data);
                success(res, '', insertResult.insertedCount + ' data inserted successfully.');
                client.close()
            } else {
                error(res, [], 'Data does not get successfully from the gorest server.')
            }
        } catch (e) {
            console.log('getUsersFromExternal', e);
            error(res, [], e.toString())
        }
    })
    .put(async (req, res) => {
        const {_id} = req.body;
        try {
            const [client, collection] = await dbInit();
            delete req.body._id
            const updateResult = await collection.updateOne({ _id: ObjectId(_id) }, { $set: {...req.body} });
            success(res, updateResult, 'update successfully.');
            client.close()
        } catch (e) {
            error(res, [], e.toString())
        }
    })

module.exports = router;


