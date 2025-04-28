/*!

=========================================================
* Material Kit 3 - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-design-system
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

// initialization of Popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

// initialization of Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// helper for adding on all elements multiple attributes
function setAttributes(el, options) {
  Object.keys(options).forEach(function(attr) {
    el.setAttribute(attr, options[attr]);
  })
}

// activate popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

// activate tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Tabs navigation

