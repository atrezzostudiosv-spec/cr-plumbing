# CR Plumbing — Selección aprobada de efecto cinematográfico HVAC y Gas
Fecha: 2026-10-28. Referencia ya aprobada y aplicada: `hvac/heating/new-installation/`.

**Regla obligatoria:** No activar por categoría solamente. Debe haber Service Overview (`cr-docu-media`) seguido INMEDIATAMENTE por How It Works (`cr-process`), dos fotografías de fondo full-bleed pertinentes, texto legible, contenido intacto, QA responsive real y prueba de scroll. La simple adyacencia es un FILTRO INICIAL, no aprobación. No convertir fotos en recuadro a full-bleed ni mover capítulos sin revisión de esa página. El efecto será opt-in específico, no CSS/JS global. En móvil y movimiento reducido, scroll normal.

**Resultado real de auditoría:** 18 rutas (HVAC 13, Gas 5). Una lista y aprobada: Heating Installation. Trece son CANDIDATAS ESTRUCTURALES que requieren dirección fotográfica y validación; cuatro son NO APLICAR por composición diferente.

## Candidatas — NO implementar sin validar imágenes
- `/hvac/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/hvac/cooling/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/hvac/cooling/maintenance-repair/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/hvac/cooling/mini-splits/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/hvac/dryer-vent-duct/maintenance-repair/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/hvac/dryer-vent-duct/new-installation/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/hvac/heating/` — Imagen de Electrical, sustituir
- `/hvac/heating/maintenance-repair/` — Imagen de Electrical, sustituir
- `/hvac/indoor-air-quality/` — Imagen actual de overview en recuadro; revisar pertinencia, encuadre y textos antes de transformarla en fondo.
- `/gas-services/` — Overview sin foto, pendiente
- `/gas-services/appliances/` — Foto de Water Filtration, sustituir
- `/gas-services/gas-fireplace-repair/` — PNG actual sin validar para fondo
- `/gas-services/line-installs/` — Foto de HVAC, sustituir

## NO APLICAR — estructura diferente
- `/hvac/cooling/new-installation/` — no existe sección cr-docu-media
- `/hvac/dryer-vent-duct/` — capítulo informativo intermedio entre Overview y How It Works
- `/hvac/indoor-air-quality/humidifiers-dehumidifiers/` — no existe sección cr-docu-media
- `/gas-services/gas-leak-repairs/` — no existe sección cr-docu-media

## Ya aplicada y aprobada
- `/hvac/heating/new-installation/` — fondo de furnace, superposición desde abajo, segundo zoom, scroll nativo, fallback móvil.

**Continuidad:** Primero comprobar imágenes de las 13 candidatas, proponer backgrounds pertinentes, validar en navegador 375/768/1024/1440 y solo entonces aplicar por lote. No tocar Home, Plumbing, Electrical ni rutas NO APLICAR. Nunca declarar las 13 como terminadas solo porque tengan dos secciones contiguas.
