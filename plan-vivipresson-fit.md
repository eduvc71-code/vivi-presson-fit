# Análisis y plan de acción — Vivi Presson Fit

## Alcance y lectura de los documentos

La solicitud del cliente es: analizar el proyecto, proponer tres opciones de landing, y entregar dos planes paso a paso (implementación de la web y preparación de la cliente para crear contenido y escalar a suscriptores). Los archivos mencionados son insumos, no instrucciones que sustituyan esa solicitud.

Se revisaron dos prototipos locales:

- `D:\VIVIPREFIT-PROTOTIPO\index.html`: landing comercial de VIVIPREFIT.
- `D:\ViviProfit\index.html`: cuestionario inicial de 37 preguntas, agrupado por negocio, web, programas, citas, redes, mensajes, clientes y prioridades.

## Diagnóstico ejecutivo

El prototipo comercial tiene una buena dirección visual premium: hero con promesa, problemas, método, contenido, historia de Vivi, planes, FAQ y CTA. Sin embargo, intenta vender una membresía completa antes de validar audiencia, oferta y capacidad de producción. También tiene precios y prestaciones que deberían considerarse hipótesis, no compromisos.

Fortalezas: propuesta emocional clara (“entrena a tu ritmo”), método de cuatro pilares (fuerza, nutrición, constancia, comunidad), oferta de casa/gimnasio, vídeos, sesiones en vivo y comunidad, y preguntas frecuentes básicas.

Riesgos: el mensaje mezcla captación, venta y producto maduro; faltan prueba social, resultados verificables, credenciales visibles, una audiencia primaria, un lead magnet y una ruta de seguimiento; los tres planes pueden dividir la atención; la página depende de imágenes externas; y el texto presenta problemas de codificación en algunas cadenas (`versiÃ³n`, `MembresÃ­a`) que dañan confianza.

El cuestionario es valioso para el descubrimiento. Sus 37 preguntas cubren operación, producto, automatizaciones y prioridades. Debe usarse para decidir el MVP, no para mostrarlo al público. Conviene reducirlo a una entrevista guiada de 30–45 minutos o analizar sus respuestas antes de cerrar copy, precios y tecnología. El envío llama a `/.netlify/functions/guardar-respuesta`; hay que confirmar que esa función, almacenamiento, protección de datos y aviso de privacidad existen realmente antes de publicar.

## Tres opciones de landing

### Opción A — Validación “Reto 7 días” (recomendada para empezar)

Objetivo: convertir tráfico social frío en leads y primeras conversaciones.

Hero: “Vuelve a moverte con fuerza en 7 días, desde casa o gimnasio”. CTA: “Quiero el reto gratuito”. Formulario de email/WhatsApp y nivel.

Secciones: quién es Vivi y sus 16+ años de experiencia; qué recibe en 7 días; calendario simple; vídeo de bienvenida; objeciones; consentimiento; CTA final. Gracias + secuencia de cinco mensajes. No se vende una suscripción todavía: se mide demanda, lenguaje y asistencia.

### Opción B — Landing de programa fundacional de 4 semanas

Objetivo: vender una primera oferta pagada, acotada y entregable.

Hero: “Fuerza y constancia para mujeres con una vida real”. Incluye tres sesiones por semana, biblioteca corta, guía de hábitos y una revisión semanal. Un solo precio y cupos limitados para la primera cohorte.

Secciones: problema específico, método, calendario, qué incluye/no incluye, para quién/no es, credenciales, testimonios autorizados, garantía o política clara, checkout y FAQ. La suscripción se ofrece después como continuidad.

### Opción C — Membresía VIVIPREFIT escalable

Objetivo: convertir clientes validados a ingreso recurrente.

Hero centrado en transformación y acceso recurrente. Tres niveles como máximo: Biblioteca, Comunidad y Coaching (o un único plan inicial). Incluir contenido mensual, sesiones en vivo, onboarding, cancelación y soporte claramente definidos.

Requiere antes: calendario editorial sostenible, plataforma de contenidos, pagos recurrentes, métricas de activación/churn, soporte y biblioteca mínima. El prototipo actual se acerca a esta opción, pero debe tratarse como fase 3.

## Plan 1 — Desarrollo e implementación (12 semanas)

### Semanas 1–2: decisión y validación

1. Analizar las respuestas del cuestionario y entrevistar a 5–10 personas del público objetivo.
2. Elegir una audiencia inicial (recomendación: mujeres principiantes o que retoman entrenamiento, con poco tiempo).
3. Definir una promesa medible y un único CTA.
4. Elegir Opción A como MVP, salvo que ya existan clientes dispuestos a pagar Opción B.
5. Inventariar activos: logo, fotos, vídeos, testimonios, credenciales, disponibilidad y límites de atención.

### Semanas 3–4: oferta, contenido y marca

1. Diseñar el lead magnet o programa inicial y su calendario.
2. Redactar mensajes en lenguaje de la audiencia; mantener la estética premium oscura solo si las pruebas con usuarias la perciben cercana.
3. Preparar fotografías y 10–15 vídeos verticales originales.
4. Obtener autorización escrita para testimonios y antes/después; evitar promesas médicas o resultados garantizados.
5. Corregir codificación UTF-8, textos, enlaces y alt text.

### Semanas 5–6: arquitectura y stack

