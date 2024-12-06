import axios from 'axios';

const verifyEmail = async (email) => {
  const options = {
    method: 'POST',
    url: 'https://email-verifier15.p.rapidapi.com/verify-emails',
    headers: {
      'x-rapidapi-key': '650eb1b9afmshe64ac057058eef3p1a8388jsne9092659eba8',
      'x-rapidapi-host': 'email-verifier15.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: [
      {
        email: email,
        valid: false,
        disposable: false,
        validators: {
          regex: { valid: true },
          typo: { valid: true },
          disposable: { valid: true },
          mx: { valid: true },
          smtp: {
            valid: false,
            reason: 'Mailbox not found.'
          }
        }
      }
    ]
  };

  try {
    const response = await axios.request(options);
    console.log('API Response:', response.data);
    return response.data[0]; // Devolver el primer (y único) resultado
  } catch (error) {
    console.error('Error verifying email:', error);
    return null;
  }
};

export default verifyEmail;