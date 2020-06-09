function toRows(list: any[], rowSize: number = 3) {
  const rows = []
  let k
  
  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % rowSize === 0) {
      k++
      rows[k] = []
    }

    rows[k].push(list[i])
  }

  return rows
}

export default toRows
