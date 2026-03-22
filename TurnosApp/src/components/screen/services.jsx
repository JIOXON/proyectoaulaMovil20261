import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { styles, Navbar } from "../styles/globalStyles";
import ButtonGradient from "../styles/buttonGradient";

export default function Services({ navigation }) {
  const [services, setServices] = useState([]);
  const db = getFirestore();

  const getServices = async () => {
    const querySnapshot = await getDocs(collection(db, "services"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setServices(lista);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <View style={{ flex: 1 }}>

      <Navbar navigation={navigation} />

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <ButtonGradient
          text="Volver"
          onPress={() => navigation.navigate("Home")}
          width={100}
          height={50}
        />
      </View>

      <View style={{ padding: 20 }}>
        {services.map((item) => (
          <View key={item.id} style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text>{item.description}</Text>
            <Text>{item.duration} min</Text>
            <ButtonGradient
              text="Agendar"
              onPress={() => navigation.navigate("Agendar", { servicio: item })}
              width={150}
              height={45}
            />
          </View>
        ))}
      </View>

    </View>
  );
}
