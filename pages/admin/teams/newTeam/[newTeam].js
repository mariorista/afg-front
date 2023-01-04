import { useRouter } from "next/router";

const NewTeamAfterWeeks = () => {
  const router = useRouter();
  const { newTeam } = router.query;
  return <div>NewTeamAfterWeeks: {newTeam}</div>;
};

export default NewTeamAfterWeeks;
