# CR Plumbing — localidades y presentación navegable

Fecha: 4 de noviembre de 2026.

## Resultado

- Integradas las correcciones de la PR #8 en `main`: IDs de capítulos, Escape móvil y contexto del formulario.
- Creado el piloto editorial de Argyle y extendido a las 42 localidades con HTML original disponible en `AREAS`.
- El directorio enlaza a las 42 páginas. Bedford, McKinney y Sanger abren una consulta con su ciudad seleccionada, sin inventar páginas locales sin fuente.
- 129 rutas HTML: 126 páginas de contenido y 3 alias. 936 FAQ en total: las 544 anteriores y 392 procedentes de las localidades.
- Coppell conserva su contenido de fontanería; su original no tiene FAQ y no se le han añadido preguntas ficticias.

## Diseño, contenido y fotografías

Argyle incluye hero, introducción, índice visual de cuatro oficios, razones para contactar, proceso, ocho FAQ, dirección de la fuente, mapa externo y enlaces a comunidades cercanas. Las demás páginas conservan su introducción, contenido editorial seleccionado del HTML original y FAQ. No se atribuyen oficinas a las otras localidades.

El índice visual adapta C01 de `ATREZZO COMPONENTES 2026/CARDS/Atrezzo_Cards_01_COMPLETO`, con la tipografía, colores y navegación de CR. Responde a foco de teclado y puntero y ofrece imágenes dentro de cada fila en móvil. No requiere librerías externas.

Las imágenes de `imagenes WEBV` coinciden por SHA-256 con sus versiones ya cargadas en `assets/images`. Se reutilizan las composiciones adecuadas en lugar de duplicar archivos. También se utiliza el fondo de calefacción local aprobado. Son imágenes de presentación; no se presentan como fotografías de trabajos realizados en cada ciudad. El archivo marcado RECHAZADA no se ha utilizado en las nuevas páginas.

Las FAQ se trasladan desde el archivo original; los teléfonos locales se normalizan al número central del sitio, (940) 370-5663. En los artículos se adaptan enlaces al rediseño, se eliminan wrappers/estilos de WordPress, duplicaciones de carruseles y marcadores de trabajo. Algunos recuentos antiguos de reseñas se sustituyen por un enlace a Reviews. No se certifica la vigencia de todas las afirmaciones comerciales del archivo; la muestra mantiene `noindex,nofollow`.

## Formularios: alcance actualizado por el usuario

El usuario indicó que **el envío real se conectará después de que el cliente apruebe el diseño**. La versión actual permite validar campos, revisar un resumen y copiar los datos localmente. No transmite solicitudes ni confirma reservas. Contact, Book Online y el modal usan el mismo comportamiento.

La ciudad se toma de la página local o de la consulta del directorio. El modal de Argyle prepara `Home services in Argyle` y la ciudad Argyle. El correo previsto para una futura conexión es atrezzostudiosv@gmail.com; no hay claves, cuentas ni backend activo incorporados.

Durante la investigación previa, FormSubmit devolvió HTTP 522 y no se pudo acreditar recepción por correo. Esa vía fue descartada al diferirse el envío real; no debe interpretarse ninguna prueba local como entrega de email. La información de privacidad se ajustó al funcionamiento local actual.

## Verificación

- Control estático: **129 rutas, 936 FAQ, 0 errores críticos y 0 avisos**.
- Comparación por localidad: **42/42 páginas y 392/392 FAQ** presentes.
- Navegador real mediante CUA: **42 rutas × 2 anchos (375 y 1440), 84/84 correctas** en H1 único, IDs, ancho de la página y ausencia de recorte horizontal del H1. Los resultados detallados se guardaron fuera del repositorio en la carpeta de auditoría local.
- Argyle también se comprobó a 768 y 1024 px durante el piloto; se inspeccionaron portada, índice visual y FAQ.
- El índice reacciona al teclado; su enlace a Plumbing abre la página interna correcta. La FAQ probada abre su respuesta.
- Modal: servicio y ciudad de Argyle correctos; validación y revisión local correctas. Contact y Book Online rechazan formularios incompletos y muestran el resumen de los completos sin `action` externo.
- Sintaxis de `site.js`, `request-modal.js` y `request-form.js`, y `git diff --check`, correctos.
- Los HTML existentes solo reciben la versión del cargador compartido, salvo Directorio, Contact, Book Online y Privacy. El diseño aprobado del Home y los motores cinematográficos se conservan.

No se certifican accesibilidad completa, todos los enlaces externos, Safari/Firefox, dispositivos físicos, Core Web Vitals o backend de correo.

## Fuentes y regeneración

- `assets/argyle-content.json`: FAQ y referencia del piloto.
- `assets/local-areas-content.json`: fuentes, introducciones, artículos y FAQ por localidad.
- `python3 scripts/build_local_areas.py`: regenera el conjunto desde el piloto y el catálogo; requiere BeautifulSoup para la generación, no para servir el sitio.
- `assets/local-areas.css` y `assets/local-service-index.js`: presentación y comportamiento.
- `assets/request-form.js`: revisión local de las solicitudes.

La siguiente conexión de correo se realizará cuando se apruebe el diseño y se elija el proveedor. Siguen pendientes las fotografías definitivas y la validación comercial del cliente para publicación oficial.
