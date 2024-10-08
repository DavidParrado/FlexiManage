// Función reutilizable de Bubble Sort para cualquier tipo de arreglo
export const bubbleSort = <T>(
  arr: T[],
  compare: (a: T, b: T) => boolean
): T[] => {
  const sortedArray = [...arr]; // Crear una copia para no mutar el arreglo original
  for (let i = 0; i < sortedArray.length - 1; i++) {
    for (let j = 0; j < sortedArray.length - i - 1; j++) {
      if (compare(sortedArray[j], sortedArray[j + 1])) {
        // Intercambiar elementos
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }
    }
  }
  return sortedArray;
};

// Función reutilizable de QuickSort para cualquier tipo de arreglo
export const quickSort = <T>(
  arr: T[],
  compare: (a: T, b: T) => boolean
): T[] => {
  if (arr.length <= 1) {
    return arr; // Caso base: Si el arreglo tiene 1 o 0 elementos, ya está ordenado
  }

  const pivot = arr[arr.length - 1]; // Seleccionamos el último elemento como pivote
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    // Usamos la función de comparación proporcionada
    if (compare(arr[i], pivot)) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }

  // Recursión: Ordenar los arreglos izquierdo y derecho, luego concatenar
  return [...quickSort(left, compare), pivot, ...quickSort(right, compare)];
};

// Función reutilizable de Selection Sort para cualquier tipo de arreglo
export const selectionSort = <T>(arr: T[], compare: (a: T, b: T) => boolean): T[] => {
  const sortedArray = [...arr];  // Crear una copia del arreglo para no mutar el original
  
  for (let i = 0; i < sortedArray.length - 1; i++) {
    let minIndex = i;
    
    // Buscar el elemento mínimo en el resto del arreglo
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (compare(sortedArray[minIndex], sortedArray[j])) {
        minIndex = j;  // Actualizar índice del elemento mínimo
      }
    }
    
    // Intercambiar el elemento mínimo con el primer elemento desordenado
    if (minIndex !== i) {
      const temp = sortedArray[i];
      sortedArray[i] = sortedArray[minIndex];
      sortedArray[minIndex] = temp;
    }
  }

  return sortedArray; // Retornar el arreglo ordenado
};

