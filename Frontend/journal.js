import API from '../utils/api';

const handleSubmit = async () => {
  try {
    const response = await API.post('/', {
      date,
      howWasYourDay,
      bestMemory,
      worstMemory,
      rating,
    });
    alert('Entry saved!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
