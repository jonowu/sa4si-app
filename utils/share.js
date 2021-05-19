import { Share } from 'react-native';

const share = async (message) => {
  try {
    await Share.share({
      message,
    });
  } catch (error) {
    alert(error.message);
  }
};

export { share };
