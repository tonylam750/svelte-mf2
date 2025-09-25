import type { MessageMarkupPart } from "messageformat";

export function markupToHTML(part: MessageMarkupPart ): string {
    const name = part.name?.trim().toLowerCase();

    switch(name) {
        case "bold":
            return part.kind === "open" ? "<b>" : "</b>";
        case "italic":
            return part.kind === "open" ? "<i>" :  "</i>";
        case "error":
            return part.kind === "open" ? `<span style="color:red">`: "</span>";
        case "link":
            if (part.options){
                return `<a href="${part.options.to}">`
            }
            return part.kind === "open" ? `<a style="text-decoration: underline">` : "</a>"
        case "star-icon":
            return "⭐"
        default:
            return "";
    }
}
