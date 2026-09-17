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
  // TODO: MEDIA (versión ampliada) — dos formas de cargar contenido real:
  //  · "gallery": array de fotos con flechas de navegación — usalo para
  //    listas de 1 a N imágenes (como COMP-02). Para sumar una foto más,
  //    agregá una línea al array, nada más — no toques ninguna otra parte
  //    del código.
  //  · "media": un bloque fijo de HTML (una imagen, un video, un iframe) —
  //    para contenido de una sola pieza, como el video de COMP-03.
  // Si "gallery" tiene elementos, manda por sobre "media" y "pattern".
  var data = {
    cloud:     { code:'COMP-01', type:'Comparador de imágenes', title:'Modelado 3D a partir de Nubes de Puntos', desc:'Aquí se mostrará el comparador ampliado nube de puntos (.LAS) vs. modelo 3D en Revit, o un video del recorrido de registro.', pattern:'', media:'' },
    layers:    {
      code:'COMP-02', type:'Galería de vistas 3D', title:'Modelado BIM 3D (Estructuras y Arquitectura)',
      desc:'Recorre las distintas vistas del modelo con las flechas.',
      pattern:'pattern-layers', media:'',
      gallery: [
        { src:'assets/media/comp-02-vista-01.jpg', alt:'Arquitectura' },
        { src:'assets/media/comp-02-vista-02.jpg', alt:'Estructura y encofrados' },
        { src:'assets/media/comp-02-vista-03.jpg', alt:'Acero de refuerzo' }
        // Para sumar una vista más, agregá una línea igual a estas de arriba,
        // con una coma antes, por ejemplo:
        // , { src:'assets/media/comp-02-vista-04.jpg', alt:'Instalaciones' }
      ]
    },
    timeline:  { code:'COMP-03', type:'Video en bucle', title:'Simulación 4D de Procesos Constructivos', desc:'Aquí se incrustará el video de la simulación 4D en Navisworks, incluida la detección de interferencias logísticas de obra.', pattern:'pattern-timeline', media:'<video src="assets/media/comp-03-simulacion-4d.mp4" controls autoplay playsinline></video>' },
    nodes:     { code:'COMP-04', type:'Captura en alta resolución', title:'Automatización de Procesos con Dynamo', desc:'Aquí irá la captura del lienzo de Dynamo o el gif de ejecución de la rutina de parametrización.', pattern:'pattern-nodes', media:'' },
    dashboard: { code:'COMP-05', type:'Dashboard interactivo', title:'Integración de Datos & Paneles de Control (Power BI)', desc:'Aquí se incrustará el panel de Power BI en vivo (o una captura interactiva) con las métricas de obra y metrados.', pattern:'pattern-dashboard', media:'' }
  };

  // badge "GALERÍA · N VISTAS" del bloque COMP-02: se calcula solo desde
  // el largo del array de arriba, no hay que tocar el HTML al sumar fotos.
  var comp02Tag = document.getElementById('comp02-count-tag');
  if(comp02Tag && data.layers.gallery){
    var n = data.layers.gallery.length;
    comp02Tag.textContent = 'GALERÍA · ' + n + (n === 1 ? ' VISTA' : ' VISTAS');
  }

  var lightbox = document.getElementById('lightbox');
  var mediaEl  = document.getElementById('lightbox-media');
  var codeEl   = document.getElementById('lightbox-code');
  var typeEl   = document.getElementById('lightbox-type');
  var titleEl  = document.getElementById('lightbox-title');
  var descEl   = document.getElementById('lightbox-desc');
  var lastFocused = null;
  var currentData = null;
  var currentGallery = null;
  var currentIndex = 0;

  function galleryArrowsHtml(){
    return '<button class="lightbox-nav lightbox-nav--prev" type="button" data-gallery-prev aria-label="Foto anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg></button>' +
           '<button class="lightbox-nav lightbox-nav--next" type="button" data-gallery-next aria-label="Foto siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5l7 7-7 7"/></svg></button>' +
           '<span class="lightbox-counter" aria-live="polite">' + (currentIndex + 1) + ' / ' + currentGallery.length + '</span>';
  }

  function renderMedia(){
    var html = '<button class="lightbox-close" type="button" data-close aria-label="Cerrar">×</button>';
    if(currentGallery && currentGallery.length){
      var photo = currentGallery[currentIndex];
      html += '<img src="' + photo.src + '" alt="' + photo.alt + '" loading="lazy">';
      if(currentGallery.length > 1) html += galleryArrowsHtml();
    } else {
      html += currentData.media ? currentData.media : '<div class="media-pattern ' + (currentData.pattern || 'pattern-layers') + '" style="position:absolute;inset:0;"></div>';
    }
    mediaEl.innerHTML = html;
    var prevBtn = mediaEl.querySelector('[data-gallery-prev]');
    var nextBtn = mediaEl.querySelector('[data-gallery-next]');
    if(prevBtn) prevBtn.addEventListener('click', function(){ stepGallery(-1); });
    if(nextBtn) nextBtn.addEventListener('click', function(){ stepGallery(1); });
  }

  function stepGallery(delta){
    currentIndex = (currentIndex + delta + currentGallery.length) % currentGallery.length;
    renderMedia();
  }

  function openLightbox(id){
    var d = data[id];
    if(!d) return;
    currentData = d;
    currentGallery = (d.gallery && d.gallery.length) ? d.gallery : null;
    currentIndex = 0;
    renderMedia();
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
    currentData = null;
    currentGallery = null;
    if(lastFocused) lastFocused.focus();
  }

  function onKeydown(e){
    if(e.key === 'Escape'){ closeLightbox(); return; }
    if(currentGallery && currentGallery.length > 1){
      if(e.key === 'ArrowLeft')  stepGallery(-1);
      if(e.key === 'ArrowRight') stepGallery(1);
    }
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
