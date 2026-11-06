# Aprende IA

Curso paso a paso para sacarle todo el partido a **Claude** (y a ChatGPT, Gemini y Copilot) en el día a
día de una asistente de dirección. Sin programar: todo se hace desde la interfaz, salvo una
sección final opcional.

Mismo método que la plataforma de repaso del máster: lecciones en lenguaje cercano,
**conversaciones de ejemplo**, **prompts para copiar**, **simulaciones** que se pueden tocar,
preguntas rápidas con pista y solución, **capturas reales de la interfaz** con la zona marcada y
**prácticas para hacer en Claude** con una checklist.

- 5 módulos + 1 opcional · 29 lecciones · 7 simulaciones · 15 capturas · 71 ejercicios y prácticas.
  1. **Fundamentos**: qué hay detrás del chat, pedir bien, archivos/imágenes/voz, usarla con cabeza
     (instrucciones escondidas y las cuatro preguntas antes de delegar).
  2. **Claude a fondo**: la interfaz, modelos y límites de uso, artefactos y documentos, proyectos,
     instrucciones y memoria, investigación con fuentes, Claude en Chrome, Outlook, Excel y Google Docs.
  3. **Superpoderes**: conectores (MCP) y el buzón de tu jefa, skills, Cowork y subagentes,
     automatizaciones y un recetario.
  4. **ChatGPT a fondo**: interfaz y planes, instrucciones, memoria y proyectos, de los GPTs a las
     skills, investigación y Record, apps y tareas programadas, Work y los dots.
  5. **Gemini, Copilot y cuál usar**: Gemini y NotebookLM, Copilot en Outlook y Teams, cuál usar
     para qué.
  6. **Un paso más** (con un poco de código): Claude Code, la carpeta `.claude` y `AGENTS.md`,
     conectores MCP a mano.
- **Descargas**: tres skills de ejemplo listas para subir a Claude (acta, correo ejecutivo,
  viaje) y una plantilla de espacio de trabajo para Claude Code (`material/`).
- En GitHub Pages o en local con Docker. Sin cuentas ni servidor: el progreso se guarda en el navegador.

## MAIN DEPENDENCIES

![Node JS](https://img.shields.io/badge/NODE.JS-22.22+-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/REACT-19.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/VITE-8.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/REACT%20ROUTER-8.5.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-3.1.1-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)
![Shiki](https://img.shields.io/badge/SHIKI-4.5.0-F28C28?style=for-the-badge)
![Lucide](https://img.shields.io/badge/LUCIDE%20REACT-1.61.0-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![Vitest](https://img.shields.io/badge/VITEST-5.0.5-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/TESTING%20LIBRARY-16.3.3-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLINT-9.39.5-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/PRETTIER-3.9.10-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![pnpm](https://img.shields.io/badge/PNPM-12.11.2-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/DOCKER-NGINX%201.31.2-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Abrirlo

**En internet:** https://juanantonioleonojeda.github.io/tutorial-ia/ (se publica solo en cada
push a `main`, con `.github/workflows/pages.yml`).

**En local:**

```bash
docker compose up -d --build      # http://localhost:3300  (cambia el puerto con TUTORIAL_IA_PORT)
```

Para desarrollar:

```bash
pnpm install
pnpm dev                 # http://localhost:5173
pnpm test                # Vitest
pnpm lint
pnpm typecheck
pnpm build
./scripts/zip-skills.sh  # regenera public/descargas/ a partir de material/
```

## Mantenerlo al día

Las apps de IA cambian de nombre y de sitio sus funciones cada pocas semanas. Cada lección lista
sus fuentes oficiales, y el comando `/refresh-lesson <módulo>/<NN>` de Claude Code revisa sus
afirmaciones contra la documentación del día y propone los cambios.

## Cómo está hecho

- Plataforma reutilizada de la de repaso del máster, sin Python ni fórmulas. Lecciones en MDX
  (`src/content/`), compiladas en el build. Decisiones en [`docs/adr/`](docs/adr/README.md).
- Desarrollado con ayuda de Claude Code; la configuración de agentes está en `AGENTS.md` y
  `.claude/` (y la lección «La carpeta .claude y AGENTS.md» la usa como ejemplo).
