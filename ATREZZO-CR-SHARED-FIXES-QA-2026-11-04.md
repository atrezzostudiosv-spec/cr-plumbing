# CR Plumbing — correcciones compartidas y QA

Fecha: 4 de noviembre de 2026. Base: `5effbf57c45ed8efd2186c8e0363c6bee8d645f8`.

Se corrigen tres fallos reproducidos en la auditoría. El alcance es JavaScript compartido; no se modifica HTML, CSS, fotografías, contenido editorial ni los motores cinematográficos aprobados.

## Comportamiento corregido

- El índice de lectura usa anclas `cr-section-N`. Los títulos conservan sus IDs `cr-chapter-N` y las relaciones `aria-labelledby` del HTML original. Antes, el generador repetía los IDs de los títulos en 20 rutas y hacía que varias secciones tomasen como nombre accesible otro bloque completo.
- Escape cierra el menú móvil mediante el manejador existente del botón, restaurando icono, estado ARIA y foco. Si hay un formulario modal abierto, Escape lo cierra primero; el menú conserva su estado hasta el siguiente Escape. Se mantiene el cierre de los paneles desktop.
- El formulario reconoce `.cr-page-hero h1` y conserva el fallback `.inner-hero h1` para páginas anteriores. En las páginas de servicio se rellena el servicio; en el Home permanece vacío. Continúa siendo un preparador de solicitudes, sin envío a servidor.
- Se actualizan las versiones de los tres módulos en `site.js` para evitar reutilizar sus versiones anteriores desde caché.

## Verificación realizada

Chrome real sobre la copia local servida desde `http://127.0.0.1:8765/cr-plumbing/` mediante CUA.

| Comprobación | Resultado |
|---|---|
| 20 rutas que reproducían IDs duplicados, 375×900 y 1440×900 | **40/40 correctas**: sin IDs duplicados, etiquetas de sección incorrectas, anclas del índice sin destino ni overflow horizontal; índice cargado en todos los casos |
| Menú móvil del Home y Gas Appliances, 375/768/1024×900 | **6/6 correctas**: apertura, acordeón HVAC, Escape, `aria-expanded=false`, etiqueta Open navigation y foco en el botón |
| Formulario en Gas Appliances, Heating Installation, Portable Generator Setup y Home, 375/1440×900 | **8/8 correctas**: servicio esperado, apertura, foco inicial en cierre, Escape y ausencia de overflow horizontal |
| Formulario sobre menú abierto, 768×900 | Primer Escape cierra formulario y conserva menú; segundo Escape cierra menú y devuelve foco al botón |
| Panel HVAC desktop, 1440×900 | Escape cierra panel y devuelve foco al disparador |
| Índice de Gas Appliances | El segundo enlace apunta a `#cr-section-2`; el destino es su sección correcta y existe tras recargar con el fragmento |
| Control estático del repositorio | 87 rutas, 84 páginas de contenido, 544 FAQ; 0 errores críticos, 0 avisos |
| Sintaxis JS de los cuatro archivos modificados y `git diff --check` | Correctas |

Las rutas afectadas eran las cinco de Gas y estas 15 de Electrical:

- `/electrical-services/repair-maintenance/`
- `/electrical-services/installations-upgrade/`
- `/electrical-services/repair-maintenance/overheating-meter-socket-repair/`
- `/electrical-services/repair-maintenance/underground-wiring-repair/`
- `/electrical-services/repair-maintenance/circuit-breaker-repair/`
- `/electrical-services/repair-maintenance/arc-fault-breaker-repair/`
- `/electrical-services/backup-emergency-powers/critical-load-panels/`
- `/electrical-services/backup-emergency-powers/whole-home-surge-protection/`
- `/electrical-services/smart-efficient-electrical-solution/load-management-devices/`
- `/electrical-services/electrical-inspections-troubleshooting/home-electrical-inspections/`
- `/electrical-services/electrical-inspections-troubleshooting/power-outage-diagnostics/`
- `/electrical-services/electrical-inspections-troubleshooting/smoke-co-detector-inspections/`
- `/electrical-services/electrical-inspections-troubleshooting/code-inspection-correction/`
- `/electrical-services/installations-upgrade/smoke-co-detector-installation/`
- `/electrical-services/installations-upgrade/electrical-panel-upgrades/`

## Evidencia y límites

El JSON detallado de la sesión y la captura del formulario con servicio automático se guardan en la carpeta local `auditoria-cr-plumbing-2026-11-04/correcciones`, fuera del repositorio. La captura muestra Heating System Installation in DFW en el campo del servicio.

Estas pruebas cubren las incidencias corregidas. No certifican accesibilidad completa, Safari, Firefox, dispositivos físicos, rendimiento, entrega de formularios, todas las imágenes remotas ni el diseño completo de todas las rutas. La web de GitHub Pages requiere integrar esta rama antes de reflejar las correcciones.

Siguiente trabajo: página local piloto de Argyle y posterior integración de las otras localidades con fuente. Continúan pendientes las fotos provisionales HVAC/Gas y los requisitos de producción identificados en la auditoría.
