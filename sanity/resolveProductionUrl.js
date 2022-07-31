export default function resolveProductionUrl(document) {
    return document._type === "page" ? `https://studio-ship.vercel.app/${document.slug.current}?preview=true` : null;
  }