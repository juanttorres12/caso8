# Parte 2 · Muestreo del trabajo y ergonomía

Herramienta web educativa para la actividad de Semana 11. No requiere instalar dependencias ni servidor: abre `index.html` en un navegador moderno.

## Secciones

1. **Muestreo del trabajo:** calcula total de instantes, proporción de retrabajo, intervalo aproximado con Z y tamaño total estimado para el margen absoluto indicado.
2. **Ergonomía geométrica:** calcula la altura sugerida de superficie como altura de codo sentado menos 20 mm y contrasta mesa e instrucciones con perfiles ficticios P5, P50 y P95.
3. **Momento:** calcula peso y momento simplificado para una caja hipotética.
4. **Semana 12 opcional:** preguntas cualitativas sobre iluminación y legibilidad; no mide ni certifica niveles ambientales.

## Datos iniciales y resultados esperados

- Estados observados: preparar y armar = 144; inspeccionar = 60; retrabajar = 12; buscar materiales = 24.
- Total = 240 instantes; proporción de retrabajo = 12/240 = 0.05 = **5 %**.
- Intervalo normal aproximado del 95 %: **2.23 % a 7.77 %**.
- Tamaño total estimado para margen absoluto 0.05 y Z = 1.96: **74 observaciones**. La muestra descrita de 240 ya supera ese tamaño estimado.
- Alturas de superficie sugeridas: P5 = 650 − 20 = **630 mm**; P50 = 710 − 20 = **690 mm**; P95 = 780 − 20 = **760 mm**.
- Alcances cómodos: 300, 360 y 420 mm. Las instrucciones a 450 mm exceden los tres valores.
- Para masa = 1.2 kg y gravedad = 9.81 m/s²: fuerza = **11.772 N**; momento a 0.45 m = **5.2974 N·m**; a 0.25 m = **2.943 N·m**; reducción = **44.44 %**.

## Unidades y supuestos

- Muestreo: cada conteo representa un **instante observado** del estado de una persona en una jornada mixta. No representa una unidad de producto.
- El 8 % de kits erróneos es una proporción de **unidades defectuosas**. No es directamente comparable con el 5 % de instantes en retrabajo.
- El intervalo usa la aproximación normal indicada en la consigna: p ± Z√[p(1−p)/n].
- El tamaño se calcula con techo[Z²p(1−p)/e²], usando la proporción preliminar observada como estimación de p. Para planeación conservadora si p es desconocida, se puede usar p = 0.5.
- Ergonomía: medidas en milímetros y perfiles percentilares ficticios. Se toma como criterio de esta actividad superficie = codo sentado − 20 mm y alcance frecuente ≤ alcance cómodo.
- Momento: masa en kg, gravedad en m/s², distancia perpendicular en m y momento en N·m. Se supone fuerza perpendicular al brazo: M = m·g·d.
- El cálculo es didáctico; no diagnostica lesiones ni sustituye una evaluación ergonómica profesional.

## Datos adicionales para contrastar fuentes

Para el 8 % de kits erróneos se necesitan número total de kits inspeccionados y número de kits defectuosos, periodo, línea/producto, definición de defecto y método de muestreo. Para los instantes se necesitan horarios aleatorios, jornada, persona o puesto codificado, definición operacional de estados, total de observaciones por jornada y cobertura temporal. Idealmente, recolectar ambas fuentes en el mismo periodo y proceso.

## Pruebas públicas

Abre `tests.html` en el navegador. Las pruebas verifican los resultados iniciales de muestreo, ergonomía y momento.

## Seguridad y práctica

Usar únicamente fichas y cajas vacías en la práctica. No utilizar kits químicos, vidrio ni cargas reales. No subir al repositorio datos personales, fotografías ni credenciales.

## Registro breve de IA

- Prompt/objetivo: construir una calculadora pequeña para muestreo del trabajo, geometría antropométrica y momento con los datos de la consigna.
- Validación: contrastar los valores iniciales con cálculos manuales y ejecutar `tests.html`.
- Errores corregidos: el contraste distingue instantes observados de unidades defectuosas; no se presentan como una misma tasa.
- Limitaciones: datos sintéticos, perfiles ficticios, aproximación normal y modelo de momento estático simplificado. Cada integrante debe poder explicar fórmulas, unidades y supuestos.
