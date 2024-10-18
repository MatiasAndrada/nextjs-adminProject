import fetchLastCommit from "@/data/github";

export default async function LastVersion() {
  const commitInfo = await fetchLastCommit();

  if (!commitInfo) {
    return (
      <div className="text-gray-500 dark:text-slate-300 text-sm opacity-60">
        <h4 className="w-36 text-balance">Error fetching data</h4>
        <p>Something went wrong</p>
      </div>
    );
  }

  const { author, date } = commitInfo;
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