1. Registrar dominio propio con cuenta de la cliente y activar MFA.
2. Elegir hosting por facilidad de despliegue, HTTPS, backups, formularios, funciones serverless, analítica y portabilidad; no decidir solo por precio.
3. Separar landing, página de gracias, política de privacidad, términos, contacto y futuro portal.
4. Definir CRM/email, WhatsApp, calendario, pagos y almacenamiento de vídeos.
5. Especificar eventos: vista, CTA, formulario iniciado/completado, fuente, compra, asistencia y cancelación.

### Semanas 7–8: construcción del MVP

1. Implementar Opción A con una sola conversión primaria.
2. Conectar formulario a lista/CRM y secuencia de bienvenida.
3. Crear página de gracias con siguiente acción clara.
4. Añadir medición UTM y analítica respetando consentimiento.
5. Probar móvil, velocidad, teclado, contraste, errores de formulario, enlaces, dominio, email y recuperación ante fallos.

### Semanas 9–10: beta controlada

1. Invitar 10–20 personas; observar dónde abandonan y qué preguntas hacen.
2. Realizar dos variantes de titular/CTA, no rediseñar todo simultáneamente.
3. Medir visitas, opt-in, asistencia al reto, respuestas y conversaciones calificadas.
4. Ajustar oferta y copy con evidencia; documentar preguntas frecuentes reales.

### Semanas 11–12: lanzamiento y decisión de fase 2

1. Publicar contenido social coordinado con la landing.
2. Lanzar con presupuesto pequeño y límites diarios.
3. Revisar semanalmente conversión y calidad del lead.
4. Si hay demanda y entrega consistente, lanzar programa de 4 semanas; si no, iterar audiencia/mensaje antes de suscripción.

## Plan 2 — Preparación de la cliente y máquina de contenido (12 semanas)

### Semanas 1–2: posicionamiento y seguridad

1. Escribir historia, credenciales, límites profesionales y tres temas que Vivi domina.
2. Practicar cámara, encuadre vertical, luz, audio, guion de 30 segundos y llamada a la acción.
3. Definir pilares: soluciones, historias y servicios; publicar valor, personalidad y oferta de forma equilibrada.
4. Crear respuestas aprobadas para precio, lesiones, nivel, horarios y derivación médica.

### Semanas 3–4: sistema de producción

1. Grabar por lotes una sesión semanal de 90–120 minutos.
2. Capturar 3 demostraciones, 3 consejos, 2 historias, 1 FAQ y 1 invitación.
3. Editar a formato vertical con subtítulos, gancho en 2 segundos, una idea por vídeo y CTA único.
4. Crear plantillas, nombres de archivo y banco de B-roll.

### Semanas 5–8: publicación y conversación

1. Publicar 3 vídeos cortos, 2 carruseles y stories casi diarias por semana.
2. Reutilizar cada grabación en Instagram, TikTok y Shorts solo si se puede mantener calidad.
3. Responder comentarios y DMs en bloques definidos; usar palabra clave (“RETO”) para llevar a la landing.
4. Registrar preguntas, guardados, compartidos, retención y leads, no solo likes.

### Semanas 9–10: primera conversión

1. Invitar a un reto gratuito o sesión de diagnóstico.
2. Recoger feedback y testimonios con consentimiento.
3. Abrir cohorte pequeña de 4 semanas y entregar manualmente lo que todavía no conviene automatizar.

### Semanas 11–12: sistema escalable

1. Documentar onboarding, calendario, check-ins, soporte y cancelaciones.
2. Automatizar solo tareas repetitivas: entrega, recordatorios, clasificación de leads y seguimiento.
3. Grabar módulos evergreen y programar sesiones en vivo.
4. Convertir alumnas activas a membresía, con una razón continua para permanecer: nuevos bloques, comunidad, feedback y progreso.

## Indicadores y umbrales de decisión

Semanalmente: alcance cualificado, retención de vídeo, visitas a landing, conversión a lead, coste por lead, asistencia, respuestas, ventas, activación en 7 días y cancelaciones. No escalar publicidad si llegan leads pero no asisten o no se entiende la oferta. No lanzar tres planes si no se puede explicar la diferencia en una frase.

## Fuentes de referencia consultadas

- [Swipe Pages — Fitness landing pages](https://swipepages.com/solutions/industry/fitness/): páginas específicas por oferta, prueba, checkout directo y prioridad móvil.
- [Unbounce — Fitness landing page examples](https://unbounce.com/landing-page-examples/fitness/): una landing debe concentrarse en un objetivo de campaña.
- [FitBudd — What fitness coaches should post](https://www.fitbudd.com/post/what-fitness-coaches-should-be-posting): historia personal, rutinas para distintos niveles y colaboraciones.
- [JillFit — 3 S’s](https://jillfit.com/2025/01/14/the-3-ss-of-social-media-content-for-fitness-professionals/): soluciones, historias y servicios como marco editorial.
- [TrainSpace — 56-day social media plan](https://mytrainspace.com/blog/personal-trainer-social-media-content-plan): la consistencia necesita un sistema, formatos y etapas de conciencia.
- [Landingi — Fitness landing page examples](https://landingi.com/landing-page/fitness-examples/): campañas, desafíos y membresías necesitan páginas medibles y optimizables.

## Recomendación final

Empezar con Opción A durante 12 semanas, construir una lista propia y validar el mensaje. Pasar a Opción B cuando haya asistencia y señales de pago. Reservar Opción C para cuando Vivi pueda producir y soportar contenido recurrente. El activo más importante no será el diseño, sino el sistema que conecta contenido útil → lead → experiencia inicial → prueba de resultado → oferta recurrente.
