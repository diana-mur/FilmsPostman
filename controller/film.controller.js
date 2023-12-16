import pool from "../db.js";
// import path from 'path';
// const __dirname = path.resolve();
// import mv from "mv";

class FilmController {
    async createFilm(req, res) {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.files.file;
        const filename = file.name;
        const uploadPath = path.join('C:/Users/Жаным/projectsVSCode/FilmsPostman/client/src/uploads', filename);
        const { title, genres, country } = req.body

        // Перемещение файла на сервер
        file.mv(uploadPath, (error) => {
            if (error) {
                console.error('Error saving file:', error);
                return res.status(500).json({ message: 'Error saving file' });
            }

            const newFilm = pool.query(`INSERT INTO films (title, genres, country, image) VALUES ($1, $2, $3, $4) RETURNING *`, [title, genres, country, filename])

            // Возвращаем информацию о загруженном файле в ответе
            res.json(newFilm.rows)
        });
    }

    async getFilms(req, res) {
        const films = await pool.query(`SELECT * FROM films`)
        res.json(films.rows)
    }

    async getOneFilm(req, res) {
        const id = req.params.id
        const film = await pool.query(`SELECT * FROM films WHERE id=$1`, [id])
        res.json(film.rows[0])
    }

    async updateFilm(req, res) {
        const { id, title, genres, country, image } = req.body
        const film = await pool.query(`UPDATE films SET title=$1, genres=$2, country=$3, image=$4 WHERE id=$5 RETURNING *`,
            [title, genres, country, image, id])
        res.json(film.rows[0])
    }

    async deleteFilm(req, res) {
        const id = req.params.id
        const film = await pool.query(`DELETE FROM films WHERE id=$1`, [id])
        res.json(film.rows[0])
    }
}

// module.exports = new FilmController()
export default new FilmController()