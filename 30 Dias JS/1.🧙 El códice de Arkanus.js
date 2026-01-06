/**
 * 🧙 El códice de Arkanus
 * 
 * Naira, una aprendiz de hechicera, ha encontrado un antiguo códice en las ruinas de Arkanus. Este códice está lleno de símbolos arcanos que, 
 * según los manuscritos, ocultan un poderoso conjuro olvidado. Para descifrar el conjuro, debe interpretar correctamente los símbolos según un 
 * antiguo sistema numérico mágico.
 * 
 * Estos son los símbolos conocidos y sus equivalencias:
 * 
 * Símbolo	Valor
 * ☽	1
 * ☾	5
 * ♁	10
 * ⚕	50
 * ⚡	100
 * Pero cuidado: la energía mágica es caprichosa. Si un símbolo de menor valor aparece justo antes que uno de mayor valor, su energía se resta 
 * en lugar de sumarse.
 * 
 * Debes crear una función que reciba una cadena con los símbolos y retorne su valor numérico total. Si encuentras un símbolo desconocido, el 
 * conjuro se corrompe, y la función debe devolver NaN.

Convierte números a letras según:

Casos de Prueba:
 */

console.log(decodeSpell('☽☽☽')); // 3
console.log(decodeSpell('☽☾')); // 4 (5 - 1)
console.log(decodeSpell('☾☽')); // 6 (5 + 1)
console.log(decodeSpell('☾☽☽☽')); // 8 (5 + 3)
console.log(decodeSpell('☽☽☽⚡')); // 101 (1 + 1 + (100 - 1))
console.log(decodeSpell('☽⚕')); // 49 (50 - 1)
console.log(decodeSpell('☽☽☾')); // 5 (1 + (5 - 1))
console.log(decodeSpell('☽☽☾⚡')); // 95 (1 + (-1 + (100 - 5)))
console.log(decodeSpell('☽⚕⚡')); // 49 (-1 - 50 + 100)
console.log(decodeSpell('⚡⚡⚡')); // 300
console.log(decodeSpell('⚕⚡')); // 50
console.log(decodeSpell('⚕.♒')); // NaN

function decodeSpell(spell) {
 
const symbols = ['☽','☾','♁','⚕','⚡'];
const values = [1,5,10,50,100];

  let lastSymbol = spell[0];
  let lastSymbolIndex = symbols.indexOf(lastSymbol); 

  if(lastSymbolIndex === -1 || lastSymbolIndex < 0)
    return NaN;

  let energy = values[lastSymbolIndex];
 
  for(let i = 1; i < spell.length; i++)
    {
        const currSymbolIndex = symbols.indexOf(spell[i]);

        if(currSymbolIndex < 0)
            return NaN;
        
        if(spell[i]===lastSymbol)
            energy += values[currSymbolIndex];
        else {
            const newSymbolValue = values[currSymbolIndex];
            const lastValue = values[lastSymbolIndex];
            energy += newSymbolValue ;
            if(newSymbolValue > lastValue)
                energy -= lastValue * 2;
             lastSymbol = spell[i];
             lastSymbolIndex = currSymbolIndex;
          }
    }
  return energy;
}