import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AchieveScreen from './screens/AchieveScreen';
import MyPageScreen from './screens/MyPageScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import VideoSearchScreen from './screens/VideoSearchScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen';
import { useEffect } from 'react';
import { requestPermission, scheduleDailyReminder, scheduleStreakAlert, scheduleWeeklyResult } from './notifications';

export default function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
const [activitiesAdded, setActivitiesAdded] = useState([]);
const [joined, setJoined] = useState([]);
const [videoWatched, setVideoWatched] = useState([]);
const [tasks, setTasks] = useState([]);
const [selectedGoals, setSelectedGoals] = useState([]);
const [goals, setGoals] = useState([
  { label: 'Running', icon: '🏃' },
  { label: 'Cycling', icon: '🚴' },
  { label: 'Hiking', icon: '⛰️' },
  { label: 'Yoga', icon: '🧘' },
  { label: 'Add', icon: '+' },
]);
const [completedDays, setCompletedDays] = useState([]);
const [streak, setStreak] = useState(0);
const [showSignUp, setShowSignUp] = useState(false);
const [memberSince, setMemberSince] = useState('');
const [userEmail, setUserEmail] = useState('');
const [reminders, setReminders] = useState({ daily: true, streak: true, weekly: false });
useEffect(() => {
  requestPermission();
}, []);

useEffect(() => {
  scheduleDailyReminder(reminders.daily);
}, [reminders.daily]);

useEffect(() => {
  scheduleStreakAlert(reminders.streak);
}, [reminders.streak]);

useEffect(() => {
  scheduleWeeklyResult(reminders.weekly);
}, [reminders.weekly]);
  if (!user) {
  if (showForgotPassword) {
    return <ForgotPasswordScreen navigation={{ goBack: () => setShowForgotPassword(false) }} />;
  }
  if (showSignUp) {
    return <SignUpScreen 
      onSignUp={(name, since, email) => { setUser(name); setMemberSince(since); setUserEmail(email); setShowSignUp(false); }}
      onGoToLogin={() => setShowSignUp(false)}
    />;
  }

  return <LoginScreen 
    onLogin={(name, since) => { setUser(name); setMemberSince(since); }}
    onForgotPassword={() => setShowForgotPassword(true)}
    onGoToSignUp={() => setShowSignUp(true)}
  />;
}
  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.screen}>
  {activePage === 'home' && <HomeScreen userName={user} totalPoints={totalPoints} setTotalPoints={setTotalPoints} activitiesAdded={activitiesAdded} setActivitiesAdded={setActivitiesAdded} tasks={tasks} setTasks={setTasks} selectedGoals={selectedGoals} setSelectedGoals={setSelectedGoals} goals={goals} setGoals={setGoals} completedDays={completedDays} setCompletedDays={setCompletedDays} streak={streak} setStreak={setStreak} />} 
  {activePage === 'achieve' && <AchieveScreen />}
  {activePage === 'activities' && <ActivitiesScreen totalPoints={totalPoints} setTotalPoints={setTotalPoints} activitiesAdded={activitiesAdded} setActivitiesAdded={setActivitiesAdded} joined={joined} setJoined={setJoined} videoWatched={videoWatched} setVideoWatched={setVideoWatched} />}
  {activePage === 'mypage' && <MyPageScreen userName={user} completedDays={completedDays} totalPoints={totalPoints} streak={streak} memberSince={memberSince} userEmail={userEmail} reminders={reminders} setReminders={setReminders} />}
  {activePage === 'videos' && <VideoSearchScreen />}
</View>
      

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActivePage('home')}>
  <Image source={require('./assets/homeicon.png')} style={{ width: 70, height: 70, tintColor: activePage === 'home' ? '#e65a37' : '#6B6560', marginBottom: -10 }} />
  <Text style={[styles.navLabel, activePage === 'home' && styles.navActive, { marginTop: -12}]}>Home</Text>
</TouchableOpacity>
         <TouchableOpacity style={styles.navItem} onPress={() => setActivePage('achieve')}>
  <View style={{ alignItems: 'center' }}>
    <Image source={require('./assets/statsicon.png')} style={{ width: 40, height: 40, tintColor: activePage === 'achieve' ? '#e65a37' : '#6B6560', marginBottom:-8}} />
    <Text style={[styles.navLabel, activePage === 'achieve' && styles.navActive, { position: 'absolute', bottom:-17 }]}>Stats</Text>
  </View>
</TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActivePage('mypage')}>
  <Image source={require('./assets/mypageicon1.png')} style={{ width: 50, height: 50, tintColor: activePage === 'mypage' ? '#e65a37' : '#6B6560', marginBottom: -10 }} />
<Text style={[styles.navLabel, activePage === 'mypage' && styles.navActive, { position: 'absolute', bottom:2 }]}>My Page</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActivePage('activities')}>
  <Image source={require('./assets/activityicon.png')} style={{ width: 70, height: 70, tintColor: activePage === 'activities' ? '#e65a37' : '#6B6560',  marginBottom: -10  }} />
  <Text style={[styles.navLabel, activePage === 'activities' && styles.navActive, { position: 'absolute', bottom:2 }]}>Activity</Text>
</TouchableOpacity>
         <TouchableOpacity style={styles.navItem} onPress={() => setActivePage('videos')}>
  <Image source={require('./assets/videoicon.png')} style={{ width: 40, height: 40, tintColor: activePage === 'videos' ? '#e65a37' : '#6B6560',  marginBottom: -10  }} />
  <Text style={[styles.navLabel, activePage === 'videos' && styles.navActive, { position: 'absolute', bottom:2 }]}>Videos</Text>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  screen: { flex: 1 },
 navbar: { flexDirection: 'row', backgroundColor: '#161616', borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.08)', height: 55 },
navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -14},
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 12, color: '#6B6560', textAlign: 'center'},
  navActive: { color: '#e65a37' },
});