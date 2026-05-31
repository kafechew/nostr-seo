import { nip19 } from "nostr-tools";

export function formatNostrEvent(event: any) {
  const findTag = (key: string) => event.tags.find((t: any) => t[0] === key)?.[1];

  // 1. Optimized SEO Summary
  const summary = findTag("summary");
  const fallbackDesc = event.content
    .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // clean links
    .replace(/(?:__|[*#`\[\]()\-+!=])/g, "")
    .substring(0, 160)
    .trim() + "...";

  // 2. Generate Naddr (Web3 Link)
  const dTag = findTag("d") || "";
  let naddr = "";
  try {
    naddr = nip19.naddrEncode({
      kind: 30023,
      pubkey: event.pubkey,
      identifier: dTag,
    });
  } catch (e) {
    console.error("Naddr error", e);
  }

  return {
    id: naddr || event.id,
    title: findTag("title") || "Untitled",
    description: summary || fallbackDesc,
    pubDatetime: new Date(event.created_at * 1000),
    modDatetime: null,
    author: findTag("author") || "Nostr User",
    tags: event.tags.filter((t: any) => t[0] === "t").map((t: any) => t[1]),
    ogImage: findTag("image"),
    content: event.content,
    naddr: naddr
  };
}