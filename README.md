# CR Plumbing, Air & Electric — Atrezzo Studios

Rediseño visual basado en los recursos y el contenido del sitio original [crplumbingdfw.com](https://www.crplumbingdfw.com/).

## Estado actual

- **Home aprobado visualmente por el usuario. No modificar sin solicitud específica.**
- Cuatro capítulos fotográficos (Plumbing, HVAC, Electrical y Gas), narrativa vertical y zoom suave al desplazarse.
- Desktop y móvil con composiciones diferenciadas; se respetan las preferencias de movimiento reducido.
- Menú con accesos a páginas internas propias; el código de navegación se conserva del Home aprobado.
- **66 páginas de servicios reescritas desde los 66 HTML originales**, con secciones, FAQ y diseño editorial propio, y 11 páginas corporativas rediseñadas. Reviews conservada; Privacy Policy requiere texto legal acreditado. QA final pendiente.
- No hay formulario falso ni supuesta confirmación de reserva.
- Fotografía y logotipo enlazados temporalmente a archivos del website original: antes de la presentación final se deben copiar a `assets/`, comprobar derechos, actualidad, resolución y funcionamiento de las URLs.
- **GitHub Pages publicado correctamente.** Renderizado responsive, imágenes externas, formularios y accesibilidad requieren QA real.

## Principios obligatorios

1. Ningún servicio, licencia, teléfono, reconocimiento, precio, horario o testimonio puede inventarse.
2. No etiquetar el sitio como «demo» en la interfaz; se presenta de forma privada al cliente.
3. No simular solicitudes enviadas ni reservas confirmadas.
4. No construir fichas de servicios vacías o con contenido de plantilla.
5. Aprobado el Home, no rehacer su dirección visual sin autorización.
6. Auditoría real de navegación, contraste, medios, rendimiento y anchos 375/768/1024/1440 px antes de presentar.

## Fuentes editoriales de trabajo

- `ATREZZO_CR_FASE3_COPY_MAESTRO.md` — Home y corporativas (documento de trabajo previo).
- `ATREZZO_CR_FASE3_66_PAGINAS_SERVICIOS.md` — fichas individuales (documento de trabajo previo).
- `ATREZZO_CR_FASE4_DIRECCION_VISUAL.md` — dirección cinematográfica V2.1 (documento de trabajo previo).
- ZIP original de CR Plumbing, más comprobación de enlaces en el sitio público.

Estos documentos aún no se han incorporado al repositorio. No confundir el estado de los documentos con páginas implementadas.

## Actualización — Estructura y formularios
- Menú desktop y móvil enlazado a fichas internas en este repositorio (sin enviar a la web original).
- Servicio de contacto `/contact-us/` y preparación de solicitud `/book-online/`.
- Las entradas de los formularios NO se envían: para captación real se requiere servidor o una integración autorizada. Se ofrece llamada directa verificada.
- Alias locales para 2 rutas antiguas del menú que actualmente redirigen en el sitio original.
- Revisar fotografía y fidelidad del contenido antes de presentación al propietario.

## Migración de contenido — Octubre 2026
Se recuperaron 66 páginas originales de servicios, sus secciones editoriales y 544 preguntas frecuentes. Se añadieron 14 perfiles publicados por CR, cinco descripciones de vacantes en el portal Zoho y 94 URL únicas de fotografías propias de CR en Gallery.

Revisa el informe [ATREZZO-CR-MIGRATION-AUDIT.md](./ATREZZO-CR-MIGRATION-AUDIT.md) antes de dar por terminada una página.

**Límites:** artículos individuales del Blog fuera del ZIP; política legal no acreditada; datos de plantilla de formularios no se transmiten a un servidor; fotos alojadas en el dominio WordPress original; vigencia de equipo, servicios comerciales y vacantes pendiente de confirmación.

Se incluye `noindex,nofollow` en páginas de la presentación para impedir que el sitio en Pages se presente en buscadores como sede oficial mientras no se autorice la publicación.
