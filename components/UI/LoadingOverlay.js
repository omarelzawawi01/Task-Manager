import{ View ,ActivityIndicator, StyleSheet,Text} from 'react-native';
import GlobalStyles from '../../constants/styles';
function LoadingOverlay(props) {
          return (
                    <View style={styles.container} >
                              <ActivityIndicator size="large" color="black" />
                              <Text>{props.message}</Text>

                    </View>
          );
}
export default LoadingOverlay;
const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 24,
                    // backgroundColor: GlobalStyles.colors.primary700,
          },

});