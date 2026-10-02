/**
 * Prefix a root-relative path with the deploy base (astro.config `base`),
 * so the site works at a domain root or under a sub-path like /archovia-website/.
 */
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
