//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular(){
    let ingresos=document.getElementById("txtIngresos");
    let egresos=document.getElementById("txtEgresos");
    let valorDisponible1;
    let valorDisponible;
    let ingresosFloat;
    let egresosFloat;
    let total;
    let capacidadPago1;
    let capacidadPago;
    let pago;
    let monto=document.getElementById("txtMonto");
    let tiempo=document.getElementById("txtPlazo");
    let tasa=document.getElementById("txtTasaInteres");
    let montoInt;
    let tiempoInt;
    let tasaInt;
    let cuota;
    let cuota1;
    let cuota2;
    let totalPagar;
    let totalPagar1;
    let cuotaMensual;
    let cuotaMensual1;
    let cuotaMensualFinal;
    let credito1;
    let credito;
       
    ingresosFloat=parseFloat(ingresos.value);
    egresosFloat=parseFloat(egresos.value);

    valorDisponible1=calcularDisponible(ingresosFloat,egresosFloat);
    valorDisponible=valorDisponible1.toFixed(2);
    total=document.getElementById("spnDisponible");
    total.textContent=valorDisponible;

    capacidadPago1=calcularCapacidadPago(valorDisponible);
    capacidadPago=capacidadPago1.toFixed(2);
    pago=document.getElementById("spnCapacidadPago");
    pago.textContent=capacidadPago;

    montoInt=parseInt(monto.value);
    tiempoInt=parseInt(tiempo.value);
    tasaInt=parseInt(tasa.value);

    cuota=calcularInteresSimple(montoInt,tasaInt,tiempoInt);
    cuota1=cuota.toFixed(2);
    cuota2=document.getElementById("spnInteresPagar");
    cuota2.textContent=cuota1;

    totalPagar=calcularTotalPagar(montoInt,cuota);
    totalPagar1=document.getElementById("spnTotalPrestamo");
    totalPagar1.textContent=totalPagar;

    cuotaMensual=calcularCuotaMensual(totalPagar,tiempoInt);
    cuotaMensual1=cuotaMensual.toFixed(2);
    cuotaMensualFinal=document.getElementById("spnCuotaMensual");
    cuotaMensualFinal.textContent=cuotaMensual1;

    credito1=aprobarCredito(capacidadPago1,cuotaMensual);
    credito=document.getElementById("spnEstadoCredito");
    if(credito1==true){
        credito.textContent="CREDITO APROBADO";
    }else{
        credito.textContent="CREDITO RECHAZADO";
    }
}