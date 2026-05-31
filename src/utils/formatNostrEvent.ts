import { nip19 } from "nostr-tools";

export function formatNostrEvent(event: any) {
  // Helper to find a tag value
  const getTagValue = (key: string) => {
    const tag = event.tags.find((t: any) => t[0] === key);
    return tag ? tag[1] : undefined;
  };

  // 1. Get the 'd' tag (the identifier)
  const dTag = getTagValue("d");
  
  // 2. Generate naddr
  let naddr = "";
  if (dTag) {
    try {
      naddr = nip19.naddrEncode({
        kind: 30023,
        pubkey: event.pubkey,
        identifier: dTag,
      });
    } catch (e) {
      console.error("Error encoding naddr:", e);
    }
  }

  // 3. Clean up the description for SEO
  const summary = getTagValue("summary");
  const fallbackDesc = event.content
    .replace(/!\[.*?\]\(.*?\)/g, "") 
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") 
    .replace(/(?:__|[*#`\[\]()\-+!=])/g, "")
    .substring(0, 160)
    .trim() + "...";

  return {
    id: event.id, // Hex ID for the URL
    naddr: naddr, // NIP-19 for the links
    title: getTagValue("title") || "Untitled Nostr Post",
    author: getTagValue("author") || "Nostr User",
    description: summary || fallbackDesc,
    pubDatetime: new Date(event.created_at * 1000),
    modDatetime: null,
    tags: event.tags.filter((t: any) => t[0] === "t").map((t: any) => t[1]),
    ogImage: getTagValue("image"),
    content: event.content,
  };
}