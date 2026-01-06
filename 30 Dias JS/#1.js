/** 🧙 El códice de Arkanus
 * Solución Optimizada: Enfoque "Derecha a Izquierda" con Mapa Hash
 */

console.log(decodeSpellOptimized('☽☽☽')); // 3
console.log(decodeSpellOptimized('☽☾')); // 4 (5 - 1)
console.log(decodeSpellOptimized('☾☽')); // 6 (5 + 1)
console.log(decodeSpellOptimized('☾☽☽☽')); // 8 (5 + 3)
console.log(decodeSpellOptimized('☽☽☽⚡')); // 101 (1 + 1 + (100 - 1))
console.log(decodeSpellOptimized('☽⚕')); // 49 (50 - 1)
console.log(decodeSpellOptimized('☽☽☾')); // 5 (1 + (5 - 1))
console.log(decodeSpellOptimized('☽☽☾⚡')); // 95 (1 + (-1 + (100 - 5)))
console.log(decodeSpellOptimized('☽⚕⚡')); // 49 (-1 - 50 + 100)
console.log(decodeSpellOptimized('⚡⚡⚡')); // 300
console.log(decodeSpellOptimized('⚕⚡')); // 50
console.log(decodeSpellOptimized('⚕.♒')); // NaN

function decodeSpellOptimized(spell) {
    // 1. Mapa para acceso instantáneo O(1)
    const symbolMap = {
        '☽': 1,
        '☾': 5,
        '♁': 10,
        '⚕': 50,
        '⚡': 100
    };

    // Validación temprana: Cadena vacía
    if (!spell) return 0;

    let totalEnergy = 0;
    let maxValSeen = 0; // El valor más alto visto hasta ahora (desde la derecha)

    // 2. Recorremos el hechizo desde el final hacia el principio
    for (let i = spell.length - 1; i >= 0; i--) {
        const currentSymbol = spell[i];
        const currentValue = symbolMap[currentSymbol];

        // Validación: Si el símbolo no existe en el mapa, devolvemos NaN
        if (currentValue === undefined) {
            return NaN;
        }

        // 3. Lógica Núcleo:
        // Si el valor actual es menor que el valor máximo que hemos visto a su derecha,
        // significa que es un valor sustractivo (ej: I antes de V).
        if (currentValue < maxValSeen) {
            totalEnergy -= currentValue;
        } else {
            // Si es mayor o igual, se suma y se actualiza el "máximo visto"
            totalEnergy += currentValue;
            maxValSeen = currentValue;
        }
    }

    return totalEnergy;
}