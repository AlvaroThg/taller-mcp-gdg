// CHECKPOINT 3 -- + Tool "buscar_peliculas" con fetch
// Si te quedaste aquí, tu src/index.ts debería verse exactamente así.
// NOTA: todavía falta main() (Checkpoint 4) -- el servidor aún no arranca.

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

server.tool(
  "buscar_peliculas",
  "Busca películas en TMDB según género, año mínimo de estreno y calificación mínima. Todos los parámetros son opcionales. Devuelve las 5 más populares que cumplan los criterios.",
  BuscarPeliculasSchema,
  async (params) => {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return { content: [{ type: "text" as const, text: "Error: TMDB_API_KEY no configurada." }] };
    }

    const url = new URL("https://api.themoviedb.org/3/discover/movie");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("language", "es-ES");
    url.searchParams.set("sort_by", "popularity.desc");

    if (params.genero) {
      url.searchParams.set("with_genres", String(TMDB_GENEROS[params.genero]));
    }
    if (params.anioMinimo !== undefined) {
      url.searchParams.set("primary_release_date.gte", `${params.anioMinimo}-01-01`);
    }
    if (params.calificacionMinima !== undefined) {
      url.searchParams.set("vote_average.gte", String(params.calificacionMinima));
      url.searchParams.set("vote_count.gte", "100");
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      return { content: [{ type: "text" as const, text: `Error de TMDB: ${response.status}` }] };
    }

    const data = await response.json() as {
      results: Array<{
        title: string;
        overview: string;
        release_date: string;
        vote_average: number;
        vote_count: number;
      }>;
    };

    const peliculas = data.results.slice(0, 5);

    if (peliculas.length === 0) {
      return { content: [{ type: "text" as const, text: "No encontré películas con esos criterios. Prueba con filtros menos restrictivos." }] };
    }

    const texto = peliculas
      .map(
        (p, i) =>
          `${i + 1}. 🎬 **${p.title}** (${p.release_date?.substring(0, 4)})\n` +
          `   ⭐ ${p.vote_average.toFixed(1)}/10 · ${p.vote_count.toLocaleString()} reseñas\n` +
          `   ${p.overview || "Sin descripción disponible."}`
      )
      .join("\n\n");

    return {
      content: [{ type: "text" as const, text: `Top películas encontradas en TMDB:\n\n${texto}` }],
    };
  }
);
