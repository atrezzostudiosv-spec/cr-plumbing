# CR Plumbing — ATREZZO / Fase 1 SEO técnico de la demo

**Fecha:** 2026-10-27
**Repositorio:** `atrezzostudiosv-spec/cr-plumbing`
**Sitio de propuesta:** https://atrezzostudiosv-spec.github.io/cr-plumbing/
**Estado:** auditoría estática e intervención de seguridad de indexación; **NO aprobación SEO de producción**.

## Regla de alcance

Preservar diseño, fotografías aprobadas, HTML de servicios, URLs, 66 páginas acreditadas, registros de afirmaciones y la prohibición de presentar la propuesta como un sitio oficial. Ningún servicio, precio, garantía, licencia, testimonio o área de servicio se ha inventado en esta fase.

## REALIZADO

1. Se inspeccionaron los 87 archivos `index.html` accesibles por GitHub, incluidas páginas de servicios, corporativas, recursos y alias con redirecciones.
2. Se comprobó la presencia de `title`, metadescripción, H1, `noindex`, atributo `alt` en elementos `img` y referencias de recursos locales en esos HTML.
3. Se incorporó exactamente `<meta name="robots" content="noindex,nofollow">` a las ocho rutas que carecían de la restricción. No se modificó contenido comercial ni estructura visual.
4. Se preservaron las tres redirecciones `meta refresh`; son alias, por eso no tienen H1 ni metadescripción. **No inventar una nueva página de servicio en ellas.**
5. Se revisó el árbol del repositorio: no se encontró `sitemap.xml` ni `robots.txt` activos en su raíz. **No añadir sitemap o robots de producción a la demo.**

## VERIFICADO EN CÓDIGO

| Comprobación | Resultado |
|---|---:|
| Archivos HTML de ruta | **87** |
| Título HTML | **87/87** |
| Página de contenido con un H1 | **84/84** |
| Metadescripción en página de contenido | **84/84** |
| Alias de redirección sin H1 ni descripción | **3** (correcto para su función) |
| Archivos con noindex antes de la corrección | **79/87** |
| Archivos con noindex después | **87/87** (79 conservados, 8 corregidos y releídos) |
| Elementos `img` sin atributo `alt` encontrados en HTML | **0** |
| Referencias locales a recursos/rutas inexistentes encontradas en los HTML | **0** |
| Sitemap.xml o robots.txt activos en raíz | **No presentes** |

**Limitación de enlaces:** la comprobación determina que el archivo de destino existe en GitHub; no equivale a verificar navegación real, códigos HTTP de producción ni enlaces externos.
**Limitación de accesibilidad:** que exista `alt` no garantiza una descripción acertada. Las fotografías CSS de fondo no son elementos `img` y requieren revisión editorial contextual.

## Correcciones de indexación efectuadas

- `electrical-services/backup-emergency-powers/generac-generator-installation/index.html`
- `electrical-services/backup-emergency-powers/portable-generator-setup/index.html`
- `electrical-services/backup-emergency-powers/power-outage-response/index.html`
- `electrical-services/generators/index.html`
- `electrical-services/installations-upgrade/surge-protection-systems/index.html`
- `electrical-services/smart-efficient-electrical-solution/ev-home-charging-stations/index.html`
- `privacy-policy/index.html`
- `reviews/index.html`

## Tres alias intencionales — mantener hasta resolver redirecciones oficiales

- `electrical-services/backup-emergency-powers/generac-generator-installation/index.html`
- `electrical-services/backup-emergency-powers/power-outage-response/index.html`
- `electrical-services/generators/index.html`

En GitHub Pages se implementan con `meta refresh`; para el dominio definitivo evaluar una redirección HTTP 301 en el proveedor de alojamiento. **No publicarla ni asignar destino diferente sin validar la estrategia de URLs.**

## Hallazgos / prioridades

