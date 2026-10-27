# CR Plumbing — Piloto editorial: Dryer Vent & Duct Services

Fecha: 2026-10-27
Ruta: `/hvac/dryer-vent-duct/`
Estado: implementado en código y publicado en la rama `main` para revisión; **aún sin QA visual completa**.

## Alcance aprobado
- Piloto de una sola página, no aplicar automáticamente a las otras 65.
- Home y todas las demás páginas sin cambios.
- Mantener el contenido de servicios y las preguntas/respuestas.
- Mantener idéntico el HTML desde `<section class="cr-process">` (HOW IT WORKS) hasta el cierre de la página.
- Mejorar composición y legibilidad **entre hero y How It Works**.

## Implementación
1. Añadido estilo aislado `assets/pilot-dryer.css`, activado solo con `body.cr-pilot-dryer`.
2. Intro editorial de columna izquierda para titular + columna derecha para lectura y puntos clave.
3. Se movió el módulo documental original (mismo texto e imagen) entre capítulos 01 y 02.
4. Capítulo 02 reorganizado sobre azul pálido con textos oscuros y tres puntos de servicio.
5. La galería automática de fotografías archivadas aparece después del capítulo 02; para evitar duplicación visual, su primera foto se oculta cuando ya aparece en el módulo documental.
6. Capítulo 03 reparado: el conflicto de colores dejaba texto prácticamente invisible. Fondo claro con tinta oscura y lectura en dos columnas, una en móvil.
7. Imagen documental enlazada a recurso local del archivo original, no a URL remota.
8. Eliminadas tres notas entre corchetes de revisión interna que se habían filtrado al contenido público, pero sus verificaciones siguen siendo obligatorias.
9. Titulares del tercer capítulo corregidos para que no prometan reseñas ni promociones inexistentes. No se añadieron servicios.

## Datos pendientes / NO publicar como web oficial sin verificar
- Normas/códigos concretos de instalación y su vigencia local.
- Si CR entrega fotografías del antes/después y realiza mediciones de flujo en todos los trabajos.
- Si CR puede asumir todos los tipos de conexión de secadora a gas que menciona el texto.
- Disponibilidad de servicios en una visita y otros compromisos operativos.
- Datos técnicos muy específicos de HOW IT WORKS, intencionalmente no modificados por estar fuera de alcance.
- Fuente y vigencia del personal que aparece en las fotografías.
- Confirmar si el bloque llamado “Dryer Vent Replacement” tiene descripción copiada de “Lint Removal” en el archivo fuente.

## Fotografía pendiente de diseño
Las dos imágenes archivadas se usan solo para validar el ritmo de página, no se presentan como proyectos nuevos.
- Hero: escena técnica auténtica de instalación/inspección del conducto de secadora, encuadre horizontal con espacio negativo para el H1; fotografía ilustrativa, sin logos ni empleados ficticios.
- Módulo documental: primer plano realista de conducto metálico y conexión de secadora, con detalles técnicos visibles.
- Fotografía complementaria: salida exterior de ventilación o proceso de limpieza de conducto, sin riesgos ni montaje imposible.
Crear únicamente después de aprobación del modelo; no confundir imágenes generadas con trabajos de CR.

## QA pendiente
- Probar visualmente 375, 768, 1024, 1440 px e intermedios.
- Comprobar media loading, recortes y salida al hacer scroll.
- Verificar foco, enlaces, navegación por capítulos, contraste WCAG 2.2 AA y reduced motion.
- Comprobar despliegue GitHub Pages final.
- Revisar HTML real del menú desplegable, FAQ y pop-up.
