# DOCUMENTO DE ARQUITECTURA Y ESPECIFICACIÓN DE INGENIERÍA
## Proyecto: Plataforma de Membresías Fitness — VIVIPREFIT
**Dominio Objetivo:** vivipressonfit.com
**Estado de Definición:** Producción / Listo para Implementación
---
## 1. RESUMEN EJECUTIVO Y OBJETIVOS

Este documento define la arquitectura técnica para la plataforma de membresías fitness VIVIPREFIT. El sistema reemplaza el ecosistema tradicional basado en plugins de WordPress por una arquitectura desacoplada (Jamstack) de alto rendimiento, costos fijos mínimos y máxima seguridad de contenido.

### Objetivos Clave:
*   **Velocidad de Carga:** Respuesta del frontend en milisegundos mediante distribución global en el borde (Edge CDN).
*   **Persistencia de Parametrización:** Modificación dinámica de precios y contenidos públicos mediante un panel de control administrativo protegido.
*   **Automatización de Cobros:** Sincronización en tiempo real del ciclo de vida de las suscripciones (altas, bajas y renovaciones).
*   **Protección Contra Piratería:** Mitigación de descargas ilegales de video mediante tokens firmados con expiración temporal.
---
## 2. ARQUITECTURA DE SOFTWARE (DESACOPLADA)

El sistema opera bajo un modelo de responsabilidad única dividido en cuatro capas:
+--------------------------------------------------------------------------+|                        CAPA DE PRESENTACIÓN (Frontend)                   ||                        HTML5 / Tailwind CSS / Vercel Edge                |+--------------------------------------------------------------------------+│Consultas API      │     Redirección Seguroy Autenticación    │     a Pasarela de Pago▼+------------------------------------+    +--------------------------------+|      CAPA DE DATOS (BaaS)          |    |   CAPA TRANSACCIONAL (Pagos)   ||   Supabase / PostgreSQL con RLS    |    |   Stripe Billing / Checkout    |+------------------------------------+    +--------------------------------+│                                       ││ Actualiza Perfil (Webhooks)           │◄───────────────────────────────────────┘││ Genera URL Firmada (Token Expirable)▼+--------------------------------------------------------------------------+|                     CAPA MULTIMEDIA (Streaming Seguro)                    ||        
                Bunny.net / Bunny Stream 
                         |
---

## 3. MODELO DE DATOS (ESQUEMA RELACIONAL POSTGRESQL)

El backend utiliza dos tablas principales dentro del esquema público de Supabase para separar la configuración del sitio de la información sensible de facturación.

### 3.1. Tabla: `landing_config` (Parametrización Pública)
Almacena los valores dinámicos expuestos en la Landing Page que pueden ser alterados desde el panel administrador.

| Campo | Tipo de Datos | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | TEXT | PRIMARY KEY | Identificador único (Fijo: 'main') |
| `coach_name` | TEXT | NOT NULL | Nombre de la entrenadora (Ej: 'Vivi') |
| `precio_basico` | NUMERIC | NOT NULL | Precio del Plan Básico |
| `precio_premium` | NUMERIC | NOT NULL | Precio del Plan Premium |
| `precio_anual` | NUMERIC | NOT NULL | Precio del Plan Anual |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Auditoría de última modificación |

### 3.2. Tabla: `profiles` (Usuarios y Suscripciones)
Almacena el estado transaccional de cada alumna. Está vinculada directamente al sistema de autenticación nativo de Supabase (`auth.users`).

| Campo | Tipo de Datos | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | UUID | REFERENCES auth.users | Identificador único de usuario (UID) |
| `email` | TEXT | UNIQUE, NOT NULL | Correo de acceso de la alumna |
| `stripe_customer_id`| TEXT | Opcional | ID único asignado por Stripe |
| `stripe_sub_id` | TEXT | Opcional | ID de suscripción asignado por Stripe |
| `plan_status` | TEXT | DEFAULT 'inactive' | Estados: 'active', 'canceled', 'inactive' |
| `plan_tier` | TEXT | DEFAULT 'none' | Niveles: 'basico', 'premium', 'anual', 'none' |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Fecha de sincronización de datos |

---

## 4. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)

Para blindar la base de datos sin necesidad de un servidor intermedio permanente, se aplican reglas de aislamiento directamente en el motor PostgreSQL de Supabase:

