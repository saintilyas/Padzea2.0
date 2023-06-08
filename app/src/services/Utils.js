const Utils = {
  /* получаем хэш страницы и записываем значения */
  parseRequestURL: () => {
    let url = location.hash.slice(1) || '/';
    let r = url.split("/");
    let request = {
        resource: null,
        id: null,
    };
    request.resource = r[1];
    request.id = r[2];

    return request
  },

  /* задержка */
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default Utils;