import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function AchieveScreen({ userName }) {
  const [nudged, setNudged] = useState([]);
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [friendInput, setFriendInput] = useState('');
  const [friendError, setFriendError] = useState('');
  const [friendsList, setFriendsList] = useState([
    { initials: 'YN', name: 'Yuna Nakamura', streak: 18, activity: 'Running · 5km', status: 'active', color: '#00D4AA' },
    { initials: 'RK', name: 'Riku Kim', streak: 7, activity: 'Cycling · 12km', status: 'active', color: '#FFB800' },
    { initials: 'MS', name: 'Min Seo', streak: 4, activity: 'Yoga · 1 lesson', status: '2h ago', color: '#FF6B35' },
    { initials: 'JH', name: 'Jess Han', streak: 0, activity: 'No activity yet', status: 'inactive', color: '#6B6560' },
  ]);

  const avatarColors = ['#00D4AA', '#FFB800', '#FF6B35', '#A78BFA', '#38BDF8', '#F472B6'];

  const handleAddFriend = () => {
    const username = friendInput.trim();
    if (!username) {
      setFriendError('Please enter a username.');
      return;
    }
    const alreadyExists = friendsList.some(
      f => f.name.toLowerCase() === username.toLowerCase()
    );
    if (alreadyExists) {
      setFriendError('This friend is already in your list.');
      return;
    }
    const initials = username.slice(0, 2).toUpperCase();
    const color = avatarColors[friendsList.length % avatarColors.length];
    const newFriend = {
      initials,
      name: username,
      streak: 0,
      activity: 'No activity yet',
      status: 'inactive',
      color,
    };
    setFriendsList([...friendsList, newFriend]);
    setFriendInput('');
    setFriendError('');
  };

  const challenges = [
    { icon: '🏃', title: '5km run challenge', subtitle: 'You vs Yuna · ends Friday', progress: 0.7, color: '#e65a37' },
    { icon: '🔥', title: '7-day group streak', subtitle: '3 friends · day 4 of 7', progress: 0.57, color: '#FFB800' },
  ];

  const badges = [
    { icon: '🏃', label: '10km Run', unlocked: true },
    { icon: '🔥', label: '7-Day Streak', unlocked: true },
    { icon: '🧘', label: '10 Lessons', unlocked: true },
    { icon: '🚴', label: 'Cyclist', unlocked: false },
    { icon: '⛰️', label: 'First Hike', unlocked: false },
    { icon: '💯', label: '30-Day Streak', unlocked: false },
    { icon: '⚡', label: 'Speed Run', unlocked: false },
    { icon: '👑', label: 'Weekly #1', unlocked: false },
  ];

  const podium = [
  { initials: 'YN', name: 'Yuna', pts: 285, color: '#00D4AA' },
  { initials: userName ? userName.slice(0, 2).toUpperCase() : 'ME', name: 'You', pts: 420, color: '#e65a37' },
  { initials: 'RK', name: 'Riku', pts: 190, color: '#FFB800' },
];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Achievements</Text>

      <View style={styles.tabRow}>
        {['leaderboard', 'friends', 'badges'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'leaderboard' ? '🏆 Board' : tab === 'friends' ? '👥 Friends' : '🎖️ Badges'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      {activeTab === 'leaderboard' && (
        <View>
          <Text style={styles.sectionTitle}>Weekly leaderboard</Text>
          <View style={styles.card}>
            <View style={styles.podium}>
              <View style={styles.podiumCol}>
                <View style={[styles.podiumAvatar, { backgroundColor: podium[0].color + '30' }]}>
                  <Text style={[styles.podiumInitials, { color: podium[0].color }]}>{podium[0].initials}</Text>
                </View>
                <Text style={styles.podiumName}>{podium[0].name}</Text>
                <View style={[styles.podiumBar, { height: 60, backgroundColor: podium[0].color }]}>
                  <Text style={styles.podiumPts}>{podium[0].pts}</Text>
                </View>
                <Text style={styles.podiumRank}>🥈</Text>
              </View>
              <View style={styles.podiumCol}>
                <Text style={styles.crownIcon}>👑</Text>
                <View style={[styles.podiumAvatar, { backgroundColor: podium[1].color + '30' }]}>
                  <Text style={[styles.podiumInitials, { color: podium[1].color }]}>{podium[1].initials}</Text>
                </View>
                <Text style={styles.podiumName}>{podium[1].name}</Text>
                <View style={[styles.podiumBar, { height: 90, backgroundColor: podium[1].color }]}>
                  <Text style={styles.podiumPts}>{podium[1].pts}</Text>
                </View>
                <Text style={styles.podiumRank}>🥇</Text>
              </View>
              <View style={styles.podiumCol}>
                <View style={[styles.podiumAvatar, { backgroundColor: podium[2].color + '30' }]}>
                  <Text style={[styles.podiumInitials, { color: podium[2].color }]}>{podium[2].initials}</Text>
                </View>
                <Text style={styles.podiumName}>{podium[2].name}</Text>
                <View style={[styles.podiumBar, { height: 45, backgroundColor: podium[2].color }]}>
                  <Text style={styles.podiumPts}>{podium[2].pts}</Text>
                </View>
                <Text style={styles.podiumRank}>🥉</Text>
              </View>
            </View>
            <Text style={styles.resetNote}>Resets every Sunday midnight</Text>
          </View>

          <Text style={styles.sectionTitle}>Full rankings</Text>
          <View style={styles.card}>
            {[
              { rank: 1, initials: userName ? userName.slice(0, 2).toUpperCase() : 'ME', name: 'You', pts: 420, color: '#e65a37' },
              { rank: 2, initials: 'YN', name: 'Yuna Nakamura', pts: 285, color: '#00D4AA' },
              { rank: 3, initials: 'RK', name: 'Riku Kim', pts: 190, color: '#FFB800' },
              { rank: 4, initials: 'MS', name: 'Min Seo', pts: 120, color: '#FF6B35' },
              { rank: 5, initials: 'JH', name: 'Jess Han', pts: 40, color: '#6B6560' },
            ].map((p, i, arr) => (
              <View key={p.name} style={[styles.rankRow, i === arr.length - 1 && styles.noBorder]}>
                <Text style={[styles.rankNum, p.rank === 1 && styles.rankFirst]}>#{p.rank}</Text>
                <View style={[styles.avatar, { backgroundColor: p.color + '25' }]}>
                  <Text style={[styles.initials, { color: p.color }]}>{p.initials}</Text>
                </View>
                <Text style={styles.rankName}>{p.name}</Text>
                <Text style={styles.rankPts}>{p.pts} pts</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* FRIENDS TAB */}
      {activeTab === 'friends' && (
        <View>
          {/* Add Friend */}
          <Text style={styles.sectionTitle}>Add a friend</Text>
          <View style={styles.card}>
            <View style={styles.addFriendRow}>
              <TextInput
                style={styles.friendInput}
                placeholder="Enter username..."
                placeholderTextColor="#6B6560"
                value={friendInput}
                onChangeText={(t) => { setFriendInput(t); setFriendError(''); }}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.addBtn} onPress={handleAddFriend}>
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
            {friendError ? <Text style={styles.errorText}>{friendError}</Text> : null}
          </View>

          {/* Active Challenges */}
          <Text style={styles.sectionTitle}>Active challenges</Text>
          <View style={styles.card}>
            {challenges.map((c, i) => (
              <View key={c.title} style={[styles.challengeRow, i === challenges.length - 1 && styles.noBorder]}>
                <View style={[styles.challengeIcon, { backgroundColor: c.color + '20' }]}>
                  <Text style={styles.challengeEmoji}>{c.icon}</Text>
                </View>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{c.title}</Text>
                  <Text style={styles.challengeSub}>{c.subtitle}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${c.progress * 100}%`, backgroundColor: c.color }]} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Friends streaks */}
          <Text style={styles.sectionTitle}>Friends' streaks</Text>
          <View style={styles.card}>
            {friendsList.map((f, i) => (
              <View key={f.name} style={[styles.friendRow, i === friendsList.length - 1 && styles.noBorder]}>
                <View style={[styles.avatar, { backgroundColor: f.color + '25' }]}>
                  <Text style={[styles.initials, { color: f.color }]}>{f.initials}</Text>
                </View>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{f.name}</Text>
                  <Text style={styles.friendActivity}>
                    {f.streak > 0 ? `🔥 ${f.streak}-day streak · ${f.activity}` : f.activity}
                  </Text>
                </View>
                {f.status === 'inactive' ? (
                  <TouchableOpacity
                    style={[styles.nudgeBtn, nudged.includes(f.name) && styles.nudgedBtn]}
                    onPress={() => setNudged([...nudged, f.name])}>
                    <Text style={[styles.nudgeTxt, nudged.includes(f.name) && styles.nudgedTxt]}>
                      {nudged.includes(f.name) ? 'Sent ✓' : 'Nudge 👋'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[styles.statusTxt, f.status === 'active' && styles.activeTxt]}>
                    {f.status === 'active' ? 'Active' : f.status}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Weekly summary */}
          <Text style={styles.sectionTitle}>This week's summary</Text>
          <View style={styles.card}>
            {friendsList.filter(f => f.streak > 0).map((f, i, arr) => (
              <View key={f.name} style={[styles.rankRow, i === arr.length - 1 && styles.noBorder]}>
                <View style={[styles.avatar, { backgroundColor: f.color + '25' }]}>
                  <Text style={[styles.initials, { color: f.color }]}>{f.initials}</Text>
                </View>
                <Text style={styles.rankName}>{f.name}</Text>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakFire}>🔥</Text>
                  <Text style={styles.streakNum}>{f.streak}</Text>
                  <Text style={styles.streakDays}>days</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* BADGES TAB */}
      {activeTab === 'badges' && (
        <View>
          <Text style={styles.sectionTitle}>Your badges</Text>
          <View style={styles.card}>
            <View style={styles.badgeGrid}>
              {badges.map(b => (
                <View key={b.label} style={[styles.badgeItem, !b.unlocked && styles.badgeLocked]}>
                  <View style={styles.badgeIcon}>
                    <Text style={styles.badgeEmoji}>{b.icon}</Text>
                  </View>
                  <Text style={styles.badgeLabel}>{b.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Next badges to unlock</Text>
          <View style={styles.card}>
            {[
              { icon: '🚴', label: 'Cyclist', desc: 'Complete 5 cycling sessions', progress: 0.4 },
              { icon: '💯', label: '30-Day Streak', desc: 'Maintain a 30 day streak', progress: 0.4 },
              { icon: '⛰️', label: 'First Hike', desc: 'Complete your first hike', progress: 0 },
            ].map((b, i, arr) => (
              <View key={b.label} style={[styles.nextBadgeRow, i === arr.length - 1 && styles.noBorder]}>
                <Text style={styles.nextBadgeIcon}>{b.icon}</Text>
                <View style={styles.nextBadgeInfo}>
                  <Text style={styles.nextBadgeName}>{b.label}</Text>
                  <Text style={styles.nextBadgeDesc}>{b.desc}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${b.progress * 100}%`, backgroundColor: '#e65a37' }]} />
                  </View>
                </View>
                <Text style={styles.nextBadgePct}>{Math.round(b.progress * 100)}%</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#F5F0E8', marginBottom: 16 },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tab: { flex: 1, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  tabActive: { backgroundColor: '#e65a37', borderColor: '#e65a37' },
  tabText: { color: '#A09A90', fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: '#000' },
  sectionTitle: { fontSize: 11, color: '#A09A90', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 4 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  noBorder: { borderBottomWidth: 0, paddingBottom: 0 },
  podium: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 12 },
  podiumCol: { alignItems: 'center', gap: 4, width: 80 },
  crownIcon: { fontSize: 20 },
  podiumAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  podiumInitials: { fontSize: 13, fontWeight: '700' },
  podiumName: { fontSize: 11, color: '#A09A90' },
  podiumBar: { width: 60, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  podiumPts: { color: '#000', fontWeight: '700', fontSize: 12, paddingVertical: 4 },
  podiumRank: { fontSize: 16 },
  resetNote: { fontSize: 11, color: '#6B6560', textAlign: 'center', marginTop: 12 },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  rankNum: { fontSize: 13, color: '#6B6560', width: 24, fontWeight: '600' },
  rankFirst: { color: '#e65a37' },
  rankName: { flex: 1, color: '#F5F0E8', fontSize: 13, fontWeight: '500' },
  rankPts: { color: '#FFB800', fontSize: 13, fontWeight: '700' },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 12, fontWeight: '700' },
  challengeRow: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  challengeIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  challengeEmoji: { fontSize: 20 },
  challengeInfo: { flex: 1 },
  challengeTitle: { color: '#F5F0E8', fontSize: 13, fontWeight: '500' },
  challengeSub: { color: '#A09A90', fontSize: 11, marginTop: 2 },
  progressBar: { height: 4, backgroundColor: '#252525', borderRadius: 2, marginTop: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  friendRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  friendInfo: { flex: 1 },
  friendName: { color: '#F5F0E8', fontSize: 13, fontWeight: '500' },
  friendActivity: { color: '#A09A90', fontSize: 11, marginTop: 2 },
  nudgeBtn: { borderWidth: 0.5, borderColor: '#e65a37', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  nudgedBtn: { borderColor: '#6B6560' },
  nudgeTxt: { color: '#e65a37', fontSize: 11 },
  nudgedTxt: { color: '#6B6560' },
  statusTxt: { fontSize: 11, color: '#A09A90' },
  activeTxt: { color: '#e65a37' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  streakFire: { fontSize: 14 },
  streakNum: { color: '#e65a37', fontSize: 16, fontWeight: '700' },
  streakDays: { color: '#A09A90', fontSize: 10 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badgeItem: { alignItems: 'center', width: '30%' },
  badgeLocked: { opacity: 0.25 },
  badgeIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#252525', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  badgeEmoji: { fontSize: 26 },
  badgeLabel: { color: '#A09A90', fontSize: 9, textAlign: 'center' },
  nextBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  nextBadgeIcon: { fontSize: 28 },
  nextBadgeInfo: { flex: 1 },
  nextBadgeName: { color: '#F5F0E8', fontSize: 13, fontWeight: '600' },
  nextBadgeDesc: { color: '#A09A90', fontSize: 11, marginTop: 2, marginBottom: 6 },
  nextBadgePct: { color: '#e65a37', fontSize: 13, fontWeight: '700' },
  addFriendRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  friendInput: { flex: 1, backgroundColor: '#252525', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, color: '#F5F0E8', fontSize: 13, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  addBtn: { backgroundColor: '#e65a37', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  addBtnText: { color: '#000', fontWeight: '700', fontSize: 13 },
  errorText: { color: '#FF6B35', fontSize: 11, marginTop: 8 },
});