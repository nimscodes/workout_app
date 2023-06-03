import React from "react";
import { Box, Typography, Button, TextField, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPartList`,
        exerciseOptions
      );
      setBodyParts(['all', ...bodyPartsData]);
    } 

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search.length > 0) {
      const exerciseData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises`,
        exerciseOptions
      );

      const searchedExercises = exerciseData.filter((exercise) =>(
        exercise.name.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
        || exercise.equipment.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search)
      )

      );
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" mt="37px" p="20px">
      <Typography
        fontWeight={700}
        textAlign="center"
        mb="50px"
        sx={{
          fontSize: { xs: "30px", lg: "44px" },
        }}
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search for exercises"
          type="text"
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: {
              xs: "350px",
              lg: "800px",
            },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
        />
        <Button
          onClick={handleSearch}
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: {
              xs: "80px",
              lg: "175px",
            },
            fontSize: {
              xs: "14px",
              lg: "20px",
            },
            height: "56px",
            postion: "absolute",
            right: "0",
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{
         position: "relative",
         width: '100%',
         p: '20px',
      }}>
        <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} bodyParts />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
