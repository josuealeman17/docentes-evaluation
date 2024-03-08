async function fetchApiResponse(url, method, data) {
  let params = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token') || '',
    },
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  const response = await fetch(url, params);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  } else {
    const data = await response.json();
    return data;
  }
}

export { fetchApiResponse };
