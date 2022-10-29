import { createStackNavigator } from "@react-navigation/stack";
import { Examples } from "./src/Examples";
import { PanGesture } from "./src/PanGesture";
import { Transitions } from "./src/Transitions";

import type { Routes } from "./src/Routes";
import { LoadAssets } from "./src/components";


const assets = []//[...swipingAssets];
const Stack = createStackNavigator<Routes>();
const App = () => (
  <LoadAssets assets={assets}>
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "Examples",
        }}
      />
      <Stack.Screen
        name="PanGesture"
        component={PanGesture}
        options={{
          title: "PanGesture",
        }}
      />
      <Stack.Screen
        name="Transitions"
        component={Transitions}
        options={{
          title: "Transitions",
        }}
      />
    </Stack.Navigator>
  </LoadAssets>
);

export default App;