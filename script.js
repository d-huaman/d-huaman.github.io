(function(){
  // ---------- comparador nube de puntos ----------
  var compare = document.querySelector('[data-compare]');
  if(compare){
    var range = compare.querySelector('[data-compare-range]');
    var clip  = compare.querySelector('[data-compare-clip]');
    var handle= compare.querySelector('[data-compare-handle]');
    function update(v){
      clip.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
      handle.style.left = v + '%';
    }
    update(range.value);
    range.addEventListener('input', function(){ update(range.value); });
  }

  // ---------- botón "escribir un correo": copiar al portapapeles ----------
  var copyBtn = document.getElementById('copy-email-btn');
  if(copyBtn){
    var copyLabel = document.getElementById('copy-email-label');
    var copyIcon  = document.getElementById('copy-email-icon');
    var mailSvg  = copyIcon.innerHTML;
    var checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12l5 5L20 6"/></svg>';
    var copyTimer = null;
    copyBtn.addEventListener('click', function(){
      var email = copyBtn.getAttribute('data-email') || '';
      var showConfirmation = function(){
        copyIcon.innerHTML = checkSvg;
        copyLabel.textContent = 'Correo copiado';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function(){
          copyIcon.innerHTML = mailSvg;
          copyLabel.textContent = 'Escribir un correo';
        }, 1800);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(email).then(showConfirmation).catch(function(){
          copyLabel.textContent = email;
        });
      } else {
        copyLabel.textContent = email;
      }
    });
  }

  // ---------- lightbox ----------
  // TODO: MEDIA (versión ampliada) — cada bloque tiene un campo "media" vacío.
  // Cuando tengas el archivo real en assets/media/, pega ahí el HTML y se
  // mostrará en grande dentro del lightbox en vez del patrón de marcador.
  // Ejemplos listos para copiar (descomenta la línea "media" que corresponda
  // y borra la que dice pattern, o deja ambas — si "media" tiene contenido,
  // tiene prioridad sobre "pattern"):
  //   cloud:     media: '<img src="assets/media/comp-01-modelo-3d.jpg" alt="Modelo 3D en Revit">'
  //   layers:    media: '<div class="gallery-row"><img src="assets/media/comp-02-vista-01.jpg" alt="Arquitectura"><img src="assets/media/comp-02-vista-02.jpg" alt="Estructura y encofrados"><img src="assets/media/comp-02-vista-03.jpg" alt="Acero de refuerzo"></div>'
  //   timeline:  media: '<video src="assets/media/comp-03-simulacion-4d.mp4" autoplay muted loop playsinline></video>'
  //   nodes:     media: '<img src="assets/media/comp-04-dynamo-script.png" alt="Script de Dynamo">'
  //   dashboard: media: '<img src="assets/media/comp-05-dashboard.png" alt="Dashboard de control en Power BI">'
  //              (o un <iframe> si usas la Opción A de Power BI — ver el TODO en index.html)
  var data = {
    cloud:     { code:'COMP-01', type:'Comparador de imágenes', title:'Modelado 3D a partir de Nubes de Puntos', desc:'Aquí se mostrará el comparador ampliado nube de puntos (.LAS) vs. modelo 3D en Revit, o un video del recorrido de registro.', pattern:'', media:'<img src="assets/media/comp-01-nube-puntos.jpg" alt="Nube de puntos escaneada">' },
    layers:    { code:'COMP-02', type:'Galería de vistas 3D', title:'Modelado BIM 3D (Estructuras y Arquitectura)', desc:'Aquí irá la galería con vistas de detalle: acero de refuerzo, encofrados y coordinación entre arquitectura y estructuras.', pattern:'pattern-layers', media:'' },
    timeline:  { code:'COMP-03', type:'Video en bucle', title:'Simulación 4D de Procesos Constructivos', desc:'Aquí se incrustará el video de la simulación 4D en Navisworks, incluida la detección de interferencias logísticas de obra.', pattern:'pattern-timeline', media:'' },
    nodes:     { code:'COMP-04', type:'Captura en alta resolución', title:'Automatización de Procesos con Dynamo', desc:'Aquí irá la captura del lienzo de Dynamo o el gif de ejecución de la rutina de parametrización.', pattern:'pattern-nodes', media:'' },
    dashboard: { code:'COMP-05', type:'Dashboard interactivo', title:'Integración de Datos & Paneles de Control (Power BI)', desc:'Aquí se incrustará el panel de Power BI en vivo (o una captura interactiva) con las métricas de obra y metrados.', pattern:'pattern-dashboard', media:'' }
  };

  var lightbox = document.getElementById('lightbox');
  var mediaEl  = document.getElementById('lightbox-media');
  var codeEl   = document.getElementById('lightbox-code');
  var typeEl   = document.getElementById('lightbox-type');
  var titleEl  = document.getElementById('lightbox-title');
  var descEl   = document.getElementById('lightbox-desc');
  var lastFocused = null;

  function openLightbox(id){
    var d = data[id];
    if(!d) return;
    var visual = d.media
      ? d.media
      : '<div class="media-pattern ' + (d.pattern || 'pattern-layers') + '" style="position:absolute;inset:0;"></div>';
    mediaEl.innerHTML = '<button class="lightbox-close" type="button" data-close aria-label="Cerrar">×</button>' + visual;
    codeEl.textContent = d.code;
    typeEl.textContent = d.type;
    titleEl.textContent = d.title;
    descEl.textContent = d.desc;
    lastFocused = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
    var closeBtn = mediaEl.querySelector('[data-close]');
    if(closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', onKeydown);
    if(lastFocused) lastFocused.focus();
  }

  function onKeydown(e){
    if(e.key === 'Escape') closeLightbox();
  }

  document.querySelectorAll('[data-lightbox]').forEach(function(btn){
    btn.addEventListener('click', function(){
      openLightbox(btn.getAttribute('data-lightbox'));
    });
  });

  lightbox.addEventListener('click', function(e){
    if(e.target.hasAttribute('data-close')) closeLightbox();
  });
})();
