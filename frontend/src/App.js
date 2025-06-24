import { Box, Flex, Heading } from '@chakra-ui/react';
import './App.css';
import AddDescriptionField from './components/AddDescriptionField.jsx';
import { ColorModeButton } from './components/ui/color-mode.jsx';
import { Provider } from "./components/ui/provider.jsx";
import TodoList from './components/TodoList.jsx';

function App() {
  return (
    <Provider>
      <div className="App">
        <Flex direction="column" gap={10} alignItems={"center"} width={"full"}>
          <Box width={'fit-content'} alignSelf={"flex-end"} mr={3} mt={3}>
            <ColorModeButton />

          </Box>
          <Heading fontSize="4xl">To-Do List</Heading>
          <Box width={'50%'} >
            <AddDescriptionField />
          </Box>
          <Box width={'50%'} >
            <TodoList />
          </Box>

        </Flex>
      </div>
    </Provider>

  );
}

export default App;
