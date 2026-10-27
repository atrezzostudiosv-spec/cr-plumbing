# CR Plumbing — Fase 3: validación visual de plantilla maestra
Fecha: 27 de octubre de 2026
Referencia: `/hvac/heating/maintenance-repair/`
Página corregida: `/hvac/heating/new-installation/`
Evidencia real de navegador: https://github.com/atrezzostudiosv-spec/cr-plumbing/actions/runs/40579576368
Revisión previa: https://github.com/atrezzostudiosv-spec/cr-plumbing/actions/runs/40578081688

## Alcance de la comprobación
Playwright Chromium real, ejecutado en GitHub Actions sobre el **código de la rama de prueba servido localmente**. Se generaron capturas completas para seis páginas en 375, 768, 1024 y 1440 px.

Páginas:
- Heating Maintenance & Repair, referencia
- Heating Installation, variante a corregir
- Water Heaters, piloto Plumbing
- Dryer Vent & Duct, piloto HVAC
- Electrical Services, piloto Electrical
- Gas Services, piloto Gas

## REALIZADO
1. Se comparó visualmente el primer capítulo, hero y How It Works entre Maintenance e Installation. El orden de secciones y los textos originales se conservaron.
2. Se corrigió únicamente la escala del subtítulo `A Closer Look at Heating Installation`, que aparecía sobredimensionado dentro de `ABOUT THE SERVICE`. CSS nuevo y aislado `assets/heating-intro-typography.css`, sin modificar Home ni módulos compartidos.
3. Se realizaron 24 comprobaciones de viewport y capturas completas en un navegador real. El script y workflow utilizados permanecen en la rama de QA `qa/phase3-heating-visual-20261027`, sin añadir automatizaciones experimentales al sitio de producción.

## VERIFICADO
- 24/24 páginas x anchos con HTTP 200, un solo H1 y **sin scroll horizontal** detectado.
- 24/24 casos sin errores JavaScript registrados durante carga y captura.
- La navegación móvil abrió (aria-expanded=true) en las seis páginas a 375 px.
- La primera FAQ abrió correctamente en las seis páginas a 375 px.
- FAQ: Maintenance 8; Installation 8; Water Heaters 8; Dryer Vent 6; Electrical 9; Gas 8. **47 FAQ** presentes en estas seis páginas.
- El capítulo **HOW IT WORKS** se mantiene en su posición tras los bloques informativos, antes de FAQ/Related/Let's Talk en ambos Heating.
- En Heating los recursos documentales con carga diferida cargan al entrar en pantalla; se comprobó `naturalWidth=1024`.
- En Dryer Vent hay una imagen documental intencionalmente oculta por CSS; el script de QA se corrigió para no tratarla como error.
- Capturas de 375 y 1440 revisadas manualmente para ambas Heating y los cuatro pilotos. En ellas se corrigió el problema de proporción del subtítulo sin alterar estructura, fotografías ni CTA.

## HALLAZGOS QUE PASAN A FASE 4
- `hvac/heating/maintenance-repair/` carga en su módulo documental una URL externa `Electrical-Services-Argyle.jpg`, imagen no pertinente al servicio de calefacción.
- `hvac/heating/new-installation/` carga en el módulo documental `hvac-heating-new-installation-2.webp`, cuya imagen representa tuberías y un calentador de agua, no una instalación de calefacción HVAC.
- Sustituir esas dos ilustraciones por fotografías pertinentes **sin cambiar la jerarquía, los textos ni el orden de secciones**. Hasta entonces son fotografías provisionales, NO trabajos acreditados de CR.
- Hay afirmaciones comerciales de licencias, disponibilidad y prestaciones sujetas a `ATREZZO-CR-CLAIMS-VALIDATION.md`, control previo a entrega oficial.

## NO COMPROBADO
- La totalidad de interacciones de todos los menús en desktop y tablet, navegación real de cada CTA y servicio de contacto.
- LCP, INP, CLS y Lighthouse de producción; WCAG 2.2 AA formal, lectores de pantalla y rendimiento en dispositivos reales.
- Derechos/vigencia de imágenes remotas, claims comerciales, CRM/formularios y Google.
- Comparación visual de **todas** las 66 páginas, que corresponde a Fase 4 y fase final.

## PUERTA DE SALIDA
**Plantilla maestra validada en los seis casos representativos a nivel de estructura y responsive.** Queda pendiente aprobación visual del usuario de la modificación específica antes de marcarla como entregada al cliente.
Fase 4 debe ejecutar mejoras página a página y corregir fotografías provisionales. Home aprobado intacto.

## SIGUIENTE PASO EXACTO
Retomar Fase 4: revisar primero las 17 páginas Plumbing y 13 HVAC con plantilla compartida, realizar adaptación editorial individual, fotografía pertinente + WebP/ALT, comparación visual en 375/768/1024/1440 y documentar cada lote. Después Electrical (31) y Gas (5). No marcar esas 32 páginas como finalizadas únicamente por llevar la clase CSS.
