import { useRouter } from "next/router";

const MissingClassObj = () => {
  const router = useRouter();
  const { classObj } = router.query;
  return (
    <div>MissingClassObj: {classObj}</div>
  );
};

export default MissingClassObj;
