const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const cookieParser = require("cookie-parser");
const { query } = require('express');

// const { createHash } = require('crypto');

// function hash(senha) {
//   return createHash('sha256').update(senha).digest('hex');
// }

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'data/Projeto.db'; // dois pontos barra sobe um nível + o nome da pasta entra nela

const hostname = '127.0.0.1';
const port = 1234;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("./"));

/* Definição dos endpoints das OBRAS*/
/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/obras', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM obras';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/obrasStatus', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = "SELECT * FROM obras WHERE status='" + req.query.statusObra + "'";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/servicosStatus', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = "SELECT * FROM servicos WHERE status='" + req.query.statusServico + "' AND obra_id='" + req.query.obra_id + "'";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/obraId', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT * FROM obras WHERE obra_id =${req.query.obra_id}`;
    console.log(req.query.obra_id)
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereObra', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO obras (nome, endereco, dataInicio, dataFim, descricao) VALUES ('" + req.body.nome + "', '" + req.body.endereco + "', '" + req.body.dataInicio + "', '" + req.body.dataFim + "', '" + req.body.descricao + "')";
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.redirect('/frontend/homeAdmin.html'); //hiperlink volta
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaObra', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = `SELECT * FROM obras WHERE obra_id = ${req.query.obra_id}`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaObra', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE obras SET nome='" + req.body.nome + "', endereco='" + req.body.endereco + "', dataInicio = '" + req.body.dataInicio + "' , dataFim = '" + req.body.dataFim + "', descricao = '" + req.body.descricao + "' WHERE obra_id='" + req.query.obra_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.write('<p>OBRAS ATUALIZADAS COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeObra', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "DELETE FROM obras WHERE obra_id='" + req.query.obra_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>OBRAS REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});



app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

/* Definição dos endpoints dos USUARIOS*/
/******** CRUD ************/
app.get('/usuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM usuarios';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO usuarios (nomeFantasia, cnpj, senha, email, contato1, contato2) VALUES ('" + req.body.nome + "', '" + req.body.cnpj + "', '" + req.body.senha + "', '" + req.body.email + "', '" + req.body.contato1 + "', '" + req.body.nome_empreiteiro + "')";
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.redirect("../frontend/home.html");
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = 'SELECT * FROM usuarios WHERE usuario_id =' + req.body.usuario_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE usuarios SET nomeFantasia='" + req.body.nomeFantasia + "', cnpj='" + req.body.cnpj + "', email = '" + req.body.email + "' , contato1 = '" + req.body.contato1 + "', contato2 = '" + req.body.contato2 + "' WHERE usuario_id='" + req.body.usuario_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.redirect("../frontend/home.html");
    db.close(); // Fecha o banco
});

app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "DELETE FROM usuarios WHERE usuario_id='" + req.query.usuario_id + "'"; 
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>OBRAS REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});



app.get('/feedback', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM feedbacks';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/feedbackId', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT * FROM feedbacks WHERE usuario_id =${req.query.usuario_id}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereFeedback', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO feedbacks (nota, comentario, usuario_id, servico_id) VALUES ('" + req.body.nota + "', '" + req.body.comentario + "', '" + req.body.usuario_id + "', '" + req.body.servico_id + "')";
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.redirect("/atualizaStatusServico?status=Concluido&servico_id='" + req.body.servico_id + "'");
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizafeedback', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = 'SELECT * FROM feedbacks WHERE usuario_id="' + req.query.feedback_id + '" AND servico_id"' + req.query.servico_id + '"';
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizafeedback', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE feedbacks SET nota='" + req.body.nota + "', comentario='" + req.body.comentario + " WHERE usuario_id='" + req.query.usuario_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    // res.redirect("../frontend/home.html");
    db.close(); // Fecha o banco
});

app.get('/removeFeedback', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "DELETE FROM feedbacks WHERE usuario_id='" + req.query.feedback_id + "' AND servico_id'" + req.query.servico_id + "'"; 
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>feedback REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});






