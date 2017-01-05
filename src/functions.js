export const compareArray = (current, prev) => {
  let missing = undefined,
    i = 0,
    lenC = current.length
  for ( ; i < lenC; i++ ) {
    if ( prev.indexOf(current[i]) == -1 ) {
      missing = current[i]
      return {status: false, value: missing}
    }
  }
  return {status: true}
}

export const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
