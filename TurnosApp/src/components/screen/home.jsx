import React from "react";
import { View, Text } from "react-native";
import { styles, Navbar } from "../styles/globalStyles";
import ButtonGradient from "../styles/buttonGradient";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1 }}>

      <Navbar navigation={navigation} />

      <View style={styles.container}>
        <Text style={styles.title}>TurnosApp</Text>
        <Text style={styles.subTitle}>Home</Text>

        <ButtonGradient
          text="Ver servicios"
          onPress={() => navigation.navigate("Services")}
          width={140}
          height={60}
        />
      </View>

    </View>
  );
}
