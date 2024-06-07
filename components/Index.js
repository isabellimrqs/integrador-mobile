import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../assets/logo.png'

export default function Index({ navigation }) {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[ '#377A95', '#72A8AC', '#E8E8EA']}
                style={styles.containerDois}
            />
            <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logo} />
            </View>
            <View>
                <Text style={styles.title}>Bem vindo! </Text>
            </View>

            <TouchableOpacity
                style={styles.btnOk2}
                onPress={()=>navigation.navigate("Signup")}
               
            >
                <Text style={{ fontSize: 25, color: '#ffff' }} >Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btnOk}
                onPress={()=>navigation.navigate("Login")}
               
            >
                <Text style={{ fontSize: 25, color: '#377A95' }} 
                >Entrar</Text>
            </TouchableOpacity>


            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    containerDois: {
        width: '100%',
        height: '40%',
        position: 'absolute',
        top: 0,
        borderColor: '#F9F7F7'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '9%',
        width: '100%',
    },
    logo: {
        width: 100,
        height: 100,
    },
    caixa: {
        width: '80%',
        backgroundColor: '#E4E4E4',
        borderRadius: 30,
        padding: 18,
        fontSize: 20,
        marginTop: 16,
        height: 63
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        margin: 15
    },
    lembrarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    lembrarText: {
        fontSize: 15,
        marginLeft: 8,
        color: '#6F6F6F'
    },
    esqueceuSenhaText: {
        fontSize: 15,
        marginLeft: 35,
        color: '#6F6F6F'
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#777',
        justifyContent: 'center',
        alignItems: 'center',
        size: 20
    },
    checkboxChecked: {
        backgroundColor: '#377A95',
        borderColor: '#377A95',
    },
    btnOk: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        width: '80%',
        borderColor: '#377A95',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnOk2: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        width: '80%',
        borderColor: '#377A95',
        backgroundColor: '#377A95',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoNovoUsuario: {
        marginTop: 8
    },
    linha: {
        height: 1,
        backgroundColor: '#000',
        marginHorizontal: 5
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
    },
    orText: {
        color: '#6F6F6F',
        fontSize: 16,
        marginHorizontal: 10
    },
    socialContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    socialEspecificOne: {
        backgroundColor: '#69C7AF',
        width: 48,
        height: 47,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        borderColor: 'black'
    },
    socialEspecificTwo: {
        backgroundColor: '#4DADAC',
        width: 48,
        height: 47,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        borderColor: 'black'
    },
    socialEspecificThree: {
        backgroundColor: '#377A95',
        width: 48,
        height: 47,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 30,
        borderColor: 'black'
    },
    errorText: {
        color: 'darkred',
        marginRight: 110,
        marginTop: 5
    }
});


