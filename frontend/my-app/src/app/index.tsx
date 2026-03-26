import { Text, View, StyleSheet, Image, Button, TextInput, TouchableOpacity} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/images/holder_logo.png')} style={{ width: 150, height: 100, marginBottom: 80 }} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.titulo}>Bem vindo ao Holder</Text>
        <Text style={styles.subtitle}>Entre para continuar</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Sou Idoso" 
          onPress={() => console.log('Botão Pressionado')}
          disabled={false}
        />
        <Button
          title="Sou Voluntário" 
          onPress={() => console.log('Botão Pressionado')}
          disabled={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputElement} placeholder="Email" 
        placeholderTextColor="#919498"
        />
        <TextInput style={styles.inputElement} placeholder="Senha" 
        placeholderTextColor="#919498"
        secureTextEntry />
      </View>
      <View>
        <Text style={styles.forgetPassword}>
          Esqueceu sua senha?
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => console.log('Botão Pressionado')}
        disabled={false}
      >
      <Text style={styles.buttonText}>
        Entrar
      </Text>
      </TouchableOpacity>
      </View> 
      <View>
        <Text style={styles.acessContainer}>
          <Text style={styles.fisrtAcess}>
          Primeiro acesso?
        </Text>
        <Text style={styles.secondAcess}>Faça seu cadastro por aqui
        </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#4B4B4B'
  },
  subtitle: {
    fontSize: 16,
    color: '#919498'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20 
  },  
  inputContainer: {
    marginTop: 40,
    width: '80%',
    gap: 10,
    padding: 10,
    borderRadius: 10
  },
  inputElement: {
    backgroundColor: '#D9D9D966',
    padding: 16,
    borderRadius: 10
  },
  forgetPassword: {
    color: '#96C0BE',
    fontSize: 14,
    fontWeight: '500',
    cursor: 'pointer'
  }, 
  primaryButton: {
    backgroundColor: '#96C0BE',
    paddingHorizontal: 128,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  acessContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  fisrtAcess: {
    color: '#919498',
  },
  secondAcess: {
    color: '#96C0BE',
    fontWeight: '500',
    paddingLeft: 5,
    cursor: 'pointer'
  }
});
