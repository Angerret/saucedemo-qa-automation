# language: es
@checkout
Característica: Proceso de compra
  Como cliente de Sauce Demo
  Quiero completar el proceso de compra
  Para adquirir los productos que necesito

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"
    Y agrega el producto "Sauce Labs Backpack" al carrito
    Y abre el carrito

  @smoke @e2e
  Escenario: Completar una compra hasta la confirmación
    Cuando procede al checkout
    Y completa la información de envío con nombre "Juan", apellido "Pérez" y código postal "15001"
    Entonces debería ver el resumen de la orden con el producto "Sauce Labs Backpack"
    Y el total de la orden debería calcularse correctamente
    Cuando finaliza la compra
    Entonces debería ver el mensaje de confirmación "Thank you for your order!"
    Y el carrito debería estar vacío

  @negativo
  Esquema del escenario: No se puede continuar el checkout sin datos obligatorios - <caso>
    Cuando procede al checkout
    Y completa la información de envío con nombre "<nombre>", apellido "<apellido>" y código postal "<codigo>"
    Entonces el formulario de envío debería mostrar el error "<mensaje>"

    Ejemplos:
      | caso                | nombre | apellido | codigo | mensaje                        |
      | nombre vacío        |        | Pérez    | 15001  | Error: First Name is required  |
      | apellido vacío      | Juan   |          | 15001  | Error: Last Name is required   |
      | código postal vacío | Juan   | Pérez    |        | Error: Postal Code is required |
