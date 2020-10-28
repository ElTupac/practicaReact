import React, {Component} from 'react';
const User = require('../Controllers/userController');

class Login extends Component{
    loginUser(evento){
        evento.preventDefault();
        document.getElementById('botonLogin').disabled = true;

        const datos = {
            'user': this.userName.value,
            'password': this.password.value
        }

        User.loginUser(datos.user, datos.password).then(res => {
            if(res.ok){
                alert("Logueado prro");
                const credenciales = {
                    'user': res.user,
                    'token': res.token
                }

                localStorage.setItem('credenciales', JSON.stringify(credenciales));
            }else{
                document.getElementById("noCoinciden").style.display = "block";
                document.getElementById('botonLogin').disabled = false;
            }
        });
    }

    render(){
        var credenciales = localStorage.getItem('credenciales');
        if(credenciales){
            credenciales = JSON.parse(credenciales);
            User.checkLogin(credenciales.token, credenciales.user).then(res => {
                if(res.ok){
                    console.log(res);
                    credenciales.token = res.token;
                    localStorage.setItem('credenciales', JSON.stringify(credenciales));
                    document.getElementById('botonLogin').disabled = true;
                    alert("Logueado prro");
                }else{
                    localStorage.removeItem('credenciales');
                }
            });
        }

        return <div className='centeredContainer'>
            <h1 className='h1Tittle'>Login</h1>
            <form onSubmit={this.loginUser.bind(this)}>
                <input type='text' placeholder='Nombre de usuario' required ref={node => this.userName = node}/>
                <input type='password' placeholder='Contrasenia' required ref={node => this.password = node}/>
                <p className="alerta" id="noCoinciden">Credenciales incorrectas</p>
                <button id='botonLogin'>Entrar</button>
            </form>
        </div>
    }
}

export default Login;