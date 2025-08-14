
import { getProducts, postProducts, deleteProducts, putProducts } from "../services/servicesProducts.js"; 

const producto = document.getElementById("producto")
const precio = document.getElementById("precio")
const stock = document.getElementById("stock")
const btnAgregarProducto = document.getElementById("btnAgregarProducto")
const listaproductos = document.getElementById("listaproductos")

//Funcion guarda
btnAgregarProducto.addEventListener("click", async function(){

    //Verificacion
    if(!producto.value.trim() || !precio.value.trim() || !stock.value.trim()){
        alert("❌Complete todos los campos❌")
        return;
    }

    const product ={
        producto:producto.value,
        precio:precio.value,
        stock:stock.value
    };

    const respuestaConfirmada = await postProducts(product)
    console.log(respuestaConfirmada);
    
})

//Funcion renderiza
async function datosProductos() {
    const datosProductosRecibidos = await getProducts()
    listaproductos.textContent = ""
    /* for (let index = 0; index < datosProductosRecibidos.length; index++) {
        let parrafoProducto = document.createElement("p")
        parrafoProducto.textContent=datosProductosRecibidos[index].producto
        listaproductos.appendChild(parrafoProducto)
    } */


    //MAP
    datosProductosRecibidos.map(producto => {
        
        
        let parrafoProducto = document.createElement("p")

        let btnEliminar = document.createElement("button")
        /* btnEliminar.textContent="Eliminar" */
        btnEliminar.classList.add("btn", "btn_Eliminar");

        let btnEditar = document.createElement("button")
        /* btnEditar.textContent="Editar" */
        btnEditar.classList.add("btn", "btn_Editar");

        parrafoProducto.textContent=producto.producto + " - Precio: " + producto.precio+" - Stock: " + producto.stock

        listaproductos.appendChild(parrafoProducto)
        listaproductos.appendChild(btnEliminar)
        listaproductos.appendChild(btnEditar)

        //BOTON ELIMINAR
        btnEliminar.addEventListener("click", async function(){

           await deleteProducts(producto.id)

            listaproductos.removeChild(parrafoProducto)
            listaproductos.removeChild(btnEliminar)
            listaproductos.removeChild(btnEditar)

        })

        btnEditar.addEventListener("click", async function() {
            //PROCEDIMIENTO CON MODAL****

            const nuevoProducto = prompt("Escriba el nuevo producto:", producto.producto)
            const nuevoPrecio = prompt("Escriba el nuevo producto:", producto.precio)
            const nuevoStock = prompt("Escriba el nuevo producto:", producto.stock)

            const productActualizado ={
                producto: nuevoProducto,
                precio: nuevoPrecio,
                stock: nuevoStock
            };

            await putProducts(productActualizado, producto.id)

            datosProductos()
            
        })

    } );


}
datosProductos()
