/*
  CHECKPOINTS — Taller "Tu primer MCP Server"
  ============================================
  Si te perdiste en algún punto del live coding, usa esta carpeta para
  ponerte al día. Cada index-pasoN.ts contiene el contenido COMPLETO
  que src/index.ts debería tener en ese punto del taller. Copia el
  contenido del paso correspondiente, pégalo en tu propio src/index.ts,
  y sigue el taller desde ahí.

  Pasos disponibles:
    index-paso1.ts        -> Imports + servidor + mapa de géneros
    index-paso2.ts         -> + Schema de Zod
    index-paso3.ts         -> + Tool "buscar_peliculas" con fetch
    index-paso4.ts         -> + main() -- servidor funcional completo
    index-paso5-bonus.ts   -> + Tool "buscar_por_titulo" (opcional)

  Este archivo (comandos.ts) reúne los comandos de terminal y los
  archivos de configuración que NO van dentro de index.ts.
*/

// ----------------------------------------------------------------
// SETUP INICIAL
// ----------------------------------------------------------------
/*
mkdir taller-mcp-gdg
cd taller-mcp-gdg
npm init -y
mkdir src

npm install @modelcontextprotocol/sdk zod dotenv
npm install -D tsx typescript @types/node
*/

// ----------------------------------------------------------------
// .gitignore
// ----------------------------------------------------------------
/*
node_modules/
.env
dist/
snippets/
*/

// ----------------------------------------------------------------
// .env  (tu clave real -- nunca se commitea)
// .env.example  (template -- este sí se commitea)
// ----------------------------------------------------------------
/*
TMDB_API_KEY=tu_clave_de_tmdb_aqui
*/

// ----------------------------------------------------------------
// tsconfig.json
// ----------------------------------------------------------------
/*
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
*/

// ----------------------------------------------------------------
// PROBAR EL SERVIDOR DESDE TERMINAL
// ----------------------------------------------------------------
/*
npx tsx src/index.ts
*/

// ----------------------------------------------------------------
// claude_desktop_config.json
// La ubicación varía por máquina -- verifica cuál te corresponde:
//   %APPDATA%\Claude\claude_desktop_config.json
//   %LOCALAPPDATA%\Claude\claude_desktop_config.json
//   AppData\Local\Packages\<PackageId>\LocalCache\Roaming\Claude\...
// ----------------------------------------------------------------
/*
{
  "mcpServers": {
    "recomendador-peliculas": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "RUTA/ABSOLUTA/A/taller-mcp-gdg/src/index.ts"
      ],
      "env": {
        "TMDB_API_KEY": "tu_clave_aqui"
      }
    }
  }
}
*/
