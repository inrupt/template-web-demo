import {
  useEffect,
  useState,
} from "react";

import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
} from "@inrupt/solid-client";

export default function Home() {
  const [data, setData] = useState(null);

  const datasetUrl = "https://solid-ui-react.docs.inrupt.com/example.ttl";
  const thingUrl = "https://solid-ui-react.docs.inrupt.com/example.ttl#me";
  const property = "http://xmlns.com/foaf/0.1/name";

  // Example loading external data using solid-client
  useEffect(() => {
    getSolidDataset(datasetUrl).then(dataset => {
      const thing = getThing(dataset, thingUrl);
      const value = getStringNoLocale(thing, property);
      setData(value);
    });
  });

  return (
    <>
      <h1>Inrupt Demo</h1>

      <h2>Reading from a dataset using solid-client:</h2>

      <p>
        { data ? data : "Loading..." }
      </p>
    </>
  );
}
