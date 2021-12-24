export const moveInsideAnArray = ({ state, source, destination }) => {
  const sInd = +source.droppableId
  const list = state[sInd]
  const startIndex = source.index
  const endIndex = destination.index

  const changedList = Array.from(list)
  const [removed] = changedList.splice(startIndex, 1)
  changedList.splice(endIndex, 0, removed)

  const result = [...state]
  result[sInd] = changedList.map((item, index) => ({ ...item, index }))

  return result
}

export const moveInsideAnArrayOfArrays = ({
  state,
  sInd,
  dInd,
  source,
  destination,
}) => {
  const sourceClone = Array.from(state[sInd])
  const destClone = Array.from(state[dInd])
  const [removed] = sourceClone.splice(source.index, 1)

  destClone.splice(destination.index, 0, removed)

  const result = [...state]
  result[sInd] = sourceClone.map((item, index) => ({ ...item, index }))
  result[dInd] = destClone.map((item, index) => ({ ...item, index }))

  return result
}

export const debounce = (fn, ms = 1000) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}
