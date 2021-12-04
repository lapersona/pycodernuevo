function redirect(){
    window.location.replace("../pycodernuevo/index.html");
}

function redirectIndex(){
    window.location.replace("../pycodernuevo/index.html");
}
$("#carrito").hide();


let user = "";
let pass = "";
let error = $(".error");
let welcome = $(".welcome");

$("#btnIngreso").click(function (e){
    console.log(e);
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

var mensaje = $(".mensaje");

$("#btnRegistro").click(function (e){
    e.preventDefault();
    newUserName = $("#username").val();
    newUserEmail = $("#useremail").val();
    newUserPass = $("#userpassword").val();

    let opcion = confirm("Confirma el registro del usuario " + newUserName + "?");

    if (opcion == true){
        localStorage.setItem (newUserEmail , newUserPass)
        mensaje.html("Registro completado correctamente, redireccionando..");
        $
        setTimeout (redirectIndex , 3000);
    }
    else (mensaje.html("Complete el registro nuevamente."));
})



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