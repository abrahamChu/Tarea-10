window.onload = function () {
  var nimagen;
  var adivinar;
  var palabraA;
  var aciertos = document.getElementById("palabra");
  var letra = document.getElementById("letra");
  var fallos = document.getElementById("fallos");

  // Leer ficheros del directorio seleccioando
  function SeleccionImagenes(evt) {
    var files = evt.target.files; // FileList object

    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    for (var i = 0, f; (f = files[i]); i++) {
      // Si f no es de type image , no continua y vuelve al inicio del bucle(continue)
      if (!f.type.match("image.*")) {
        continue;
      }

      var reader = new FileReader();

      // Function(Clousure) que obtiene la información de cada archivo. la funcion
      // se ejecuta al cargar (load) cada unop de los archivos seleccionadso

      reader.onload = (function (ElFichero) {
        return function (e) {
          //ElFichero.name contiene el nombre de los ficheros seleccionados
          // e.target.result contiene el Data de la imagen,que asigándo el mismo
          // a la prpiedad src de un elemento html img, sevisualiza en el mismo
          var cadena = escape(ElFichero.name);
          var ppunto = cadena.indexOf(".");
          nimagen = cadena.substring(0, ppunto);
          //  Creamos la IMAGEN
          imm = document.createElement("img");
          imm.src = e.target.result;
          imm.alt = ElFichero.name;
          //Podemos guardar el nombre de la imagen  a adivinar
          //en esta propiedad alt
          imm.title = nimagen;

          // Programamos en  evento clic sobre la imagen para jugar con ella
          imm.onclick = copiaPalabra;

          document.getElementById("contenedorImagen").insertBefore(imm, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
  document
    .getElementById("files")
    .addEventListener("change", SeleccionImagenes, false);

  function copiaPalabra() {
    //   Gestionar la palabra a adivinar obtendia de la palabra pulsada
    palabraA = nimagen.toUpperCase();
    adivinar = palabraA;
    adivinar = adivinar.replace(/[a-z]/gi, "-");
    document.getElementById("palabra").innerHTML = adivinar;
    letra.focus();
  }

  letra.addEventListener("keyup", sustituirLetras, false);

  function sustituirLetras() {
    var caracterBuscar = letra.value.toUpperCase();
    letra.value = "";
    letra.focus();
    for (i = 0; i < palabraA.length; i++) {
      if (caracterBuscar == palabraA[i]) {
        adivinar =
          adivinar.substring(0, i) +
          caracterBuscar +
          adivinar.substr(i + 1, adivinar.length);

        aciertos.innerText = adivinar;
      }
    }

    if (palabraA.indexOf(caracterBuscar) == -1) {
      p1 = document.createElement("p");
      var texto1 = document.createTextNode(caracterBuscar);
      p1.appendChild(texto1);
      fallos.appendChild(p1);
    }

    if (aciertos.innerText.indexOf("-") == -1) {
      alert("HAS ACERTADO LA PALABRA");
    }
  }
};
