// CHECKPOINT 2 -- + Schema de Zod
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

const BuscarPeliculasSchema = {
  genero: z
    .enum(Object.keys(TMDB_GENEROS) as [string, ...string[]])
    .optional()
    .describe("Género de la película: Acción, Comedia, Drama, Terror, Ciencia Ficción, Animación, Aventura, Thriller, Romance, Documental"),

  anioMinimo: z
    .number()
    .int()
    .min(1900)
    .max(2025)
    .optional()
    .describe("Año mínimo de estreno. Ejemplo: 2020 para películas desde 2020"),

  calificacionMinima: z
    .number()
    .min(0)
    .max(10)
    .optional()
    .describe("Calificación mínima en TMDB del 0 al 10. Ejemplo: 7 para películas bien calificadas"),
};
