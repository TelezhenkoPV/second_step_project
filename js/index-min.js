document.addEventListener("DOMContentLoaded",myFunc);let hidden=!0;function myFunc(){const n=document.getElementById("hamburgerButton");n.onmouseover=function(n){if(hidden){document.getElementById("navMenu").classList.toggle("nav-menu--hidden"),hidden=!1}},n.onmouseleave=function(n){hidden=!0},n.ontouchstart=function(){if(hidden){document.getElementById("navMenu").classList.toggle("nav-menu--hidden"),hidden=!1}},n.ontouchend=function(){hidden=!0}}