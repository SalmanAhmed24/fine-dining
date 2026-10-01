/** Splits text into per-character spans for animation. Screen readers get the
 *  plain string via the parent's aria-label. */
export default function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`split ${className}`} aria-hidden="true">
      {Array.from(text).map((c, i) => (
        <span key={i} className="split-mask">
          <span className="split-char">{c === " " ? "\u00A0" : c}</span>
        </span>
      ))}
    </span>
  );
}