### Reglas para `landing_config`:
*   **Permiso de Lectura (SELECT):** Permitido para usuarios anónimos (`anon`). Cualquier visitante web puede ver los precios actuales.
*   **Permiso de Escritura (UPDATE):** Restringido estrictamente. El sistema verifica mediante una función JWT que el correo del usuario autenticado coincida exactamente con la dirección del administrador jefe (`admin@vivipressonfit.com`).

### Reglas para `profiles`:
*   **Aislamiento de Filas:** Se valida mediante la regla `auth.uid() = id`. Ningún usuario puede consultar, modificar o interceptar el perfil o estado de otra alumna de la plataforma.

---

## 5. FLUJOS LÓGICOS DE OPERACIÓN

### 5.1. Ciclo de Compra y Aprovisionamiento
1.  La usuaria selecciona una modalidad de suscripción en `vivipressonfit.com`.
2.  El frontend invoca el SDK de Stripe y redirige a la cliente hacia una sesión segura de **Stripe Checkout**.
3.  La cliente digita su método de pago. Al completarse con éxito, Stripe procesa la transacción financiera de forma recurrente.
4.  Stripe emite una notificación asíncrona (**Webhook**) con el evento `customer.subscription.created` apuntando hacia el endpoint de la aplicación.
5.  La función receptora extrae el ID de usuario, el correo y el plan seleccionado, actualizando inmediatamente la tabla `profiles` en Supabase con los permisos correspondientes.

### 5.2. Verificación de Acceso y Streaming de Video Protegido
1.  La alumna autenticada ingresa al dashboard de rutinas.
2.  La aplicación consulta el estado de la fila correspondiente al UID en la tabla `profiles`.
3.  Si `plan_status` es idéntico a `'active'`, el backend genera una firma criptográfica con un tiempo de expiración corto (Ej: 120 minutos) conectada a la API de **Bunny Stream**.
4.  El video se reproduce fluidamente. El reproductor rechaza cualquier intento de hotlinking (reproducción fuera de `vivipressonfit.com`) o extracción del archivo de origen por inspectores de código del navegador.
5.  Si el cobro recurrente falla en Stripe, el Webhook cambia el estado a `'inactive'`, revocando instantáneamente los permisos de visualización.

---

## 6. PLAN DE IMPLEMENTACIÓN TÉCNICA (CRONOGRAMA DE 5 FASES)

+------------------+     +------------------+     +------------------+| FASE 1: PROVISIÓN| ──> | FASE 2: BACKEND  | ──> | FASE 3: STRIPE   || Dominios y DNS   |     | Tablas y RLS     |     | Productos y Hooks|+------------------+     +------------------+     +------------------+│▼+------------------+     +------------------+     +------------------+| PROYECTO EN VIVO | ◄── | FASE 5: DESPLIEGUE| ◄── | FASE 4: FRONTEND || SSL & Producción |     | Vercel CI/CD     |     | Dinámico y Admin |+------------------+     +------------------+     +------------------+
### Fase 1: Provisión de Infraestructura (Día 1)
*   Adquisición del dominio `vivipressonfit.com` en Porkbun o Namecheap con privacidad WHOIS activa.
*   Apertura y vinculación de entornos de desarrollo en Supabase, Stripe (Modo Test) y Vercel.

### Fase 2: Configuración de Datos en Supabase (Días 2-3)
*   Ejecución de los scripts de creación de tablas en la consola SQL de Supabase.
*   Habilitación de Row Level Security (RLS) y declaración de las políticas de restricción para el perfil administrador.

### Fase 3: Pasarela e Infraestructura Multimedia (Día 4)
*   Alta de los tres tiers comerciales en Stripe Billing para cobros automatizados recurrentes.
*   Creación de la zona de almacenamiento de video en Bunny Stream con bloqueo de dominios externos.

### Fase 4: Integración del Frontend Dinámico (Días 5-7)
*   Sustitución de las variables estáticas del prototipo HTML por llamadas dinámicas mediante el SDK de Supabase.
*   Implementación de la lógica del panel administrativo (engranaje) para ejecutar la edición directa de la tabla `landing_config`.

### Fase 5: Pruebas de Estrés y Despliegue de Producción (Días 8-9)
*   Ejecución de simulaciones de pasarela de pago en ambiente Sandbox (tarjetas de prueba).
*   Vinculación del repositorio Git a Vercel, configuración de variables de entorno seguras y direccionamiento final de los registros DNS del dominio.

