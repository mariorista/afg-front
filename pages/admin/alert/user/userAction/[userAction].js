import { useRouter } from "next/router";

const UserAction = () => {
  const router = useRouter();
  const { userAction } = router.query;
  return <div>UserAction: {userAction}</div>;
};

export default UserAction;