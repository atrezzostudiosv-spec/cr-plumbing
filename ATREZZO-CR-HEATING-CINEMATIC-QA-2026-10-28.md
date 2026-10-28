# CR Plumbing — Heating Installation cinematic scroll QA
Fecha: 2026-10-28

## Aplicado (solo Heating Installation)
- `Service Overview`: imagen de fondo de horno HVAC aprobada, texto estable, zoom ligado al scroll.
- `How It Works`: fondo cinematográfico compartido ya existente, zoom ligado al scroll, pasos originales y orden conservados.
- Anclaje visual únicamente mientras cada capítulo está en su ventana natural de scroll; se libera al completar el zoom, sin interceptar eventos de rueda, teclado ni táctiles.
- Zoom fotográfico suave 1.012 → 1.073, sin escalar el copy ni detener realmente el scroll.
- Escritorio amplio: anclaje visual. Móvil/tablet hasta 820px, pantallas de menos de 860px de altura y `prefers-reduced-motion:reduce`: contenido normal sin fijación ni zoom.
- Sin alterar Home, texto, CTA, FAQ ni otras páginas.

## Pruebas
- Rama aislada de QA: `qa/heating-cinematic-scroll-20261028`.
- GitHub Actions / Chromium Playwright: https://github.com/atrezzostudiosv-spec/cr-plumbing/actions/runs/40636836274
- 4 anchos: 375 / 768 / 1024 / 1440 px, viewport 900px alto.
- 4/4 pruebas correctas; 0 errores JS, 0 overflow, 1 H1, 8 FAQ conservadas; FAQs alcanzables después del efecto.
- 1024/1440: ambas escenas ancladas en y=83px mientras zoom progresa aproximadamente 1.018→1.065 entre posiciones muestreadas.
- 375/768: navegación normal y escenas sin anclaje.
- Movimiento reducido en 1440: sin anclaje ni propiedad de zoom.
- Capturas de escritorio revisadas; evidencias adjuntas a GitHub Actions durante su periodo de retención.

## Pendientes no cubiertos por este cambio
- Validación visual del usuario en su navegador y scroll físico en móvil/touch.
- Auditoría general de las 66 páginas, formularios, SEO y Google en fases posteriores.
- No extender este efecto a otras páginas sin su aprobación explícita.
