export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  str = str
    // .replace(/[^a-z0-9 -]/g, "")
    // .replace(/\s+/g, "-")
    // .replace(/-+/g, "-");
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
}
