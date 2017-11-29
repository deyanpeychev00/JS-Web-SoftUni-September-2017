async function getCatalog() {
  const res = await fetch('https://baas.kinvey.com/appdata/kid_HJ2sgDXeM/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Kinvey 0ceb0005-c7c7-43cc-bb58-ca65ed1f737a.c/Nmndb374P52RaI8cD3oGFmtz6RKY0mbmubhqa0uV0='
    }
  });
  return await res.json();
}

export {
  getCatalog
};
