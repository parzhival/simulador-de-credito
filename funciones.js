//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL PROYECTO
function calcularDisponible(ingresos,egresos){
    let disponible;
    disponible=ingresos-egresos;
    if (disponible<0){
    disponible=0
    }    
    return disponible;
}
function calcularCapacidadPago(montoDisponible){
    let monto;
    monto=montoDisponible/2;
    return monto;
}
function calcularInteresSimple(monto,tasa,tiempo){
    let cuota;
    cuota=tiempo*monto*(tasa/100);
    return cuota;
}
function calcularTotalPagar(monto,tasa){
    let totalPagar;
    totalPagar=monto+tasa+100;
    return totalPagar;
}
function calcularCuotaMensual(total,tiempo){
    let cuotaMensual;
    cuotaMensual=total/(tiempo*12);
    return cuotaMensual;
}
function aprobarCredito(capacidadPago,cuotaMensual){
    if(capacidadPago >  cuotaMensual){
        
        return true
    }else{
        
        return false
    }

}