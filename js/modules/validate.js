import data  from './data.js';

function validate(item){
  const pokemon = typeof(item);
  let itemKeys = Object.keys(item);
  // let detailsKeys = Object.keys(pokemonDetails[0]);
  
  
  switch(pokemon){
    case 'array':
      console.log('This is an array')
      break;
    case 'object':
      // console.log('This is an object')
      itemKeys.forEach((key, i) => {
        if(key != data.detailsKeys[i]){
          document.write(`'keys need to match [${detailsKeys}] <br>`);
          throw new Error(`'keys need to match [${detailsKeys}] <br>`)
        }
      });
      return item;
      // break;
    case 'string':
        console.log('This is an string')
        break;
    case 'number':
      console.log('This is an number')
      break;
    case 'boolean':
      console.log('This is an bool')
      break;
    case 'undefined':
        console.log('You need to pass something')
        break;
    default:
      console.log('this is a ' + pokemon)
  }
}
function addData(item){
  console.log('success')
  data.data.push(item);
}
export default {validate, addData}