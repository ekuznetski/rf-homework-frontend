const apiUrl = 'http://localhost:3456/';

function request(url, method = 'GET') {
  return (params = null) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          apiUrl + url,
          method !== 'GET'
            ? {
                method,
                body: params,
              }
            : {}
        );
        const result = await response.json();
        resolve(result);
      } catch (e) {
        console.log(e); // TODO handle error
        reject(e);
      }
    });
}

export const getTestSuitsRequest = request('test_suites');
export const addTestSuitsRequest = request('test_suites', 'POST');
