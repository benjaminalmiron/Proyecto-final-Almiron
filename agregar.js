function agregarAlCarrito (componente){

    const memoria = JSON.parse(localStorage.getItem("componentes"));
    
    let cuenta=0;

    if(!memoria){
        const nuevoComponente = getnuevoComponente(componente);
        localStorage.setItem("componentes", JSON.stringify([nuevoComponente]));
        cuenta = 1;

    }else{
        const indiceProducto = memoria.findIndex(componentes => componentes.id === componente.id)
        console.log(indiceProducto);
        
        const nuevaMemoria = memoria;
        
        if(indiceProducto === -1){
            
            nuevaMemoria.push(getnuevoComponente(componente))
            localStorage.setItem("componentes", JSON.stringify(nuevaMemoria));
            cuenta = 1;
        }else{
            nuevaMemoria[indiceProducto].cantidad++;
            cuenta= nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("componentes", JSON.stringify(nuevaMemoria));
        
       
    }

    actualizarCarrito();
    return cuenta;
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


function eliminarAlCarrito(componente){

    const memoria = JSON.parse(localStorage.getItem("componentes"));
    const indiceProducto = memoria.findIndex(componentes => componentes.id === componente.id)
    if(memoria[indiceProducto].cantidad === 1){

        memoria.splice(indiceProducto, 1)
        
    }else{
    memoria[indiceProducto].cantidad--;

    }
    localStorage.setItem("componentes", JSON.stringify(memoria));
    actualizarCarrito();
}

