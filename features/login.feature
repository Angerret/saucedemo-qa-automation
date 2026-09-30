# language: es
@login
Característica: Inicio de sesión en Sauce Demo
  Como cliente de Sauce Demo
  Quiero iniciar sesión con mis credenciales
  Para acceder al catálogo de productos

  Antecedentes:
    Dado que el usuario está en la página de login

  @smoke @positivo @standard_user
  Escenario: Inicio de sesión exitoso con usuario estándar
    Cuando inicia sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces debería ver la página de productos

  @negativo @locked_out_user
  Escenario: Un usuario bloqueado no puede iniciar sesión
    Cuando inicia sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Entonces debería ver el mensaje de error "Epic sadface: Sorry, this user has been locked out."
    Y debería permanecer en la página de login

  @negativo
  Esquema del escenario: Inicio de sesión fallido - <caso>
    Cuando inicia sesión con usuario "<usuario>" y contraseña "<password>"
    Entonces debería ver el mensaje de error "<mensaje>"
    Y debería permanecer en la página de login

    Ejemplos:
      | caso                  | usuario       | password     | mensaje                                                                   |
      | contraseña incorrecta | standard_user | clave_mala   | Epic sadface: Username and password do not match any user in this service |
      | usuario inexistente   | usuario_falso | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | usuario vacío         |               | secret_sauce | Epic sadface: Username is required                                        |
      | contraseña vacía      | standard_user |              | Epic sadface: Password is required                                        |
