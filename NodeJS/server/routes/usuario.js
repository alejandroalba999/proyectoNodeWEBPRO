const express = require('express');
const app = express();
const axios = require('axios');
const { RSA_PKCS1_OAEP_PADDING } = require('constants');


app.post('/create_user', async (req, res) => {

    let JSon = {
        "first_name": req.body.first_name,
        "middle_name": req.body.middle_name,
        "last_name": req.body.last_name,
        "phone_number": req.body.phone_number,
        "address": {
            "city": req.body.city,
            "state": req.body.state
        },
        "email": req.body.email,
        "password": req.body.password,
        "password_confirmation": req.body.password_confirmation
    };

    await axios.post('http://35.167.62.109/storeutags/security/create_account', JSon)
        .then(response => {
            let data = response.data
            if (response.data.status === "error") {
                return res.status(400).json({
                    ok: true,
                    resp: 400,
                    msg: 'error: sucedio un error con la peticion de la api storeUtags',
                    info: {
                        data
                    }
                });
            }


            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Informacion obtenida correctamente de la api storeUtags',
                info: {
                    data
                }
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(200).json({
                msg: "Fallo servicio"
            });

        });
});




module.exports = app;