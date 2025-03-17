// import { useParams } from "react-router-dom";
// import BidForm from "./BidForm"; 
// import BidList from "./BidList";

// const BidFormWrapper: React.FC = () => {
//   const { projectId } = useParams<{ projectId: string }>();
//   console.log("heyyyy",projectId)

//   if (!projectId) return <p>Project ID is missing.</p>;

//   return <BidForm projectId={projectId} />;
// };

// export default BidFormWrapper;



import { useParams } from "react-router-dom";
import BidForm from "./BidForm";
import BidList from "./BidList";

const BidFormWrapper: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) return <p>Project ID is missing.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <BidForm projectId={projectId} />
      <hr className="my-4" />
      <BidList projectId={projectId} />
    </div>
  );
};

export default BidFormWrapper;
