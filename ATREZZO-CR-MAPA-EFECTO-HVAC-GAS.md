# CR Plumbing — Mapa del efecto cinematográfico en HVAC y Gas
**Fecha de actualización:** 2026-10-28
**Regla aprobada:** Service Overview permanece fija y hace zoom; How It Works sube cubriéndola, se fija y hace zoom propio. Scroll natural. En móvil y con movimiento reducido, flujo vertical estático.

## Estado verificable
- HVAC: 13 páginas en total. **1 aprobada previamente** (Heating Installation), **9 adicionales con efecto provisional**, **3 excluidas por estructura**.
- Gas: 5 páginas en total. **4 con efecto provisional** y **1 excluida**.
- **Total con efecto:** 14 (1 aprobada + 13 provisionales).
- **Fase fotográfica:** PENDIENTE. Las 13 nuevas escenas usan fotos existentes provisionalmente, nunca se consideran trabajos reales de CR Plumbing. Las imágenes no adecuadas se sustituyeron por fondos genéricos de temática próxima.
- **Prueba real de las 13 nuevas:** 65 casos de Chromium, 375×812, 768×900, 1024×700, 1440×900, 1440×768. **65/65 correctos**, sin errores JS ni desbordamiento, primer/segundo zoom, ascenso y llegada a FAQ.
- Evidencia: https://github.com/atrezzostudiosv-spec/cr-plumbing/actions/runs/40642966264

## Páginas con efecto provisional — pendientes de fotografía final
- `/hvac/` — Imagen original de HVAC, provisional.
- `/hvac/cooling/` — Imagen original de aire acondicionado, provisional.
- `/hvac/cooling/maintenance-repair/` — Imagen original de mantenimiento AC; marco circular antiguo, provisional.
- `/hvac/cooling/mini-splits/` — Imagen original de mini-split, provisional.
- `/hvac/dryer-vent-duct/maintenance-repair/` — Fondo local genérico de conducto exterior, provisional.
- `/hvac/dryer-vent-duct/new-installation/` — Fondo local genérico de dryer vent, provisional.
- `/hvac/heating/` — Fondo furnace genérico local, provisional.
- `/hvac/heating/maintenance-repair/` — Fondo furnace genérico local, provisional.
- `/hvac/indoor-air-quality/` — Imagen original de calidad del aire, provisional.
- `/gas-services/` — Fondo gas local genérico, provisional.
- `/gas-services/appliances/` — Foto local genérica de quemador y válvula de gas, provisional.
- `/gas-services/gas-fireplace-repair/` — Foto local genérica de fireplace, provisional.
- `/gas-services/line-installs/` — Fondo gas local genérico de inspección, provisional.

## Página ya aprobada anteriormente — sin modificaciones
- `/hvac/heating/new-installation/` — foto Furnace y efecto aprobados; no tocada por este lote.

## Excluidas — no aplicar el efecto
- `/hvac/cooling/new-installation/` — no existe sección Service Overview.
- `/hvac/dryer-vent-duct/` — capítulo informativo entre Overview y How It Works, no se cambia el orden.
- `/hvac/indoor-air-quality/humidifiers-dehumidifiers/` — no existe Service Overview.
- `/gas-services/gas-leak-repairs/` — no existe Service Overview.

## Control de calidad y siguiente paso
- No convertir automáticamente otras páginas por pertenecer a la misma categoría.
- No alterar textos, FAQ, orden de capítulos ni Home, Plumbing o Electrical.
- Pendiente: reemplazar fondos provisionales por fotografías cinematográficas individualmente aprobadas y localmente optimizadas en WebP, revisar foco, contraste y recorte para móvil.
- Pendiente adicional: revisión visual de usuario de las 13 páginas antes de cerrar su diseño individual.
