# language: es
@carrito
Característica: Carrito de compras
  Como cliente de Sauce Demo
  Quiero agregar productos al carrito y revisarlos
  Para decidir qué voy a comprar

  Antecedentes:
    Dado que el usuario ha iniciado sesión como "standard_user"

  @smoke
  Escenario: Agregar un producto al carrito desde la página de productos
    Cuando agrega el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar 1
    Y el botón del producto "Sauce Labs Backpack" debería mostrar "Remove"

  Escenario: Ver los productos agregados en el carrito de compras
    Cuando agrega los siguientes productos al carrito:
      | producto              |
      | Sauce Labs Backpack   |
      | Sauce Labs Bike Light |
    Y abre el carrito
    Entonces el carrito debería contener los siguientes productos:
      | producto              | precio |
      | Sauce Labs Backpack   | $29.99 |
      | Sauce Labs Bike Light | $9.99  |
    Y el contador del carrito debería mostrar 2

  Escenario: Eliminar un producto del carrito
    Cuando agrega el producto "Sauce Labs Onesie" al carrito
    Y abre el carrito
    Y elimina el producto "Sauce Labs Onesie" del carrito
    Entonces el carrito debería estar vacío
