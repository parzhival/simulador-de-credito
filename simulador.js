function calcular() {
    // 1. Captura de componentes
    const campos = [
        { id: "txtIngresos", nombre: "Ingresos" },
        { id: "txtEgresos", nombre: "Egresos" },
        { id: "txtMonto", nombre: "Monto" },
        { id: "txtPlazo", nombre: "Plazo" },
        { id: "txtTasaInteres", nombre: "Tasa" }
    ];

    // Limpiar errores previos y estado
    document.querySelectorAll('input').forEach(i => i.classList.remove('input-error'));
    const spnEstado = document.getElementById("spnEstadoCredito");
    spnEstado.className = "status"; // reset clase

    // 2. Validación de campos obligatorios y valores numéricos
    for (let campo of campos) {
        let elemento = document.getElementById(campo.id);
        let valor = parseFloat(elemento.value);

        if (elemento.value === "" || isNaN(valor) || valor < 0) {
            alert(`El campo ${campo.nombre} es obligatorio y debe ser un número positivo.`);
            elemento.classList.add('input-error');
            elemento.focus();
            return; // Detiene la función
        }
    }

    // 3. Validaciones de políticas bancarias (Montos de Negocio)
    let montoVal = parseFloat(document.getElementById("txtMonto").value);
    let plazoVal = parseInt(document.getElementById("txtPlazo").value);
    let tasaVal = parseFloat(document.getElementById("txtTasaInteres").value);

    if (montoVal < 500 || montoVal > 50000) {
        alert("El monto debe estar entre $500 y $50,000.");
        return;
    }

    if (plazoVal < 1 || plazoVal > 30) {
        alert("El plazo debe ser entre 1 y 30 años.");
        return;
    }

    if (tasaVal > 35) {
        alert("La tasa de interés no puede superar el 35%.");
        return;
    }

    // 4. Lógica de cálculo (Manteniendo tus funciones originales)
    let ingresosFloat = parseFloat(document.getElementById("txtIngresos").value);
    let egresosFloat = parseFloat(document.getElementById("txtEgresos").value);

    let valorDisponible = calcularDisponible(ingresosFloat, egresosFloat);
    document.getElementById("spnDisponible").textContent = valorDisponible.toFixed(2);

    let capacidadPago1 = calcularCapacidadPago(valorDisponible);
    document.getElementById("spnCapacidadPago").textContent = capacidadPago1.toFixed(2);

    let cuotaInteres = calcularInteresSimple(montoVal, tasaVal, plazoVal);
    document.getElementById("spnInteresPagar").textContent = cuotaInteres.toFixed(2);

    let totalPagar = calcularTotalPagar(montoVal, cuotaInteres);
    document.getElementById("spnTotalPrestamo").textContent = totalPagar.toFixed(2);

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoVal);
    document.getElementById("spnCuotaMensual").textContent = cuotaMensual.toFixed(2);

    // 5. Resultado final con estilos
    let aprobado = aprobarCredito(capacidadPago1, cuotaMensual);
    
    if (aprobado) {
        spnEstado.textContent = "CREDITO APROBADO";
        spnEstado.classList.add("status-approved");
    } else {
        spnEstado.textContent = "CREDITO RECHAZADO";
        spnEstado.classList.add("status-rejected");
    }
}