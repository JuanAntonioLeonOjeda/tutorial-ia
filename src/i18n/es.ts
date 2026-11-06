/**
 * Every user-facing string of the app chrome. Lesson text lives in the MDX files.
 */
export const es = {
  app: {
    name: "Aprende IA",
    skipToContent: "Saltar al contenido",
  },
  shell: {
    home: "Módulos",
    themeToLight: "Cambiar a tema claro",
    themeToDark: "Cambiar a tema oscuro",
    footer:
      "Curso personal para trabajar mejor con IA. Funciona en local, sin cuentas ni servidores: tu progreso se guarda en este navegador.",
  },
  home: {
    title: "Aprende IA",
    lead: "Un curso paso a paso para sacarle todo el partido a Claude (y a ChatGPT, Gemini y Copilot) en el día a día de una asistente de dirección: pedir bien, proyectos, skills, conectores y automatizaciones. Sin programar.",
    subjectsHeading: "Módulos",
    extrasHeading: "Un paso más (con un poco de código)",
    extrasLead:
      "Opcional. Lo que merece la pena aprender aunque haya que abrir un terminal o tocar un archivo de texto.",
    lessons: (n: number): string => `${n} lecciones`,
    progress: (done: number, total: number): string => `${done} de ${total} completadas`,
    continueLabel: "Seguir por donde ibas",
    howTitle: "Cómo está montado",
    howItems: [
      {
        title: "Resúmenes sin jerga",
        text: "Cada lección va al grano: qué es, para qué te sirve y cómo se usa en una oficina de verdad.",
      },
      {
        title: "Simulaciones",
        text: "Añade ingredientes a un prompt, enchufa conectores, programa una tarea… y mira qué pasa.",
      },
      {
        title: "Prácticas en amarillo",
        text: "Lo subrayado en amarillo es tu turno: preguntas rápidas y prácticas para hacer en Claude, con pista y solución.",
      },
    ],
  },
  subject: {
    lessonsHeading: "Lecciones",
    basedOn: "Basado en",
    minutes: (n: number): string => `${n} min`,
    completed: "Completada",
    start: "Empezar",
    notFound: "Ese módulo no existe.",
  },
  lesson: {
    onThisPage: "En esta lección",
    previous: "Anterior",
    next: "Siguiente",
    markDone: "Marcar como completada",
    markUndone: "Completada · deshacer",
    loading: "Cargando lección…",
    notFound: "Esa lección no existe.",
    sources: "Documentación oficial",
    backToSubject: "Volver al módulo",
    exercisesSolved: (done: number, total: number): string => `Prácticas hechas: ${done}/${total}`,
  },
  exercise: {
    yourTurn: "Tu turno",
    hint: "Pista",
    nextHint: "Otra pista",
    noMoreHints: "No hay más pistas",
    showSolution: "Ver solución",
    hideSolution: "Ocultar solución",
    check: "Comprobar",
    solved: "¡Hecho!",
    tryAgain: "Todavía no. Revisa y vuelve a intentarlo.",
    answerLabel: "Tu respuesta",
    quizCheck: "Comprobar respuesta",
    quizCorrect: "Correcto.",
    quizWrong: "No es esa.",
    predictTitle: "¿Qué crees?",
    practiceTitle: "Práctica en Claude",
    practiceSteps: "Pasos",
    practiceDone: "Lo he hecho",
    practiceDoneHint: "Marca los pasos según los vayas haciendo.",
    practiceExample: "Un ejemplo de cómo podría quedar",
    solutionLabel: "Solución",
  },
  screenshot: {
    openFull: "Verla a tamaño completo (se abre en otra pestaña)",
    taken: (date: string): string =>
      `Captura de ${date}. La interfaz cambia a menudo: si algo no está igual, busca un nombre parecido.`,
  },
  prompt: {
    label: "Prompt para copiar",
    copy: "Copiar",
    copied: "Copiado",
    placeholders: "Cambia lo que va [ENTRE CORCHETES] por lo tuyo.",
  },
  chat: {
    label: "Conversación de ejemplo",
    you: "Tú",
    assistant: "Claude",
  },
  path: {
    label: "Dónde está",
  },
  callout: {
    real: "En la oficina",
    warn: "Ojo",
    idea: "La intuición",
    practice: "Pruébalo",
    note: "Nota",
  },
  sim: {
    badge: "Simulación",
    reset: "Reiniciar",
    play: "Reproducir",
    pause: "Pausar",
    step: "Paso",
    loading: "Cargando simulación…",
    failed: "La simulación no se pudo cargar.",
  },
  notFound: {
    title: "Página no encontrada",
    back: "Volver al inicio",
  },
  error: {
    title: "Algo ha fallado",
    reload: "Recargar",
  },
} as const;
