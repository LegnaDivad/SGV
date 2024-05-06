document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('/registrar_consulta', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Consulta registrada con éxito');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al registrar la consulta');
    });
});
