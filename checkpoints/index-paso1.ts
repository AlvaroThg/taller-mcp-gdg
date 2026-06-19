// CHECKPOINT 1 -- Imports + servidor + mapa de géneros
// Si te quedaste aquí, tu src/index.ts debería verse exactamente así.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import "dotenv/config";

const server = new McpServer({
  name: "recomendador-peliculas",
  version: "1.0.0",
});

const TMDB_GENEROS: Record<string, number> = {
  "Acción": 28,
  "Comedia": 35,
  "Drama": 18,
  "Terror": 27,
  "Ciencia Ficción": 878,
  "Animación": 16,
  "Aventura": 12,
  "Thriller": 53,
  "Romance": 10749,
  "Documental": 99,
};
