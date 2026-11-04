# Footer común — 4 de noviembre de 2026

El footer se sirve como HTML estático idéntico en las 126 páginas de contenido, incluidas Home, servicios, páginas corporativas y las 42 localidades. Los tres alias redirigen a páginas que ya lo incluyen.

## Componente y presentación

- Fuente única: `partials/site-footer.html`.
- Estilo común: `assets/shared-footer.css`, con tipografía y colores explícitos para evitar diferencias heredadas entre plantillas.
- Marca y teléfono central, tres grupos de navegación (Services, Company y Helpful Links), privacidad, copyright y enlace de regreso al inicio.
- Conservados todos los destinos del footer anterior; añadido el directorio All Services. Request Service está presente en el HTML inicial y abre la solicitud existente.
- Iconos SVG propios del componente para que el enriquecimiento visual de páginas internas no sustituya sus flechas de forma diferente a Home/localidades.
- Retirada la modificación del footer de `assets/site.js`; el script compartido conserva el año automático y el resto de sus funciones.
- No se han añadido emails, oficinas por localidad, horarios, redes sociales ni datos comerciales nuevos.

## Mantenimiento

Editar la fuente compartida o su CSS y ejecutar:

```sh
python3 scripts/build_footer.py
python3 scripts/build_footer.py --check
```

Los generadores de Argyle y las otras localidades aplican este componente al finalizar. La comprobación de igualdad forma parte de CI. La fuente HTML es independiente del footer contextual del vídeo de Home, que se conserva.

## Validación

- 126 footers estáticos idénticos; 21 enlaces por footer, con todos los destinos internos y `#top` existentes.
- Comparación con la versión anterior: el resto del HTML se conserva, con las únicas excepciones de la hoja de estilo y la versión del script compartido.
- Navegador: 10 tipos de página × 375/768/1024/1440 px, **40 comprobaciones**. Mismo DOM, contenido, enlaces, estilos e iconos a cada ancho; sin recortes horizontales del footer ni desbordamiento de página.
- Auditoría estática: 129 rutas, 936 FAQ, 0 errores críticos y 0 avisos. Metadatos SEO preservados.
- Regeneración de localidades probada en copia temporal: footer común y metadatos se conservan.

Formularios de revisión/copia sin envío y muestra noindex conservados. No se altera el diseño del contenido ni las animaciones de Home o servicios.
