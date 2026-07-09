import type { APIRoute } from "astro";
import { getBuildInfo } from "~/utils/buildInfo";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(getBuildInfo(), null, 2), {
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
