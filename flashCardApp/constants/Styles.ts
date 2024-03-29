import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const defaultStyles = StyleSheet.create({
  container: { flex: 1 },
  bottomButton: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    width: 300,
    flex: 1,
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.light.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: Colors.light.darkGrey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    backgroundColor: Colors.light.white,
  },
  button: {
    backgroundColor: Colors.light.button,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    textAlign: 'center',
  },
});
