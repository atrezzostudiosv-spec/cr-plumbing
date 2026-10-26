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
