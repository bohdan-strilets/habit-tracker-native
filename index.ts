import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { configureHabitNotificationHandler } from '@utils/habitReminders';
import { registerRootComponent } from 'expo';

import App from '@/App';

configureHabitNotificationHandler();

registerRootComponent(App);
