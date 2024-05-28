import react from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function Login(){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Login</Text>
            </View>
            <TextInput
                placeholder='Usuário'
                onChangeText={setUsuario}
                value={usuario}
                style={styles.caixa}
            />
            <TextInput
                placeholder='Senha'
                onChangeText={setSenha}
                value={senha}
                style={styles.caixa}
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.btnOk}
                onPress={fetchToken}
            >
                <Text style={{ fontSize: 25 }}>Sign In</Text>
            </TouchableOpacity>


        </View>

    )
}