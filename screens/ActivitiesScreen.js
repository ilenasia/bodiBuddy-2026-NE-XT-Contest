import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Video } from 'expo-av';

export default function ActivitiesScreen({ totalPoints = 0, setTotalPoints, activitiesAdded = [], setActivitiesAdded, joined = [], setJoined, videoWatched = [], setVideoWatched }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);

  const categories = ['All', 'Cardio', 'Strength', 'Flexibility', 'Outdoor'];

  const activities = [
    { id: 1, icon: '🏃', name: 'Running', category: 'Cardio', duration: '15 min', pts: 25, level: 'Med', desc: 'Outdoor or treadmill run to boost cardio.', video: false },
    { id: 2, icon: '🚴', name: 'Cycling', category: 'Cardio', duration: '20 min', pts: 30, level: 'Med', desc: 'Road or stationary bike session.', video: false },
    { id: 3, icon: '🚶', name: 'Walking', category: 'Cardio', duration: '1,000 steps', pts: 10, level: 'Low', desc: 'A light walk to stay active daily.', video: false },
    { id: 4, icon: '🧘', name: 'Yoga', category: 'Flexibility', duration: '1 lesson', pts: 20, level: 'Low', desc: 'Follow a full yoga lesson video.', video: true, videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 5, icon: '🤸', name: 'Pilates', category: 'Flexibility', duration: '1 lesson', pts: 20, level: 'Low', desc: 'Core strengthening and flexibility.', video: true, videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 6, icon: '⛰️', name: 'Hiking', category: 'Outdoor', duration: '30 min', pts: 35, level: 'High', desc: 'Trail or nature hike outdoors.', video: false },
    { id: 7, icon: '🏊', name: 'Swimming', category: 'Cardio', duration: '20 min', pts: 30, level: 'High', desc: 'Laps in the pool for full body workout.', video: false },
    { id: 8, icon: '🏋️', name: 'Weight Training', category: 'Strength', duration: '30 min', pts: 35, level: 'High', desc: 'Follow a full home workout video.', video: true, videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 9, icon: '🤼', name: 'HIIT', category: 'Strength', duration: '20 min', pts: 40, level: 'High', desc: 'High intensity interval training video.', video: true, videoUri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 10, icon: '🏸', name: 'Badminton', category: 'Outdoor', duration: '30 min', pts: 25, level: 'Med', desc: 'Singles or doubles badminton match.', video: false },
    { id: 11, icon: '⚽', name: 'Football', category: 'Outdoor', duration: '45 min', pts: 40, level: 'High', desc: 'Casual or competitive football game.', video: false },
    { id: 12, icon: '🧗', name: 'Climbing', category: 'Strength', duration: '30 min', pts: 35, level: 'High', desc: 'Indoor wall or outdoor rock climbing.', video: false },
  ];

  const levelColors = { Low: '#00D4AA', Med: '#C8FF00', High: '#FF6B35' };
  const joinedIds = activitiesAdded.map(a => a.id);
  const filtered = selectedCategory === 'All'
    ? activities
    : activities.filter(a => a.category === selectedCategory);

  const handleJoin = (id) => {
    const activity = activities.find(a => a.id === id);
    if (joinedIds.includes(id)) {
      setJoined(joined.filter(j => j !== id));
      setTotalPoints(totalPoints - activity.pts);
      setActivitiesAdded(activitiesAdded.filter(a => a.id !== id));
    } else {
      setJoined([...joined, id]);
      setTotalPoints(totalPoints + activity.pts);
      setActivitiesAdded([...activitiesAdded, { id: activity.id, icon: activity.icon, label: activity.name, pts: `+${activity.pts} pts`, done: true }]);
    }
  };

  const handleVideoFinish = (id) => {
    if (!videoWatched.includes(id)) {
      const activity = activities.find(a => a.id === id);
      setVideoWatched([...videoWatched, id]);
      setJoined([...joined, id]);
      setTotalPoints(totalPoints + activity.pts);
      setActivitiesAdded([...activitiesAdded, { id: activity.id, icon: activity.icon, label: activity.name, pts: `+${activity.pts} pts`, done: true }]);
    }
    setActiveVideo(null);
  };
  return (
    <View style={styles.wrapper}>

    
      {activeVideo && (
        <Modal visible={true} animationType="slide" transparent={false}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{activeVideo.name}</Text>
            <Text style={styles.modalSub}>Watch the full video to count your streak!</Text>
            <Video
              source={{ uri: activeVideo.videoUri }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  handleVideoFinish(activeVideo.id);
                }
              }}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setActiveVideo(null)}>
              <Text style={styles.closeBtnText}>✕ Close without completing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => handleVideoFinish(activeVideo.id)}>
              <Text style={styles.doneBtnText}>✓ Mark as completed</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Activities</Text>
        <Text style={styles.subtitle}>Pick your sport, earn your points 💪</Text>

    
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryList}>
          {categories.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.catBtn, selectedCategory === c && styles.catBtnActive]}
              onPress={() => setSelectedCategory(c)}>
              <Text style={[styles.catText, selectedCategory === c && styles.catTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Legend */}
        <View style={styles.legendRow}>
          {Object.entries(levelColors).map(([level, color]) => (
            <View key={level} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{level} intensity</Text>
            </View>
          ))}
        </View>

        {/* Activities List */}
        {filtered.map(a => (
          <View key={a.id} style={styles.actCard}>
            <View style={styles.actTop}>
              <View style={[styles.actIconBox, { backgroundColor: levelColors[a.level] + '20' }]}>
                <Text style={styles.actIcon}>{a.icon}</Text>
              </View>
              <View style={styles.actInfo}>
                <View style={styles.actNameRow}>
                  <Text style={styles.actName}>{a.name}</Text>
                  {a.video && (
                    <View style={styles.videoBadge}>
                      <Text style={styles.videoBadgeText}>📹 Video</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.actDesc}>{a.desc}</Text>
                <View style={styles.actMeta}>
                  <View style={[styles.levelBadge, { backgroundColor: levelColors[a.level] + '20' }]}>
                    <Text style={[styles.levelText, { color: levelColors[a.level] }]}>{a.level}</Text>
                  </View>
                  <Text style={styles.actDuration}>⏱ {a.duration}</Text>
                  <Text style={styles.actPts}>+{a.pts} pts</Text>
                </View>
              </View>
            </View>

            {/* Video button */}
            {a.video && (
              <TouchableOpacity
                style={[styles.videoBtn, videoWatched.includes(a.id) && styles.videoBtnDone]}
                onPress={() => !videoWatched.includes(a.id) && setActiveVideo(a)}>
                <Text style={[styles.videoBtnText, videoWatched.includes(a.id) && styles.videoBtnTextDone]}>
                  {videoWatched.includes(a.id)
                    ? '✓ Video completed — streak counted!'
                    : '▶ Watch video to count streak'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Regular button */}
            {!a.video && (
              <TouchableOpacity
                style={[styles.joinBtn, joinedIds.includes(a.id) && styles.joinedBtn]}
                onPress={() => handleJoin(a.id)}>
                <Text style={[styles.joinText, joinedIds.includes(a.id) && styles.joinedText]}>
                  {joinedIds.includes(a.id) ? '✓ Added to today' : '+ Add to today'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#0D0D0D' },
  container: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: '#F5F0E8', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#A09A90', marginBottom: 16 },
  categoryScroll: { marginBottom: 12 },
  categoryList: { gap: 8, paddingRight: 20 },
  catBtn: { backgroundColor: '#1E1E1E', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  catBtnActive: { backgroundColor: '#e65a37', borderColor: '#e65a37' },
  catText: { color: '#A09A90', fontSize: 13, fontWeight: '500' },
  catTextActive: { color: '#000' },
  legendRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 10, color: '#6B6560' },
  actCard: { backgroundColor: '#1E1E1E', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  actTop: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  actIconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  actIcon: { fontSize: 24 },
  actInfo: { flex: 1 },
  actNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  actName: { color: '#F5F0E8', fontSize: 15, fontWeight: '600' },
  actDesc: { color: '#A09A90', fontSize: 12, marginBottom: 8, lineHeight: 16 },
  actMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelBadge: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  levelText: { fontSize: 11, fontWeight: '500' },
  actDuration: { fontSize: 11, color: '#A09A90' },
  actPts: { fontSize: 11, color: '#FFB800', fontWeight: '700' },
  videoBadge: { backgroundColor: 'rgba(255,184,0,0.15)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2 },
  videoBadgeText: { fontSize: 10, color: '#FFB800' },
  videoBtn: { backgroundColor: 'rgba(255,184,0,0.1)', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 0.5, borderColor: '#FFB800' },
  videoBtnDone: { backgroundColor: 'rgba(0,212,170,0.1)', borderColor: '#00D4AA' },
  videoBtnText: { color: '#FFB800', fontSize: 13, fontWeight: '600' },
  videoBtnTextDone: { color: '#00D4AA' },
  joinBtn: { backgroundColor: 'transparent', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 0.5, borderColor: '#e65a37' },
  joinedBtn: { backgroundColor: 'rgba(0,212,170,0.1)', borderColor: '#00D4AA' },
  joinText: { color: '#e65a37', fontSize: 13, fontWeight: '600' },
  joinedText: { color: '#00D4AA' },
  modalContainer: { flex: 1, backgroundColor: '#0D0D0D', padding: 24, justifyContent: 'center' },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#F5F0E8', marginBottom: 6, textAlign: 'center' },
  modalSub: { fontSize: 13, color: '#A09A90', textAlign: 'center', marginBottom: 24 },
  video: { width: '100%', height: 220, borderRadius: 16, backgroundColor: '#1E1E1E', marginBottom: 24 },
  closeBtn: { padding: 14, alignItems: 'center', marginBottom: 10 },
  closeBtnText: { color: '#6B6560', fontSize: 13 },
  doneBtn: { backgroundColor: '##e65a37', borderRadius: 12, padding: 16, alignItems: 'center' },
  doneBtnText: { color: '#000', fontWeight: '700', fontSize: 15 },
});