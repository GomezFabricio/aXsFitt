import axios from 'axios';

const verifyEmail = async (email) => {
  const options = {
    method: 'GET',
    url: 'https://mailok-email-validation.p.rapidapi.com/verify',
    params: { email },
    headers: {
      'x-rapidapi-key': '650eb1b9afmshe64ac057058eef3p1a8388jsne9092659eba8',
      'x-rapidapi-host': 'mailok-email-validation.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    return null;
  }
};

export default verifyEmail;