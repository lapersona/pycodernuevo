"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
        HERO HOMEPAGE SLIDER
    ===================================================== */
    var homepageSlider = new Swiper(".homepage-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        TESTIMONIALS SLIDER
    ===================================================== */
    var testimonialsSlider = new Swiper(".testimonials-slider", {
        slidesPerView: 1,
        spaceBetween: 10,

        breakpoints: {
            761: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        CUSTOMERS SLIDER
    ===================================================== */
    var customersSlider = new Swiper(".customers-slider", {
        slidesPerView: 2,
        spaceBetween: 10,

        breakpoints: {
            481: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            991: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        PRODUCT DETAILS THUMBS SLIDER
    ===================================================== */
    var productDetailSliderThumb = new Swiper(".shop-detail-slider-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    /* =====================================================
        PRODUCT DETAILS SLIDER
    ===================================================== */
    var productDetailSlider = new Swiper(".shop-detail-slider", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: productDetailSliderThumb,
        },
    });

    /* =====================================================
        PORTFOLIO SLIDER
    ===================================================== */
    var portfolioSlider = new Swiper(".portfolio-slider", {
        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =============================================
        TRIGGER COUNTER UP FUNCTION USING WAYPOINTS
    ================================================ */
    const counterElem = document.getElementById("counterUp");
    if (counterElem) {
        const counterWaypoint = new Waypoint({
            element: counterElem,
            handler: function () {
                vanillaCounterUp(".counter", 100);
            },
            offset: "75%",
        });
    }

    /* =============================================
        COUNTER UP FUNCTION
    ================================================ */

    function vanillaCounterUp(counterTarget, counterSpeed) {
        const counters = document.querySelectorAll(counterTarget);
        const speed = counterSpeed;

        counters.forEach((counter) => {
            function updateCount() {
                const target = +counter.getAttribute("data-counter");
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.trunc(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = Math.trunc(target);
                }
            }
            updateCount();
        });
    }

    /* ==============================================
     CUSTOM SELECT
    ============================================== */
    const sizes = document.querySelector(".js-sizes");

    if (sizes) {
        const sizeschoices = new Choices(sizes, {
            placeholder: true,
            searchEnabled: false,
            itemSelectText: "Select",
            callbackOnInit: function () {
                let pickerCustomClass = sizes.dataset.customclass;
                let pickerSevClasses = pickerCustomClass.split(" ");
                sizes.parentNode.classList.add.apply(sizes.parentNode.classList, pickerSevClasses);
            },
        });
    }

    /* ==============================================
        GET COUNTRIES FROM AJAX REQUEST
    ============================================== */
    const countries = document.getElementById("country");
    const states = document.getElementById("state");

    let countriesRequest = new XMLHttpRequest();
    countriesRequest.open("GET", "js/countries.json");
    countriesRequest.onload = function () {
        let requestData = JSON.parse(countriesRequest.responseText);
        renderCountries(requestData);
    };
    countriesRequest.send();

    function renderCountries(data) {
        let htmlString = "";
        for (let i = 0; i < data.length; i++) {
            htmlString += `<option value='${data[i].countryShortCode}'>${data[i].countryName}</option>`;
        }

        if (countries) {
            countries.insertAdjacentHTML("beforeend", htmlString);
            /* =====================================================
                CUSTOM SELECT
            ===================================================== */
            const countrieschoices = new Choices(countries, {
                placeholder: true,
                searchEnabled: false,
                itemSelectText: "",
                callbackOnInit: function () {
                    let pickerCustomClass = countries.dataset.customclass;
                    let pickerSevClasses = pickerCustomClass.split(" ");
                    countries.parentNode.classList.add.apply(countries.parentNode.classList, pickerSevClasses);
                },
            });
        }
    }

    /* =====================================================
        CUSTOM SELECT
    ===================================================== */
    window.onload = function () {
        if (states) {
            const stateschoices = new Choices(states, {
                placeholder: true,
                searchEnabled: false,
                itemSelectText: "",
                callbackOnInit: function () {
                    let pickerCustomClass = states.dataset.customclass;
                    let pickerSevClasses = pickerCustomClass.split(" ");
                    states.parentNode.classList.add.apply(states.parentNode.classList, pickerSevClasses);
                },
            });
        }
    };

    /* =====================================================
        NAVBAR BEHAVIOR
    ===================================================== */
    function navBarBehavior() {
        const topBar = document.getElementById("topBar"),
            topBarHeight = topBar.offsetHeight,
            header = document.querySelector(".make-sticky"),
            headerHeight = header.offsetHeight,
            scroll = window.pageYOffset;

        if (scroll >= topBarHeight) {
            header.classList.add("is-fixed", "shadow-sm");
            document.body.style.paddingTop = `${headerHeight}px`;
        } else {
            header.classList.remove("is-fixed", "shadow-sm");
            document.body.style.paddingTop = "0";
        }
    }

    window.addEventListener("scroll", function () {
        navBarBehavior();
    });
    window.addEventListener("resize", function () {
        navBarBehavior();
    });

    /* ==============================================
        MULTILEVEL DROPDOWNS
    ============================================== */
    let dropdownElementList = [].slice.call(document.querySelectorAll(".dropdown-toggle"));
    let dropdownSubmenuElementList = [].slice.call(document.querySelectorAll(".dropdown-submenu-toggle"));
    let dropdownMenus = [].slice.call(document.querySelectorAll(".dropdown-menu"));

    let dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    let submenuList = dropdownSubmenuElementList.map(function (e) {
        e.onclick = function (e) {
            e.target.parentNode.querySelector("ul").classList.toggle("show");
            e.stopPropagation();
            e.preventDefault();
        };
    });
    function closeAllSubmenus() {
        let dropdownSubmenus = [].slice.call(document.querySelectorAll(".dropdown-submenu"));
        dropdownSubmenus.map(function (submenu) {
            submenu.classList.remove("show");
        });
    }

    //I'm using "click" but it works with any event
    document.addEventListener("click", function (event) {
        var specifiedElement = document.querySelector(".dropdown");
        var isClickInside = specifiedElement.contains(event.target);

        if (!isClickInside) {
            closeAllSubmenus();
        }
    });
});

let user = "";
let pass = "";
let error = $(".error");
let welcome = $(".welcome");

$("#btnIngreso").click(function (e){
    e.preventDefault();
    let userUserLogin = $("#email_modal").val();
    let passUserLogin = $("#password_modal").val();
    for (let i = 0 ; i < localStorage.length ; i++){
        user = localStorage.key(i);
        pass = localStorage.getItem(user);
            if (user === userUserLogin && pass === passUserLogin){
                welcome.html("Bienvenido, " + userUserLogin + ".");
                $("#btnIngreso").slideUp(800);
                setTimeout(redirectIndex, 1000);
                break;
            }
        }
    if ( userUserLogin === "admin" && passUserLogin === "admin"){
        welcome.html("Bienvenido ADMIN, accediendo al panel de control.");
        $("#btnIngreso").slideUp(800);
        setTimeout(redirect, 3000);
    }   
    else if (user != userUserLogin && pass != passUserLogin){
        error.html("Datos incorrectos, reintente.").delay(2000).slideUp(400);
    }
})


$("#carrito").hide();

$("#carroLogo").click(function(e){
    e.preventDefault()
    $("#carrito").slideToggle(300);
  });

function redirect(){
    window.location.replace("../html/paneladmin.html");
}

function redirectIndex(){
    window.location.replace("../index.html");
}


//Variables Carrito

const carrito = document.querySelector('#carrito');
const contenedorCarrito = $("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector('#boton-vaciar');
const listaProductos = $("#listaProductos");
let productosCarrito = [];

$(".agregar-carrito").click(agregarCarrito);
carrito.addEventListener('click' , eliminaProd);
vaciarCarritoBtn.addEventListener('click' , vaciaCarrito);
document.addEventListener('DOMContentLoaded', () => {

    productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHtml();

})

function vaciaCarrito() {
    productosCarrito = [];
    limpiarHTML();
}


function agregarCarrito (e){
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")){
        const prodSelect = e.target.parentElement.parentElement;
        buscaDatos(prodSelect);
    }
}

function eliminaProd(e) {  

    if(e.target.classList.contains("borrarProd")){
        const prodId = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter (prod => prod.id !== prodId);
        carritoHtml();

    }

}

function buscaDatos(prod){
    const datoProd = {
        imagen: prod.querySelector('img').src,
        titulo: prod.querySelector('h4').textContent,
        precio: prod.querySelector('.price-mob').textContent,
        id: prod.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = productosCarrito.some(prod => prod.id === datoProd.id);
    if (existe){
        const articulos = productosCarrito.map( prod => {
            if(prod.id === datoProd.id){
                prod.cantidad++;
                return prod;
            }
            else {
                return prod;
            }
        });
        productosCarrito = [...articulos];
    }
    else {
        productosCarrito = [...productosCarrito , datoProd];
    }

    console.log(productosCarrito);
    carritoHtml();
}

function carritoHtml() {

    //LIMPIAR HTML
    limpiarHTML();

    productosCarrito.forEach( prod => {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${prod.imagen}" class="imagenCarrito"></td>
            <td>${prod.titulo}</td>
            <td>${prod.cantidad}</td>
            <td>${prod.precio}</td>
            <td>
                <a href="#" class="borrarProd" data-id="${prod.id}"> X </a>
            </td>
        `;
        //AGREGA HTML AL TBODY
        contenedorCarrito.append(row);
    })

    //AGREGA EL CARRITO A LOCALSTORAGE
    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

function limpiarHTML() {
    const listaProd = document.getElementById("carritoTbody");
    listaProd.innerHTML = ` `;
}