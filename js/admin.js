import {
  validarInputRequerido,
  validarInputDescripcion,
  validarInputPrecio,
  validarInputUrl,
  validarTodo,
  ObtenerCodigoAleatorio,
} from "./hellpers.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
let bodyTabla = document.querySelector("tbody");
let inputCodigo = document.getElementById("codigo");
let inputNombre = document.getElementById("nombre");
let inputDescripcion = document.getElementById("descripcion");
let inputPrecio = document.getElementById("precio");
let inputImgUrl = document.getElementById("imgUrl");
console.log(bodyTabla);
let form = document.querySelector("form");
inputCodigo.value = ObtenerCodigoAleatorio();

form.addEventListener("submit", GuardarProducto);

inputCodigo.addEventListener("blur", () => {
  validarInputRequerido(inputCodigo);
});

inputNombre.addEventListener("blur", () => {
  validarInputRequerido(inputNombre);
});

inputDescripcion.addEventListener("blur", () => {
  validarInputDescripcion(inputDescripcion);
});

inputPrecio.addEventListener("blur", () => {
  validarInputPrecio(inputPrecio);
});

inputImgUrl.addEventListener("blur", () => {
  validarInputUrl(inputImgUrl);
});
//Llamamos a la funcion listar productos para crear filas en nuestra tabla
ListarProductos();

function GuardarProducto(e) {
  // e = event
  e.preventDefault();
  if (
    validarTodo(
      inputCodigo,
      inputNombre,
      inputDescripcion,
      inputPrecio,
      inputImgUrl
    )
  ) {
    CrearProducto();
  } else {
    Swal.fire({
      title: "Ups",
      text: "Todos los campos son requeridos",
      icon: "error",
    });
  }
}

function CrearProducto() {
  const nuevoProducto = {
    codigo: inputCodigo.value,
    nombre: inputNombre.value,
    descripcion: inputDescripcion.value,
    precio: inputPrecio.value,
    imgUrl: inputImgUrl.value,
  };

  arrayProductos.push(nuevoProducto);
  Swal.fire({
    title: "Exito",
    text: "El producto se guardo correctamente",
    icon: "success",
  });
  LimpiarFormulario();
  bodyTabla.innerHTML='';
  ListarProductos();
}

function LimpiarFormulario() {
  form.reset();
  inputCodigo.className = "form-control";
  inputCodigo.value = ObtenerCodigoAleatorio();
  inputNombre.className = "form-control";
  inputDescripcion.className = "form-control";
  inputPrecio.className = "form-control";
  inputImgUrl.className = "form-control";
  GuardarLocalStorage();
}

function GuardarLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

function ListarProductos() {
  arrayProductos.forEach((element) => {
    bodyTabla.innerHTML += ` <tr>                  
       <th scope="row">${element.codigo}</th>
       <td>${element.nombre}</td>
       <td>${element.descripcion}</td>
       <td>${element.precio}</td>
       <td><a href="${element.imgUrl}" target="_blank" title="Ver Imagen">${element.imgUrl}</a></td>
       <td class="">
         <button type="button" class="btn btn-warning mx-1">Editar</button>
         <button type="button" class="btn btn-danger mx-1">Eliminar</button>
       </td>                
     </tr>`;
  });
}
