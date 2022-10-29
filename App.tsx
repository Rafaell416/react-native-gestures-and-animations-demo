import { createStackNavigator } from "@react-navigation/stack";
import { PanGesture } from "./src/PanGesture";
import type { Routes } from "./src/Routes";
import { LoadAssets } from "./src/components";


const assets = []//[...swipingAssets];
const Stack = createStackNavigator<Routes>();
const App = () => (
  <LoadAssets assets={assets}>
    <Stack.Navigator>

      <Stack.Screen
        name="PanGesture"
        component={PanGesture}
        options={{
          title: "PanGesture",
        }}
      />

    </Stack.Navigator>
  </LoadAssets>
);

export default App;