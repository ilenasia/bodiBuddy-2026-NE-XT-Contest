import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ onSignUp, onGoToLogin }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (!name || !username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const users = JSON.parse(global.usersDB || '[]');
    if (users.find(u => u.username === username)) {
      setError('Username already taken');
      return;
    }
    const memberSince = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const newUser = { name, username, email, password, memberSince };
    global.usersDB = JSON.stringify([...users, newUser]);
    onSignUp(name, memberSince);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: 'https://i.imgur.com/Becrq7u.png' }} style={styles.logo} />
        <Text style={styles.appName}>bodiBuddy</Text>
        <Text style={styles.tagline}>Start your fitness journey today.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholderTextColor="#6B6560" placeholder="Enter your name" value={name} onChangeText={setName} />

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholderTextColor="#6B6560" placeholder="Choose a username" value={username} onChangeText={setUsername} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholderTextColor="#6B6560" placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Create a password" placeholderTextColor="#6B6560" value={password} onChangeText={setPassword} secureTextEntry={true} />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onGoToLogin}>
          <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginBold}>Login</Text></Text>
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
  loginLink: { color: '#A09A90', fontSize: 13, textAlign: 'center', marginTop: 16 },
  loginBold: { color: '#e65a37', fontWeight: '700' },
  error: { color: '#FF6B35', fontSize: 12, marginTop: 4 },
});