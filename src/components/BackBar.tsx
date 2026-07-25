/**
 * Shared back bar for pages linked from todd.sh. The geometry and type are the
 * same everywhere — 36px tall, 11px uppercase at .14em — and only the three
 * colours are tuned to the page it sits on.
 *
 * Fixed rather than sticky here, because this app's own header is fixed too.
 * That header sits at top-9 to clear this one, and the content offsets in
 * page.tsx account for both.
 */
export default function BackBar() {
  return (
    <a
      href="https://www.todd.sh"
      className="fixed top-0 left-0 right-0 z-[60] flex h-9 items-center gap-2 border-b border-gray-800 bg-gray-950 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 no-underline transition-colors hover:text-white"
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        &larr;
      </span>
      todd.sh
    </a>
  );
}
