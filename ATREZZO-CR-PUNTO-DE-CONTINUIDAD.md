# CR Plumbing — punto de control y continuidad ATREZZO
**Fecha:** 27-10-2026
**Sitio de propuesta:** https://atrezzostudiosv-spec.github.io/cr-plumbing/
**Repositorio:** https://github.com/atrezzostudiosv-spec/cr-plumbing
**Rama principal auditada:** `main` en `c8f885e6c8e49149899433527ade7276b58a0f23`
**Norma vinculante:** [ATREZZO-PROTOCOLO-OPTIMIZACION-WEB.md](./ATREZZO-PROTOCOLO-OPTIMIZACION-WEB.md)

## 1. Qué quedó acordado (PART 1 / PART 2)
- El **Home cinematográfico está aprobado**. No rehacerlo ni alterar su composición, fotografías, secuencia de scroll o video salvo fallo comprobado o petición expresa.
- Las **66 fichas de servicios** deben conservar toda la información sustancial original y sus FAQ. No inventar servicios, zonas, precios, garantías, licencias, testimonios ni promesas.
- Las páginas deben ser editoriales, verticales, legibles y diferentes según su cantidad de información. No convertirlas en textos continuos ni replicar tarjetas mecánicamente.
- Fotografías cinematográficas pertinentes, WebP/SEO, contrastes y CTA adecuados. Fotografías generadas: ilustrativas, nunca trabajos/clientes/personal reales.
- **How It Works**, FAQ, Related Services y **Let's Talk** conservan su función y el orden correcto según la estructura aprobada. No mover secciones para simular el efecto del Home.
- Modelo visual de comparación en HVAC: `/hvac/heating/maintenance-repair/`. La cantidad de capítulos no debe forzarse si difiere el contenido de la fuente.
- La web en GitHub Pages es una propuesta, no una web oficial. Conservar `noindex,nofollow` y no conectar formularios o tracking sin aprobación y acceso real.

## 2. Estado comprobado por QA automatizada
Ejecución: https://github.com/atrezzostudiosv-spec/cr-plumbing/actions/runs/40576086962

| Elemento | Resultado | Alcance |
|---|---:|---|
| Rutas HTML existentes | 87 | Código |
| Páginas de contenido | 84 | Código |
| Alias de redirección | 3 | Código |
| FAQ existentes | 544 | Código |
| Rutas con referencia a plantilla `cr-template-v1` | 32 | Solo CSS/HTML, NO diseños visualmente aprobados |
| Referencias a recursos originales externos en HTML | 219 | Referencias, no archivos únicos |
| Errores críticos del auditador (title, H1, meta, noindex, ALT, rutas locales CSS/HTML) | 0 | Prueba estática, NO prueba de red/browser |
| Archivos de imagen en el repositorio | 149 | Inventario GitHub, no certificación de calidad |
| WebP de servicio | 132 | Inventario GitHub |
| Directorio Service Areas | 45 nombres listados | Existencia, no cobertura actualmente verificada |
| Páginas individuales de localidades | 0 | Árbol del repositorio |

La auditoría SEO anterior del 27-10-2026 también documenta 87/87 rutas `noindex`, 84/84 H1/descripciones para páginas reales y tres alias. No confundir con la indexación real de Google.

## 3. Diferenciar las dos numeraciones de fases

### Fases del proyecto de DISEÑO CR Plumbing
- **Fase 3 — Plantilla maestra:** implementada parcialmente; **NO CERRADA** por falta de revisión visual/funcional a 375, 768, 1024, 1440 px.
- **Fase 4 — Adaptar 66 servicios:** **EN CURSO, NO APROBADA**. Plumbing 17/17 y HVAC 13/13 más Electrical 1/31 y Gas 1/5 llevan la clase CSS compartida (32/66); eso NO demuestra un diseño individual completo. Quedan 34 rutas sin la misma activación y, sobre todo, todas requieren QA editorial/fotográfica.
- **Fase 5 — Localidades y Google:** **PENDIENTE**. Separar oficinas reales de localidades servidas, validar lista de ciudades, crear solo páginas locales útiles y acreditadas, mapa interactivo, ordenar footer. Google Reviews (enlace/representación actual; sincronización no acreditada), Google Maps donde aporte utilidad, Analytics 4 y Search Console con cuentas/accesos y autorización.
- **Fase 6 — Auditoría final:** **PENDIENTE**. SEO técnico definitivo, scripts, formularios con entrega real, accesibilidad, links, performance, responsive, derechos y claims.

