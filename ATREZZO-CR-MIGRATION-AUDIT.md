# ATREZZO — CR Plumbing | Registro de procedencia y migración de páginas

**Fecha:** 2026-10-26
**Repositorio:** `atrezzostudiosv-spec/cr-plumbing`

## Hechos verificados en el archivo entregado

- Se identificaron **74 HTML principales** en el ZIP original: 66 páginas de servicios, 6 corporativas, Home y una página de productos con URL canónica externa de InkSoft.
- Las 66 rutas de servicios del ZIP coinciden con las rutas propias construidas en GitHub.
- **Home no se modificó** durante esta actualización de páginas internas.
- Se conservaron las preguntas frecuentes originales, la información propia de cada servicio, los procesos originales cuando existían y los enlaces a páginas propias.
- El contenido procede del HTML archivado proporcionado, no de servicios inferidos por sector.

## Diseño implementado

- Cada ficha usa su H1/SEO title/description de origen y una composición responsive con hero fotográfico de su rubro, bloques editoriales sobre el servicio, componentes adaptados a sus secciones, FAQ y enlaces relacionados.
- La composición, cantidad de secciones y contenidos cambian según el HTML de la página. Las páginas se apoyan en un sistema común para coherencia visual, no en textos repetidos.
- Páginas corporativas: About, Team, Service Areas, Home Protection, Financing, Careers, Gallery, Blog, Merchandise, Contact, Book Online. Reviews ya estaba diseñada y se mantuvo.
- Los formularios Contact/Book Online siguen permitiendo copiar los datos, no enviarlos a un backend.

## Incertidumbres y límites pendientes antes de entrega

- **NO COMPROBADO:** renderizado real de todos los anchos (375, 768, 1024, 1440 px), accesibilidad con lector de pantalla, links externos y carga de fotos remotas.
- Las imágenes originales insertadas desde `crplumbingdfw.com/wp-content/uploads` aún dependen del servidor original. Prioridad de migrarlas a assets locales.
- Los roles del equipo y la disponibilidad de las ofertas proceden de la captura de la web; confirmar vigencia con el cliente.
- Las vacantes enlazan al portal Zoho de contratación publicado por CR, sin recrear un falso formulario de empleo.
- Blog: el ZIP original no contiene artículos individuales; el blog público sí tiene artículos, por lo que su importación integral es **PENDIENTE**, no se inventarán artículos.
- Privacy Policy: **PENDIENTE DE CONFIRMACIÓN** texto legal aprobado; no crear una política jurídica ficticia.
- Las páginas alias/redirecciones conservan su carácter de rutas auxiliares; no duplicar contenido con URLs competidoras.
- Las páginas están marcadas temporalmente como `noindex,nofollow` para evitar que esta presentación pública en GitHub sea confundida con el sitio oficial.

## Inventario de fichas recuperadas

