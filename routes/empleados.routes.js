import {Router} from 'express';
import pool from '../database.js';

const router = Router();

router.get('/add1/', (req,res)=>{
    res.render('empleados/add');
});

router.post('/add1/', async (req, res) => {
    try {
        const { nomemp, apeemp, nrodniemp, telemp, distritos, salario } = req.body; 
        const newEmpleado = { nomemp, apeemp, nrodniemp, telemp, empdistrito: distritos, salario }; 
        await pool.query('INSERT INTO empleados SET ?', [newEmpleado]);
        res.redirect('/list1');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/list1/', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM empleados');
        res.render('empleados/list', {empleados: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit1/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [empleado] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
        const empleadoEdit = empleado[0];
        res.render('empleados/edit', { empleado: empleadoEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/edit1/:id', async (req, res) => {
    try {
        const { nomemp, apeemp, nrodniemp, telemp, distrito, salario } = req.body;
        const { id } = req.params;
        const editEmpleado = { nomemp, apeemp, nrodniemp, telemp, empdistrito: distrito, salario };
        await pool.query('UPDATE empleados SET ? WHERE id = ?', [editEmpleado, id]);
        res.redirect('/list1');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/delete1/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM empleados WHERE id = ?', [id]);
        res.redirect('/list1');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;
