import { Box, Flex, Heading } from '@chakra-ui/react';
import './App.css';
import AddDescriptionField from './components/AddDescriptionField.jsx';
import { ColorModeButton } from './components/ui/color-mode.jsx';
import { Provider } from "./components/ui/provider.jsx";
import TodoList from './components/TodoList.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [allTodos, setAllTodos] = useState([])

  const getTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-all-todos",)
      if (response.status === 200 || response.status === 201) {
        setAllTodos(response.data)
      }
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    getTodoList()
  }, [])
  return (
    <Provider>
      <div className="App">
        <Flex direction="column" gap={10} alignItems={"center"} width={"full"}>
          <Box width={'fit-content'} alignSelf={"flex-end"} mr={3} mt={3}>
            <ColorModeButton />

          </Box>
          <Heading fontSize="4xl">To-Do List</Heading>
          <Box width={'50%'} >
            <AddDescriptionField getTodoList={getTodoList} />
          </Box>
          <Box width={'50%'} >
            <TodoList allTodos={allTodos} setAllTodos={setAllTodos} />
          </Box>

        </Flex>
      </div>
    </Provider>

  );
}

export default App;
