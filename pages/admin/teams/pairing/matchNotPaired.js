import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import styles from "../../../../styles/Desc.module.css";
import ListOfMatches from "../../../components/ListOfMatches";
import TeamsPaired from "../../../components/TeamsPaired";
import ProblematicTeams from "../../../components/ProblematicTeams";
import {
  setMatchesList,
  setTeamsList,
  setStdT1,
  setStdT2,
  setProblematicIdx,
  addProblematicList,
  setProblematicList,
} from "../../../slices/match/selectedMatchSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import config from "../../../../config.json";

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

const MatchNotPaired = () => {
  const [selTeamIdx, setSelTeamIdx] = useState(-1);
  const [selMatchIdx, setSelMatchIdx] = useState(-1);
  const [matchAccordion, setMatchAccordion] = useState([]);
  const [localTeamsList, setlocalTeamsList] = useState([]);

  const dispatch = useDispatch();
  const { matchT1, matchT2, stdT1, stdT2, matchesList } = useSelector(
    (state) => state.selectedMatchReducer
  );

  const handleListItemClick = (event, index, team, std1, std2) => {
    console.log(event.target);
    // console.log(event.target.value);
    // console.log(event.target.title);

    console.log(std1);
    console.log(std2);


    console.log("handleListItemClick" + index + " " + team);
   
  };

  const genListOfTeams = (team, i) => {
    console.log("genListOfTeams");
    return (
      <ListItem disablePadding key={i} selected={selTeamIdx === i}>
        <ListItemButton
          value={stdT1}
          title={stdT2}
          onClick={(event) => handleListItemClick(event, i, team, {stdT1}, {stdT2})}
        >
          <ListItemText primary={team} />
        </ListItemButton>
      </ListItem>
    );
  };

  const initFunc = () => {
    console.log("config", config);

    const localmatchAccordion = [];
    const localProblematicList = [];
    for (let i = 0; i < matcharray.length; i++) {
      let m = matcharray[i];
      if (m.d1 > config.team_distance || m.d2 > config.team_distance) {
        localProblematicList.push(m);
      }
      localmatchAccordion.push(
        <ListOfMatches key={i} idx={i} id={m.matchId} match={m} />
      );
    }
    setMatchAccordion(localmatchAccordion);

    dispatch(setProblematicList(localProblematicList));

    let localTeams = [];
    for (let i = 0; i < listOfTeams.length; i++) {
      localTeams.push(genListOfTeams(listOfTeams[i], i));
    }
    setlocalTeamsList(localTeams);

    //global set list value
    dispatch(setMatchesList(matcharray));
    dispatch(setTeamsList(listOfTeams));
  };

  useEffect(() => {
    console.log("useEffect@listOfMatches");
    document.title = `You clicked many times`;
    initFunc();
  }, []);

  useEffect(() => {
    document.title = `AAAAAAAAAA`;
    console.log("useEffect 2", matchT1, matchT2, stdT1, stdT2);
  }, [stdT1, stdT2]);

  return (
    <Box sx={{ display: "block", color: "primary.main" }}>
      <div className={styles.teamsPair}>
        <TeamsPaired
          header="Paired Teams"
          matchT1={matchT1}
          matchT2={matchT2}
          stdT1={stdT1}
          stdT2={stdT2}
        />

        {/* <ProblematicTeams
          header="Problematic Teams a"
          problist={problematicList}
        /> */}
      </div>
      <div className={styles.listsBox}>
        <div className={styles.listOfMatches}>{matchAccordion}</div>
        <div className={styles.listOfTeams}>
          <List sx={{ bgcolor: "background.paper" }}> {localTeamsList} </List>
        </div>
      </div>
    </Box>
  );
};

export default MatchNotPaired;
