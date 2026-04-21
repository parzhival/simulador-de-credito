function calcular() {
    
    const campos = [
        { id: "txtIngresos", nombre: "Ingresos" },
        { id: "txtArriendo", nombre: "Arriendo" },
        { id: "txtAlimentacion", nombre: "Alimentación" },
        { id: "txtVarios", nombre: "Varios" },
        { id: "txtMonto", nombre: "Monto" },
        { id: "txtPlazo", nombre: "Plazo" },
        { id: "txtTasaInteres", nombre: "Tasa" }
    ];

    let hayError = false;

    
    campos.forEach(campo => {
        document.getElementById(campo.id).classList.remove('input-error');
        document.getElementById(`err-${campo.id}`).textContent = "";
    });

    
    for (let campo of campos) {
        let elemento = document.getElementById(campo.id);
        let errorSpan = document.getElementById(`err-${campo.id}`);
        let valorStr = elemento.value.trim();
        let valorNum = parseFloat(valorStr);

        if (valorStr === "") {
            errorSpan.textContent = "Campo obligatorio";
            elemento.classList.add('input-error');
            hayError = true;
        } else if (isNaN(valorNum) || valorNum < 0) {
            errorSpan.textContent = "Debe ser un número";
            elemento.classList.add('input-error');
            hayError = true;
        }
        
    }

    if (hayError) return; // Detener si hay errores básicos

    // 3. Validaciones de Reglas de Negocio Bancarias
    const montoVal = parseFloat(document.getElementById("txtMonto").value);
    const plazoVal = parseInt(document.getElementById("txtPlazo").value);
    const tasaVal = parseFloat(document.getElementById("txtTasaInteres").value);

    if (montoVal < 500 || montoVal > 50000) {
        document.getElementById("err-txtMonto").textContent = "Fuera de rango ($500 - $50k)";
        document.getElementById("txtMonto").classList.add('input-error');
        hayError = true;
    }

    if (plazoVal < 1 || plazoVal > 30) {
        document.getElementById("err-txtPlazo").textContent = "Plazo inválido (1-30)";
        document.getElementById("txtPlazo").classList.add('input-error');
        hayError = true;
    }

    if (tasaVal > 35) {
        document.getElementById("err-txtTasaInteres").textContent = "Tasa máxima 35%";
        document.getElementById("txtTasaInteres").classList.add('input-error');
        hayError = true;
    }

    if (hayError) return;

    // 4. Cálculos (Llamando a tus funciones externas)
    const ingresos = parseFloat(document.getElementById("txtIngresos").value);
    const egresos = parseFloat(document.getElementById("txtArriendo").value) +
                    parseFloat(document.getElementById("txtAlimentacion").value) +
                    parseFloat(document.getElementById("txtVarios").value);

    const disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = disponible.toFixed(2);

    const capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = capacidad.toFixed(2);

    const interes = calcularInteresSimple(montoVal, tasaVal, plazoVal);
    document.getElementById("spnInteresPagar").textContent = interes.toFixed(2);

    const total = calcularTotalPagar(montoVal, interes);
    document.getElementById("spnTotalPrestamo").textContent = total.toFixed(2);

    const cuota = calcularCuotaMensual(total, plazoVal);
    document.getElementById("spnCuotaMensual").textContent = cuota.toFixed(2);

    // 5. Resultado Visual
    const spnEstado = document.getElementById("spnEstadoCredito");
    spnEstado.className = "status"; // Reset

    if (aprobarCredito(capacidad, cuota)) {
        spnEstado.textContent = "CREDITO APROBADO";
        spnEstado.classList.add("status-approved");
    } else {
        spnEstado.textContent = "CREDITO RECHAZADO";
        spnEstado.classList.add("status-rejected");
    }
}