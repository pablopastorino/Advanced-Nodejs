exports.logProperties = object => {
  console.log(`/* ------------------------------- Properties ------------------------------- */`)
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(object))
  props.forEach(p => console.log(p, object[p]))
}
