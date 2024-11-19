// Referencias a los elementos del DOM
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

// Cambia el estilo del botón "Acceder"
function activarBotonAcceder() {
  acceder.style.backgroundColor = "white";
  acceder.style.color = "black";
  acceder.style.border = "2px solid black";
  acceder.style.cursor = "pointer";
  acceder.href = "./tienda.html"; // Asigna el enlace
}

// Función para registrar un usuario
function registrarUsuario(usuario, contraseña) {
  if (datosUsuarios[usuario]) {
    mensajeError.textContent = "El usuario ingresado ya existe.";
    return;
  }

  datosUsuarios[usuario] = contraseña;
  guardarUsuarios(); // Guarda los datos en localStorage

  mensajeError.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
  activarBotonAcceder();
}

// Función para iniciar sesión
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
    window.location.href = "./tienda.html"; // Redirige al usuario
  }, 1500);
}

// Validación de datos ingresados
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

// Eventos para registro e inicio de sesión
registro.addEventListener("click", () => {
  validarDatos(usuario.value, contraseña.value, "registro");
});

acceso.addEventListener("click", () => {
  validarDatos(usuario.value, contraseña.value, "acceso");
});
