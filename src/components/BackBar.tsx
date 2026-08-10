/**
 * Shared back bar for pages linked from todd.sh. The geometry and type are the
 * same everywhere — 40px tall, 11px uppercase at .14em.
 *
 * Fixed rather than sticky here, because this app's own header is fixed too.
 * That header sits at top-10 to clear this one, and the content offsets in
 * page.tsx account for both.
 */
export default function BackBar() {
  return (
    <a
      href="https://www.todd.sh"
      className="fixed top-0 left-0 right-0 z-[60] flex h-10 items-center gap-2 border-b border-stone-200 bg-stone-50 px-5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-900 no-underline transition-colors hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-stone-900"
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        &larr;
      </span>
      todd.sh
    </a>
  );
}
