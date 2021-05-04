
export function parseUrl(url) {
  url = url || window.location.href;;
  url = window.decodeURIComponent(url);
  let urlParams = {};
  let hashs = url.split('?');
  hashs.forEach((params) => {
    let paramList = params.split('&');
    paramList.forEach((param) => {
      if (param.length) {
        let keys = param.split('=');
        urlParams[keys[0]] = keys[1];
      }
    });
  });
  return urlParams;
}