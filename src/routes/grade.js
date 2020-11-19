import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

const router = express.Router();

// 1 Criar uma grade
router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;
    if (!grade.student || !grade.subject || !grade.type || grade.value == null) {
      throw new Error('Os campos - student, subject, type e value - são obrigatórios');
    }

    const data = JSON.parse(await readFile(global.filename));

    grade = {
      id: data.nextId++,
      student: grades.student,
      subject: grades.subject,
      type: grades.type,
      value: grades.value,
      timestamp: new Date(),
    };

    data.grade.push(grade);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(grade);

    global.logger.info(`POST /grades - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

// Atualizar grade pelo id
router.put('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const index = data.grades.findIndex((grade) => grade.id === parseInt(req.params.id));

    if (index < 0) {
      return res.send({ error: error.message });
    } else {
      const data = JSON.parse(await readFile(global.filename));
    }

    let { student, subject, type, value } = req.body;

    data.grades[index].student = student;
    data.grades[index].subject = subject;
    data.grades[index].type = type;
    data.grades[index].value = value;

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.json({ student, subject, type, value });

    global.logger.info(`PUT /grades/:id - ${JSON.stringify(student, subject, type, value)}`);
  } catch (err) {
    next(err);
  }
});

// Excluir uma grade pelo id
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    data.grades = data.grades.filter((grade) => grade.id !== parseInt(req.params.id));

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.end();

    global.logger.info(`DELETE /grades/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

// Consultar todas as grades
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));

    res.send(data);

    global.logger.info(`GET /grades`);
  } catch (err) {
    next(err);
  }
});

// Consultar grade pelo id
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const grade = data.grades.find((grade) => grade.id !== parseInt(req.params.id));

    res.send(grade);

    global.logger.info(`GET /grades/id - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

// Total de grades pelo student e subject
router.get('/total/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const grades = data.grades.filter(({ student, subject } = student) => {
      return student === req.params.student && subject === req.params.subject;
    });

    const totalGrade = grades.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    res.json({ total: totalGrade });

    global.logger.info(`GET /grades/total/:student/:subject - ${JSON.stringify(totalGrade)}`);
  } catch (err) {
    next(err);
  }
});

// Consultar a média de grades pelo subject e type
router.get('/average/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const grades = data.grades.filter(({ subject, type } = grade) => {
      return subject === req.params.subject && type === req.params.type;
    });

    const gradesSum = grades.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    const average = gradeSum / grades.length;

    res.json(average);

    global.logger.info(`GET /grades/average/:subject/:type - ${JSON.stringify(average)}`);
  } catch (err) {
    next(err);
  }
});

// Retornar as 3 melhores notas consultando pelo subject e type
router.get('/firsts/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const top3 = data.grades
      .filter(({ subject, type } = grade) => {
        return subject === req.params.subject && type === req.params.type;
      })
      .sort((a, b) => b.value - a.value)
      .splice(0, 3);

    res.send(top3);

    global.logger.info(`GET /grades/firsts/:subject/:type - ${JSON.stringify(top3)}`);
  } catch (err) {
    next(err);
  }
});

// tratamento de erro
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
