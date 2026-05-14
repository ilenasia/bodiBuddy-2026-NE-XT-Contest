import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';

const API_KEY = 'AIzaSyBKjbRa7dBhpol12mRcdNXKq8Q4wG-0WiI';

export default function VideoSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [watched, setWatched] = useState([]);

  const searchVideos = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' workout')}&type=video&maxResults=10&key=${API_KEY}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (e) {
      console.log('Error:', e);
    }
    setLoading(false);
  };

  const handleWatched = (videoId) => {
    if (!watched.includes(videoId)) {
      setWatched([...watched, videoId]);
    }
    setActiveVideo(null);
  };

  const openVideo = (videoId, title) => {
    setActiveVideo({ videoId, title });
  };

  return (
    <View style={styles.wrapper}>

      {/* Video Player Modal */}
      {activeVideo && (
        <Modal visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle} numberOfLines={2}>{activeVideo.title}</Text>
            <Text style={styles.modalSub}>Watch the full video to count your streak!</Text>

            {/* YouTube iframe embed */}
            <View style={styles.iframeContainer}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setActiveVideo(null)}>
              <Text style={styles.closeBtnText}>✕ Close without completing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => handleWatched(activeVideo.videoId)}>
              <Text style={styles.doneBtnText}>✓ Mark as completed — count streak!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <ScrollView style={styles.container}>
        <Text style={styles.pageTitle}>Workout Videos</Text>
        <Text style={styles.subtitle}>Search, watch and count your streak 🎬</Text>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search e.g. yoga, HIIT, pilates..."
            placeholderTextColor="#6B6560"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={searchVideos}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={searchVideos}>
            <Text style={styles.searchBtnText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Suggested searches */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          <View style={styles.suggestRow}>
            {['Yoga', 'HIIT', 'Pilates', 'Stretching', 'Abs', 'Full Body'].map(s => (
              <TouchableOpacity
                key={s}
                style={styles.suggestBtn}
                onPress={() => setQuery(s)}>
                <Text style={styles.suggestText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Loading */}
        {loading && (
          <Text style={styles.loadingText}>Searching videos...</Text>
        )}

        {/* Results */}
        {results.map(item => {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const channel = item.snippet.channelTitle;
          const thumb = item.snippet.thumbnails.medium.url;
          const isWatched = watched.includes(videoId);

          return (
            <View key={videoId} style={styles.videoCard}>
              <TouchableOpacity onPress={() => openVideo(videoId, title)}>
                <View style={styles.thumbContainer}>
                  <Image
                    source={{ uri: thumb }}
                    style={styles.thumb}
                    resizeMode="cover"
                  />
                  <View style={styles.playOverlay}>
                    <View style={styles.playCircle}>
                      <Text style={styles.playIcon}>▶</Text>
                    </View>
                  </View>
                  {isWatched && (
                    <View style={styles.watchedOverlay}>
                      <Text style={styles.watchedOverlayText}>✓ Completed</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
                <Text style={styles.videoChannel}>{channel}</Text>
                <TouchableOpacity
                  style={[styles.watchBtn, isWatched && styles.watchedBtn]}
                  onPress={() => !isWatched && openVideo(videoId, title)}>
                  <Text style={[styles.watchBtnText, isWatched && styles.watchedBtnText]}>
                    {isWatched ? '✓ Streak counted!' : '▶ Watch to count streak'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {/* Empty state */}
        {results.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎬</Text>
            <Text style={styles.emptyText}>Search for a workout video</Text>
            <Text style={styles.emptySubtext}>Watch the full video to count it as your daily streak!</Text>
          </View>
        )}

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
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  searchInput: { flex: 1, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, color: '#F5F0E8', fontSize: 14, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  searchBtn: { backgroundColor: '#e65a37', borderRadius: 12, width: 44, alignItems: 'center', justifyContent: 'center' },
  searchBtnText: { fontSize: 18 },
  suggestRow: { flexDirection: 'row', gap: 8 },
  suggestBtn: { backgroundColor: '#1E1E1E', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  suggestText: { color: '#A09A90', fontSize: 12 },
  loadingText: { color: '#A09A90', textAlign: 'center', marginTop: 20, fontSize: 13 },
  videoCard: { backgroundColor: '#1E1E1E', borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)' },
  thumbContainer: { height: 180, position: 'relative' },
  thumb: { width: '100%', height: '100%' },
  playOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  playCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(200,255,0,0.9)', alignItems: 'center', justifyContent: 'center' },
  playIcon: { fontSize: 20, color: '#000', marginLeft: 4 },
  watchedOverlay: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,212,170,0.9)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  watchedOverlayText: { color: '#000', fontSize: 11, fontWeight: '700' },
  videoInfo: { padding: 12 },
  videoTitle: { color: '#F5F0E8', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  videoChannel: { color: '#A09A90', fontSize: 12, marginBottom: 10 },
  watchBtn: { backgroundColor: 'rgba(255,184,0,0.1)', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 0.5, borderColor: '#FFB800' },
  watchedBtn: { backgroundColor: 'rgba(0,212,170,0.1)', borderColor: '#00D4AA' },
  watchBtnText: { color: '#FFB800', fontSize: 13, fontWeight: '600' },
  watchedBtnText: { color: '#00D4AA' },
  modalContainer: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#F5F0E8', marginBottom: 6, marginTop: 40 },
  modalSub: { fontSize: 12, color: '#A09A90', marginBottom: 16 },
  iframeContainer: { flex: 1, marginBottom: 16, borderRadius: 16, overflow: 'hidden', minHeight: 220 },
  closeBtn: { padding: 14, alignItems: 'center' },
  closeBtnText: { color: '#6B6560', fontSize: 13 },
  doneBtn: { backgroundColor: '#e65a37', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 20 },
  doneBtnText: { color: '#000', fontWeight: '700', fontSize: 15 },
  emptyState: { alignItems: 'center', marginTop: 60, gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: '#F5F0E8', fontSize: 15, fontWeight: '600' },
  emptySubtext: { color: '#A09A90', fontSize: 12, textAlign: 'center' },
});