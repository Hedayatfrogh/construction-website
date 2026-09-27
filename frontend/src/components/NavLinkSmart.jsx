import { NavLink } from "react-router-dom";

/**
 * NavLinkSmart
 * -----------
 * A drop-in replacement for React Router's <NavLink> that fixes a
 * small UX gap: clicking the link for the page you're ALREADY on
 * would otherwise be a no-op (the URL doesn't change, so React
 * Router does nothing, and the page stays wherever it was scrolled
 * to). This wrapper makes that same-page click smooth-scroll to the
 * top instead, while leaving every other behaviour identical to a
 * normal <NavLink>:
 *
 *   - `className` may be a string OR a callback of signature
 *     `({ isActive, isPending, isTransitioning }) => string`.
 *   - Active links receive `aria-current="page"` exactly like <NavLink>.
 *   - `end`, `replace`, `state`, `to`, `target`, `rel`, etc. all work.
 *
 * Behavior
 *   - If `to` matches the current path, the click is intercepted and
 *     a smooth scroll-to-top is performed instead of a no-op
 *     navigation.
 *   - If `to` is a DIFFERENT path, fall through to React Router's
 *     normal <NavLink> behavior. The global <ScrollToTop /> in
 *     App.jsx will land the new page at scrollY=0.
 *   - Pure `#hash` anchor links and external URLs are passed through
 *     untouched so in-page anchors and "open in new tab" still work.
 *   - Respects `prefers-reduced-motion`: those users get an instant
 *     jump instead of a smooth animation.
 *   - Cmd/Ctrl/Meta/Shift/middle-clicks are NOT intercepted.
 */
export default function NavLinkSmart(props) {
  const {
    to,
    children,
    onClick,
    className,
    end,
    target,
    rel,
    replace,
    state,
    ...rest
  } = props;

  // We compare against the underlying href that <NavLink> will render
  // by reading the path from `to`. Hash-only links (#section) are
  // passed through so the browser can jump to them naturally.
  const targetPath =
    typeof to === "string"
      ? to.split("?")[0].split("#")[0]
      : (to && to.pathname) || "";
  const isHashOnly = typeof to === "string" && to.startsWith("#");

  const handleClick = (e) => {
    // Let the user open the link in a new tab/window normally.
    if (
      e.defaultPrevented ||
      e.button !== 0 || // not a primary click
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      if (typeof onClick === "function") onClick(e);
      return;
    }

    // Let the caller run any custom onClick first.
    if (typeof onClick === "function") {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    // No-op intercept for same-page clicks only (and not for hash links).
    if (!isHashOnly && targetPath && isOnPage(e.currentTarget)) {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <NavLink
      to={to}
      end={end}
      replace={replace}
      state={state}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </NavLink>
  );
}

// Inspect the underlying <a> element's resolved URL to decide whether
// the click would be a same-page no-op. React Router sets the href
// to the resolved URL, so this works for absolute paths AND the `/`
// home link (where pathname comparison alone is enough — see below).
function isOnPage(anchor) {
  if (!anchor || !anchor.getAttribute) return false;
  const href = anchor.getAttribute("href");
  if (!href) return false;
  // React Router produces absolute hrefs like "/about" or "/".
  // Compare to the current location's pathname to decide.
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === window.location.pathname;
  } catch {
    return false;
  }
}

function scrollToTop() {
  if (typeof window === "undefined") return;
  const reduceMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });

  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
}