| Área | URL propia | Fuente original | H2/grupos | FAQ |
|---|---|---|---:|---:|
| Plumbing | `/plumbing-services/backflow-prevention/` | `Fort Worth & DFW Backflow Testing & Prevention _ CR Plumbing.html` | 4 | 8 |
| Plumbing | `/plumbing-services/water-heaters/tankless-water-heater/` | `Tankless Water Heater Repair & Installation _ CR Plumbing.html` | 4 | 8 |
| Plumbing | `/plumbing-services/appliance-plumbing/` | `Dishwasher, Washer & Ice Maker Hookups _ CR Plumbing DFW.html` | 2 | 8 |
| Plumbing | `/plumbing-services/sump-pump/` | `Sump Pump Repair & Installation in DFW _ CR Plumbing.html` | 2 | 7 |
| Plumbing | `/plumbing-services/fixtures/` | `Toilet Fixture Near Me _ Bathroom Fixture DFW.html` | 3 | 7 |
| Plumbing | `/plumbing-services/` | `Plumbing Services in DFW _ Repairs & Installs _ CR Plumbing.html` | 3 | 8 |
| Plumbing | `/plumbing-services/fixtures/new-installation/` | `Plumbing Fixture Installation_ Toilets, Faucets, Sinks _ CR.html` | 3 | 8 |
| Plumbing | `/plumbing-services/fixtures/maintenance-repair/` | `Faucet, Toilet & Fixture Repair _ CR Plumbing DFW.html` | 3 | 9 |
| Plumbing | `/plumbing-services/garbage-disposals/` | `Garbage Disposal Repair & Installation _ CR Plumbing DFW.html` | 4 | 8 |
| Plumbing | `/plumbing-services/water-lines/` | `Water Line Services _ Water Line Repair & Installation DFW.html` | 3 | 7 |
| Plumbing | `/plumbing-services/sewer-line/trenchless-sewer-repair/` | `Trenchless Sewer Repair DFW _ No-Dig Sewer Line Repair.html` | 5 | 8 |
| Plumbing | `/plumbing-services/sewer-line/` | `Sewer Drain Services _ Sewer Line Inspection Services DFW.html` | 3 | 8 |
| Plumbing | `/plumbing-services/sewer-line/sewer-line-maintenance-repair/` | `Sewer Line Repair & Drain Cleaning _ CR Plumbing.html` | 4 | 8 |
| Plumbing | `/plumbing-services/water-heaters/` | `Water Heater Installation _ Water Heater Repair DFW.html` | 3 | 8 |
| Plumbing | `/plumbing-services/water-filtration/` | `Water Filtration Installation in Argyle & Flower Mound TX.html` | 4 | 8 |
| Plumbing | `/plumbing-services/water-heaters/tank-water-heaters/` | `Tank Water Heater Installation _ Tank Heater Repair DFW.html` | 5 | 9 |
| Plumbing | `/plumbing-services/hydrojetting/` | `Hydrojet Drain Cleaning in North Texas - Sewer Jetting DFW.html` | 5 | 9 |
| Hvac | `/hvac/cooling/mini-splits/` | `Mini Split Installation & Repair in DFW _ CR Plumbing.html` | 3 | 8 |
| Hvac | `/hvac/heating/` | `Heating Furnace Service _ HVAC Heating Furnace DFW.html` | 4 | 8 |
| Hvac | `/hvac/indoor-air-quality/humidifiers-dehumidifiers/` | `Humidifier & Dehumidifier Installation in DFW _ CR Plumbing.html` | 3 | 8 |
| Hvac | `/hvac/indoor-air-quality/` | `Indoor Air Quality Service _ Air Purifier for Home DFW.html` | 4 | 8 |
| Hvac | `/hvac/dryer-vent-duct/new-installation/` | `Dryer Vent Services _ Dryer Duct Installation Near Me.html` | 2 | 7 |
| Hvac | `/hvac/dryer-vent-duct/` | `Dryer Vent Cleaning Services _ Air Vent Cleaning Service DFW.html` | 3 | 6 |
| Hvac | `/hvac/heating/maintenance-repair/` | `HVAC Furnace Maintenance _ Emergency Furnace Repair DFW.html` | 4 | 8 |
| Hvac | `/hvac/dryer-vent-duct/maintenance-repair/` | `Dryer Duct Replacement _ Dryer Vent Duct Repair Company DFW.html` | 2 | 6 |
| Hvac | `/hvac/` | `HVAC Services - AC & Heating Repair in DFW _ CR Plumbing.html` | 4 | 9 |
| Hvac | `/hvac/cooling/maintenance-repair/` | `AC Cooling Repair Company _ AC Cooling Maintenance DFW.html` | 2 | 7 |
| Hvac | `/hvac/cooling/new-installation/` | `AC Installation in DFW _ CR Plumbing, Air & Electric.html` | 3 | 8 |
| Hvac | `/hvac/heating/new-installation/` | `Heating Installation DFW _ Furnace Installation Services.html` | 3 | 8 |
| Hvac | `/hvac/cooling/` | `AC Cooling Service Company _ AC Cooling Dallas - Fort Worth.html` | 4 | 8 |
| Electrical | `/electrical-services/installations-upgrade/indoor-outdoor-lighting/` | `Outdoor Lighting Installation _ Indoor Lighting Services DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/smart-efficient-electrical-solution/smart-switches-dimmers/` | `Smart Light Switch Installation _ Smart Home Switch DFW.html` | 4 | 10 |
| Electrical | `/electrical-services/repair-maintenance/wiring-repairs/` | `Electrical Wiring Repair _ Home Wiring Repair Services DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/smart-efficient-electrical-solution/smart-home-wiring/` | `Smart Home Wiring Installation _ Smart Home Wire Service DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/installations-upgrade/generator-installation/` | `Generator Installation & Repair in DFW _ CR Plumbing.html` | 3 | 11 |
| Electrical | `/electrical-services/` | `Electrical Inspection Services _ Home Electrical Service DFW.html` | 3 | 9 |
| Electrical | `/electrical-services/backup-emergency-powers/emergency-electrical-support/` | `Emergency Electrician Service _ Electrical Support DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/repair-maintenance/general-electrical-repairs/` | `General Electrical Services _ General Electric Repair DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/smart-efficient-electrical-solution/` | `Electrical Automation Solutions _ Intelligent Power Systems.html` | 4 | 8 |
| Electrical | `/electrical-services/installations-upgrade/ceiling-fan-installation/` | `Ceiling Fan Installation _ Bathroom Fan Installation DFW.html` | 4 | 8 |
| Electrical | `/electrical-services/installations-upgrade/outlet-switch-installation/` | `Electrical Outlet Installation _ GFCI Outlet Wiring DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/installations-upgrade/ev-charger-installation/` | `EV Charger Installation _ Electric Car Charger switch DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/electrical-inspections-troubleshooting/` | `Electrical Inspections Argyle _ CR Plumbing, Air & Electric.html` | 4 | 9 |
| Electrical | `/electrical-services/backup-emergency-powers/` | `Backup Power Solutions _ Home Battery Backup System DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/smart-efficient-electrical-solution/energy-efficient-lighting/` | `LED Lighting Installation _ Smart Lighting Systems DFW.html` | 4 | 8 |
| Electrical | `/electrical-services/electrical-inspections-troubleshooting/troubleshooting-electrical-issues/` | `Electrical Troubleshooting _ Electrical System Repair DFW.html` | 4 | 8 |
| Electrical | `/electrical-services/repair-maintenance/arc-fault-breaker-repair/` | `Arc Fault Breaker Repair & AFCI Replacement _ CR Plumbing DFW.html` | 3 | 10 |
| Electrical | `/electrical-services/backup-emergency-powers/critical-load-panels/` | `Critical Load Panel _ Critical Load Panel Wiring DFW.html` | 4 | 8 |
| Electrical | `/electrical-services/repair-maintenance/underground-wiring-repair/` | `Underground Cable Repair _ Underground Electrical Wire DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/electrical-inspections-troubleshooting/smoke-co-detector-inspections/` | `Smoke Detector Inspection _ Fire Alarm Testing DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/repair-maintenance/overheating-meter-socket-repair/` | `Meter Base Replacement & Overheating Meter Socket Repair _ CR.html` | 3 | 9 |
| Electrical | `/electrical-services/backup-emergency-powers/whole-home-surge-protection/` | `Whole-House Surge Protection Installation _ CR Plumbing.html` | 3 | 10 |
| Electrical | `/electrical-services/smart-efficient-electrical-solution/load-management-devices/` | `Load Management Devices & Systems _ Smart Power Control DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/installations-upgrade/smoke-co-detector-installation/` | `Smoke Detector Installation _ Fire Alarm Installation DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/electrical-inspections-troubleshooting/home-electrical-inspections/` | `Home Electrical Inspection _ Inspect Electrical Safety DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/repair-maintenance/` | `Electrical Repair Services _ Home Electrical Repair DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/installations-upgrade/` | `Electrical Upgrades _ Electrical Replacement services DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/electrical-inspections-troubleshooting/power-outage-diagnostics/` | `Power Outage Diagnostics & Restoration _ CR Plumbing.html` | 3 | 11 |
| Electrical | `/electrical-services/electrical-inspections-troubleshooting/code-inspection-correction/` | `Electrical Code Correction & Inspection _ CR Plumbing DFW.html` | 4 | 10 |
| Electrical | `/electrical-services/installations-upgrade/electrical-panel-upgrades/` | `Electrical Panel Upgrade _ Panel Box Replacement DFW.html` | 3 | 8 |
| Electrical | `/electrical-services/repair-maintenance/circuit-breaker-repair/` | `Circuit Breaker Repair Argyle _ CR Plumbing & Electric.html` | 3 | 5 |
| Gas | `/gas-services/` | `Gas Line Services & Leak Repair in DFW _ CR Plumbing.html` | 4 | 8 |
| Gas | `/gas-services/line-installs/` | `Gas Line Installation DFW _ Licensed & Code-Compliant _ CR Plumbing.html` | 2 | 10 |
| Gas | `/gas-services/gas-fireplace-repair/` | `_ Gas Fireplace Repair & Valve Service _ CR Plumbing DFW.html` | 3 | 9 |
| Gas | `/gas-services/gas-leak-repairs/` | `Gas Leak Detection & Repair DFW _ CR Plumbing.html` | 3 | 10 |
| Gas | `/gas-services/appliances/` | `Gas Stove & Appliance Installation DFW _ CR Plumbing.html` | 2 | 10 |

## Resumen numérico

- Plumbing: 17
- HVAC: 13
- Electrical: 31
- Gas: 5
- **Total servicios: 66**
- **FAQ identificadas: 544**

**Estado:** IMPLEMENTADO EN CÓDIGO / EN VALIDACIÓN DE CONTENIDO, DISEÑO Y FUNCIONAMIENTO.