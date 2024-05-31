import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Logo from '../assets/logo.png'
import { useNavigation } from '@react-navigation/native';



export default function Login() {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate('Mapa');
    };

    const [lembrar, setLembrar] = useState(false);

    const toggleLembrar = () => {
        setLembrar(!lembrar);
    };

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
                <Text style={styles.title}>Bem vindo de volta! </Text>
            </View>
            <TextInput
                placeholder='Usuário'
                style={styles.caixa}
            />
            <TextInput
                placeholder='Senha'
                style={styles.caixa}
                secureTextEntry={true}
            />
            <View style={styles.lembrarContainer}>
                <TouchableOpacity onPress={toggleLembrar} style={[styles.checkbox, lembrar && styles.checkboxChecked]}>
                    {lembrar && <MaterialIcons name="check" size={styles.checkbox.size} color="white" />}
                </TouchableOpacity>
                <Text style={styles.lembrarText}>Lembrar </Text>
                <Text style={styles.esqueceuSenhaText}>Esqueceu sua senha?</Text>
            </View>
            <TouchableOpacity
                style={styles.btnOk}
                onPress={handleLoginPress}
            >
                <Text style={{ fontSize: 25, color: '#377A95' }} >Entrar</Text>
            </TouchableOpacity>
            <View style={styles.textoNovoUsuario}>
                <Text style={{ color: '#6F6F6F' }}>Não tem conta? <Text style={{ color: '#4DADAC', fontWeight: '700' }}>Cadastre-se</Text></Text>
            </View>

            <View style={styles.orContainer}>
                <View style={[styles.linha, { width: '30%' }]}></View>
                <Text style={styles.orText}>or</Text>
                <View style={[styles.linha, { width: '30%' }]}></View>
            </View>

            <View style={styles.socialContainer}>
                <View style={styles.socialEspecificOne}>
                    <AntDesign name="twitter" size={25} style={{ color: 'white' }} />
                </View>
                <View style={styles.socialEspecificTwo}>
                    <MaterialIcons name="facebook" size={31} style={{ color: 'white' }} />
                </View>
                <View style={styles.socialEspecificThree}>
                    <AntDesign name="google" size={25} style={{ color: 'white' }} />
                </View>
            </View>

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
        height: '28%',
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
    }
});
