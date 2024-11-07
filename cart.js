const contenedorComponentes = document.getElementById("contenedor-carrito")
const elementoUnidades = document.getElementById("cantidad")
const totalUnidades = document.getElementById("precio")
const carritoVacioElement = document.getElementById("carrito-vacio")
const totalCarrito = document.getElementById("total")
const reiniciarCarrito1 = document.getElementById("reiniciar")


function renderizarComponentes(){
    contenedorComponentes.innerHTML= "";
    const componentes = JSON.parse(localStorage.getItem("componentes"))
   if (componentes && componentes.length>0){

    componentes.forEach(componente => {
        const nuevoComponente = document.createElement("div");
            nuevoComponente.classList = "container-items";
            nuevoComponente.innerHTML= `<div class= "item">
            <figure><img class "img" src="./assets/${componente.id}.jpg"></figure>
            <div class= "info-producto"><h3>${componente.nombre}</h3>
            <p>$${componente.precio}</p>
            <div>
            <button>-</button>
            <span class="cantidad">${componente.cantidad}</span>
            <button>+</button>
            </div>
            `
            contenedorComponentes.appendChild(nuevoComponente);
            nuevoComponente.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
                const elementoCuenta = e.target.parentElement.getElementsByTagName("span")[0];
                elementoCuenta.innerText = agregarAlCarrito(componente);
                actualizarTotal();
            })
            nuevoComponente.getElementsByTagName("button")[0].addEventListener("click", (e)=> {
                
                const elementoCuenta = e.target.parentElement.getElementsByTagName("span")[0];
                elementoCuenta.innerText = eliminarAlCarrito(componente);
                renderizarComponentes()
                actualizarTotal()
            })
            
            
    });
   }
    

  }


  renderizarComponentes()
  actualizarTotal()

  function actualizarTotal(){
    

    const componentes = JSON.parse(localStorage.getItem("componentes"))
    let unidades = 0;
    let precio = 0;

    if(componentes && componentes.length>0){
        componentes.forEach(componente => {
            unidades += componente.cantidad;
            precio += componente.precio * componente.cantidad;
        })
        elementoUnidades.innerText= unidades;
        totalUnidades.innerText= precio;
    }
    revisarVacio()
    }


    function revisarVacio(){

        const componentes = JSON.parse(localStorage.getItem("componentes"));
        console.log(componentes, componentes === true)
        carritoVacioElement.classList.toggle("escondido", componentes && componentes.length>0 );
        totalCarrito.classList.toggle("escondido", !(componentes && componentes.length>0));
        

    }

    revisarVacio()


    reiniciarCarrito1.addEventListener("click", reiniciarCarrito)
    function reiniciarCarrito(){

        localStorage.removeItem("componentes")
        actualizarTotal();
        renderizarComponentes()
    } 