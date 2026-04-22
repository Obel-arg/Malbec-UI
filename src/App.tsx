import { Button, MalbecThemeProvider, themes } from "malbec-ui";

function App() {
  return (
    <MalbecThemeProvider theme={themes.publishing}>
      <div className="ui:flex ui:items-center ui:justify-center ui:h-screen ui:p-4">
        <Button>Click me</Button>
      </div>
    </MalbecThemeProvider>
  );
}

export default App;
