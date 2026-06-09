"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";

import {
    $createParagraphNode,
    $getNodeByKey,
    $getRoot,
    $getSelection,
    $isRangeSelection,
    $createTextNode,
    COMMAND_PRIORITY_EDITOR,
    DecoratorNode,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    createCommand,
} from "lexical";

import {
    $getSelectionStyleValueForProperty,
    $patchStyleText,
    $setBlocksType,
} from "@lexical/selection";

import { $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListItemNode,
    ListNode,
} from "@lexical/list";
import { $createHeadingNode, $isHeadingNode, HeadingNode } from "@lexical/rich-text";

// ─────────────────────────────────────────────────────────────
// IMAGE NODE  (selected state lives in a shared Set + custom event)
// ─────────────────────────────────────────────────────────────
export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");

// Global selected image key — broadcast via custom DOM event so every
// ImageComponent can react without prop-drilling.
const IMG_SELECT_EVENT = "editor:image-select";
function broadcastImageSelect(key) {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(IMG_SELECT_EVENT, { detail: { key } }));
    }
}

function ImageComponent({ src, alt, nodeKey }) {
    const [editor] = useLexicalComposerContext();
    const [selected, setSelected] = useState(false);
    const wrapRef = useRef(null);

    // Listen for global select broadcasts — deselect if another image was clicked
    useEffect(() => {
        const handler = (e) => setSelected(e.detail.key === nodeKey);
        window.addEventListener(IMG_SELECT_EVENT, handler);
        return () => window.removeEventListener(IMG_SELECT_EVENT, handler);
    }, [nodeKey]);

    // Click outside (mousedown on document) → deselect
    useEffect(() => {
        if (!selected) return;
        const handler = (e) => {
            if (!wrapRef.current?.contains(e.target)) {
                broadcastImageSelect(null); // clears all images
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [selected]);

    const handleClick = (e) => {
        e.stopPropagation();
        broadcastImageSelect(selected ? null : nodeKey);
    };

    const remove = (e) => {
        e.stopPropagation();
        editor.update(() => { $getNodeByKey(nodeKey)?.remove(); });
    };

    return (
        <span
            ref={wrapRef}
            style={{ position: "relative", display: "inline-block", maxWidth: "100%", margin: "8px 0", userSelect: "none" }}
            onClick={handleClick}
        >
            <img
                src={src}
                alt={alt || ""}
                draggable={false}
                style={{
                    maxWidth: "100%",
                    borderRadius: "6px",
                    display: "block",
                    outline: selected ? "2px solid #3b82f6" : "2px solid transparent",
                    transition: "outline 0.12s",
                    cursor: "pointer",
                }}
            />
            {selected && (
                <button
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()} // prevent outside-click handler firing
                    onClick={remove}
                    title="Remove image"
                    style={{
                        position: "absolute", top: 6, right: 6,
                        width: 26, height: 26,
                        borderRadius: "50%", border: "none",
                        background: "rgba(0,0,0,0.65)", color: "#fff",
                        fontSize: 16, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                    }}
                >
                    ×
                </button>
            )}
        </span>
    );
}

export class ImageNode extends DecoratorNode {
    __src; __alt;
    static getType() { return "image"; }
    static clone(n) { return new ImageNode(n.__src, n.__alt, n.__key); }
    constructor(src, alt, key) { super(key); this.__src = src; this.__alt = alt || ""; }
    static importJSON(d) { return new ImageNode(d.src, d.alt); }
    exportJSON() { return { type: "image", version: 1, src: this.__src, alt: this.__alt }; }
    createDOM() { const s = document.createElement("span"); s.style.display = "block"; return s; }
    updateDOM() { return false; }
    isInline() { return false; }
    decorate() { return <ImageComponent src={this.__src} alt={this.__alt} nodeKey={this.__key} />; }
}

function ImagePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(INSERT_IMAGE_COMMAND, ({ src, alt }) => {
            editor.update(() => {
                const node = new ImageNode(src, alt);
                const sel = $getSelection();
                if ($isRangeSelection(sel)) sel.insertNodes([node]);
                else $getRoot().append(node);
            });
            return true;
        }, COMMAND_PRIORITY_EDITOR);
    }, [editor]);
    return null;
}

