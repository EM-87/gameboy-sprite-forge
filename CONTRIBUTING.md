````markdown
# Contribuyendo a Game Boy Sprite Forge

¡Gracias por tu interés en contribuir! 🙌 Sigue estos pasos para que tu colaboración sea fluida y bienvenida.

## 1. Preparar el entorno

1. Haz fork del repositorio y clónalo localmente:
   ```bash
   git clone https://github.com/<tu-usuario>/gameboy-sprite-forge.git
   cd gameboy-sprite-forge
````

2. Instala dependencias:

   ```bash
   npm ci
   ```
3. Crea y usa una rama con nombre descriptivo:

   ```bash
   git checkout -b feat/nueva-caracteristica
   ```

## 2. Estilo de código

* Usamos **TypeScript**, **ESLint** y **Prettier**.
* Ejecuta antes de push:

  ```bash
  npm run lint
  npm run format
  ```
* Sigue las reglas de ESLint y el formateo de Prettier. Corrige los warnings.

## 3. Tests

* Añade **unit tests** para funciones puras en `src/utils`.
* Añade **integration tests** o **UI tests** en `src/tests`.
* Ejecuta:

  ```bash
  npm test
  ```
* Asegúrate de que el coverage cubra tu código.

## 4. Pull Requests

1. Sincroniza tu fork con `main` original:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. Sube tu rama a tu fork:

   ```bash
   git push origin feat/nueva-caracteristica
   ```
3. Abre un Pull Request (PR) contra `main`:

   * Describe brevemente los cambios y el motivo.
   * Referencia issues relacionados (ejemplo: `closes #42`).
   * Asegura que todos los tests pasen y no haya errores de lint.

## 5. Reporte de bugs o sugerencias

Si encuentras un error o tienes una idea, crea un **Issue** usando nuestras plantillas:

* **Bug report**: describe el comportamiento esperado vs real, pasos para reproducir, y logs o capturas de pantalla.
* **Feature request**: explica la nueva funcionalidad, casos de uso y ejemplos de interfaz.

---

¡Gracias por ayudar a mejorar Game Boy Sprite Forge! 🎉

```
```
