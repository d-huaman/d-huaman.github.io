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

  // ---------- lightbox ----------
  var data = {
    cloud:     { code:'COMP-01', type:'Comparador de imágenes', title:'Modelado 3D a partir de Nubes de Puntos', desc:'Aquí se mostrará el comparador ampliado nube de puntos (.LAS) vs. modelo 3D en Revit, o un video del recorrido de registro.', pattern:'' },
    layers:    { code:'COMP-02', type:'Galería de vistas 3D', title:'Modelado BIM 3D (Estructuras y Arquitectura)', desc:'Aquí irá la galería con vistas de detalle: acero de refuerzo, encofrados y coordinación entre arquitectura y estructuras.', pattern:'pattern-layers' },
    timeline:  { code:'COMP-03', type:'Video en bucle', title:'Simulación 4D de Procesos Constructivos', desc:'Aquí se incrustará el video de la simulación 4D en Navisworks, incluida la detección de interferencias logísticas de obra.', pattern:'pattern-timeline' },
    nodes:     { code:'COMP-04', type:'Captura en alta resolución', title:'Automatización de Procesos con Dynamo', desc:'Aquí irá la captura del lienzo de Dynamo o el gif de ejecución de la rutina de parametrización.', pattern:'pattern-nodes' },
    dashboard: { code:'COMP-05', type:'Dashboard interactivo', title:'Integración de Datos & Paneles de Control (Power BI)', desc:'Aquí se incrustará el panel de Power BI en vivo (o una captura interactiva) con las métricas de obra y metrados.', pattern:'pattern-dashboard' }
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
    mediaEl.innerHTML = '<button class="lightbox-close" type="button" data-close aria-label="Cerrar">×</button>' +
      (d.pattern ? '<div class="media-pattern ' + d.pattern + '" style="position:absolute;inset:0;"></div>' : '<div class="media-pattern pattern-layers" style="position:absolute;inset:0;"></div>');
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