// ─────────────────────────────────────────────────────────────
// LINK TOOLTIP
// ─────────────────────────────────────────────────────────────
function LinkTooltip() {
    const [editor] = useLexicalComposerContext();
    const [info, setInfo] = useState(null); // { url, top, left }

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const sel = $getSelection();
                if (!$isRangeSelection(sel)) { setInfo(null); return; }
                const node = sel.anchor.getNode();
                const parent = node.getParent();
                if ($isLinkNode(parent)) {
                    const domSel = window.getSelection();
                    if (domSel?.rangeCount) {
                        const rect = domSel.getRangeAt(0).getBoundingClientRect();
                        const er = editor.getRootElement()?.getBoundingClientRect();
                        if (er) setInfo({ url: parent.getURL(), top: rect.bottom - er.top + 6, left: Math.max(0, rect.left - er.left) });
                    }
                } else {
                    setInfo(null);
                }
            });
        });
    }, [editor]);

    if (!info) return null;
    return (
        <div style={{
            position: "absolute", top: info.top, left: info.left,
            background: "#1e293b", color: "#fff",
            fontSize: 12, padding: "4px 10px", borderRadius: 5,
            zIndex: 20, maxWidth: 280,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            display: "flex", gap: 6, alignItems: "center",
            pointerEvents: "none",
        }}>
            🔗 <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{info.url}</span>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// COLOR PICKER  (text color + background color)
// ─────────────────────────────────────────────────────────────
const PRESET_COLORS = [
    "#000000", "#374151", "#6b7280", "#d1d5db", "#ffffff",
    "#ef4444", "#f97316", "#f59e0b", "#22c55e", "#3b82f6",
    "#8b5cf6", "#ec4899", "#14b8a6", "#0ea5e9", "#84cc16",
    "#dc2626", "#ea580c", "#d97706", "#16a34a", "#2563eb",
];

function ColorPicker({ type, activeColor, onApply }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const isText = type === "color";
    const label = isText ? "A" : "▬";
    const title = isText ? "Text color" : "Highlight color";

    const indicator = (
        <span style={{
            display: "inline-block",
            width: 12, height: 3,
            borderRadius: 2,
            background: activeColor || (isText ? "#000" : "transparent"),
            border: !activeColor && !isText ? "1px dashed #9ca3af" : "none",
            marginTop: 2,
        }} />
    );

    return (
        <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
            <button
                type="button"
                title={title}
                onClick={() => setOpen(o => !o)}
                style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: 1,
                    width: 28, height: 28, border: "none", borderRadius: 4,
                    background: open ? "#e5e7eb" : "transparent",
                    color: "#374151", cursor: "pointer", fontSize: 12, fontWeight: 700,
                }}
                onMouseEnter={e => { if (!open) e.currentTarget.style.background = "#e5e7eb"; }}
                onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}
            >
                <span style={{ lineHeight: 1 }}>{label}</span>
                {indicator}
            </button>

            {open && (
                <div style={{
                    position: "absolute", top: "calc(100% + 4px)", left: 0,
                    background: "#fff", border: "1px solid #e5e7eb",
                    borderRadius: 8, padding: 10, zIndex: 50,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    width: 168,
                }}>
                    <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontWeight: 500 }}>
                        {title}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 4 }}>
                        {PRESET_COLORS.map(c => (
                            <button
                                key={c}
                                type="button"
                                title={c}
                                onMouseDown={(e) => { e.preventDefault(); onApply(c); setOpen(false); }}
                                style={{
                                    width: 24, height: 24, borderRadius: 4,
                                    background: c,
                                    border: activeColor === c ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                                    cursor: "pointer",
                                }}
                            />
                        ))}
                    </div>
                    {/* Custom color input */}
                    <div style={{ marginTop: 8, display: "flex", gap: 4, alignItems: "center" }}>
                        <input
                            type="color"
                            defaultValue={activeColor || "#000000"}
                            style={{ width: 28, height: 26, border: "none", padding: 0, cursor: "pointer", borderRadius: 4 }}
                            onChange={(e) => onApply(e.target.value)}
                        />
                        <span style={{ fontSize: 11, color: "#6b7280" }}>Custom</span>
                        {activeColor && (
                            <button
                                type="button"
                                onMouseDown={(e) => { e.preventDefault(); onApply(null); setOpen(false); }}
                                style={{ marginLeft: "auto", fontSize: 11, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            )}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────
const Svg = ({ children }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        width="14" height="14">{children}</svg>
);
const icons = {
    bold: <Svg><path d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z" strokeWidth="2.3" /></Svg>,
    italic: <Svg><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></Svg>,
    underline: <Svg><path d="M6 4v6a6 6 0 0 0 12 0V4" /><line x1="4" y1="20" x2="20" y2="20" /></Svg>,
    strikethrough: <Svg><line x1="4" y1="12" x2="20" y2="12" /><path d="M17 6.5C17 4.5 15 3 12 3S7 4.5 7 7c0 2 1.5 3 3 3.5" /><path d="M7 17.5C7 19.5 9 21 12 21s5-1.5 5-4c0-2-1.5-3-3-3.5" /></Svg>,
    alignLeft: <Svg><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></Svg>,
    alignCenter: <Svg><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></Svg>,
    alignRight: <Svg><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" /></Svg>,
    alignJustify: <Svg><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></Svg>,
    bulletList: <Svg><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><circle cx="4" cy="6" r="1.3" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1.3" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1.3" fill="currentColor" stroke="none" /></Svg>,
    numberedList: <Svg><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></Svg>,
    link: <Svg><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Svg>,
    image: <Svg><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></Svg>,
};

// ─────────────────────────────────────────────────────────────
// TOOLBAR
// ─────────────────────────────────────────────────────────────
const HEADING_OPTIONS = [
    { value: "paragraph", label: "Paragraph" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "h4", label: "Heading 4" },
];
const FONT_FAMILY_OPTIONS = [
    { value: "inherit", label: "Default Font" },
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "'Times New Roman', serif", label: "Times New Roman" },
    { value: "'Courier New', monospace", label: "Courier New" },
    { value: "Verdana, sans-serif", label: "Verdana" },
];
const FONT_SIZE_OPTIONS = [
    "10", "11", "12", "13", "14", "15", "16", "18", "20", "22", "24", "28", "32", "36", "40", "48"
].map(v => ({ value: v + "px", label: v }));

function Btn({ icon, label, active, onClick }) {
    const base = { display: "flex", alignItems: "center", justifyValue: "center", justifySelf: "center", width: 28, height: 28, border: "none", borderRadius: 4, cursor: "pointer", flexShrink: 0, transition: "background 0.1s" };
    return (
        <button type="button" title={label} aria-label={label}
            style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center", background: active ? "#dbeafe" : "transparent", color: active ? "#1d4ed8" : "#374151" }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#e5e7eb"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? "#dbeafe" : "transparent"; }}
            onClick={onClick}
        >{icon}</button>
    );
}

function Sep() {
    return <span style={{ width: 1, height: 18, background: "#d1d5db", margin: "0 2px", flexShrink: 0 }} />;
}

function Toolbar({ fileInputRef }) {
    const [editor] = useLexicalComposerContext();
    const [fmt, setFmt] = useState({});
    const [blockType, setBlockType] = useState("paragraph");
    const [fontFamily, setFontFamily] = useState("inherit");
    const [fontSize, setFontSize] = useState("15px");
    const [textColor, setTextColor] = useState(null);
    const [bgColor, setBgColor] = useState(null);

    // Sync from editor selection
    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.getEditorState().read(() => {
                const sel = $getSelection();
                if (!$isRangeSelection(sel)) return;

                setFmt({
                    bold: sel.hasFormat("bold"),
                    italic: sel.hasFormat("italic"),
                    underline: sel.hasFormat("underline"),
                    strikethrough: sel.hasFormat("strikethrough"),
                });

                // Block type
                let node = sel.anchor.getNode();
                let found = "paragraph";
                while (node) {
                    if ($isHeadingNode(node)) { found = node.getTag(); break; }
                    const p = node.getParent?.();
                    if (!p || p === $getRoot()) break;
                    node = p;
                }
                setBlockType(found);

                setFontFamily($getSelectionStyleValueForProperty(sel, "font-family", "inherit") || "inherit");
                setFontSize($getSelectionStyleValueForProperty(sel, "font-size", "15px") || "15px");
                setTextColor($getSelectionStyleValueForProperty(sel, "color", "") || null);
                setBgColor($getSelectionStyleValueForProperty(sel, "background-color", "") || null);
            });
        });
    }, [editor]);

    const applyHeading = useCallback((value) => {
        editor.update(() => {
            const sel = $getSelection();
            if (!$isRangeSelection(sel)) return;
            $setBlocksType(sel, () => value === "paragraph" ? $createParagraphNode() : $createHeadingNode(value));
        });
    }, [editor]);

    const applyStyle = useCallback((prop, value) => {
        editor.update(() => {
            const sel = $getSelection();
            if ($isRangeSelection(sel)) $patchStyleText(sel, { [prop]: value });
        });
    }, [editor]);

    const handleLink = useCallback(() => {
        editor.getEditorState().read(() => {
            const sel = $getSelection();
            if ($isRangeSelection(sel)) {
                const node = sel.anchor.getNode();
                const isLink = $isLinkNode(node.getParent()) || $isLinkNode(node);
                if (isLink) {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                } else {
                    const url = prompt("Enter URL (e.g. https://example.com):");
                    if (url?.trim()) editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: url.trim(), target: "_blank" });
                }
            }
        });
    }, [editor]);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src: ev.target.result, alt: file.name });
        reader.readAsDataURL(file);
        e.target.value = "";
    }, [editor]);

    const sel = { height: 26, padding: "0 5px", border: "1px solid #d1d5db", borderRadius: 4, background: "#fff", color: "#374151", fontSize: 12, cursor: "pointer", outline: "none" };

    return (
        <div style={{ borderBottom: "1px solid #e5e7eb", background: "#f9fafb", padding: "5px 8px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 3 }}>

            <select value={blockType} onChange={e => applyHeading(e.target.value)} style={{ ...sel, width: 108 }}>
                {HEADING_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Sep />
            <select value={fontFamily} onChange={e => applyStyle("font-family", e.target.value)} style={{ ...sel, width: 126 }}>
                {FONT_FAMILY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Sep />
            <select value={fontSize} onChange={e => applyStyle("font-size", e.target.value)} style={{ ...sel, width: 54 }}>
                {FONT_SIZE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Sep />

            {/* Text color */}
            <ColorPicker
                type="color"
                activeColor={textColor}
                onApply={(c) => applyStyle("color", c || "inherit")}
            />
            {/* Background / highlight color */}
            <ColorPicker
                type="background-color"
                activeColor={bgColor}
                onApply={(c) => applyStyle("background-color", c || "transparent")}
            />
            <Sep />

            <Btn icon={icons.bold} label="Bold" active={fmt.bold} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} />
            <Btn icon={icons.italic} label="Italic" active={fmt.italic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} />
            <Btn icon={icons.underline} label="Underline" active={fmt.underline} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")} />
            <Btn icon={icons.strikethrough} label="Strikethrough" active={fmt.strikethrough} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")} />
            <Sep />

            <Btn icon={icons.alignLeft} label="Align Left" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")} />
            <Btn icon={icons.alignCenter} label="Align Center" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")} />
            <Btn icon={icons.alignRight} label="Align Right" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")} />
            <Btn icon={icons.alignJustify} label="Justify" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")} />
            <Sep />

            <Btn icon={icons.bulletList} label="Bullet List" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} />
            <Btn icon={icons.numberedList} label="Numbered List" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} />
            <Sep />

            <Btn icon={icons.link} label="Link" onClick={handleLink} />
            <Btn icon={icons.image} label="Insert Image" onClick={() => fileInputRef.current?.click()} />
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
        </div>
    );
}

const CSS = `
.ep  { margin: 0 0 0.4em; }
.eh1 { font-size: 2em;   font-weight: 700; line-height: 1.2; margin: 0.5em 0 0.3em; }
.eh2 { font-size: 1.5em; font-weight: 600; line-height: 1.3; margin: 0.5em 0 0.3em; }
.eh3 { font-size: 1.25em;font-weight: 600; margin: 0.4em 0 0.2em; }
.eh4 { font-size: 1.1em; font-weight: 600; margin: 0.3em 0 0.2em; }
.eb  { font-weight: bold; }
.ei  { font-style: italic; }
.eu  { text-decoration: underline; }
.es  { text-decoration: line-through; }
.elink { color: #2563eb; text-decoration: underline; cursor: pointer; }
.eul { list-style-type: disc;    padding-left: 1.5em; margin: 0.25em 0; }
.eol { list-style-type: decimal; padding-left: 1.5em; margin: 0.25em 0; }
.eli { margin: 2px 0; }
`;

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function RichTextEditor({ value, onChange }) {
    const fileInputRef = useRef(null);

    const initialConfig = useMemo(() => ({
        namespace: "BlogEditor",
        theme: {
            paragraph: "ep",
            heading: { h1: "eh1", h2: "eh2", h3: "eh3", h4: "eh4" },
            text: { bold: "eb", italic: "ei", underline: "eu", strikethrough: "es" },
            list: { ul: "eul", ol: "eol", listitem: "eli" },
            link: "elink",
        },
        nodes: [ListNode, ListItemNode, LinkNode, HeadingNode, ImageNode],
        onError(e) { console.error(e); },
        editorState(editor) {
            if (!value) return;
            try {
                const parsed = typeof value === "string" && value.startsWith("{")
                    ? JSON.parse(value)
                    : null;
                if (parsed) {
                    const state = editor.parseEditorState(parsed);
                    editor.setEditorState(state);
                } else {
                    editor.update(() => {
                        const root = $getRoot();
                        root.clear();
                        const p = $createParagraphNode();
                        p.append($createTextNode(value));
                        root.append(p);
                    });
                }
            } catch (e) {
                console.error("Error setting initial editor state:", e);
            }
        }
    }), [value]);

    const handleChange = useCallback(
        (editorState) => {
            editorState.read(() => {
                const json = editorState.toJSON();
                onChange?.(JSON.stringify(json));
            });
        },
        [onChange]
    );

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <LexicalComposer initialConfig={initialConfig}>
                <div style={{ border: "1px solid #e5e7eb", overflow: "visible", background: "#fff", borderRadius: "8px" }}>
                    <Toolbar fileInputRef={fileInputRef} />
                    <div style={{ position: "relative" }}>
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable style={{
                                    minHeight: 320, padding: "14px 16px", outline: "none",
                                    lineHeight: 1.75, fontSize: 15, color: "#1e293b",
                                }} />
                            }
                            placeholder={
                                <div style={{
                                    position: "absolute", top: 14, left: 16,
                                    color: "#9ca3af", pointerEvents: "none", fontSize: 15,
                                }}>Start writing…</div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <LinkTooltip />
                    </div>
                </div>
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <ImagePlugin />
                <OnChangePlugin onChange={handleChange} />
            </LexicalComposer>
        </>
    );
}
