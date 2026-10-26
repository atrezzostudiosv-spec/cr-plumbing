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
