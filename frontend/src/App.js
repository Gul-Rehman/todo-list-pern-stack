import logo from './logo.svg';
import './App.css';
import Input from './components/Input.jsx';
import { Provider } from "./components/ui/provider.jsx"
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { ColorModeButton } from './components/ui/color-mode.jsx';

function App() {
  return (
    <Provider>
      <div className="App">
        <Flex direction="column" width={"full"}>
          <Box width={'fit-content'} alignSelf={"flex-end"}>
            <ColorModeButton />

          </Box>
          <Heading fontSize="4xl">To-Do List</Heading>

          <Input />
        </Flex>
      </div>
    </Provider>

  );
}

export default App;
