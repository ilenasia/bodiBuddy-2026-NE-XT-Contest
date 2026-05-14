import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const cellSize = Math.floor((screenWidth - 40 - 32) / 7);
export default function MyPageScreen({ userName, completedDays = [], totalPoints = 0, streak = 0, memberSince = '', userEmail = '', reminders, setReminders }) {
 const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const today = now.getDate();
const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const startOffset = firstDay === 0 ? 6 : firstDay - 1;
const calendarDays = [
  ...Array(startOffset).fill('empty'),
  ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
];

  const activeDays = completedDays;

  const activities = [
    { name: 'Running — 15 min', level: 'High', color: '#FF6B35' },
    { name: 'Yoga — 1 lesson', level: 'Low', color: '#00D4AA' },
    { name: 'Walking — 3,200 steps', level: 'Low', color: '#00D4AA' },
    { name: 'Cycling — 8km', level: 'Med', color: '#C8FF00' },
  ];


  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
    <ScrollView style={styles.container}>
  
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userName ? userName[0].toUpperCase() : 'A'}
          </Text>
        </View>
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.memberSince}>Member since {memberSince}</Text>
        </View>
      </View>

    
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
         <Text style={styles.statNum}>{completedDays.length}</Text>
<Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalPoints}</Text>
<Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{completedDays.length}</Text>
<Text style={styles.statLabel}>Activities</Text>
        </View>
      </View>

      
      <Text style={styles.sectionTitle}>{monthName}</Text>
      <View style={styles.card}>
        <View style={styles.dayHeaders}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <Text key={i} style={styles.dayHeader}>{d}</Text>
          ))}
        </View>
        <View style={styles.calGrid}>
          {calendarDays.map((day, i) => (
            <View
              key={i}
              style={[
                styles.calDay,
                day === 'empty' && styles.calEmpty,
                typeof day === 'number' && activeDays.includes(day) && styles.calActive,
                day === today && styles.calToday,
              ]}>
              {day !== 'empty' && (
                <Text style={[
                  styles.calDayText,
                  activeDays.includes(day) && styles.calActiveTxt,
                  day === today && styles.calTodayTxt,
                ]}>
                  {day}
                </Text>
              )}
            </View>
          ))}
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#e65a37' }]} />
            <Text style={styles.legendText}>Active</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#252525' }]} />
            <Text style={styles.legendText}>Rest</Text>
          </View>
        </View>
      </View>

    
      <Text style={styles.sectionTitle}>Activity log</Text>
      <View style={styles.card}>
        {activities.map((a, i) => (
          <View key={a.name} style={[styles.actRow, i === activities.length - 1 && styles.noBorder]}>
            <Text style={styles.actName}>{a.name}</Text>
            <View style={[styles.actBadge, { backgroundColor: a.color + '25' }]}>
              <Text style={[styles.actBadgeText, { color: a.color }]}>{a.level}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Personal info</Text>
      <View style={styles.card}>
        {[
          { label: 'Name', value: userName },
          { label: 'Email', value: userEmail },
        ].map((item, i, arr) => (
          <View key={item.label} style={[styles.infoRow, i === arr.length - 1 && styles.noBorder]}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      
      <Text style={styles.sectionTitle}>Reminders</Text>
      <View style={styles.card}>
        {[
  { label: 'Daily activity reminder', key: 'daily' },
  { label: 'Streak at risk alert', key: 'streak' },
  { label: 'Weekly leaderboard result', key: 'weekly' },
].map((item, i, arr) => (
  <TouchableOpacity key={item.label} style={[styles.infoRow, i === arr.length - 1 && styles.noBorder]} onPress={() => setReminders({ ...reminders, [item.key]: !reminders[item.key] })}>
    <Text style={styles.infoLabel}>{item.label}</Text>
    <View style={[styles.toggle, !reminders[item.key] && styles.toggleOff]}>
      <View style={[styles.toggleDot, !reminders[item.key] && styles.toggleDotOff]} />
    </View>
  </TouchableOpacity>
))}
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20, paddingBottom: 0},
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#e65a37', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#000' },
  userName: { fontSize: 18, fontWeight: '700', color: '#F5F0E8' },
  memberSince: { fontSize: 12, color: '#A09A90', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  statNum: { fontSize: 22, fontWeight: '700', color: '#e65a37' },
  statLabel: { fontSize: 10, color: '#A09A90', marginTop: 2 },
  sectionTitle: { fontSize: 11, color: '#A09A90', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 4 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  dayHeaders: { flexDirection: 'row', marginBottom: 6 },
  dayHeader: { flex: 1, textAlign: 'center', fontSize: 10, color: '#6B6560' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap', width: cellSize * 7 },
  calDay: { width: cellSize, height: cellSize, alignItems: 'center', justifyContent: 'center', borderRadius: cellSize / 2 },
  calEmpty: { opacity: 0 },
  calActive: { backgroundColor: '#e65a37' },
  calToday: { backgroundColor: '#e65a37', borderWidth: 2, borderColor: '#fff' },
  calDayText: { fontSize: 10, color: '#6B6560' },
  calActiveTxt: { color: '#000', fontWeight: '700' },
  calTodayTxt: { color: '#000', fontWeight: '700' },
  legend: { flexDirection: 'row', gap: 16, marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 3 },
  legendText: { fontSize: 11, color: '#A09A90' },
  actRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  noBorder: { borderBottomWidth: 0, paddingBottom: 0 },
  actName: { color: '#F5F0E8', fontSize: 13 },
  actBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  actBadgeText: { fontSize: 11, fontWeight: '500' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  infoLabel: { fontSize: 13, color: '#A09A90' },
  infoValue: { fontSize: 13, color: '#F5F0E8', fontWeight: '500' },
  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: '#e65a37', justifyContent: 'center', paddingHorizontal: 3 },
  toggleOff: { backgroundColor: '#252525' },
  toggleDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#000', alignSelf: 'flex-end' },
  toggleDotOff: { alignSelf: 'flex-start', backgroundColor: '#6B6560' },
});