const componentes = [
  {
    id: 1,
    nombre: "Teclado Logitech",
    precio: 50000,
    imagen : "./assets/1.jpg",
    categoria: {
      nombre : "Teclados",
      id: "teclados",
    }

  },
  {
    id: 2,
    nombre: "Teclado Logitech pro",
    precio: 80000,
    imagen: "./assets/X3-208.jpg",
    categoria: {
      nombre : "Teclado",
      id: "teclados",
    }
  },

  {
    id: 3,
    nombre: "Teclado Logitech X",
    precio: 70000,
    imagen: "assets/X3-205.jpg",
    categoria: {
      nombre : "Teclado",
      id: "teclados",
    }
  },
  {
    id: 4,
    nombre: "Mouse Logitech",
    precio: 60000,
    imagen : "assets/3.jpg",
    categoria: {
      nombre : "Mouses",
      id: "mouses",
    }
  },
  
  {
      id: 5,
      nombre: "Monitor Samsung",
      precio: 100000,
      stock: 10,
      imagen : "assets/4.jpg",
      categoria: {
        nombre : "Monitores",
        id: "monitores",
      }
    },
    {
      id: 6,
      nombre: "Monitor Gigabyte",
      precio: 180000,
      stock: 10,
      imagen: "assets/x1-1118.jpg",
      categoria: {
        nombre : "mouses",
        id: "monitores",
      }
    },
    {
      id: 7,
      nombre: "Mouse Redragon",
      precio: 55000,
      stock: 10,
      imagen: "assets/1058-producto-impact-8051 (1).jpg",
      categoria: {
        nombre : "mouses",
        id: "mouses",
      }
    },
    {
      id: 8,
      nombre: "Mouse Logitech g502",
      precio: 70500,
      stock: 10,
      imagen: "assets/38348_1.jpeg",
      categoria: {
        nombre : "mouses",
        id: "mouses",
      }
    },

    
  ]; 

 
/* function renderizarComponentes() {
  
  fetch("./componentes.json")
  
  
    .then((res) => res.json())
    .then((dato) => {
      
      const componentes = dato.componentes
      
      componentes.forEach((componente) => {
        const nuevoComponente = document.createElement("div");
        nuevoComponente.innerHTML = `
          <div class="item">
            <figure><img class="img" src="./assets/${componente.id}.jpg" alt="${componente.nombre}"></figure>
            <div class="info-producto">
              <h3>${componente.nombre}</h3>
              <p>$${componente.precio}</p>
              <button class="btn-agregar-carrito">Agregar al Carrito</button>
            </div>
          </div>
        `;
        
        contenedorComponentes.appendChild(nuevoComponente);

       
        nuevoComponente
          .getElementsByTagName("button")[0]
          .addEventListener("click", () => agregarAlCarrito(componente));
      });
    })
    .catch((error) => console.error("Error al cargar los componentes:", error));
}

renderizarComponentes()
 */


  const contenedorComponentes = document.getElementById("contenedor-componentes")


  function renderizarComponentes(componentesElegidos){

    contenedorComponentes.innerHTML=""
  
    componentesElegidos.forEach(componente => {
        
        const nuevoComponente = document.createElement("div");
            nuevoComponente.classList = "container-items";
            nuevoComponente.innerHTML= `<div class= "item">
            <figure><img class "img" src="${componente.imagen}"></figure>
            <div class= "info-producto"><h3>${componente.nombre}</h3>
            <p>$${componente.precio}</p>
            <button class="btn-agregar-carrito">Agregar al Carrito</button></div></div>
            `
            contenedorComponentes.appendChild(nuevoComponente);
            nuevoComponente.getElementsByTagName("button")[0].addEventListener("click", ()=> {agregarAlCarrito(componente),
            
            Toastify({
              text: "Componente agregado al carrito",
              duration: 1000,
              gravity: "top",
              position: "right",
              style: {background: "red"}
            }).showToast()
          }
            )

        

    });

  }



  

  




  renderizarComponentes(componentes)



function agregarAlCarrito (componente){

    const memoria = JSON.parse(localStorage.getItem("componentes"));
    

    if(!memoria){
        const nuevoComponente = getnuevoComponente(componente);
        localStorage.setItem("componentes", JSON.stringify([nuevoComponente]));


    }else{
        const indiceProducto = memoria.findIndex(componentes => componentes.id === componente.id)
        console.log(indiceProducto);
        
        const nuevaMemoria = memoria;
        
        if(indiceProducto === -1){
            
            nuevaMemoria.push(getnuevoComponente(componente))
            localStorage.setItem("componentes", JSON.stringify(nuevaMemoria));
        }else{
            nuevaMemoria[indiceProducto].cantidad++;
        }
        localStorage.setItem("componentes", JSON.stringify(nuevaMemoria));

       
    }

    actualizarCarrito()
}

function getnuevoComponente(componente){

    const nuevoComponente = componente;
    nuevoComponente.cantidad=1;
    return nuevoComponente;

}
 
const cuentaCarritoElement = document.getElementById("contador-productos")

function actualizarCarrito(){

  const memoria = JSON.parse(localStorage.getItem("componentes"));
  if(memoria && memoria.length >0){
      const cuenta = memoria.reduce((acum, current)=> acum + current.cantidad,0)
      cuentaCarritoElement.innerText=cuenta;

  }else{

      cuentaCarritoElement.innerText=0;

  }
}
actualizarCarrito()

const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")

botonesCategorias.forEach(boton => {


  boton.addEventListener("click", (e)=>{

      botonesCategorias.forEach(boton=> boton.classList.remove("active"));

      e.currentTarget.classList.add("active")

      if(e.currentTarget.id != "todos"){

          const productoCategoria = componentes.find(componente => componente.categoria.id === e.currentTarget.id)

          tituloPrincipal.innerText=productoCategoria.categoria.nombre
          const componentesBoton = componentes.filter(componente => componente.categoria.id === e.currentTarget.id )
          renderizarComponentes(componentesBoton);
     
      }else{
          tituloPrincipal.innerText="Todos los componentes"
          renderizarComponentes(componentes);
      }
      
      
      
  })


}) 