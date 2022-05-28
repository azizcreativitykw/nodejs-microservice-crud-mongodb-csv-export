const success = (res, data, msg) => {
    return res.status(200).send({
        status: 'success',
        data: data,
        msg: msg
    })
}

const error = (res, data, msg) => {
    return res.status(400).send({
        status: 'error',
        data: data,
        msg: msg
    })
}

module.exports = {success, error}
