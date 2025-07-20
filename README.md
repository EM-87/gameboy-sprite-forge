# 🎮 Game Boy Sprite Forge

**Análisis y Generación de Arquetipos de Sprites 8×8 al estilo Game Boy.**

[![CI](https://github.com/<tu-usuario>/gameboy-sprite-forge/actions/workflows/ci.yml/badge.svg)](https://github.com/<tu-usuario>/gameboy-sprite-forge/actions/workflows/deploy.yml)  
[![Deploy](https://vercel.com/button)](https://gameboy-sprite-forge.vercel.app)

Game Boy Sprite Forge es una herramienta para desarrolladores de juegos, artistas de píxeles y entusiastas del retro‑gaming. Extrae, analiza y genera sprites 8×8 basados en los patrones y la “gramática visual” de los juegos clásicos de Game Boy.

## ✨ Características

- **Extracción Inteligente**: Carga cualquier tileset y extrae automáticamente los sprites 8×8.  
- **Análisis Profundo**: Cada sprite se clasifica (agua, terreno, UI, objeto…) y analiza con métricas como entropía, tileabilidad y simetría.  
- **Generación Dirigida**: Crea variaciones útiles a partir de arquetipos probados, evitando el ruido digital.  
- **Paletas Clásicas**: Visualiza tus sprites con las paletas de Game Boy, Pocket, Light y más.

## 🚀 Cómo Empezar

1. **Visita la aplicación**:  
   [https://gameboy-sprite-forge.vercel.app](https://gameboy-sprite-forge.vercel.app)  
2. **Carga un Tileset**:  
   Haz clic en “Cargar Imagen” y selecciona un archivo PNG con sprites (por ejemplo, de [The Spriters Resource](https://www.spriters-resource.com/game_boy_gbc/)).  
3. **Explora**:  
   Haz clic en los sprites extraídos para ver su análisis detallado.  
4. **Genera**:  
   Usa el modo “Generar” para crear variaciones de los arquetipos clásicos o de tus propios sprites.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres añadir nuevos arquetipos, paletas o mejorar la herramienta, por favor consulta nuestra [Guía de Contribución](CONTRIBUTING.md).

## 📜 Historial de Cambios

Consulta el [CHANGELOG.md](CHANGELOG.md) para ver un historial detallado de las versiones.

## 🛠️ Tecnología

- React + TypeScript  
- Jest + React Testing Library  
- GitHub Actions para CI/CD  
- Vercel para despliegue  
- ESLint + Prettier para calidad de código  

---
