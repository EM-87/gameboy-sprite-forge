# Changelog

Todas las modificaciones significativas a este proyecto se documentarán en este archivo.

## [1.0.0] - 2025-07-20
### Added
- Inicialización del proyecto con React, TypeScript, ESLint, Prettier.
- Componentes principales:
  - **ControlPanel** para carga de tilesets y ajustes.
  - **AnalysisPanel** para visualización de métricas de sprites.
  - **GenerationPanel** para generación de variaciones de arquetipos.
  - **SpriteGrid** para mostrar sprites extraídos.
- Hook **useSpriteExtractor** con lógica de extracción y análisis de sprites.
- Utilidades en `src/utils`:
  - **spriteAnalysis.ts** (entropía, coherencia, clasificación, etc.).
  - **spriteGeneration.ts** (funciones de variaciones).
  - **renderUtils.ts** (renderizado SVG de sprites).
- Configuración de CI/CD con GitHub Actions y despliegue en Vercel.
- Tests con Jest y React Testing Library.
- Documentación inicial: README, CONTRIBUTING, CHANGELOG.

### Changed
- Estructura de archivos reorganizada.
- Migración completa a TypeScript.
- Corrección de cálculo de rotación 90° en `spriteGeneration.ts`.

### Fixed
- Errores de lint y formateo.
- Feedback de carga y errores en el **ControlPanel**.

---

*Consulta las secciones anteriores del historial si necesitas versiones anteriores.*  