### Nueve etapas del PROTOCOLO DE OPTIMIZACIÓN (independiente de las fases de diseño)
1. SEO: **AUDITORÍA ESTÁTICA BASE REALIZADA / SEO de producción PENDIENTE** (canonicals finales, OG, sitemap/robots, datos estructurados verificados, duplicidades).
2. Código: **PENDIENTE**; conservar estructura HTML/CSS/JS vigente, no reescribir tecnología ni eliminar dependencias sin pruebas.
3. Imágenes: **PARCIAL**; auditar 149 archivos + 219 referencias remotas, calidad, recortes, WebP, ALT, dimensiones, preload/lazy.
4. Core Web Vitals: **NO MEDIDO** con Lighthouse/PageSpeed/Chrome real.
5. Responsive visual: **NO PROBADO** en navegador 375/768/1024/1440; no afirmar conformidad WCAG 2.2 AA.
6. GitHub y automatización: **INICIADA**; auditoría estática automatizada en rama y CI verde. Faltan capturas comparativas, pruebas de interacción/E2E y control de regresiones visuales.
7. Conversión: **PENDIENTE**; Contact y Book Online recopilan datos pero NO los envían a un backend; no hay reserva confirmada.
8. SEO local y publicación: **PENDIENTE**; perfiles/direcciones/cobertura verificados, URLs anteriores, Pages noindex, canonicals dominio final, sitemap y Search Console autorizados.
9. IA: **OPCIONAL/FUTURA**; no se incorpora asistente ni automatizaciones ficticias hasta verificar contactos y procesos del negocio.

## 4. Incidencias que bloquean entrega
1. **P0 VISUAL:** el usuario detectó desorden al modificar Heating Installation. Restauraciones hechas en el código, **sin prueba visual ni aprobación posterior**. Comparar su presentación con Heating Maintenance & Repair; preservar el orden y todo el copy. No replicar el experimento.
2. **P0 RESPONSIVE:** ausencia de renders y pruebas reales en anchos obligatorios, navegación móvil, scroll, transiciones, contraste y CTA.
3. **P0 FORMULARIOS:** envíos reales no conectados ni probados. Requieren cuenta y autorización del negocio.
4. **P0 LEGAL/COMERCIAL:** validar licencias, horarios, garantías, tiempos, vacantes, personal, política de privacidad, financiación, derechos de imágenes y video; registro `ATREZZO-CR-CLAIMS-VALIDATION.md`.
5. **P1 IMÁGENES:** 219 referencias externas todavía en el código HTML; revisar dependencia, permisos, pertinencia y medidas, evitando romper el diseño.
6. **P1 CONTENIDOS:** faltan artículos individuales del Blog, política legal aprobada, y validación de páginas corporativas/áreas.
7. **P1 SEO/GOOGLE:** Google Maps, Reviews dinámicas (si se autorizan), Analytics 4, Search Console, canonical/sitemap/schema del dominio definitivo. Mantener `noindex` mientras siga siendo una propuesta.
8. **P1 LIMPIEZA CONTROLADA:** `assets/heating-chapter-scroll.js` quedó en el repositorio tras un experimento revertido, aparentemente sin referencia en Heating Installation. No borrarlo sin búsqueda global de dependencias y prueba posterior.

## 5. Próximo punto de trabajo EXACTO
**RETOMAR EN FASE 3 DE DISEÑO (GATE VISUAL), NO REINICIAR EL HOME NI SEGUIR PROPAGANDO CSS.**
1. Renderizar lado a lado **Heating Maintenance & Repair** (referencia) y **Heating Installation** en 375 / 768 / 1024 / 1440 px, capturas de página completa.
2. Verificar orden, contraste, tamaños de fotografía, proporcionalidad, menús, CTA, FAQs y footer, sin alterar contenido.
3. Corregir **solo lo que falla**, en una rama; comparar antes/después y obtener aprobación visual de esa muestra.
4. Luego cerrar las cuatro páginas piloto Plumbing/HVAC/Electrical/Gas con la misma puerta de QA.
5. Recién entonces reiniciar Fase 4 de diseño por lotes (Plumbing → HVAC → Electrical → Gas), con fotografías y control por ruta.

## 6. Puertas de calidad no negociables
- Método: **AUDITAR → PRIORIZAR → CORREGIR → COMPILAR → COMPARAR → PROBAR → DOCUMENTAR → INTEGRAR**.
- Reportar **REALIZADO / VERIFICADO / NO COMPROBADO / PENDIENTE / SIGUIENTE PASO** y commit/PR.
- Trabajar sobre rama temporal; no llevar cambios visuales a `main` sin regresión visual y QA.
- GitHub Actions verde valida el código **estáticamente**, no diseño, funcionamiento de Google, rendimiento, red ni envío de formularios.
- No levantar `noindex` ni presentar la propuesta como sitio oficial sin aprobación.
- La siguiente fase no inicia mientras haya fallos críticos abiertos en la actual.
