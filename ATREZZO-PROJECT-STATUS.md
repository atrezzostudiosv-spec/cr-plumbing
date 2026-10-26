# ATREZZO PROJECT STATUS — CR PLUMBING
Actualizado: 2026-10-26

| Fase | Estado | Evidencia |
|---|---|---|
| Auditoría original | CERRADA | Auditoría y HTML original recibidos |
| Estrategia y arquitectura | CERRADA | Multipágina; 66 servicios más corporativas |
| Copy de 66 servicios | EN VALIDACIÓN | Documento preparado; afirmaciones sujetas a última revisión |
| Dirección cinematográfica V2.1 | EN VALIDACIÓN | Propuesta aprobable; falta validar resultado visual |
| Home V1 en GitHub | EN VALIDACIÓN | 4 escenas de servicios, navegación corporativa y megamenú completo con links internos |
| Páginas internas | EN VALIDACIÓN | 66 páginas de servicio, 12 corporativas + 3 alias/complementarias implementadas; contenido pendiente de revisión visual/editorial |
| QA responsive y funcional | EN PROCESO | Verificados HTML/JS/rutas estáticas; renderizado de navegador real NO COMPROBADO |
| GitHub Pages | VERIFICADO (despliegue) | Workflow `pages build and deployment` #1 terminado correctamente; `main` → `/(root)`. Renderizado y carga de imágenes sin comprobar |
| Entrega cliente | BLOQUEADA | Requiere aprobación visual, internas y QA |

## Decisiones vigentes
- Repositorio: `atrezzostudiosv-spec/cr-plumbing`, rama `main`.
- No seguir replicando plantillas de Gemini; diseñar la experiencia Atrezzo.
- Home primero. No eliminar alcance de internas.
- Enlaces a la web original de forma provisional hasta implementar las internas.
- No incluir texto «demo», afirmaciones no acreditadas, reseñas falsas, licencias de relleno, ni falsa confirmación de formularios.
- Material original fotográfico requiere validación de vigencia/derechos y traslado a assets locales.

## Siguiente trabajo autorizado
1. Validación visual del Home con capturas reales desktop/tablet/móvil.
2. Ajustar composición únicamente donde haya problemas observados.
3. Migrar fotografías al repositorio tras comprobar procedencia y calidad.
4. Construir páginas internas una vez aprobada la base.

## Revisión de navegación y formularios — 2026-10-26
- Menú: 66 servicios desde el documento original, 12 páginas corporativas, y tres rutas del menú antiguo (dos alias y una EV Charging Stations).
- Todos los enlaces clicables del Home hacia crplumbingdfw.com sustituidos por rutas de GitHub Pages.
- Las fotografías todavía se solicitan desde el dominio original: falta migración de imágenes al repositorio.
- Contact y Book Online contienen formularios HTML con validación de navegador; NO TRANSMITEN datos sin una integración consentida del propietario.
- La presentación no contiene avisos generales de «demo»; los formularios no muestran falsas confirmaciones.

## Cierre provisional de esta iteración — 26/10/2026
- GitHub contiene 86 páginas HTML: Home + 66 fichas del paquete de servicios + 12 corporativas + Book Online + seis rutas de menú ampliadas/alias.
- Menú desktop/móvil enlaza dentro de este repositorio; Home sin enlaces navegacionales salientes al sitio original.
- Contact y Book Online recogen datos localmente, validan campos y permiten copiar los detalles para comunicarlos por teléfono. NO existe un servicio de recepción ni envíos automáticos.
- La carga de las imágenes aún depende de URLs de crplumbingdfw.com; pendiente de migrar recursos originales a assets locales.
- Pendiente QA visual en navegador real a 375,768,1024,1440px; no confundir inspección de código con pruebas responsive.
- Galería, blog, privacy policy y otras corporativas requieren ampliación de contenido y verificación; no marcar como finalizadas.

## Ajuste UX — Popup de solicitud (26/10/2026)
- Implementado modal editorial compartido en `assets/request-modal.js` y `assets/request-modal.css` para Request Service y Book Online. No modifica el menú Contact ni las URLs individuales.
- Autorrellena servicio desde el H1 de la página; incluye nombre, teléfono, ciudad, email opcional y descripción.
- Accesibilidad implementada en código: cerrar por Escape, clic exterior, foco retenido y retorno al botón de apertura.
- Acción real disponible: copiar los detalles para comunicarlos al equipo por teléfono. **NO hay envío a un servidor**, ni reserva confirmada; pendiente de integración autorizada.
- Ajustado hero de páginas internas con `min-height` adaptativo y tamaños fluidos para evitar recorte del H1 mostrado en captura.
- Aún falta revisión visual del popup en navegador a 375, 768, 1024, 1440 y prueba manual de copiado.

## Home — scroll cinematográfico de servicios (26/10/2026)
- Integrada secuencia anclada **Plumbing → HVAC → Electrical → Gas** mediante `index.html`, `assets/services-story.css` y `assets/services-story.js`.
- Un único escenario sticky permanece bajo el header mientras cada servicio aparece por encima del anterior y se mantiene durante el siguiente tramo de scroll.
- Se conservan fotos, copy y enlaces internos de cada categoría; no se cambian las 66 fichas de servicios ni el popup.
- Tablet con transiciones adaptadas; móvil <=760px y `prefers-reduced-motion`: escenas normales en vertical, sin pin ni animación forzada.
- Control de foco: escenas que no están activas quedan no interactivas y ocultas del árbol accesible durante la secuencia.
- **EN VALIDACIÓN:** código y despliegue verificables; falta comprobar visualmente la interacción con scroll real y tamaños de pantalla.

