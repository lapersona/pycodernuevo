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
    window.location.replace("../pycodernuevo/index.html");
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
                <a class="borrarProd" data-id="${prod.id}"> X </a>
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

function injectSvgSprite(path) {
      
          var ajax = new XMLHttpRequest();
          ajax.open("GET", path, true);
          ajax.send();
          ajax.onload = function(e) {
          var div = document.createElement("div");
          div.className = 'd-none';
          div.innerHTML = ajax.responseText;
          document.body.insertBefore(div, document.body.childNodes[0]);
          }
      }
injectSvgSprite('https://bootstraptemple.com/files/icons/orion-svg-sprite.svg'); 