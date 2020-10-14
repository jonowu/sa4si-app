import { Share } from 'react-native';

const share = async (title) => {
  try {
    await Share.share({
      message: `I made a difference by completing the action "${title}"! Download the #SA4SI app to join me!`,
    });
  } catch (error) {
    alert(error.message);
  }
};

export default share;
