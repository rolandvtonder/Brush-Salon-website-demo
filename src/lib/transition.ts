/**
 * Page-to-page transition. Leaving: the three slabs cover the screen, then we
 * navigate. Arriving: if we came from one of our own links, the page starts
 * covered and the slabs wipe away. The flag lives in sessionStorage, which can
 * be unavailable (private mode), so every access is guarded.
 */
const KEY = 'brush:arrive';

export function markLeaving() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* no storage: the next page simply loads without the wipe */
  }
}

export function consumeArrival(): boolean {
  try {
    const v = sessionStorage.getItem(KEY) === '1';
    sessionStorage.removeItem(KEY);
    return v;
  } catch {
    return false;
  }
}
