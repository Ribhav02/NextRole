import MatchColumns from "@/components/shared/MatchColumns";
import MatchSignals from "@/components/shared/MatchSignals";
import NextActionCard from "@/components/shared/NextActionCard";

// Explainable match: buckets + evidence + experience + next action. No percentages.
export default function MatchPanel({ match, perspective = "worker", hideEvidence = false }) {
  return (
    <div className="space-y-3">
      <MatchColumns match={match} />
      <MatchSignals match={match} hideEvidence={hideEvidence} />
      <NextActionCard action={match.nextAction} perspective={perspective} />
    </div>
  );
}