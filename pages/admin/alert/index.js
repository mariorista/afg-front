import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";

// import { useDemoData } from "@mui/x-data-grid-generator";

// export async function getServerSideProps() {
//   // Fetching data
//   const res = await fetch("http://localhost:8080/alerts/all");
//   const alerts = await res.json();
//   return {
//     props: { alerts },
//   };
// }
const Types = {
  MISSING_CLASS_OBJ: "MISSING_CLASS_OBJ",
  SHOULD_BE_PAIRED_MATCHES: "SHOULD_BE_PAIRED_MATCHES",
  NON_PAIR_MATCH: "NON_PAIR_MATCH",
  NON_HANDLED_TRANSITORY: "NON_HANDLED_TRANSITORY",
  NEW_TEAMS_AFTER_WEEKS: "NEW_TEAMS_AFTER_WEEKS",
  UNFOUND_COMPETITION: "UNFOUND_COMPETITION",
  USER_ACTION: "USER_ACTION",
};
const AlertPage = ({ alerts }) => {
  // const AlertPage = () => {
  alerts = !!alerts ? alerts : [];
  // console.log("--------", alerts);
  const router = useRouter();

  //TODO create another reducer... maybe??? or no keep the same
  // useEffect(() => {
  //TODO dispatch and store the alerts list to reducer.? (why just get it from the back if you came bact to alerts page)
  //create a list of alerts for the datagrid (to be shown) +
  // maybe onClick show all the alerts data on a descriptor
  // dispatch(setAlerts(alerts));
  // }, [alerts]);

  // TODO on double click

  const columns = [
    // { field: "nr", headerName: "nr" },
    {
      field: "type",
      headerName: "Type",
      width: 250,
      editable: true,
    },
    {
      field: "severity",
      headerName: "Severity",
      // width: 50,
      editable: true,
    },
    {
      field: "solved",
      headerName: "Tsolved",
      // width: 50,
      editable: true,
    },
  ];

  let rows = [
    {
      id: 1,
      nr: 1,
      type: Types.MISSING_CLASS_OBJ,
      severity: 1,
      solved: false,
    },
    {
      id: 2,
      nr: 2,
      type: Types.NEW_TEAMS_AFTER_WEEKS,
      severity: 3,
      solved: false,
    },
    {
      id: 3,
      nr: 3,
      type: Types.NON_HANDLED_TRANSITORY,
      severity: 1,
      solved: false,
    },
    { id: 4, nr: 4, type: Types.NON_PAIR_MATCH, severity: 3, solved: false },
    {
      id: 5,
      nr: 2,
      type: Types.SHOULD_BE_PAIRED_MATCHES,
      severity: 3,
      solved: false,
    },
    {
      id: 6,
      nr: 2,
      type: Types.UNFOUND_COMPETITION,
      severity: 3,
      solved: false,
    },
  ];

  rows = alerts.length != 0 ? alerts : rows;

  const bar = (e) => {
    console.log("bar ", e.row);
  };
  const openAlert = (e) => {
    console.log("dubleClick: ", e.id);
    console.log("dubleClick: ", e.row.type);

    switch (e.row.type) {
      case Types.MISSING_CLASS_OBJ:
        router.push(`/admin/comp/missing/classObj/${e.id}`);
        break;
      case Types.NEW_TEAMS_AFTER_WEEKS:
        router.push(`/admin/teams/newTeam/${e.id}`);
        break;
      case Types.NON_HANDLED_TRANSITORY:
        router.push(`/admin/transitory/nonHandled/${e.id}`);
        break;
      case Types.NON_PAIR_MATCH:
        router.push(`/admin/teams/pairing/matchNotPaired/${e.id}`);
        break;
      case Types.SHOULD_BE_PAIRED_MATCHES:
        router.push(`/admin/teams/shouldBePaeired/${e.id}`);
        break;

      case Types.UNFOUND_COMPETITION:
        router.push(`/admin/comp/unfound/${e.id}`);
        break;

        case Types.USER_ACTION:
          router.push(`/admin/user/userAction/${e.id}`);
          break;
    }
    // router.push(`/admin/teams/pairing/${e.id}`);
    // router.push(`/admin/alert/${e.id}`);
    //TODO open respective alert page depending on the selected alert

    // i.e. matchNotPaired /// (how to do this: pass route param of alertId and the apropriate api shpuld return the correct alert with all its data)
  };

  return (
    <div>
      <Box sx={{ height: 450, width: "50%", backgroundColor: "InfoText" }}>
        <DataGrid
          onRowClick={(e) => bar(e)}
          onRowDoubleClick={(e) => openAlert(e)}
          columns={columns}
          rows={rows}
        />
      </Box>
    </div>
  );
};

export default AlertPage;
