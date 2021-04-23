const BASE_URL = 'http://172.17.20.80:3333';
export default {
    get: async (url: string) => {
        return fetch(BASE_URL + url, {method: 'GET'})
            .then(resp => resp.json())
            .then(data => data)
            .catch(err => { throw err });
    }
}
// json-server ./src/services/server.json --host 172.17.20.80 --port 3333 --delay 700
