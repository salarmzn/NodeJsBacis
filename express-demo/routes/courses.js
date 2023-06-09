const express = require('express');

const router = express.Router();

const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' },
];

router.get('', (req, res) => {
    res.send(courses);
});

router.post('', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    var course = courses.find(c => c.id === +req.params.id);
    if (!course)
        return res.status(404).send('The course with the given ID was not fund');
    
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course); 
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

router.delete('/:id', (req, res) => {
    var course = courses.find(c => c.id === +req.params.id);
    if (!course)
        return res.status(404).send('The course with the given ID was not fund');
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course); 
});

router.get('/:id', (req, res) => {
    var course = courses.find(c => c.id === +req.params.id);
    if (!course)
        return res.status(404).send('The course with the given ID was not fund');
    
    res.send(course);
});

module.exports = router;