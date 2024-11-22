let usuario = document.querySelector("#usuario");
let contraseña = document.querySelector("#contraseña");

let registro = document.querySelector("#registro");
let acceso = document.querySelector("#login");
let acceder = document.querySelector("#acceder");

let mensajeError = document.querySelector(".mensaje-error");

// Carga usuarios desde localStorage (si existen)
let datosUsuarios = JSON.parse(localStorage.getItem("datosUsuarios")) || {};

// Función para guardar usuarios en localStorage
function guardarUsuarios() {
  localStorage.setItem("datosUsuarios", JSON.stringify(datosUsuarios));
}

function activarBotonAcceder() {
  acceder.style.backgroundColor = "white";
  acceder.style.color = "black";
  acceder.style.border = "2px solid black";
  acceder.style.cursor = "pointer";
  acceder.href = "./index.html"; 
}

function registrarUsuario(usuario, contraseña) {
  if (datosUsuarios[usuario]) {
    mensajeError.textContent = "El usuario ingresado ya existe.";
    return;
  }

  datosUsuarios[usuario] = contraseña;
  guardarUsuarios(); 

  mensajeError.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
  activarBotonAcceder();
}

function iniciarSesion(usuario, contraseña) {
  if (!datosUsuarios[usuario]) {
    mensajeError.textContent = "Usuario no registrado.";
    return;
  }

  if (datosUsuarios[usuario] !== contraseña) {
    mensajeError.textContent = "Contraseña incorrecta.";
    return;
  }

  mensajeError.textContent = "Inicio de sesión exitoso.";
  activarBotonAcceder();
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1500);
}

function validarDatos(usuario, contraseña, boton) {
  if (usuario === "" && contraseña === "") {
    mensajeError.textContent = "Debes ingresar un usuario y contraseña.";
    return;
  }

  if (usuario === "") {
    mensajeError.textContent = "Por favor ingresa un nombre de usuario.";
    return;
  }

  if (contraseña === "") {
    mensajeError.textContent = "Por favor ingresa una contraseña.";
    return;
  }

  if (contraseña.length < 8) {
    mensajeError.textContent = "La contraseña debe tener al menos 8 caracteres.";
    return;
  }

  if (boton === "registro") {
    registrarUsuario(usuario, contraseña);
  } else if (boton === "acceso") {
    iniciarSesion(usuario, contraseña);
  }
}

registro.addEventListener("click", () => {
  validarDatos(usuario.value, contraseña.value, "registro");
});

acceso.addEventListener("click", () => {
  validarDatos(usuario.value, contraseña.value, "acceso");
});
