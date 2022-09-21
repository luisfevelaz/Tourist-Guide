import { SafeAreaView } from "react-native-safe-area-context";
import MainStack from "./navigation/MainStack";

function App(){
  return(
    <SafeAreaView style={{flex:1}}>
      <MainStack/>
    </SafeAreaView>
  );
}

export default App;