// server.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';


const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT;
const LINK = process.env.DB_LINKS;


//Middleware
app.use(cors());
app.use(express.json());

// Define the Mongoose Schema and Model for the 'Record'
const recordSchema = new mongoose.Schema({
  fullName: String,
  machineBrand: String,
  licensePlate: String,
  phoneNumber: String,
  dateTime: String,
});

const Record = mongoose.model('Record', recordSchema);

async function start() {
  try {
    await mongoose.connect (LINK)
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
}


// Маршрут для обработки POST-запроса на /api/submit-form
app.post('/', async (req, res) => {
  try {
    const formData = req.body; // В req.body будут храниться данные, отправленные из формы на фронтенде

    // Тут вы можете добавить код для сохранения данных в базе данных MongoDB или выполнять другие действия, которые вам нужны
    // Пример сохранения данных в MongoDB
    // Создаем новую запись в базе данных
    const record = new Record({
      fullName: formData.fullName,
      machineBrand: formData.machineBrand,
      licensePlate: formData.licensePlate,
      phoneNumber: formData.phoneNumber,
      dateTime: formData.dateTime,
    });

    // Сохраняем запись в базе данных
    await record.save();

    // Отправляем ответ клиенту с сообщением об успешном сохранении
    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    // Отправляем ответ клиенту с сообщением об ошибке
    res.status(500).json({ error: 'Form submission failed.' });
  }
});

start();