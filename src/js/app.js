import 'regenerator-runtime';

//import {ScrollToPlugin} from 'gsap/all';
//import TweenLite from 'gsap';
//import TimelineLite from 'gsap';
//const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build

import pageLoader from './page-loader';

window.addEventListener('load', () => {

  pageLoader(); // fire scripts for loaded page

});
