import { useRouter } from "next/router";

const SomeAlert = () => {
  const router = useRouter();
  const { someAlert } = router.query;
  return <div>SomeAlert: {someAlert}</div>;
};

export default SomeAlert;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   // Fetching data
//   const res = await fetch(`http://localhost:8080/alerts//${id}`);
//   const listOfTeams = await res.json();

//   // const res2 = await fetch("http://localhost:8080/match/matches");
//   // const matcharray = await res2.json();

//   // Passing data to the Product Page using props
//   return {
//     props: { listOfTeams },
//   };
// }
