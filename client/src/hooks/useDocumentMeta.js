import { useEffect } from "react";

/**
 * Custom React hook to set document title and meta description.
 * @param {string} title - The page title.
 * @param {string} description - The meta description.
 */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}
