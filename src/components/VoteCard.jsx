import { patchVotesByArticleId } from "../utils/api";
import { useState } from "react";


export default function VoteCard({ votes, id }) {
  const [optimisticVotes, setOptimisticVotes] = useState(0);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  function handlePlusVote() {
    if (hasVoted) return;
    setHasVoted(true);
    setOptimisticVotes((currOptimisticVotes) => currOptimisticVotes + 1);
    setError(null);
    patchVotesByArticleId(id, { inc_votes: 1 }).catch(() => {
      setOptimisticVotes((currOptimisticVotes) => currOptimisticVotes - 1);
      setError("Sorry, your vote was not submitted. Please try again");
      setHasVoted(false);
    });
  }

  function handleMinusVote() {
    if (hasVoted) return;
    setHasVoted(true);
    setOptimisticVotes((currOptimisticVotes) => currOptimisticVotes - 1);
    setError(null);
    patchVotesByArticleId(id, { inc_votes: -1 }).catch(() => {
      setOptimisticVotes((currOptimisticVotes) => currOptimisticVotes + 1);
      setError("Sorry, your vote was not submitted. Please try again");
      setHasVoted(false);
    });
  }

  return (
    <div>
      <p>Total votes: {votes + optimisticVotes}</p>
      {error ? <p id="error-message">{error}</p> : null}
      <button onClick={handleMinusVote}>Vote -1</button>
      <button onClick={handlePlusVote}>Vote +1</button>
    </div>
  );
}
