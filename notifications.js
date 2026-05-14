import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyReminder(enabled) {
  await Notifications.cancelScheduledNotificationAsync('daily').catch(() => {});
  if (!enabled) return;
  await Notifications.scheduleNotificationAsync({
    identifier: 'daily',
    content: {
      title: 'bodiBuddy',
      body: "Don't miss your workout today!",
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}

export async function scheduleStreakAlert(enabled) {
  await Notifications.cancelScheduledNotificationAsync('streak').catch(() => {});
  if (!enabled) return;
  await Notifications.scheduleNotificationAsync({
    identifier: 'streak',
    content: {
      title: 'Streak at risk!',
      body: "You worked out so far until today. Don't break your streak!",
    },
    trigger: {
      hour: 20,
      minute: 0,
      repeats: true,
    },
  });
}

export async function scheduleWeeklyResult(enabled) {
  await Notifications.cancelScheduledNotificationAsync('weekly').catch(() => {});
  if (!enabled) return;
  await Notifications.scheduleNotificationAsync({
    identifier: 'weekly',
    content: {
      title: 'Weekly Results',
      body: 'Check your leaderboard results for this week!',
    },
    trigger: {
      weekday: 1,
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });
}