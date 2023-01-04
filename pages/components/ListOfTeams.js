import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSelTeam } from "../slices/match/selectedMatchSlice";
import styles from "../../styles/Accordeon.module.css";
import { cloneDeep } from "lodash";


const ListOfTeams = () => {
  const { teamsList } = useSelector((state) => state.selectedMatchReducer);
  const dispatch = useDispatch();
  const [rendList, setRendList] = useState([]);

  const teamClickHandle = (event, team, idx) => {
    // console.log("teamClickHandle ", event);
    console.log("teamClickHandle ", team, " ",idx);
    // const nteam =new String(team);
    //  cloneDeep(team);
    // console.log("teamClickHandle ", nteam, " ",idx);
    dispatch(setSelTeam({ selTeam:  team, selTeamIdx: idx }));
  };

  useEffect(() => {
    console.log("useeffect @ teamslist");
    let _rendList = teamsList.map((team, idx) => {
      return (
        <ListItem disablePadding key={idx}>
          <ListItemButton
            onClick={(event) => teamClickHandle(event, team, idx)}
          >
            <ListItemText primary={team} />
          </ListItemButton>
        </ListItem>
      );
    });

    setRendList(_rendList);
    // return () => {
    //   // second;
    // };
  }, [teamsList]);

  return (
    <div className={styles.teamsComp}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        aria-label="contacts"
      >
        {rendList}
      </List>
    </div>
  );
};

export default ListOfTeams;
