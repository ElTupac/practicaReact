const User = require('./userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ultraSecreta = 'papurro'; //Despues dejarla en un .env por fuera

module.exports = {
    async nuevoUsuario(req, res){
        var data = req.body;

        if(await userExists(data.user)){
            return res.json({'notUser': true});
        }else if(await mailExists(data.mail)){
            return res.json({'notMail': true});
        }else{
            var password;
            bcrypt.genSalt(10, (err, salt) => {
                if(err){
                    console.log(err);
                    return res.json({'error': 'salt generation failed'})
                }else{
                    bcrypt.hash(data.password, salt, (err, hash) => {
                        if(err) {
                            console.log(err);
                            return res.json({'error': 'hashing comparing failed'});
                        }else {
                            password = hash;
                            if(password){
                                var usuario = new User({
                                    user: data.user,
                                    mail: data.mail,
                                    password: password
                                });
                    
                                usuario.save(usuario);
                                console.log(`Creado ${data.user}`);
                                return res.json(data.user);
                            }else{
                                return res.json({'error': 'Server error'});
                            }
                        }
                    });
                }
            });
        }
    },

    async loguearUsuario(req, res){
        var data = req.body;
        const savedPass = await User.findOne({ 'user': data.user }, 'password');
        //Usar este bloque para comparar la contrasenia con la guardada en el server
        bcrypt.compare(data.password, savedPass.password, function(err, response) {
            if(err) throw err;
            else{
                //Si esta aca tendria que ser valida la contrasenia
                if(response){
                    console.log(`${data.user} logueado`);
                    return res.json({'ok': true, 'token': webTokenGen(ultraSecreta)});
                }else{
                    console.log(`${data.user} login error`);
                    return res.json({'ok': false, 'error': 'authentication error'});
                }
            }
        }); 

        return res.status(200);
    }
}

async function userExists(user){
    var user = await User.findOne({ 'user': user });
    if(user) return true;
    else return false;
}

async function mailExists(mail){
    var mail = await User.findOne({ 'mail': mail });
    if(mail) return true;
    else return false;
}

function webTokenGen(masterKey){
    const payload = { check: true };
    return jwt.sign(payload, masterKey, {
        expiresIn: 60
    });
}