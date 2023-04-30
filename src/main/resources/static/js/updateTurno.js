window.addEventListener('load', function () {


    //Buscamos y obtenemos el formulario donde estan
    //los datos que el usuario pudo haber modificado de la pelicula
    const formulario = document.querySelector('#update_turno_form');

    formulario.addEventListener('submit', function (event) {
        let turnoId = document.querySelector('#turno_id').value;

        //creamos un JSON que tendrá los datos de la película
        //a diferencia de una pelicula nueva en este caso enviamos el id
        //para poder identificarla y modificarla para no cargarla como nueva
        const formData = {
            id: document.querySelector('#turno_id').value,
            odontologo_id: document.querySelector('#odontologo').value,
            paciente_id: document.querySelector('#paciente').value,
            fecha: document.querySelector('#fecha').value,
            nombre_odontologo: null,
            nombre_paciente: null

        };

        //invocamos utilizando la función fetch la API peliculas con el método PUT que modificará
        //la película que enviaremos en formato JSON
        const url = '/turnos';
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
          fetch(url,settings)
          .then(response => response.json())

    })
 })

    //Es la funcion que se invoca cuando se hace click sobre el id de una pelicula del listado
    //se encarga de llenar el formulario con los datos de la pelicula
    //que se desea modificar
    function findBy(id) {
          const url = '/turnos'+"/"+id;
          const settings = {
              method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              let turnoDTO = data;
              document.querySelector('#turno_id').value = turnoDTO.id;
              document.querySelector('#paciente').value = turnoDTO.paciente_id,
              document.querySelector('#odontologo').value = turnoDTO.odontologo_id,
              document.querySelector('#fecha').value = turnoDTO.fecha,
              //el formulario por default esta oculto y al editar se habilita
              document.querySelector('#div_turno_updating').style.display = "flex";
              document.querySelector('#div_turno_updating').style.flexDirection = "column";
              document.querySelector('#div_turno_updating').style.justifyContent = "center";
              document.querySelector('#div_turno_updating').style.alignItems = "center";
          }).catch(error => {
              alert("Error: " + error);
          })
      }