import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top of the page on every route change.
 *
 * Drop this component inside the <Router> (anywhere below it in the tree)
 * and every <Link> / useNavigate() / <a href="/..."> navigation will
 * land the user at scroll position 0 — including browser back / forward.
 *
 * Design notes
 *  - Only the `pathname` is observed, so query-string or hash changes
 *    do NOT trigger a scroll jump. This lets in-page hash anchors and
 *    URL state (?foo=bar) behave naturally.
 *  - CSS `scroll-behavior: smooth` is honoured on in-page anchor links
 *    (the project's index.css sets it on `html`). For the route-change
 *    reset we want an instant jump — feels more responsive than a
 *    long smooth-scroll from the previous page. We temporarily disable
 *    the CSS smooth behaviour for the duration of the reset, then put
 *    it back exactly as it was. Net result: anchors stay smooth, page
 *    changes snap to top.
 *  - Respects `prefers-reduced-motion`: those users get an instant
 *    jump with no smoothing at all, in addition to the snap.
 *  - Renders nothing.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;

    // Route change to an in-page anchor (e.g. "/#services"): land on it.
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      const jump = () => {
        html.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        html.style.scrollBehavior = prevScrollBehavior;
      };
      jump();
      const raf = requestAnimationFrame(jump);
      const timers = [300, 800].map((ms) => setTimeout(jump, ms));
      return () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
        html.style.scrollBehavior = prevScrollBehavior;
      };
    }

    // Honour reduced-motion: jump instantly without any easing.
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      html.style.scrollBehavior = "auto";
    }

    // Scroll both the window and the documentElement to be safe —
    // some browsers track one or the other depending on doctype / quirks.
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "auto" });
    if (html) html.scrollTop = 0;

    // Restore the previous scroll-behavior (usually the CSS default,
    // which is `smooth` because index.css sets `html { scroll-behavior: smooth }`).
    html.style.scrollBehavior = prevScrollBehavior;

    return () => {
      // Cleanup: if the route changes again before this effect's next
      // run, make sure we don't leave the document in `auto` mode.
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, [pathname]);

  return null;
}
