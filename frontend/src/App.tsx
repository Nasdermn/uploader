import { useCallback, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [img, setImg] = useState<File | null>(null);
  const [position, setPosition] = useState<number>(2);
  const [stickers, setStickers] = useState<string[]>([]);
  const baseUrl = 'http://localhost:8080';

  const fetchStickers = useCallback(async () => {
    try {
      const fetchedStickers = [];

      for (let i = 1; i <= 8; i++) {
        const response = await axios.get(`${baseUrl}/stickers/${i}`);
        const stickerPath = response.data.path;
        fetchedStickers.push(stickerPath);
      }

      setStickers(fetchedStickers);
    } catch (error) {
      console.error('Ошибка при получении стикеров', error);
    }
  }, []);

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      if (img) {
        data.append('image', img);
        data.append('position', String(position));

        const response = await axios.post(`${baseUrl}/upload`, data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });

        // Обновляем список стикеров после успешной загрузки нового стикера
        fetchStickers();

        console.log(response);
      } else {
        console.log('Файл не выбран');
      }
    } catch (error) {
      console.log(error);
    }
  }, [img, position, fetchStickers]);

  useEffect(() => {
    // Вызываем функцию для получения стикеров при загрузке компонента
    fetchStickers();
  }, [fetchStickers]);

  return (
    <div className='app'>
      <div className='stickers-container'>
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={`http://localhost:8080/images/${sticker}`}
            alt={`Sticker ${index + 1}`}
            className='sticker'
          />
        ))}
      </div>
      <input
        type='file'
        onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
        className='input'
      />
      <input
        type='number'
        value={position}
        onChange={(e) => setPosition(parseInt(e.target.value, 10))}
        className='input'
        min='1'
        max='8'
        placeholder='Введите позицию (1-8)'
      />
      <button className='btn' onClick={sendFile}>
        Добавить стикер
      </button>
    </div>
  );
}

export default App;
