import { Box, Container } from "@mui/system";
import ListOfMatches from "../../../components/ListOfMatches";
import ListOfTeams from "../../../components/ListOfTeams";
import ProblematicTeams from "../../../components/ProblematicTeams";
import TeamsPaired from "../../../components/TeamsPaired";
import UndoIcon from "@mui/icons-material/Undo";
import ForwardIcon from "@mui/icons-material/Forward";
import {
  setMatchesList,
  setTeamsList,
} from "../../../slices/match/selectedMatchSlice";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import styles from "../../../../styles/MatchNotPaired.module.css"
import styles from "../../../../styles/MatchNoPaired.module.css";
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

import {
  // CheckBoxOutlineBlankOutlined,
  // DraftsOutlined,
  // HomeOutlined,
  // InboxOutlined,
  // MailOutline,
  // ReceiptOutlined,
  Fingerprint,
} from "@mui/icons-material";

import config from "../../../../config.json";
// import ForwardIcon from '@material-ui/icons/Forward';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";



export async function getServerSideProps() {
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
      {/* <Drawer
        // variant="permanent"
        open={openDraw}
        anchor={"left"}
        onClose={() => setOpenDraw(false)}
      >
        {getList()}
      </Drawer> */}
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
