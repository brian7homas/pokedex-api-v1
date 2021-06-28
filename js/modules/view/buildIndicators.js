function buildIndicators(details, index){
  // showLoadingMessage('.carousel-indicators', 'indicators')
  let indicatorHook = document.querySelector('.carousel-indicators')
  // hideLoadingMessage('indicators')
  let carouselIndicators = `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="carousel-indicator"><img class="indicator-img w-100" src="${details.png}" alt="${details.name}"/></li>`;
  
  indicatorHook.insertAdjacentHTML('beforeend', carouselIndicators)
}
export default buildIndicators;