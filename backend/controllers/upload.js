const Sticker = require('../models/stickers');
const fs = require('fs');
const path = require('path');

const uploadFile = async (req, res, next) => {
  try {
    if (req.file) {
      const position = req.body.position;
      const name = req.file.filename;

      // Проверяем наличие записи с таким же полем position
      const existingSticker = await Sticker.findOne({ position });

      if (existingSticker) {
        // Если запись существует, удаляем фото и запись
        await deleteSticker(existingSticker.name);
      }

      // Сохраняем информацию о загруженной фотографии в базу данных
      const sticker = new Sticker({ position, name });
      await sticker.save();

      res.json({ path: name });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

const getStickerByPosition = async (req, res, next) => {
  try {
    const position = req.params.position;
    const sticker = await Sticker.findOne({ position });

    if (!sticker) {
      res.status(404).json({ error: 'Фотография не найдена' });
      return;
    }

    res.json({ path: sticker.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

const deleteSticker = async (stickerName) => {
  try {
    const imagePath = path.join(__dirname, '..', 'images', stickerName);

    // Удаляем фото
    fs.unlinkSync(imagePath);

    // Удаляем запись из MongoDB
    await Sticker.deleteOne({ name: stickerName });
  } catch (error) {
    console.error('Ошибка при удалении стикера', error);
  }
};

module.exports = { uploadFile, getStickerByPosition };
