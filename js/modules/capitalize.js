function capitalize(str){
  String(str)
  let lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1)
}
export default capitalize