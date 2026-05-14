import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput} from 'react-native';

export default function HomeScreen({ userName, totalPoints = 0, setTotalPoints, activitiesAdded = [], setActivitiesAdded, tasks, setTasks, selectedGoals, setSelectedGoals, goals, setGoals, streak, setStreak, completedDays, setCompletedDays }){
  const [showAddGoal, setShowAddGoal] = useState(false);

  const goalTasks = {
    Running: [
      { id: 1, icon: '🏃', label: 'Run 15 minutes', pts: '+25 pts', done: false },
      { id: 2, icon: '🚶', label: 'Walk 1,000 steps', pts: '+10 pts', done: false },
    ],
    Cycling: [
      { id: 1, icon: '🚴', label: 'Cycle 10km', pts: '+30 pts', done: false },
      { id: 2, icon: '🚴', label: 'Cycle 30 minutes', pts: '+20 pts', done: false },
    ],
    Hiking: [
      { id: 1, icon: '⛰️', label: 'Hike 5km', pts: '+35 pts', done: false },
      { id: 2, icon: '🚶', label: 'Walk 30 minutes', pts: '+15 pts', done: false },
    ],
    Yoga: [
      { id: 1, icon: '🧘', label: 'Yoga lesson 20 min', pts: '+20 pts', done: false },
      { id: 2, icon: '🧘', label: 'Meditation 10 min', pts: '+10 pts', done: false },
    ],
    Swimming: [
      { id: 1, icon: '🏊', label: 'Swim 10 laps', pts: '+30 pts', done: false },
      { id: 2, icon: '🏊', label: 'Swim 20 minutes', pts: '+20 pts', done: false },
    ],
    Football: [
      { id: 1, icon: '⚽', label: 'Play 30 minutes', pts: '+25 pts', done: false },
      { id: 2, icon: '⚽', label: 'Practice shooting', pts: '+15 pts', done: false },
    ],
    Basketball: [
      { id: 1, icon: '🏀', label: 'Play 30 minutes', pts: '+25 pts', done: false },
      { id: 2, icon: '🏀', label: 'Practice dribbling', pts: '+15 pts', done: false },
    ],
    Boxing: [
      { id: 1, icon: '🥊', label: 'Box 3 rounds', pts: '+30 pts', done: false },
      { id: 2, icon: '🥊', label: 'Jump rope 10 min', pts: '+15 pts', done: false },
    ],
    Gym: [
      { id: 1, icon: '🏋️', label: 'Lift weights 30 min', pts: '+30 pts', done: false },
      { id: 2, icon: '🏋️', label: 'Cardio 15 min', pts: '+15 pts', done: false },
    ],
    Climbing: [
      { id: 1, icon: '🧗', label: 'Climb 10 routes', pts: '+35 pts', done: false },
      { id: 2, icon: '🧗', label: 'Practice holds', pts: '+15 pts', done: false },
    ],
    Surfing: [
      { id: 1, icon: '🏄', label: 'Surf 30 minutes', pts: '+30 pts', done: false },
      { id: 2, icon: '🏄', label: 'Practice paddling', pts: '+15 pts', done: false },
    ],
    Dancing: [
      { id: 1, icon: '💃', label: 'Dance 20 minutes', pts: '+20 pts', done: false },
      { id: 2, icon: '💃', label: 'Learn new move', pts: '+15 pts', done: false },
    ], 
  };


const today = new Date().getDay();
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const todayIndex = today === 0 ? 6 : today - 1;

const days = dayNames.map((label, i) => ({
  label,
  status: i < todayIndex ? 'done' : i === todayIndex ? 'today' : 'future',
}));
  const toggleTask = (id) => {
  const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  setTasks(updated);

  const anyDone = updated.some(t => t.done);
  const todayDate = new Date().getDate();

  let newCompletedDays = completedDays;
  if (anyDone && !completedDays.includes(todayDate)) {
    newCompletedDays = [...completedDays, todayDate];
    setCompletedDays(newCompletedDays);
  }
  setStreak(newCompletedDays.length);

};
 const taskPts = tasks.filter(t => t.done).reduce((sum, t) => sum + parseInt(t.pts.replace(/\D/g, '')), 0);
const progressPct = Math.min(totalPoints + taskPts, 100);
const allPts = totalPoints + taskPts;
  


  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
  {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'}, {userName} 
</Text>
         <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
        </View>
       <View style={styles.streakWrapper}>
  <Text style={styles.streakFire}>🔥</Text>
  <View style={styles.streakPill}>
    <Text style={styles.streakText}>{completedDays.length} days</Text>
  </View>
</View>
      </View>

      
      <View style={styles.pointsCard}>
  <View style={styles.pointsRow}>
    <Text style={styles.pointsLabel}>Today's progress</Text>
    <Text style={styles.pointsNum}>{Math.min(allPts, 100)}%</Text>
  </View>
  <View style={styles.progressBg}>
    <View style={[styles.progressFill, { width: `${Math.min(allPts, 100)}%` }]} />
  </View>
</View>
      
      <Text style={styles.sectionTitle}>What's your goal today?</Text>
      <View style={styles.goalGrid}>
        {goals.map(g => (
          <TouchableOpacity
            key={g.label}
            style={[styles.goalBtn, selectedGoals.includes(g.label) && styles.goalBtnActive, g.label === 'Add' && styles.goalBtnAdd]}
            onPress={() => {
  if (g.label === 'Add') {
    setShowAddGoal(true);
  } else {
    const isSelected = selectedGoals.includes(g.label);
    const updated = isSelected ? selectedGoals.filter(s => s !== g.label) : [...selectedGoals, g.label];
    setSelectedGoals(updated);
    const combined = updated.flatMap(s => goalTasks[s] || []).map((t, i) => {
  const existing = tasks.find(existing => existing.label === t.label);
  return { ...t, id: i + 1, done: existing ? existing.done : false };
});
setTasks(combined);
  }
}}> 
            <Text style={styles.goalIcon}>{g.icon}</Text>
{g.label !== 'Add' && (
  <Text style={[styles.goalText, selectedGoals.includes(g.label) && styles.goalTextActive]}>
    {g.label}
  </Text>
)}
          </TouchableOpacity>
        ))}
      </View>

    
      <Text style={styles.sectionTitle}>This week</Text>
      <View style={styles.weekCard}>
        <View style={styles.weekRow}>
          {days.map(d => (
            <View key={d.label} style={styles.dayCol}>
              <View style={[
                styles.dayDot,
                d.status === 'done' && styles.dotDone,
                d.status === 'today' && styles.dotToday,
                d.status === 'future' && styles.dotFuture
              ]}>
                <Text style={[styles.dotText, d.status === 'done' && styles.dotTextDone]}>
                  {d.status === 'done' ? '✓' : d.label[0]}
                </Text>
              </View>
              <Text style={styles.dayLabel}>{d.label}</Text>
            </View>
          ))}
        </View>
      </View>

      
      <Text style={styles.sectionTitle}>Streak ladder</Text>
      <View style={styles.ladderCard}>
        <View style={styles.ladderSteps}>
          {[
            { days: '1d', height: 20, opacity: 0.15, min: 1, max: 2 },
{ days: '3d', height: 35, opacity: 0.25, min: 3, max: 6 },
{ days: '7d', height: 50, opacity: 0.4, min: 7, max: 13 },
{ days: '14d', height: 65, opacity: 0.55, min: 14, max: 29 },
{ days: '30d', height: 80, opacity: 0.75, min: 30, max: 59 },
{ days: '60d', height: 90, opacity: 0.88, min: 60, max: 89 },
{ days: '90d', height: 100, opacity: 1, min: 90, max: 999 },
          ].map((s) => (
            <View key={s.days} style={styles.stepCol}>
              {streak >= s.min && streak <= s.max && <Text style={styles.youLabel}>YOU</Text>}
              <View style={[styles.stepBar, { height: s.height, backgroundColor: `rgba(230,90,55,${s.opacity})` }]} />
              <Text style={styles.stepLabel}>{s.days}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.ladderNote}>Lose your streak? Back to day 1</Text>
      </View>

      
      <Text style={styles.sectionTitle}>Today's tasks</Text>
      {tasks.map(task => (
        <TouchableOpacity
          key={task.id}
          style={styles.taskItem}
          onPress={() => toggleTask(task.id)}>
          <Text style={styles.taskIcon}>{task.icon}</Text>
          <View style={styles.taskInfo}>
            <Text style={styles.taskLabel}>{task.label}</Text>
            <Text style={styles.taskPts}>{task.pts}</Text>
          </View>
          <View style={[styles.taskCheck, task.done && styles.taskCheckDone]}>
            <Text style={styles.checkMark}>{task.done ? '✓' : ''}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {showAddGoal && (
  <View style={styles.modal}>
    <View style={styles.modalBox}>
      <Text style={styles.modalTitle}>Add a goal</Text>
      {[
        { label: 'Swimming', icon: '🏊' },
        { label: 'Football', icon: '⚽' },
        { label: 'Basketball', icon: '🏀' },
        { label: 'Boxing', icon: '🥊' },
        { label: 'Gym', icon: '🏋️' },
        { label: 'Climbing', icon: '🧗' },
        { label: 'Surfing', icon: '🏄' },
        { label: 'Dancing', icon: '💃' },
      ].map(g => (
        <TouchableOpacity
          key={g.label}
          style={styles.modalItem}
          onPress={() => {
            const newGoals = [...goals.filter(g => g.label !== 'Add'), g, { label: 'Add', icon: '+' }];
            setGoals(newGoals);
            const updated = [...selectedGoals, g.label];
            setSelectedGoals(updated);
            const combined = updated.flatMap(s => goalTasks[s] || []).map((t, i) => {
              const existing = tasks.find(existing => existing.label === t.label);
              return { ...t, id: i + 1, done: existing ? existing.done : false };
            });
            setTasks(combined);
            setShowAddGoal(false);
          }}>
          <Text style={styles.modalItemIcon}>{g.icon}</Text>
          <Text style={styles.modalItemLabel}>{g.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setShowAddGoal(false)}>
        <Text style={styles.modalCancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
{activitiesAdded.map(task => (
  <TouchableOpacity
    key={`act-${task.id}`}
    style={styles.taskItem}
    onPress={() => {
      setActivitiesAdded(activitiesAdded.filter(a => a.id !== task.id));
      setTotalPoints(totalPoints - parseInt(task.pts.replace(/\D/g, '')));
    }}>
    <Text style={styles.taskIcon}>{task.icon}</Text>
    <View style={styles.taskInfo}>
      <Text style={styles.taskLabel}>{task.label}</Text>
      <Text style={styles.taskPts}>{task.pts}</Text>
    </View>
    <View style={[styles.taskCheck, styles.taskCheckDone]}>
      <Text style={styles.checkMark}>✓</Text>
    </View>
  </TouchableOpacity>
))}
     
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#F5F0E8' },
  date: { fontSize: 12, color: '#A09A90', marginTop: 4 },
  streakPill: { backgroundColor: '#e65a37', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  streakText: { color: '#000', fontWeight: '700', fontSize: 12 },
  pointsCard: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  pointsLabel: { color: '#A09A90', fontSize: 13 },
  pointsNum: { color: '#e65a37', fontSize: 22, fontWeight: '700' },
  sectionTitle: { fontSize: 11, color: '#A09A90', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 4 },
  goalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  goalBtn: { backgroundColor: '#1E1E1E', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', gap: 6 },
  goalBtnActive: { backgroundColor: '#e65a37', borderColor: '#e65a37' },
  goalBtnAdd: { borderStyle: 'dashed', borderColor: '#e65a37', borderWidth: 1 },
  goalIcon: { fontSize: 16, color: '#e65a37'  },
  goalText: { color: '#F5F0E8', fontSize: 13, fontWeight: '500' },
  goalTextActive: { color: '#000' },
  weekCard: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCol: { alignItems: 'center', gap: 6 },
  dayDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#252525' },
  dotDone: { backgroundColor: '#e65a37' },
  dotToday: { borderWidth: 1.5, borderColor: '#e65a37' },
  dotFuture: { opacity: 0.3 },
  dotText: { fontSize: 12, color: '#A09A90' },
  dotTextDone: { color: '#000', fontWeight: '700' },
  dayLabel: { fontSize: 10, color: '#6B6560' },
  ladderCard: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  ladderSteps: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 110 },
  stepCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  stepBar: { width: '100%', borderRadius: 4 },
  stepLabel: { fontSize: 9, color: '#6B6560', marginTop: 4 },
  youLabel: { fontSize: 9, color: '#e65a37', fontWeight: '700', marginBottom: 2 },
  ladderNote: { fontSize: 11, color: '#6B6560', marginTop: 12, textAlign: 'center' },
  taskItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', borderRadius: 12, padding: 14, marginBottom: 8, gap: 12, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  taskIcon: { fontSize: 22 },
  taskInfo: { flex: 1 },
  taskLabel: { color: '#F5F0E8', fontSize: 14, fontWeight: '500' },
  taskPts: { color: '#FFB800', fontSize: 12, marginTop: 2 },
  taskCheck: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  taskCheckDone: { backgroundColor: '#e65a37', borderColor: '#e65a37' },
  checkMark: { color: '#000', fontSize: 13, fontWeight: '700' },
  modal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
modalBox: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 24, width: '80%' },
modalTitle: { color: '#F5F0E8', fontSize: 18, fontWeight: '700', marginBottom: 16 },
modalItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, backgroundColor: '#252525', marginBottom: 8, gap: 12 },
modalItemIcon: { fontSize: 20 },
modalItemLabel: { color: '#F5F0E8', fontSize: 15, fontWeight: '500' },
modalCancel: { color: '#e65a37', textAlign: 'center', fontSize: 14 },
pointsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
progressBg: { backgroundColor: '#2A2A2A', borderRadius: 10, height: 10 },
progressFill: { backgroundColor: '#e65a37', borderRadius: 10, height: 10 },
streakWrapper: { flexDirection: 'row', alignItems: 'center' },
streakFire: { fontSize: 16, marginRight: -1, zIndex: 1 },
});