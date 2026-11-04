# SEO y presentación al compartir — 4 de noviembre de 2026

## Implementación

- Metadatos estáticos en las 129 rutas HTML (126 páginas de contenido y 3 alias): título, descripción, canonical, robots, tema, Open Graph y Twitter Card con imagen grande.
- Títulos y descripciones únicos en las 126 páginas de contenido. Se eliminan las repeticiones de marca de los títulos y las etiquetas robots duplicadas.
- Cada página publica su propia URL, título y descripción al compartir. La imagen común es `assets/social/cr-plumbing-share-v1.jpg`, JPEG de 1200 × 630 px, con logo original y fotografía familiar ya utilizada en la muestra.
- Favicon ICO con versiones de 32 y 48 px; PNG de 48 px, Apple Touch Icon de 180 px e iconos de 192/512 px declarados en el manifest. Se usa el monograma del logo original suministrado, sin redibujarlo.
- Datos estructurados JSON-LD: Organization, WebSite, WebPage y BreadcrumbList. No se añaden oficinas por localidad, horarios, certificaciones, valoraciones ni ofertas nuevas.
- Los tres alias apuntan al destino correcto en canonical/og:url, conservan su redirección y permanecen noindex.
- Los generadores de Argyle/localidades vuelven a aplicar los metadatos al finalizar. CI verifica que están actualizados y que sus referencias son coherentes.

## Estado de la muestra e indexación

`assets/seo-config.json` conserva `indexing_enabled: false` y la URL real de GitHub Pages. La aprobación del cliente sigue pendiente y los formularios no envían correos.

La muestra sigue en `noindex,nofollow`. El sitemap permanece vacío para no anunciar como indexables las páginas de revisión. Cuando se confirme el dominio de producción y el lanzamiento, hay que establecer `base_url`, habilitar la indexación y ejecutar `python3 scripts/build_seo.py`. En una copia temporal se verificó que esta configuración genera las 126 URL canónicas y excluye los alias. El generador impide activar por accidente la indexación del host de presentación.

El cambio de configuración adapta los metadatos y el manifest; no migra el alojamiento ni reescribe los enlaces internos `/cr-plumbing/`. Si el dominio final sirve desde `/`, habrá que adaptar esos enlaces durante la migración.

No se añade un `robots.txt` ineficaz bajo `/cr-plumbing/`: los buscadores consultan este archivo en la raíz del host. En el alojamiento definitivo se preparará en la raíz si corresponde. Tampoco se bloquean las imágenes sociales mediante robots.

Las redes pueden conservar vistas previas anteriores en caché; la imagen pública tiene un nombre versionado. La presencia de metadatos no garantiza la presentación que elija cada plataforma ni el posicionamiento en buscadores.

## Verificación local completada

- `python3 scripts/build_seo.py --check`: 129 rutas, ningún archivo desactualizado; generación idempotente.
- `python3 scripts/check_seo.py`: títulos/descripciones únicos, coherencia entre canonical/OG/Twitter, archivos existentes, JSON-LD válido, breadcrumbs, formatos/dimensiones PNG e ICO y sitemap acordes al estado de indexación.
- `python3 scripts/atrezzo_static_qa.py --fail-critical`: 129 rutas, 936 FAQ, 0 errores críticos y 0 avisos.
- Comparación con `HEAD`: el cuerpo HTML de las 129 rutas se conserva byte por byte. No se modifican diseño, textos visibles, animaciones ni formularios.
- Regeneración de las 42 localidades en una copia temporal: contrato SEO conservado.
- Activación de indexación bloqueada en el host de muestra y configuración de producción probada solo en una copia temporal.
- Tarjeta social renderizada e inspeccionada en navegador a 1200 × 630: textos legibles y las seis personas de la fotografía presentes. Favicon inspeccionado a 512 × 512 antes de exportar sus tamaños menores.

La recepción real en WhatsApp/Facebook/LinkedIn/X y la indexación en buscadores no se certifican con estos controles. No se publican mensajes de prueba en redes ni se registra la muestra en Search Console.

## Fuentes técnicas

- [Open Graph: propiedades de imagen y metadatos](https://ogp.me/).
- [Google: noindex y acceso de los rastreadores](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
- [Google: favicon](https://developers.google.com/search/docs/appearance/favicon-in-search).
- [Google: URL canónicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

El logotipo procede de `Plumbing, Electrical & HVAC Experts _ Argyle, Fort Worth TX_files/cropped-cr-logo-header.webp`, dentro del archivo original del proyecto. La fotografía es `assets/images/cr-family-portrait.webp`, ya aprobada para la presentación.
