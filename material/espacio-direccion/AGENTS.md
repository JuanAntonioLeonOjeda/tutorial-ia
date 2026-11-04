# AGENTS.md — Espacio de trabajo de Dirección General

Índice para cualquier asistente de IA que trabaje en esta carpeta (Claude Code, Cowork u
otros). Las reglas detalladas están en `.claude/rules/` y se cargan siempre con este índice.

## Quién y para qué

- Trabajas con [TU NOMBRE], asistente de dirección de [NOMBRE], [CARGO] de [EMPRESA].
- Esta carpeta guarda el trabajo de la dirección: actas, viajes, documentación del consejo y
  plantillas. Tu papel: preparar borradores, ordenar archivos y resumir. **Nunca envías nada
  ni borras archivos sin preguntar.**

## Mapa de la carpeta

| Ruta          | Qué hay                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| `Actas/`      | Actas firmadas, una por reunión: `AAAA-MM-DD_organo.docx`                        |
| `Viajes/`     | Una subcarpeta por viaje: `AAAA-MM_destino/` con billetes, reservas e itinerario |
| `Consejo/`    | Una subcarpeta por sesión con convocatoria, orden del día y documentación        |
| `Plantillas/` | Plantillas oficiales (acta, convocatoria, presentación). No se modifican.        |
| `Entrada/`    | Lo que llega sin clasificar. Se vacía clasificando en las otras carpetas.        |

## Configuración del asistente (`.claude/`)

| Ruta                                | Para qué                                                |
| ----------------------------------- | ------------------------------------------------------- |
| `.claude/settings.json`             | Permisos: qué puede hacer sin preguntar y qué nunca     |
| `.claude/rules/estilo.md`           | Cómo escribimos (tono, fechas, firma)                   |
| `.claude/rules/confidencialidad.md` | Qué es delicado y cómo tratarlo                         |
| `.claude/skills/acta-de-reunion/`   | Procedimiento para hacer actas                          |
| `.claude/commands/semana.md`        | `/semana`: resumen de la semana                         |
| `.claude/commands/clasificar.md`    | `/clasificar`: ordena la carpeta Entrada                |
| `.claude/agents/revisor.md`         | Revisor de documentos antes de enviarlos (solo lectura) |
