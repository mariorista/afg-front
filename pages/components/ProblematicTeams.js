import {
  Box,
  Typography,
  Grid,
  Container,
  CardHeader,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProblematicList,
  setSelMatch,
} from "../slices/match/selectedMatchSlice";

const ProblematicTeams = () => {
  const { problematicList, correctPairedList, selMatchIndex } = useSelector(
    (state) => state.selectedMatchReducer
  );
  const dispatch = useDispatch();
  const header = "problematic matches";
  const [localProblematic, setLocalProblematic] = useState([]);

  const foo = (m, idx) => {
    console.log("fooo", m, idx);

    dispatch(setSelMatch({selMatch:m, selMatchIndex:m.probIdx}));

    let localProblematic = [];
    if (idx < problematicList.length - 1) {
      localProblematic = problematicList.slice(0, idx).concat(problematicList.slice(idx+1 ));
    } else {
      localProblematic = problematicList.slice(0, -1);
    }
    dispatch(setProblematicList(localProblematic));
  };

  const localProblematicRender = () => {
    // let localProblematic = [];
    let localProblematic1 = problematicList.map((m, idx) => {
      const nett1 = !!m.t1 ? m.t1 : m.netT1;
      const nett2 = !!m.t2 ? m.t2 : m.netT2;
      return (
        // <div onClick={foo}>
        <Grid container spacing={2} key={idx} onClick={() => foo(m, idx)}>
          <Grid item xs={3}>
            <Typography>
              <small>netT1:</small> <strong> {nett1} </strong>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <small>netT2:</small> <strong> {nett2} </strong>
            </Typography>
          </Grid>
        </Grid>
        // </div>
      );
    });
    // console.log("localProblematic1", localProblematic1);
    setLocalProblematic(localProblematic1);
  };

  useEffect(() => {
    localProblematicRender();
  }, [problematicList]);

  return (
    <div>
      <Container maxWidth="sm">
        <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardHeader title={header} sx={{ background: "red" }}></CardHeader>
            <CardContent>{localProblematic}</CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default ProblematicTeams;
