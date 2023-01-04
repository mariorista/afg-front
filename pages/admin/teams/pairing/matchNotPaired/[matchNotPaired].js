import { Box, Container } from "@mui/system";

import {
  // CheckBoxOutlineBlankOutlined,
  // DraftsOutlined,
  // HomeOutlined,
  // InboxOutlined,
  // MailOutline,
  // ReceiptOutlined,
  Fingerprint,
} from "@mui/icons-material";
import UndoIcon from "@mui/icons-material/Undo";
import ForwardIcon from "@mui/icons-material/Forward";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Divider,
  Drawer,
  Switch,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
// import styles from "../../../../../styles/Desc.module.css";
import styles from "../../../../../styles/MatchNoPaired.module.css";
import ListOfMatches from "../../../../components/ListOfMatches";
import TeamsPaired from "../../../../components/TeamsPaired";
import ProblematicTeams from "../../../../components/ProblematicTeams";

import ListOfTeams from "../../../../components/ListOfTeams"

import axios from "axios";
import {
  setMatchesList,
  setTeamsList,
  setStdT1,
  setStdT2,
  setProblematicIdx,
  addProblematicList,
  setProblematicList,
} from "../../../../slices/match/selectedMatchSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import config from "../../../../../config.json";

const matcharray = [
  {
    t1: "team 5",
    matchId: "1234571",
    d1: 4.321,
    d2: 1.321,
    t2: "team 6",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
    dbT1: "team 5",
  },
  {
    t1: "team 1",
    matchId: "1234572",
    d1: 4.321,
    d2: 4.321,
    t2: "team 2",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    t1: "team 3",
    matchId: "1234573",
    d1: 4.321,
    d2: 4.321,
    t2: "team 4",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    t1: "team 7",
    matchId: "1234574",
    d1: 4.321,
    d2: 4.321,
    t2: "team 8",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    t1: "team 9",
    matchId: "1234575",
    d1: 1.321,
    d2: 1.321,
    t2: "team 10",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    t1: "team 11",
    matchId: "1234576",
    d1: 1.321,
    d2: 1.321,
    t2: "team 12",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    t1: "team 13",
    matchId: "1234577",
    d1: 4.321,
    d2: 2.321,
    t2: "team 14",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },

  {
    netT1: "team 9",
    dbT1: "team 9",
    matchId: "1234578",
    d1: 4.321,
    d2: 4.321,
    netT2: "team 10",
    dbT2: "team 10",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    netT1: "team 11",
    dbT1: "team 11",
    matchId: "1234579",
    d1: 1.321,
    d2: 4.321,
    netT2: "team 12",
    dbT2: "team 12",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
  {
    netT1: "team 13",
    dbT1: "team 13",
    matchId: "1234597",
    d1: 4.321,
    d2: 4.321,
    netT2: "team 14",
    dbT2: "team 14",
    comp: "Premier LEague",
    ctry: "Country Literal",
    compId: "12344",
    ctryId: "123",
    ht1: "1",
    ht2: "2",
    ft1: "3",
    ft2: "2",
  },
];

const listOfTeams = [
  "team 1",
  "team 2",
  "team 3",
  "team 4",
  "team 5",
  "team 7",
  "team 8",
  "team 9",
  "team 0",
  "team 10",
  "team 11",
  "team 12",
  "team 13",
  "team 14",
];

export async function getServerSideProps() {
  // const router = useRouter();
  // const { shouldBePaired } = router.query;

  // Fetching data
  const res = await fetch("http://localhost:8080/match/list");
  const listOfTeams = await res.json();

  const res2 = await fetch("http://localhost:8080/match/matches");
  const matcharray = await res2.json();

  // Passing data to the Product Page using props
  return {
    props: { listOfTeams, matcharray },
  };
}

export async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  // return response.json(); // parses JSON response into native JavaScript objects
}

