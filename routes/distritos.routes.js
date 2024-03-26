import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add2', (req,res)=>{
    res.render('clientes/add');
});

router.post('/add2', async (req, res) => {
    try {
        const {  distritos } = req.body; 
        const newCliente = {  clidit: distritos }; 
        await pool.query('INSERT INTO clientes SET ?', [newCliente]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/list2', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM clientes');
        res.render('distritos/list', {clientes: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});



router.get('/edit2/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [cliente] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        const clienteEdit = cliente[0];
        res.render('clientes/edit', { cliente: clienteEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/edit2/:id', async (req, res) => {
    try {
        const { nomcli, apecli, nrodnicli, telcli, distrito } = req.body;
        const { id } = req.params;
        const editCliente = { nomcli, apecli, nrodnicli, telcli, clidit: distrito };
        await pool.query('UPDATE clientes SET ? WHERE id = ?', [editCliente, id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;







