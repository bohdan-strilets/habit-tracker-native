import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_DISPLAY_NAME } from '../../constants/branding';
import { gradients } from '../../theme';
import { styles } from './AppHeader.styles';

const LOGO = require('../../assets/logo.png');

type AppHeaderProps = {
  subtitle?: string;
};

export const AppHeader = ({ subtitle }: AppHeaderProps) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <LinearGradient
        colors={[...gradients.header]}
        locations={[...gradients.headerLocations]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.headerFill}
      >
        <View style={styles.inner}>
          <View style={styles.titleRow}>
            <Image
              source={LOGO}
              style={styles.logo}
              accessible={false}
              importantForAccessibility="no"
              resizeMode="contain"
            />
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{APP_DISPLAY_NAME}</Text>
              {subtitle ? (
                <Text style={styles.subtitle}>{subtitle}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
