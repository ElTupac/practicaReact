const jwt = require('jsonwebtoken');
const timeout = 300; //Esto tambien meterlo en el .env con la master key

module.exports = {
    webTokenGen(masterKey){
        const payload = { check: true };
        return jwt.sign(payload, masterKey, {
            expiresIn: timeout
        });
    },

    checkToken(masterKey, token){
        if(token){
            var decoded;

            try {
                decoded = jwt.verify(token, masterKey);
            } catch (error) {
                return false;
            }
            
            if(decoded){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}