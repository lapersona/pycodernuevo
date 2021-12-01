function redirect(){
    window.location.replace("../vendor/index.html");
}

function redirectIndex(){
    window.location.replace("../vendor/index.html");
}

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


var mensaje = $(".mensaje");
var userInfo = {nombre: $("newNombre").val(), apellido: $("#newApellido").val(), dni: $("#newDni").val(), email: $("#newEmail").val(), user: $("#newUsuario").val(), pass: $("#newPassword").val()};


$("#btnRegistro").click(function (e){
    e.preventDefault();
    newUserName = $("#newNombre").val();
    newUserApellido = $("#newApellido").val();
    newUserDni = $("#newDni").val();
    newUserEmail = $("#newEmail").val();
    newUserUser = $("#newUsuario").val();
    newUserPass = $("#newPassword").val();

    let opcion = confirm("Confirma el registro del usuario " + newUserUser + "?");

    if (opcion == true){
        localStorage.setItem (newUserUser , newUserPass)
        mensaje.html("Registro completado correctamente, redireccionando..");
        $
        setTimeout (redirectIndex , 3000);
    }
    else (mensaje.html("Complete el registro nuevamente."));
})
