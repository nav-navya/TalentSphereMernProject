import { useParams } from "react-router-dom";
import BidForm from "./BidForm"; 

const BidFormWrapper: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  console.log("heyyyy",projectId)

  if (!projectId) return <p>Project ID is missing.</p>;

  return <BidForm projectId={projectId} />;
};

export default BidFormWrapper;
