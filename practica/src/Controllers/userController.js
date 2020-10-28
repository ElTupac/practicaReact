const URL = "http://186.13.4.194:8000/";

module.exports = {
    createUser(user, mail, password) {
        return fetch(`${URL}nuevousuario`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: `${user}`,
                mail: `${mail}`,
                password: `${password}`
            })
        }).then(res => res.json());
    },

    loginUser(user, password) {
        return fetch(`${URL}loguearusuario`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: `${user}`,
                password: `${password}`
            })
        }).then(res => res.json());
    },

    checkLogin(token, user){
        return fetch(`${URL}checkuser`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "access-token": `${token}`
            },
            body: JSON.stringify({user: `${user}`})
        }).then(res => res.json());
    }
}