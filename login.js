let usuario = document.querySelector("#usuario");
let contraseña = document.querySelector("#contraseña");

let registro = document.querySelector("#registro");
let acceso = document.querySelector("#login");

let usuarios = 0;
let datosUsuarios = {};

function registrarUsuario(usuario, contraseña) {
  // Validar si el usuario ya existe
  if (datosUsuarios[usuario]) {
    alert("El usuario ingresado ya existe.");
    return;
  }

  // Registrar al usuario
  datosUsuarios[usuario] = contraseña;
  usuarios++; // Incrementar el contador de usuarios

  alert(
    `Registro exitoso. El usuario es ${usuario} y la contraseña es ${contraseña}`
  );
}

function mostrarUsuarios() {
  alert("Usuarios registrados:");
  for (const usuario in datosUsuarios) {
    alert(`Usuario: ${usuario}, Contraseña: ${datosUsuarios[usuario]}`);
  }
}

const mensajesAlerta = {
  datosVacios: "No haz ingresado el usuario y contraseña.",
  usuarioVacio: "Porfavor ingresa el nombre de usuario.",
  contraseñaVacio: "Porfavor ingresa la contraseña.",
  usuarioExistente: "El usuario ingresado ya existe.",
  usuarioInvalido: "Usuario no valido.",
  contraseñaInvalida: "Error al ingresar la contraseña",
  contraseñaTamaño:
    "El tamaño de la contraseña debe de ser mayor a 8 caracteres.",
};

function validarDatos(usuario, contraseña, boton) {
  if (usuario === "" && contraseña === "") {
    alert(mensajesAlerta.datosVacios);
  } else if (usuario === "") {
    alert(mensajesAlerta.usuarioVacio);
  } else if (contraseña === "") {
    alert(mensajesAlerta.contraseñaVacio);
  } else if (contraseña.length < 8) {
    alert(mensajesAlerta.contraseñaTamaño);
  } else {
    if (boton === "registro") {
      registrarUsuario(usuario, contraseña);
    } else if (boton === "acceso") {
      alert("Acceso exitoso. Mostrando usuarios registrados:");
      windows.location.href = "https//youtube.com:";
      mostrarUsuarios();
    }
  }
}

registro.addEventListener("click", () => {
  validarDatos(usuario.value, contraseña.value, "registro");
});
acceso.addEventListener("click", () => {
  validarDatos(usuario.value, contraseña.value, "acceso");
});
