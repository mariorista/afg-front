import { useRouter } from "next/router";

const TransitoryNonHandled = () => {
  const router = useRouter();
  const { nonHandled } = router.query;
  return <div>TransitoryNonHandled: {nonHandled}</div>;
};

export default TransitoryNonHandled;
