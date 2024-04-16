import axios from 'axios';

export async function sendWhatsappMessage(number: string, message: string) {
  await axios.post(
    `${process.env.WHATSAPP_API_URL}/message/text`,
    {
      id: number,
      message,
    },
    {
      params: {
        key: process.env.WHATSAPP_API_KEY,
      },
      headers: {
        Authorization: `bearer ${process.env.WHATSAPP_API_TOKEN}`,
      },
    },
  );
}
