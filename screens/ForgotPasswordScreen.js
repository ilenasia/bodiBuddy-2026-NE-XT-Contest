import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from './supabase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError('No account found with that email.');
    } else {
      setSent(true);
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>We'll send a reset link to your email.</Text>

      {sent ? (
        <Text style={styles.success}>✅ Reset email sent! Check your inbox.</Text>
      ) : (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@email.com"
            placeholderTextColor="#6B6560"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.btn, !email && styles.btnDisabled]}
            onPress={handleReset}
            disabled={!email}>
            <Text style={styles.btnText}>Send Reset Email 📧</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#C8FF00', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#A09A90', marginBottom: 32 },
  label: { fontSize: 12, color: '#A09A90', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  input: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 14, color: '#F5F0E8', fontSize: 15, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  btn: { backgroundColor: '#C8FF00', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  success: { color: '#C8FF00', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  error: { color: '#FF4444', fontSize: 13, marginTop: 6 },
  back: { color: '#A09A90', textAlign: 'center', marginTop: 32 },
});