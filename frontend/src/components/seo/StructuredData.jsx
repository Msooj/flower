import React from 'react';
import { Helmet } from 'react-helmet-async';

/** Renders one or more JSON-LD blocks for rich results in Google */
const StructuredData = ({ data }) => {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <Helmet>
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
