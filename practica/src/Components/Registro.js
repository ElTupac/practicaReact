import React, {Component} from 'react';

class Registro extends Component{
    confirmacionRegistro(evento){
        evento.preventDefault();
        document.getElementById("noCoinciden").style.display = "none";
        
        if(this.password.value == this.password2.value){
            const datos = {
                'user': this.userName.value,
                'password': this.password.value,
                'mail': this.mail.value
            }
        }else{
            document.getElementById("noCoinciden").style.display = "block";
        }
    }
    


    render(){
        return <div className='centeredContainer'>
            <h1 className='h1Tittle'>Registrarse</h1>
            <form onSubmit={this.confirmacionRegistro.bind(this)}>
                <input type='text' placeholder='Nombre de usuario' required ref={node => this.userName = node}/>
                <input type='password' placeholder='Nueva contrasenia' required ref={node => this.password = node}/>
                <input type='password' placeholder='Repita la contrasenia' required ref={node => this.password2 = node}/>
                <p className="alerta" id="noCoinciden">No coinciden las contrasenias</p>
                <input type="email" placeholder="Ingresa un mail" required ref={node => this.mail = node}/>
                <button>Registrar</button>
            </form>
        </div>
    }
}

export default Registro;