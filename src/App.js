import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "./api/apiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";

const App = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [createdTodo, setCreatedTodo] = useState();
  let data;
  if (isLoading) {
    data = <CircularProgress size={150} />;
  } else if (isSuccess) {
    data = todos.map((todo) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={todo.id}>
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            margin:'20px',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            padding: "5px",
            wordWrap: "break-word",
            overflow: "hidden",
            background:'white',
            boxShadow: !todo.status
              ? "2px 5px 5px 2px rgba(255, 99, 71,0.8)"
              : "2px 5px 5px 2px rgba(26, 104, 181, 0.8)",
          }}
        >
          <IconButton
            color="error"
            aria-label="delete"
            component="label"
            sx={{
              alignSelf: "start",
            }}
          >
            <DeleteIcon onClick={() => deleteTodo({ id: todo.id })} />
          </IconButton>
          <Typography variant="h5" sx={{}}>
            {todo.title}
          </Typography>
          <Button
            sx={{ my: 2 }}
            variant="contained"
            color={todo.status ? "primary" : "error"}
            onClick={() => updateTodo({ ...todo, status: !todo.status })}
          >
            {todo.status ? "done" : "pending"}
          </Button>
        </Stack>
      </Grid>
    ));
  } else if (isError) {
    console.log(error);
    data = error.error;
  }
  const addNew = (e) => {
    e.preventDefault();
    if (createdTodo) {
      addTodo({ id: Math.random(1), title: createdTodo, status: false });
      setCreatedTodo("");
    }
  };
  return (
   
      <Canvas
        shadowap
        colorManagment
        camera={{ position: [-5, 2, 10], fov: 60 }}
        style={{background:'black', width:'100%', height:'100vh', padding:'0', margin:'0'}}
      >
  
        <Html style={{width:'100vw',height:'100%', padding:'0', margin:'0'}}>
        <Grid
      container
      spacing={5}
      sx={{
        justifyContent: "start",
        width:'90%',
        // height:'100%',
        marginX:'-50%',
        marginY:'-25%',
        // padding: "5%",
      }}
    >
        <Grid item xs={12}>

        <form>
        <Stack direction="row" sx={{ justifyContent: "space-around" }}>
          <TextField
            label="Add new todo"
            variant="outlined"
            color='secondary'
            value={createdTodo}
            sx={{ width: "80%",  borderRadius:'10px', padding:'0', input: { color: 'white', background:'rgba(255, 255, 255, 0.23)', margin:'5px', borderRadius:'3px'  }}}
            onChange={(e) => setCreatedTodo(e.target.value)}
          />
          <Button variant="contained" color='secondary' type="submit" onClick={(e) => addNew(e)}>
            Add Todo
          </Button>
        </Stack>
          </form>
      </Grid>
      {data}
    </Grid>

        </Html>
        
    
        <OrbitControls/>
        <Stars
          count={5000}
          factor={1}
          depth={10}
          saturation={10}
          radius={200}  
        />
    
      </Canvas>
  );
};

export default App;
