import { useState, useEffect } from 'react';
import { useSession } from '@inrupt/solid-ui-react';
import {
  getPodUrlAll,
  getSolidDataset,
  solidDatasetAsMarkdown,
} from '@inrupt/solid-client';

export default function Page() {
  // solid-ui-react simplifies session management. We wrap the application in
  // a SessionProvider in _app.js, which allows components further down the
  // tree to access the session.

  const { session, sessionRequestInProgress } = useSession();
  const [podUrls, setPodUrls] = useState(null);
  const [pods, setPods] = useState({});

  useEffect(() => {
    // Only make a request if we have a logged-in session.
    if (!session.info.isLoggedIn) { return; }

    // Fetch all of the URLs associated with podUrls in the logged-in user's
    // WebId profile.

    getPodUrlAll(
      session.info.webId,
      { fetch: session.fetch },
    ).then(setPodUrls);
  }, [session.info.isLoggedIn]);

  // If we have a list of podUrls, we'll fetch the datasets for each to
  // display.
  useEffect(() => {
    if (!podUrls) { return; }

    // For each URL, fetch the pod dataset. Then, use solidDatasetAsMarkdown
    // to display its contents.
    podUrls.map(async (url) => {
      const pod = await getSolidDataset(url, { fetch: session.fetch });
      setPods({
        ...pods,
        [url]: solidDatasetAsMarkdown(pod),
      });
    });
  }, [podUrls]);

  if (!session.info.isLoggedIn && !sessionRequestInProgress) {
    return (
      <h1>Please log in first.</h1>
    );
  }

  if (sessionRequestInProgress || podUrls === null) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <>
      <h1>Pod Info</h1>

      <ul>
        {podUrls.map((podUrl) => (
          <li key={podUrl}>
            <span>
              {'URL: '}
              <a href={podUrl} target="_blank" rel="noreferrer">{podUrl}</a>
            </span>

            <pre>
              {pods[podUrl] || 'Loading...'}
            </pre>
          </li>
        ))}
      </ul>
    </>
  );
}
