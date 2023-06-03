import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const exercisePerPage = 9;
  const [currentPage, setCurrentPage] = useState(1); 

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  useEffect(() => {
    const fetchExercises = async () => {

      if (bodyPart === "all") {
        const exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises`,
          exerciseOptions
        );
        setExercises(exerciseData);
        return;
      }
      else {
        const exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
        setExercises(exerciseData);
      }
    };
    fetchExercises();

  }, [bodyPart]);

  return (
    <Box
      id="exercises"
      sx={{
        mt: { lg: "110px" },
      }}
      mt="50px"
      p="20px"
    >
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Showing Results
      </Typography>
      <Stack direction='row' sx={{ gap: { lg: '110px', xs: '50px'}}} flexWrap='wrap' justifyContent='center'>
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index}  exercise={exercise}/>
        ))}
      </Stack>
      <Stack mt='100px' alignItems='center'>
          {exercises.length > exercisePerPage && 
          <Pagination 
          count={Math.ceil(exercises.length / exercisePerPage)}
          color="standard"
          shape="rounded"
          defaultPage={1}
          page={currentPage}
          onChange={paginate}
          size='large' />
          }
      </Stack>
    </Box>
  );
};

export default Exercises;
