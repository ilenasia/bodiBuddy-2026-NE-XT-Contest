import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLogin, onForgotPassword, onGoToSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const existing = await AsyncStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user.name, user.memberSince);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: 'https://i.imgur.com/Becrq7u.png' }} style={styles.logo} />
        <Text style={styles.appName}>bodiBuddy</Text>
        <Text style={styles.tagline}>A little workout every day goes a long way.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholderTextColor="#6B6560" placeholder="Enter your username" value={username} onChangeText={setUsername} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="#6B6560" value={password} onChangeText={setPassword} secureTextEntry={true} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGoToSignUp}>
          <Text style={styles.signUpLink}>Don't have an account? <Text style={styles.signUpBold}>Sign up</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#0D0D0D', padding: 24, justifyContent: 'center' },
  topSection: { alignItems: 'center', marginBottom: 48 },
  logo: { width: 300, height: 300, marginBottom: -40 },
  appName: { fontSize: 36, fontWeight: '700', color: '#e65a37', letterSpacing: 2, marginBottom: 8 },
  tagline: { fontSize: 14, color: '#A09A90', textAlign: 'center' },
  form: { gap: 8 },
  label: { fontSize: 12, color: '#A09A90', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, marginTop: 8 },
  input: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 14, color: '#F5F0E8', fontSize: 15, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  btn: { backgroundColor: '#e65a37', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 },
  btnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  forgotPassword: { color: '#e65a37', fontSize: 13, textAlign: 'right', marginTop: 6, opacity: 0.8 },
  signUpLink: { color: '#A09A90', fontSize: 13, textAlign: 'center', marginTop: 16 },
  signUpBold: { color: '#e65a37', fontWeight: '700' },
  error: { color: '#FF6B35', fontSize: 12, marginTop: 4 },
});