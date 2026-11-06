import { Navigate, type RouteObject } from "react-router";

import { RootLayout } from "@/features/shell";

import { HomeRoute } from "./HomeRoute";
import { LessonRoute } from "./LessonRoute";
import { NotFoundRoute } from "./NotFoundRoute";
import { RouteError } from "./RouteError";
import { SubjectRoute } from "./SubjectRoute";

/** Old lesson paths and where they live now. */
const MOVED_LESSONS = [
  { from: "otras-herramientas/chatgpt", to: "/chatgpt/interfaz-modelos-y-planes" },
] as const;

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomeRoute /> },
      // Lessons that moved to their own module keep working from old links and bookmarks.
      ...MOVED_LESSONS.map(({ from, to }) => ({
        path: from,
        element: <Navigate to={to} replace />,
      })),
      { path: ":subject", element: <SubjectRoute /> },
      { path: ":subject/:lesson", element: <LessonRoute />, errorElement: <RouteError /> },
      { path: "*", element: <NotFoundRoute /> },
    ],
  },
];