### P0 — protección de demo (corregida en código)
- Las ocho rutas anteriores no declaraban `noindex`, pudiendo exponer páginas de propuesta a motores de búsqueda. La etiqueta ya está presente en las 87 rutas HTML.
- No afirmar desindexación efectiva: requiere inspección de Google Search Console/URL Inspection si se detectara alguna URL indexada.
- La demo conserva `noindex` deliberadamente hasta permiso expreso de lanzamiento.

### P1 — presentación SEO y rastreo de producción (PENDIENTE)
- Revisar y normalizar los títulos que repiten la marca en dos segmentos, por ejemplo `... | CR Plumbing | CR Plumbing, Air & Electric`; conservar términos de servicios acreditados.
- Preparar `rel=canonical` por ruta **usando el dominio definitivo confirmado**, no canonicals nuevos apuntando a una demo.
- Preparar `sitemap.xml` de producción con **solo URLs canónicas aprobadas**, excluyendo los alias de redirección.
- Preparar `robots.txt` definitivo y probar su ruta raíz en el hosting elegido. No utilizarlo como sustituto de `noindex`.
- Crear Open Graph y Twitter Cards con un recurso visual verificable y las dimensiones correctas; revisar diseño y propiedad de la fotografía. Se detecta ausencia en las páginas de muestra y ninguna definición compartida confirmada.
- Definir favicon apropiado a partir de branding aprobado, no a partir de una marca inventada.
- Revisar Schema.org solo para teléfono, nombre, dirección(es), zonas y servicios **acreditados**; separar oficinas de localidades atendidas.
- Revisar los títulos, metadescripciones y contenido que mencionan plazos de respuesta, gratuidad, certificaciones, beneficios o garantías contra `ATREZZO-CR-CLAIMS-VALIDATION.md`.
- `privacy-policy/` contiene texto de referencia, no la política final aprobada. No publicar como aviso legal definitivo.
- Las páginas de `reviews/` y el contenido gráfico conceptual no deben convertirse en reseñas reales ficticias.

### P2 — pruebas y lanzamiento (NO COMPROBADO)
- Códigos HTTP, enlaces externos, 404 reales, sitemap/robots en dominio final, hreflang si procede, Search Console y redirecciones HTTP.
- PageSpeed, Lighthouse, LCP/INP/CLS, carga de CSS/JS, orden y prioridades de fotografías.
- Formularios reales, entrega de mensajes, consentimiento, navegación y experiencia a 375/768/1024/1440 px.
- Auditoría WCAG 2.2 AA con navegador y teclado. La mera presencia de CSS responsive no constituye evidencia de revisión visual.

## Inventario de 87 rutas

Las filas documentan el estado de los elementos SEO básicos en la lectura de HTML y las ocho correcciones. Las tres páginas de redirección no requieren H1 ni metadescripción de artículo.

