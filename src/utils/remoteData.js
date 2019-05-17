const URL = 'https://m9eofotl0j.execute-api.us-west-2.amazonaws.com/default/diet';

const remoteData = (type, payload, Authorization = '') =>
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({
      type,
      ...payload
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  })
  .then(response => response.json());

export default remoteData;

