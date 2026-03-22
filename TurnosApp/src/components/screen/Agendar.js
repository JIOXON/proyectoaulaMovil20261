import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import ButtonGradient from "../styles/buttonGradient";
import { styles } from "../styles/agendarStyles";

export default function Agendar({ route, navigation }) {
const { servicio } = route.params;

const [fecha, setFecha] = useState("");
const [hora, setHora] = useState("");
const db = getFirestore();

//Disponibilidad
const fechasDisponibles = ["2026-03-25", "2026-03-26", "2026-03-27"];
const horasDisponibles = ["09:00", "10:00", "11:00", "12:00"];

const guardarTurno = async () => {
    if (!fecha || !hora) {
    Alert.alert("Error", "Selecciona fecha y hora");
    return;
    }

    try {
    await addDoc(collection(db, "turnos"), {
        servicio: servicio.name,
        fecha,
        hora,
        creadoEn: new Date(),
    });

    navigation.navigate("Confirmacion", {
        servicio: servicio.name,
        fecha,
        hora,
    });

    } catch (error) {
    Alert.alert("Error", "No se pudo agendar");
    }
};

return (
    <View style={styles.container}>

    <Text style={styles.title}>Agendar turno</Text>

      {/* 🔹 Tarjeta del servicio */}
    <View style={styles.card}>
        <Text style={styles.service}>{servicio.name}</Text>
        <Text style={styles.duration}>{servicio.duration} min</Text>
    </View>

      {/* 📅 FECHAS */}
    <Text style={styles.label}>📅 Selecciona una fecha</Text>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {fechasDisponibles.map((f) => (
        <Text
            key={f}
            style={[
            styles.option,
            fecha === f && styles.optionSelected
            ]}
            onPress={() => setFecha(f)}
        >
            {f}
        </Text>
        ))}
    </View>

      {/* ⏰ HORAS */}
    <Text style={styles.label}>⏰ Selecciona una hora</Text>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {horasDisponibles.map((h) => (
        <Text
            key={h}
            style={[
            styles.option,
            hora === h && styles.optionSelected
            ]}
            onPress={() => setHora(h)}
        >
            {h}
        </Text>
        ))}
    </View>

{/* Botón Confirmacion */}
    <View style={styles.buttonContainer}>
        <ButtonGradient
        text="Confirmar turno"
        onPress={guardarTurno}
        width={220}
        height={50}
        />
    </View>

    </View>
);
}