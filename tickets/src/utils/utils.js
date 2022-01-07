export const messageTransformer = (type, array) => array.map(item => ({
  type,
  content: item.message ?? item
}))