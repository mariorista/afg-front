import { useRouter } from "next/router";

const UnfoundComp = () => {
  const router = useRouter();
  const { unfound } = router.query;
  return <div>UnfoundComp: {unfound}</div>;
};

export default UnfoundComp;
