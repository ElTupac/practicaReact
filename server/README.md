# Como funciona esto?
## Estando en esta carpeta con los comandos `npm run start` para produccion o `npm run dev` para ir generando cambios a lo largo de la ejecucion.

# Rutas armadas:
## `registrarusuario`: se encarga de registrar usuario, checkea que no haya mismo mail o usuario registrado.
## `loguearusuario`:  compara las credenciales del usuario, en caso de que esten bien devuelve un token de autenticacion al cliente.
## `checkuser`: Solo se encarga de validar el token y el usuario. Faltaria guardarlo en la db junto a las demas credenciales para asegurar que pertenezca a ese usuario.
