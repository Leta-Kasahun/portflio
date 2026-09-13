import React from "react";

type BlogContentProps = {
  content: string;
};

export function BlogContent({ content }: BlogContentProps) {
  const blocks = parseContentBlocks(content);

  return (
    <div className="space-y-4 text-left leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "heading2") {
          return (
            <h2
              key={index}
              className="mt-8 pt-4 first:mt-0 first:pt-0 text-xl sm:text-2xl font-extrabold text-white tracking-tight border-b border-[#22282B] pb-2"
            >
              {block.content}
            </h2>
          );
        }

        if (block.type === "heading3") {
          return (
            <h3
              key={index}
              className="mt-6 text-lg sm:text-xl font-bold text-[#3FC7B0] tracking-tight"
            >
              {block.content}
            </h3>
          );
        }

        if (block.type === "code") {
          return (
            <div
              key={index}
              className="my-5 overflow-hidden rounded-xl border border-[#22282B] bg-[#0E1113] shadow-xl"
            >
              {block.language ? (
                <div className="flex items-center justify-between border-b border-[#22282B] bg-[#121517] px-4 py-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#8A9295]">
                    {block.language}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#3FC7B0]" />
                </div>
              ) : null}
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#3FC7B0]">
                <code>{block.content}</code>
              </pre>
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="my-3 space-y-2 pl-5 list-disc text-xs sm:text-sm text-[#E7EAEA] font-mono">
              {block.items.map((item, iIdx) => (
                <li key={iIdx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "orderedList") {
          return (
            <ol key={index} className="my-3 space-y-2 pl-5 list-decimal text-xs sm:text-sm text-[#E7EAEA] font-mono">
              {block.items.map((item, iIdx) => (
                <li key={iIdx}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }

        return (
          <p
            key={index}
            className="font-mono text-xs sm:text-sm font-light leading-relaxed text-[#E7EAEA] tracking-wide"
          >
            {renderInline(block.content)}
          </p>
        );
      })}
    </div>
  );
}

type ContentBlock =
  | { type: "heading2"; content: string }
  | { type: "heading3"; content: string }
  | { type: "code"; content: string; language: string }
  | { type: "list"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "paragraph"; content: string };

function parseContentBlocks(raw: string): ContentBlock[] {
  const lines = raw.split("\n");
  const blocks: ContentBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      index++;
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index++;
      }
      blocks.push({
        type: "code",
        content: codeLines.join("\n"),
        language,
      });
      index++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({
        type: "heading3",
        content: line.slice(4).trim(),
      });
      index++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({
        type: "heading2",
        content: line.slice(3).trim(),
      });
      index++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (
        index < lines.length &&
        (lines[index].startsWith("- ") || lines[index].startsWith("* "))
      ) {
        listItems.push(lines[index].slice(2).trim());
        index++;
      }
      blocks.push({
        type: "list",
        items: listItems,
      });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        listItems.push(lines[index].replace(/^\d+\.\s+/, "").trim());
        index++;
      }
      blocks.push({
        type: "orderedList",
        items: listItems,
      });
      continue;
    }

    if (line.trim() === "") {
      index++;
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].startsWith("```") &&
      !lines[index].startsWith("## ") &&
      !lines[index].startsWith("### ") &&
      !lines[index].startsWith("- ") &&
      !lines[index].startsWith("* ") &&
      !/^\d+\.\s+/.test(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index++;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        content: paragraphLines.join(" "),
      });
    }
  }

  return blocks;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matchedStr = match[0];
    if (matchedStr.startsWith("`") && matchedStr.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="rounded border border-[#22282B] bg-[#0E1113] px-1.5 py-0.5 font-mono text-[11px] text-[#3FC7B0]"
        >
          {matchedStr.slice(1, -1)}
        </code>
      );
    } else if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {matchedStr.slice(2, -2)}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
