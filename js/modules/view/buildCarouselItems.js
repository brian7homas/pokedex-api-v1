import capitalize from '../capitalize.js'
function buildCarouselItems(details){
  let checkForActiveClass = document.querySelector('.carousel-item');
  let itemHook = document.querySelector('.carousel-inner')
  let name = details.name;
  let img = details.imgUrl;
  name = capitalize(name)
  
  // showLoadingMessage('.main-img')
  
  let item = `<div class="carousel-item">
    <img class="d-block w-100 h-100 main-img" src="${img}" alt="${name} slide">
    <div class="carousel-caption d-xs-block mb-5">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" onclick="repository.getInfo()">
        ${name}
      </button>
    </div>
  </div>`
  
  itemHook.insertAdjacentHTML('beforeend', item)
  
  
    if(!checkForActiveClass){
      //IF THERE IS NO ACTIVE CLASS -- SET ONE
      document.querySelector('.carousel-item').classList.add('active')
    }
}
export default buildCarouselItems;