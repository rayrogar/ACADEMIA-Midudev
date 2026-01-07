/**
 * Conflictos de edición en tiempo real
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

        // Función auxiliar para aplicar una sola operación 
        const fullText = (userChanges) => {
            for(const {op,index,text} of userChanges){
                if(index >= 0 && index <= ans.length)
                    if(op === 'insert')
                        ans.splice(index,0, ... text);
                    else if(index !== ans.length)
                        ans.splice(index ,1);
                }    
            }

            fullText(firstUserChanges);
            fullText(secondUserChanges)
            return ans.join('');

}