## Refinamiento cinematográfico — 26/10/2026
- Ajuste aprobado por observación del usuario: la tarjeta siguiente entraba demasiado rápido y el zoom resultaba casi imperceptible.
- `assets/services-story.js`: duración relativa de la entrada aumentada de 0.085 a 0.16 del recorrido; puntos de entrada escalonados 0.17 / 0.42 / 0.67; curva ease-in-out ligada al scroll, sin temporizadores ni scroll forzado.
- Zoom progresivo real de escala 1.025 a 1.093 (incremento de 6.8 puntos porcentuales) mientras cada escena se muestra.
- `assets/services-story.css`: recorrido de escenario anclado ampliado a 540svh en desktop y 510svh en tablet.
- Móvil <= 760 px y usuarios con movimiento reducido conservan escenas apiladas sin zoom ni pin.
- **EN VALIDACIÓN VISUAL:** verificación estática de código completada; probar desplazamiento en navegador real y confirmar contraste/recorte de las fotos antes de cerrar.

## New family photograph — 2026-10-26
- Supplied family portrait optimized to WebP at 1200x675 (43.8 KB), stored under `assets/images/cr-family-portrait.webp`.
- Family photo now appears in Home hero, About hero, Meet Our Team hero, and the Home family section. A smaller authentic team image accompanies the Home family feature.
- Desktop: wide portrait to the right, dark copy area on the left. At <=1100 px: text and CTAs above a 1.6:1 image; at <=760px: 1.37:1 right-aligned crop retaining all six people.
- Scoped `assets/family-hero.css` applies to these areas only. Previously approved four-service scroll effect unchanged.
- Responsive visual browser QA at 375, 768, 1024, and 1440px remains pending until verified.

## Home — elimination of duplicate service directory (2026-10-26)
- Removed `Skip to What You Need` section because Plumbing/HVAC/Electrical/Gas were already presented directly above in the approved photographic scroll sequence.
- Home now transitions directly from the Gas scene to the family/About section, improving narrative and avoiding repeated menus.
- Preserved category links within the four scenes, global navigation, service pages, header booking and Contact. Removed unused desktop/mobile CSS for the deleted directory.
- Scoped change only to Home markup and associated obsolete CSS. No changes to pinned scroll animation, hero or internal pages.
- Code structural validation completed; browser visual transition pending verification.

## Home — genuine CR Plumbing story film (2026-10-26)
- Supplied original video is 7m00s at 640x360 (source was 22 MB). We used only a lightweight 12-second silent teaser compressed to 269 KB plus an interview frame WebP poster (~33 KB).
- The Home About section is now an editorial video feature. Desktop uses muted in-view-only teaser playback with pause control; tablet/mobile and reduced-motion use poster/play.
- Clicking Watch Their Story opens a modal that embeds the full user-provided YouTube video `X-jxiA0HPFE`, loaded only on click, with accessible close and YouTube fallback link.
- The Home hero, four cinematic service chapters, internal service pages and data are unchanged. No background full-length stream was installed.
- Source file supplied by user; video identified as CR Plumbing company story from contents. Video reuse still subject to client's rights confirmation before production release.
- **QA pending:** video playback in actual browsers at 375/768/1024/1440 px, YouTube embed and poster cropping. Do not report as tested without actual browser validation.

## Home — story film proportion and background refinement (26/10/2026)
- Approved company-story video, full-film modal and text preserved. Only `assets/story-film.css` changed for visual balance.
- Background changed from plain white to a very light slate-blue gradient spanning the complete section width (not a boxed card).
- Desktop editorial grid adjusted from 1.17 / .83 to 1.08 / .92 for more text room; gap reduced, headline font scaled down and whitespace tightened. Film remains the visual lead with a subtle shadow.
- Tablet/mobile spacing adapted; mobile remains text first, poster/video below.
- GitHub Pages deployment for CSS commit `b6ede9a` succeeded. **Actual browser rendering at 375/768/1024/1440 and playback still NOT COMPROBADO** due unavailable live browser access. Screenshot from client used for design diagnosis.

## Home + Reviews — real customer reputation (26 October 2026)
- Rebuilt the dark Home reputation section with a 4.8/5 Google rating (Argyle business profile) and exact 96%-filled visual stars, prominent Google review CTA, plus 1,200+ customer reviews **company reported**.
- Verification guardrail: 4.8/5 rating from external Argyle listing; 1,200+ count is published on CR's own review page and links to Google, but is NOT independently verified as the number on the single Argyle Google listing. The distinction is explicit in the design.
- Rebuilt local `/reviews/` page with the same rating graphic, three short, attributed customer quotes published by CR (Jim W., Lauren S., Jenn F.), plus Google and local contact links; no fabricated testimonials.
- Dedicated scoped stylesheet `assets/reputation.css`; Home and Reviews CSS links versioned to prevent stale caches. No changes to the approved hero, cinematic service chapters or story video.
- **QA EN VALIDACIÓN:** HTML, content sources and internal destinations verified. Actual browser visual tests at desktop/tablet/mobile not independently completed.
