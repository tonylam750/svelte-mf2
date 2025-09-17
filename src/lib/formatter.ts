import { MessageFormat, type MessageMarkupPart } from "messageformat";

export default function mf2(lang: string, mf2string: string, vars: Record<string, any>) {
    const mf = new MessageFormat(lang, mf2string);
    const parts = mf.formatToParts(vars);

    console.log(JSON.stringify(parts))
    
    let html : string[] = []
    
    for (const part of parts) {
        switch(part.type) {
            case "text":
                html.push(part.value);
                break; 
            case "markup":
                html.push(markupToHTML(part)); 
                break; 
            case "string":
                html.push(part.value);
                break; 
            case "bidiIsolation":
                html.push(part.value || "");
                break;
            case "number":
                html.push(part.parts.map(p => p.value).join(""));
                break;
            default:
                break;
        }
    }
    
    return html.join(""); 
}

function markupToHTML(part: MessageMarkupPart): string {
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






















