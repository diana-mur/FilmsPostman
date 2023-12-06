import { useEffect, useState } from "react";
import "./App.css"

function App() {
    const [getInfo, setGetInfo] = useState([]);
    const [postInfo, setPostInfo] = useState({
        title: '',
        genres: '',
        country: '',
    });
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('')

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostInfo({ ...postInfo, [name]: value });
    };

    useEffect(() => {
        fetch('http://localhost:8080/films')
            .then((response) => response.json())
            .then((json) => setGetInfo(json));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', image); // imageFile - объект File вашего изображения
            formData.append('imageName', imageName);
            formData.append('title', postInfo.title);
            formData.append('genres', postInfo.genres);
            formData.append('country', postInfo.country);

            const response = await fetch('http://localhost:8080/films', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Данные успешно отправлены на сервер');
            } else {
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
        // для отправки ТОЛЬКО ТЕКСТОВЫХ данных можно использовать
        // следующую конструкцию

        // try {
        //     const response = await fetch('http://localhost:8080/films', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(postInfo),
        //     });

        //     if (response.ok) {
        //         console.log('Данные успешно отправлены на сервер');
        //     } else {
        //         console.error('ошибка при отправке данных на сервер');
        //     }
        // } catch (error) {
        //     console.error('Ошибка при отправке данных:', error);
        // }
    };

    return (
        <>
            <h1>Список фильмов</h1>
            <div className="filmList">
                {getInfo.map(el => (
                    <div className="cardFilm" key={el.id}>
                        <div className="cardFilmImage">
                            <img
                                src={'src/uploads/' + el.image}
                                alt="image"
                            />
                        </div>
                        <h3>{el.title}</h3>
                        <p>{el.genres}</p>
                        <p>{el.country}</p>
                    </div>
                ))}
            </div>

            <div className="formAddFilm">
                <h2>Добавить фильм</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Название:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={postInfo.title}
                        onChange={handleChange}
                    />
                    <label>
                        Жанр(ы):
                    </label>
                    <input
                        type="text"
                        name="genres"
                        value={postInfo.genres}
                        onChange={handleChange}
                    />
                    <label>
                        Страна:
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={postInfo.country}
                        onChange={handleChange}
                    />
                    <label>
                        Изображение:
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </>
    )
};

export default App