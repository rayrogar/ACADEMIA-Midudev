/**
 * Conflictos de edición en tiempo real
 * 
 * En una app colaborativa de edición de texto, múltiples usuarios pueden editar el mismo documento al mismo tiempo. Para 
 * mantener consistencia, el sistema guarda cada cambio con una estructura así:
 * 
 * {
 *   user: "ana",
 *   op: "insert" | "delete",
 *   index: 4,
 *   text: "abc" // solo si es un insert
 * }
 * 
 * Tu misión es implementar una función resolverConflictos que tome dos arrays con los cambios hechos por dos usuarios diferentes y devuelva 
 * el estado final del texto asumiendo que:
 * 
 * -El texto inicial es una cadena vacía "".
 * -Se aplican primero todas las operaciones del primer array (en orden).
 * 
 * Luego, se aplican las del segundo array, pero:
 * -Si una operación apunta a un índice fuera del texto actual, se ignora.
 * -En el caso de insert, si el índice es válido, se inserta el texto (desplazando lo demás).
 * -En el caso de delete, se borra un carácter en el índice dado si existe.
 * 
 * Reglas:
 * 1.El texto comienza vacío.
 * 2.Los índices son relativos al estado actual del texto en ese momento.
 * 3.No se validan índices negativos ni tipos incorrectos.
 * 4.No modificar los arrays originales.
 */ 
 const cambiosA = [
  { user: 'ana', op: 'insert', index: 0, text: 'Hola' },
  { user: 'ana', op: 'insert', index: 4, text: ' mundo' },
  ]
  
  const cambiosB = [
  { user: 'luis', op: 'delete', index: 4 },
  { user: 'luis', op: 'insert', index: 4, text: 'Mundo cruel' },
  ]
  
  console.log(resolverConflictos(cambiosA, cambiosB));
  // => "HolaMundo cruelmundo"

  console.log(resolverConflictos(
    [
        {user: "ana", op: "insert", index: 0, text: "123"},
        {user: "ana", op: "insert", index: 3, text: "456"}
    ],
     [
        {user: "maria", op: "delete", index: 2},
        {user: "maria", op: "insert", index: 2, text: "x"}
    ]));
    // => 12x456

    console.log(resolverConflictos([ { user: "ana", op: "insert", index: 0, text: "abc" } ], [ { user: "luis", op: "delete", index: 1 }, { user: "luis", op: "delete", index: 5 } ]));
    //=> ac

    console.log(resolverConflictos([], [ { user: "lucas", op: "insert", index: 0, text: "Inicio" } ]));
    //=> Inicio

    console.log(resolverConflictos([ { user: "ana", op: "insert", index: 0, text: "wow" } ], [ { user: "bob", op: "delete", index: 0 }, { user: "bob", op: "delete", index: 0 }, { user: "bob", op: "delete", index: 0 } ]));
    //=> ""
 

function resolverConflictos(firstUserChanges, secondUserChanges) {

const ans = [];

for(const {op,index,text} of firstUserChanges){
    if(index >= 0 && index <= ans.length)
        if(op === 'insert')
            ans.splice(index,0, ... text);
        else if(index !== ans.length)
            ans.splice(index ,1);
}

for(const {op,index,text} of secondUserChanges){
    if(index >= 0 && index <= ans.length)
        if(op === 'insert')
            ans.splice(index,0, ... text);
        else if(index !== ans.length)
            ans.splice(index ,1);
}

  return ans.join('');
}