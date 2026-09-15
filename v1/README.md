# assets/media/

Archivos reales que reemplazan los marcadores de posición (`TODO: MEDIA`) de
`index.html`. Usa exactamente estos nombres — minúsculas, con guiones, sin
espacios ni tildes — para que el sitio los encuentre sin tocar código.

## COMP-01 — Nubes de Puntos (comparador antes/después)
- `comp-01-nube-puntos.jpg` — la nube de puntos en ReCap
- `comp-01-modelo-3d.jpg` — el mismo encuadre, ya modelado en Revit
- Formato: JPG o WEBP, ~1600×1200px. Importante: usa el mismo ángulo/encuadre
  en ambas imágenes, o el efecto de "arrastrar para comparar" se ve raro.

## COMP-02 — Modelado Multidisciplinario (galería de 3 vistas)
- `comp-02-vista-01.jpg` — sugerido: arquitectura
- `comp-02-vista-02.jpg` — sugerido: estructura / encofrados
- `comp-02-vista-03.jpg` — sugerido: acero de refuerzo
- La vista 01 es la que se usa como preview en el bloque; las 3 se muestran
  juntas al ampliar (ver el TODO en `index.html`).

## COMP-03 — Simulación 4D (video en bucle)
- `comp-03-simulacion-4d.mp4` — recomendado: sin audio, 10–20s, idealmente <8MB
- Alternativa: `comp-03-simulacion-4d.gif` (pesa más que el video, úsalo solo
  si no puedes exportar mp4 desde Navisworks)

## COMP-04 — Automatización con Dynamo
- `comp-04-dynamo-script.png` — captura en alta resolución del lienzo
- Alternativa: `comp-04-dynamo-script.gif` — si prefieres mostrar la ejecución

## COMP-05 — Power BI
Elige una opción (ver el TODO detallado en `index.html`):
- **Opción A — Embed en vivo**: no necesita archivo aquí, se pega la URL de
  "Publicar en la Web" de Power BI directo en el `<iframe>`. Úsala solo si
  el dashboard NO tiene datos confidenciales de obra o cliente — el link
  público queda accesible para cualquiera que lo tenga.
- **Opción B — Captura estática** (más segura si los datos son de un
  proyecto real): `comp-05-dashboard.png`

---
Cuando agregues cada archivo, recuerda también completar el campo `media` en
`script.js` (está documentado ahí mismo) para que la versión ampliada del
lightbox muestre el archivo real en vez del patrón de marcador.
