import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import Descriptor from "./Descriptor";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { setSelMatch } from "../slices/match/selectedMatchSlice";

import styles from "../../styles/Accordeon.module.css";
import config from "../../config.json";

const ListOfMatches = () => {
  const { matchesList, selMatchIndex } = useSelector(
    (state) => state.selectedMatchReducer
  );
  const dispatch = useDispatch();

  const [rendMatchAccordion, setRendMatchAccordion] = useState([]);

  const selectPairs = (idx, match) => {
    dispatch(setSelMatch({ selMatch: match, selMatchIndex: idx }));
  };

  const renderFunction = () => {
    let _rendMatchAccordion = matchesList.map((match, idx) => {
      // const idx = match.matchId;
      const t1color = match.d1 > config.team_distance ? "red" : "";
      const t2color = match.d2 > config.team_distance ? "red" : "";
      const nett1 = !!match.t1 ? match.t1 : match.netT1;
      const nett2 = !!match.t2 ? match.t2 : match.netT2;
      return (
        <Accordion disableGutters className={styles.accordeon} key={idx}>
          <AccordionSummary
            sx={{
              backgroundColor: selMatchIndex === idx ? "RoyalBlue" : "",
            }}
            onClick={() => selectPairs(idx, match)}
          >
            <Typography key={match.matchId}>
              <span style={{ color: t1color }}>{nett1}</span> -{" "}
              <span style={{ color: t2color }}>{nett2}</span>{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Descriptor width={400} title="mario" data={match} />
          </AccordionDetails>
        </Accordion>
      );
    });

    setRendMatchAccordion(_rendMatchAccordion);
  };

  useEffect(() => {
    console.log("useEffect@listOfMatches");
    renderFunction();
  }, [matchesList, selMatchIndex]);

  return <div className={styles.matchesComp}>{rendMatchAccordion}</div>;
};

export default ListOfMatches;
