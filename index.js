const componentes = [
    {
      id: 1,
      nombre: "Teclado",
      precio: 50000,
      

    },
    {
      id: 2,
      nombre: "Auriculares",
      precio: 70000,
      
    },
    {
      id: 3,
      nombre: "Mouse",
      precio: 60000,
      
    },
    
    {
        id: 4,
        nombre: "Monitor",
        precio: 100000,
        stock: 10,
      },
      {
        id: 5,
        nombre: "CPU",
        precio: 200000,
        stock: 10,
      },
  
      
    ];

  const contenedorComponentes = document.getElementById("contenedor-componentes")



  function renderizarComponentes(componentes){

    componentes.forEach(componente => {
        
        const nuevoComponente = document.createElement("div");
            nuevoComponente.classList = "container-items";
            nuevoComponente.innerHTML= `<div class= "item">
            <figure><img class "img" src="./assets/${componente.id}.jpg"></figure>
            <div class= "info-producto"><h3>${componente.nombre}</h3>
            <p>$${componente.precio}</p>
            <button class"btn-agregar-carrito">Agregar al Carrito</button></div></div>
            `
            contenedorComponentes.appendChild(nuevoComponente);
            nuevoComponente.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(componente)
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

