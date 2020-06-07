import React from "react";
import { View } from "react-native";
import { Header } from "../../components";


type HomeProps = {};

const Home: React.FC<HomeProps> = ({}: HomeProps) => {
  return <View>
    <Header />
  </View>;
};

export default Home;