async function axiosPost(url = "", data = {}, conf = {}) {
  axios
    .post(url, data, conf)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

const TeamNotPaired = ({ listOfTeams, matcharray }) => {
  const { matchesList, selMatchIndex } = useSelector(
    (state) => state.selectedMatchReducer
  );

  // const router = useRouter();
  // const { shouldBePaired } = router.query;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setMatchesList(matcharray));
    dispatch(setTeamsList(listOfTeams));
  }, [matcharray]);

  const [disable, setDisable] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDraw, setOpenDraw] = useState(false);

  // async function getMatches() {
  //   console.log("getMatches");
  //   const res = await fetch("http://localhost:8080/match/matches");
  //   matcharray = await res.json();
  //   return matcharray;
  // }

  const refresh = () => {
    console.log("refresh");
    router.replace(router.asPath);
  };

  const handleChange = (e) => {
    setDisable((disable) => !disable);
  };

  const revertAll = (e) => {
    console.log("revertAll");
    refresh();
  };
  const confirmAll = (e) => {
    console.log("confirmAll");
    matchesList.map((m) => {
      let t1 = !!m.netT1 ? m.netT1 : m.t1;
      let t2 = !!m.netT2 ? m.netT2 : m.t2;
      if (m.d1 > config.team_distance || m.d2 > config.team_distance) {
        setOpenAlert(true);
        console.log("match not paired:", t1, "-", t2);
        return;
      }
    });

    let pairedMatches = [];
    matchesList.map((m) => {
      let m2 = { ...m };
      if (m2.hasOwnProperty("probIdx")) {
        delete m2.probIdx;
      }
      pairedMatches.push(m2);
    });
    console.log(pairedMatches);

    axiosPost("http://localhost:8080/match/paired", {
      pairedList: pairedMatches,
    });

    // postData("http://localhost:8080/match/paired", {
    //   pairedList: pairedMatches,
    // }).then((data) => {
    //   console.log(data); // JSON data parsed by `data.json()` call
    // });

    // fetch("http://localhost:8080/match/paired", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(pairedMatches),
    // });
    // const content = await rawResponse.json();

    // console.log(content);
  };

  const getList = () => (
    <div
      style={{
        width: 250 /*  backgroundColor:"white" */,
      }} /* onClick={() => setOpenDraw(false)} */
    >
      <List bgcolor="lightgray">
        {matchesList.map((m, index) => (
          <ListItem button key={index}>
            <ListItemText
              primary={
                <div padding="0.3em" /*  bgcolor={"whitesmoke"} */>
                  {!!m.netT1 ? m.netT1 : m.t1} - {!!m.dbT1 ? m.dbT1 : m.db1}
                  {/* <Divider orientation="horizontal"/> */}
                  <hr />
                  {!!m.netT2 ? m.netT2 : m.t2} - {!!m.dbT2 ? m.dbT2 : m.db2}
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
      //{" "}
    </div>
  );

  // const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className={styles.basic}>
      <Collapse in={openAlert}>
        <Alert
          // open={openAlert}
          variant="filled"
          severity="error"
          onClose={() => {
            console.log("closeee");
            setOpenAlert(false);
          }}
        >
          <AlertTitle>Remaining Unpaired Matches</AlertTitle>
        </Alert>
      </Collapse>
      {/* <Suspense fallback={`Loading...`}> */}
      <Drawer
        // variant="permanent"
        open={openDraw}
        anchor={"left"}
        onClose={() => setOpenDraw(false)}
      >
        {getList()}
      </Drawer>
      {/* </Suspense> */}
      {/* {print()} */}
      <Container>
        <Box>
          <div style={{ marginBottom: "2em" }}>
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              onClick={() => setOpenDraw(true)}
            >
              <Fingerprint />
            </IconButton>
            <span> &nbsp; </span>
            <Button
              onClick={revertAll}
              disabled={!disable}
              variant="contained"
              startIcon={<UndoIcon />}
            >
              Revert All
            </Button>
            {/* <span> &nbsp; </span> */}
            <Switch checked={disable} onChange={handleChange} />
            <Button
              onClick={confirmAll}
              disabled={!disable}
              variant="contained"
              startIcon={<ForwardIcon />}
            >
              Confirm All
            </Button>
          </div>
          <TeamsPaired />
          <ProblematicTeams />
          <div className={styles.matchTeam}>
            <ListOfMatches /* list={matcharray} */ />
            <Divider orientation="vertical"></Divider>
            <ListOfTeams /* list={listOfTeams}  */ />
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default TeamNotPaired;
