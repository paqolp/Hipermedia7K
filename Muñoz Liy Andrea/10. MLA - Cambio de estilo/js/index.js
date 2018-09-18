var contador = 1;
function cambiarEstilo() {
    document.getElementById('estilo').setAttribute('href', `css/style${++contador}.css`);
    if (contador == 3)
        contador = 0;
}