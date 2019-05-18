const URL = process.env.URL;

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