///// JOIN DAS TABELAS ///////
app.get('/obraMaisUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT obras.nome, usuarios.nomeFantasia, obras.nome FROM obras FULL OUTER JOIN usuarios ON obras.obra_id=usuarios.usuario_id';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

/* Definição dos endpoints dos SERVICOS*/
/******** CRUD ************/
app.get('/servicos', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM servicos';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/servicosId', (req, res) => {
    res.statusCode = 200;
    // const idObra  = req.params.idObra
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const sql = "SELECT * from servicos WHERE servico_id = '" + req.query.servico_id + "'";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.get('/servicosObraId', (req, res) => {
    res.statusCode = 200;
    // const idObra  = req.params.idObra
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    const sql = "SELECT * from servicos WHERE obra_id = '" + req.query.obra_id + "'";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

app.post('/insereServico', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO servicos (obra_id, tipo, descricao, dataInicio, dataFim ) VALUES ('" + req.query.obra_id + "', '" + req.body.tipo + "', '" + req.body.descricao + "', '" + req.body.dataInicio + "', '" + req.body.dataFim + "')";
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.redirect("../frontend/homeAdmin.html");
    db.close(); // Fecha o banco
    res.end();
});

app.post('/insereAdmin', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO admin (email, senha) VALUES ('" + req.body.email + "', '" + req.body.senha + "')";
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.redirect("../frontend/homeAdmin.html");
    db.close(); // Fecha o banco
    res.end();
});

app.get('/admin', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM admin';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaServico', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    sql = 'SELECT * FROM usuarios WHERE usuario_id =' + req.body.usuario_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaServico', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE servicos SET tipo='" + req.body.tipo + "', dataInicio='" + req.body.dataInicio + "', dataFim = '" + req.body.dataFim + "' , descricao = '" + req.body.descricao + "' WHERE servico_id='" + req.query.servico_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.redirect("../frontend/homeAdmin.html");
    db.close(); // Fecha o banco
});


app.get('/atualizaStatusServico', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE servicos SET status='" + req.query.status + "' WHERE servico_id=" + req.query.servico_id;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.redirect("../frontend/homeAdmin.html");
    db.close(); // Fecha o banco
});

app.get('/atualizaStatusObra', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE obras SET status='" + req.query.status + "' WHERE obra_id='" + req.query.obra_id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.redirect("../frontend/homeAdmin.html");
    db.close(); // Fecha o banco
});

app.get('/removeServico', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "DELETE FROM servicos WHERE usuario_id='" + req.query.servico_id + "'"; 
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>OBRAS REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

// CRUD de candidaturas
app.post('/insereCandidatura', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO candidaturas (servico_id, usuario_id, proposta) VALUES ('" + req.body.servico_id + "', '" + req.body.usuario_id + "', '" + req.body.proposta + "')";
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.redirect("../frontend/obras.html");
    db.close(); // Fecha o banco
    res.end();
});

app.get('/login', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.query.usuario_id){
        let id = req.query.usuario_id;
        res.cookie("id", id, {
            httpOnly: true
        });
        res.redirect("../frontend/meuPerfil.html");
    }
    else if (req.query.admin_id){
        let admin = req.query.admin_id
        res.cookie("admin_id", admin, {
            httpOnly: true
        });
        res.redirect("../frontend/homeAdmin.html");
    }
});

app.get('/logout', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.clearCookie("id");
    res.redirect("../frontend/home.html");
});

app.get('/cookies', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.headers.cookie){
        if(req.headers.cookie.includes("id")){
            res.json(req.headers.cookie);
        } else{
            res.json("deslogado");
        }
    } else{
        res.json("deslogado");
    }
});

app.get('/cookiesAdmin', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.headers.cookie){
        if(req.headers.cookie.includes("admin_id")){
            res.json(req.headers.cookie);
        } else{
            res.json("deslogado");
        }
    } else{
        res.json("deslogado");
    }
});