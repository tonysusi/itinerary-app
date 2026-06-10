import { linkifyText } from "@/lib/linkify";

const linkClassName =
  "font-medium text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900";

export default function LinkedText({ text, className = "" }) {
  const segments = linkifyText(text);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={index}>{segment.value}</span>;
        }

        return (
          <a
            key={index}
            href={segment.href}
            className={linkClassName}
            target={segment.type === "address" ? "_blank" : undefined}
            rel={segment.type === "address" ? "noopener noreferrer" : undefined}
            aria-label={segment.label}
          >
            {segment.raw ?? segment.value}
          </a>
        );
      })}
    </span>
  );
}
