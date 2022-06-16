const CLIENT_NAME = 'Inrupt Demo';

function buildAppProfile(hostname, clientId) {
  return {
    '@context': 'https://www.w3.org/ns/solid/oidc-context.jsonld',
    client_id: clientId,
    redirect_uris: [hostname, hostname.concat('login')],
    client_name: CLIENT_NAME,
  };
}

export default function handler(req, res) {
  const clientId = `http://${req.headers.host}/api/app`;
  const hostname = `http://${req.headers.host}/`;
  res.status(200).json(buildAppProfile(hostname, clientId));
}
