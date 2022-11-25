const Joi = require('joi');
const securityConsts = require('../consts/security-consts');
const md5 = require('../utils/md5-pass');
const knl = require('../knl');

knl.post('grupo', async(req, resp) => {
    const schema = Joi.object({
        description : Joi.string().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.grupo.findAll({
        where : {
            description : req.body.description
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.grupo.build({
        description : req.body.description,
        status   : 1
    });

    await user.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('grupo', async(req, resp) => {

    const result = await knl.sequelize().models.grupo.findAll({
        where : {
            status: 1
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('grupo/:id', async(req, resp) => {

    const result = await knl.sequelize().models.grupo.findAll({
        where : {
            id : req.params.id
        }
    });
    console.log(result);
    resp.json(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.put('grupo/:id', async(req, resp) => {
    
    const result = await knl.sequelize().models.grupo.put({
        where : {
            id: req.body.id
        }
    });

    resp.send(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.delete('grupo/:id', async(req, resp) => {

    const result = await knl.sequelize().models.grupo.destroy({
        where : {
            id: req.params.id
        }
    });

    resp.json(result);
    console.log(result);
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)

knl.patch('grupo/:id', async(req, resp) => {

    const result = await knl.sequelize().models.grupo.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });

    resp.json(result)
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC)