const User = require('./userSchema');
const bcrypt = require('bcrypt');
const jwt = require('./jwtController');

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
        if(savedPass){
            bcrypt.compare(data.password, savedPass.password, function(err, response) {
                if(err) throw err;
                else{
                    //Si esta aca tendria que ser valida la contrasenia
                    if(response){
                        console.log(`${data.user} logueado`);
                        return res.json({'ok': true, 'token': jwt.webTokenGen(ultraSecreta), 'user': data.user});
                    }else{
                        console.log(`${data.user} login error`);
                        return res.json({'ok': false, 'error': 'authentication error'});
                    }
                }
            }); 
        }else{
            return res.json({'ok': false, 'error': 'authentication error'});
        }
    
    },

    async checkLogin(req, res){
        const data = req.body;
        const token = req.headers['access-token'];
        if(await userExists(data.user)){
            if(token){
                if(jwt.checkToken(ultraSecreta, token)){
                    return res.json({'ok': true, 'token': jwt.webTokenGen(ultraSecreta), 'user': data.user});
                }else{
                    return res.json({'ok': false, 'error': 'token invalido'});
                }
            }else{
                return res.json({'ok': false, 'error': 'no token'});
            }
        }else{
            return res.json({'ok': false, 'error': 'bad user, hit him'});
        }
    }
};

async function userExists(user){
    var user = await User.findOne({ 'user': user });
    if(user) return true;
    else return false;
};

async function mailExists(mail){
    var mail = await User.findOne({ 'mail': mail });
    if(mail) return true;
    else return false;
};