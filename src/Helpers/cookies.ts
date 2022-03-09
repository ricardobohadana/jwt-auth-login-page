export function setCookie(
  cookieName: string,
  cookieValue: string,
  expirationTimeDelta: number
): void {
  const d = new Date();
  d.setTime(d.getTime() + expirationTimeDelta * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function getCookie(cookieName: string): string {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie(cookieName: string): boolean {
  let cookieValue = getCookie(cookieName);
  if (cookieValue != "") return true;

  return false;
}

export function deleteCookie(cookieName: string): void {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
