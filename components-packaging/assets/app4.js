import Slider from './slider-v4.js'
import { SliderController, SliderPrevious, SliderNext } from './plugins.js'

const images = ['./assets/img/233397.jpg', './assets/img/419937.jpg', './assets/img/439003.jpg', './assets/img/838132.jpg']
const container = document.querySelector('.slider')
const slider = new Slider({ container, images })
slider.registerSubComponents(SliderController, SliderPrevious, SliderNext)
slider.start()