"use client";
import { useEffect, useState } from "react";

async function fetchLastCommit() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/matiasandrada/nextjs-adminProject/commits/master"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.commit.author;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function LastVersion() {
  const [commitInfo, setCommitInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLastCommit()
      .then((data) => setCommitInfo(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return (
      <div className="text-gray-500 dark:text-slate-300 text-sm opacity-60">
        <h4 className="w-36 text-balance">Error fetching data</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!commitInfo) {
    return <div className="text-gray-500">Loading...</div>;
  }

  const { name: author, date } = commitInfo;
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="text-gray-500 dark:text-slate-300 text-sm opacity-60">
      <h4>Last update:</h4>
      <p>Author: {author}</p>
      <p>Date: {formattedDate}</p>
    </div>
  );
}

export default LastVersion;