| # | Ruta HTML | `noindex` | Tipo |
|---:|---|---|---|
| 1 | `about-us/cr-home-protection/index.html` | Ya existía | Página |
| 2 | `about-us/index.html` | Ya existía | Página |
| 3 | `about-us/meet-our-team/index.html` | Ya existía | Página |
| 4 | `about-us/photo-gallery/index.html` | Ya existía | Página |
| 5 | `all-services/index.html` | Ya existía | Página |
| 6 | `blog/index.html` | Ya existía | Página |
| 7 | `book-online/index.html` | Ya existía | Página |
| 8 | `careers-page/index.html` | Ya existía | Página |
| 9 | `contact-us/index.html` | Ya existía | Página |
| 10 | `electrical-services/backup-emergency-powers/critical-load-panels/index.html` | Ya existía | Página |
| 11 | `electrical-services/backup-emergency-powers/emergency-electrical-support/index.html` | Ya existía | Página |
| 12 | `electrical-services/backup-emergency-powers/generac-generator-installation/index.html` | Añadido 27/10 | Alias / meta refresh |
| 13 | `electrical-services/backup-emergency-powers/index.html` | Ya existía | Página |
| 14 | `electrical-services/backup-emergency-powers/portable-generator-setup/index.html` | Añadido 27/10 | Página |
| 15 | `electrical-services/backup-emergency-powers/power-outage-response/index.html` | Añadido 27/10 | Alias / meta refresh |
| 16 | `electrical-services/backup-emergency-powers/whole-home-surge-protection/index.html` | Ya existía | Página |
| 17 | `electrical-services/electrical-inspections-troubleshooting/code-inspection-correction/index.html` | Ya existía | Página |
| 18 | `electrical-services/electrical-inspections-troubleshooting/home-electrical-inspections/index.html` | Ya existía | Página |
| 19 | `electrical-services/electrical-inspections-troubleshooting/index.html` | Ya existía | Página |
| 20 | `electrical-services/electrical-inspections-troubleshooting/power-outage-diagnostics/index.html` | Ya existía | Página |
| 21 | `electrical-services/electrical-inspections-troubleshooting/smoke-co-detector-inspections/index.html` | Ya existía | Página |
| 22 | `electrical-services/electrical-inspections-troubleshooting/troubleshooting-electrical-issues/index.html` | Ya existía | Página |
| 23 | `electrical-services/generators/index.html` | Añadido 27/10 | Alias / meta refresh |
| 24 | `electrical-services/index.html` | Ya existía | Página |
| 25 | `electrical-services/installations-upgrade/ceiling-fan-installation/index.html` | Ya existía | Página |
| 26 | `electrical-services/installations-upgrade/electrical-panel-upgrades/index.html` | Ya existía | Página |
| 27 | `electrical-services/installations-upgrade/ev-charger-installation/index.html` | Ya existía | Página |
| 28 | `electrical-services/installations-upgrade/generator-installation/index.html` | Ya existía | Página |
| 29 | `electrical-services/installations-upgrade/index.html` | Ya existía | Página |
| 30 | `electrical-services/installations-upgrade/indoor-outdoor-lighting/index.html` | Ya existía | Página |
| 31 | `electrical-services/installations-upgrade/outlet-switch-installation/index.html` | Ya existía | Página |
| 32 | `electrical-services/installations-upgrade/smoke-co-detector-installation/index.html` | Ya existía | Página |
| 33 | `electrical-services/installations-upgrade/surge-protection-systems/index.html` | Añadido 27/10 | Página |
| 34 | `electrical-services/repair-maintenance/arc-fault-breaker-repair/index.html` | Ya existía | Página |
| 35 | `electrical-services/repair-maintenance/circuit-breaker-repair/index.html` | Ya existía | Página |
| 36 | `electrical-services/repair-maintenance/general-electrical-repairs/index.html` | Ya existía | Página |
| 37 | `electrical-services/repair-maintenance/index.html` | Ya existía | Página |
| 38 | `electrical-services/repair-maintenance/overheating-meter-socket-repair/index.html` | Ya existía | Página |
| 39 | `electrical-services/repair-maintenance/underground-wiring-repair/index.html` | Ya existía | Página |
| 40 | `electrical-services/repair-maintenance/wiring-repairs/index.html` | Ya existía | Página |
| 41 | `electrical-services/smart-efficient-electrical-solution/energy-efficient-lighting/index.html` | Ya existía | Página |
| 42 | `electrical-services/smart-efficient-electrical-solution/ev-home-charging-stations/index.html` | Añadido 27/10 | Página |
| 43 | `electrical-services/smart-efficient-electrical-solution/index.html` | Ya existía | Página |
| 44 | `electrical-services/smart-efficient-electrical-solution/load-management-devices/index.html` | Ya existía | Página |
| 45 | `electrical-services/smart-efficient-electrical-solution/smart-home-wiring/index.html` | Ya existía | Página |
| 46 | `electrical-services/smart-efficient-electrical-solution/smart-switches-dimmers/index.html` | Ya existía | Página |
| 47 | `financing/index.html` | Ya existía | Página |
| 48 | `gas-services/appliances/index.html` | Ya existía | Página |
| 49 | `gas-services/gas-fireplace-repair/index.html` | Ya existía | Página |
| 50 | `gas-services/gas-leak-repairs/index.html` | Ya existía | Página |
| 51 | `gas-services/index.html` | Ya existía | Página |
| 52 | `gas-services/line-installs/index.html` | Ya existía | Página |
| 53 | `hvac/cooling/index.html` | Ya existía | Página |
| 54 | `hvac/cooling/maintenance-repair/index.html` | Ya existía | Página |
| 55 | `hvac/cooling/mini-splits/index.html` | Ya existía | Página |
| 56 | `hvac/cooling/new-installation/index.html` | Ya existía | Página |
| 57 | `hvac/dryer-vent-duct/index.html` | Ya existía | Página |
| 58 | `hvac/dryer-vent-duct/maintenance-repair/index.html` | Ya existía | Página |
| 59 | `hvac/dryer-vent-duct/new-installation/index.html` | Ya existía | Página |
| 60 | `hvac/heating/index.html` | Ya existía | Página |
| 61 | `hvac/heating/maintenance-repair/index.html` | Ya existía | Página |
| 62 | `hvac/heating/new-installation/index.html` | Ya existía | Página |
| 63 | `hvac/index.html` | Ya existía | Página |
| 64 | `hvac/indoor-air-quality/humidifiers-dehumidifiers/index.html` | Ya existía | Página |
| 65 | `hvac/indoor-air-quality/index.html` | Ya existía | Página |
| 66 | `index.html` | Ya existía | Página |
| 67 | `merchandise-store/index.html` | Ya existía | Página |
| 68 | `plumbing-services/appliance-plumbing/index.html` | Ya existía | Página |
| 69 | `plumbing-services/backflow-prevention/index.html` | Ya existía | Página |
| 70 | `plumbing-services/fixtures/index.html` | Ya existía | Página |
| 71 | `plumbing-services/fixtures/maintenance-repair/index.html` | Ya existía | Página |
| 72 | `plumbing-services/fixtures/new-installation/index.html` | Ya existía | Página |
| 73 | `plumbing-services/garbage-disposals/index.html` | Ya existía | Página |
| 74 | `plumbing-services/hydrojetting/index.html` | Ya existía | Página |
| 75 | `plumbing-services/index.html` | Ya existía | Página |
| 76 | `plumbing-services/sewer-line/index.html` | Ya existía | Página |
| 77 | `plumbing-services/sewer-line/sewer-line-maintenance-repair/index.html` | Ya existía | Página |
| 78 | `plumbing-services/sewer-line/trenchless-sewer-repair/index.html` | Ya existía | Página |
| 79 | `plumbing-services/sump-pump/index.html` | Ya existía | Página |
| 80 | `plumbing-services/water-filtration/index.html` | Ya existía | Página |
| 81 | `plumbing-services/water-heaters/index.html` | Ya existía | Página |
| 82 | `plumbing-services/water-heaters/tank-water-heaters/index.html` | Ya existía | Página |
| 83 | `plumbing-services/water-heaters/tankless-water-heater/index.html` | Ya existía | Página |
| 84 | `plumbing-services/water-lines/index.html` | Ya existía | Página |
| 85 | `privacy-policy/index.html` | Añadido 27/10 | Página |
| 86 | `reviews/index.html` | Añadido 27/10 | Página |
| 87 | `service-areas/index.html` | Ya existía | Página |

## Próximo paso autorizado por el protocolo

Continuar con revisión de calidad de títulos y descripciones, identificadores de redes, canonicals de **producción en borrador** y coherencia de información local. Después entrar en fase 2 de optimización de código sin modificar el diseño aprobado.

**Estado de entrega:** cambios guardados en GitHub; no afirmar publicado hasta que GitHub Pages confirme el último deployment.
