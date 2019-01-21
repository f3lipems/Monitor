/* System */

// Modules
const os = require('os');
const cluster = require('cluster');
const http = require('http');
const path = require('path');

// Packages
const express = require('express');
const bodyParser = require('body-parser');
const { fork } = require('child_process');
// const mongoose = require('mongoose');

const monitor = require('./controllers/monitorActions');

const app = express();
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
    res.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

//Controllers
const crud_log = require('./controllers/log');

//Models
const log = require('./models/log');

//Routes
const indexRouter = require('./routes/home');
const errorRouter = require('./routes/error');

const monitorCreateRouter = require('./routes/monitor/create');
const monitorUpdateRouter = require('./routes/monitor/update');
const monitorStatusRouter = require('./routes/monitor/status');
const monitorPanelRouter = require('./routes/monitor/panel');
const monitorNormalizeRouter = require('./routes/monitor/normalize');
const monitorAdjustmentRouter = require('./routes/monitor/adjustment');

// Log Init
async function initLog(){
	await crud_log.create('Application Ok');
	console.log('Create Ok');
}

// Init Monitor
async function createMonitor(){
    await monitor.generateMonitor();
    console.log('Create Monitor');
}

// Update Status Monitor
async function updateStatus(){
    await monitor.randomUpdate();
    setTimeout(() => {
        updateStatus();        
    }, 1000);
}

/* Application */
async function application(){
    
    // Public - Static
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'static')));
    console.log('Statics OK');
    
    // view
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    
    // Routes
	app.use(bodyParser.urlencoded({extended: true}));
	app.use('/', indexRouter);
    app.use('/error', errorRouter);

    // app.use('/monitor', monitorRouter);
    app.use('/monitor-create', monitorCreateRouter);    
    app.use('/monitor-update', monitorUpdateRouter);    
    app.use('/monitor-status', monitorStatusRouter);    
    app.use('/monitor-panel', monitorPanelRouter);    
    app.use('/normalize', monitorNormalizeRouter);    
    app.use('/adjustment', monitorAdjustmentRouter);    

    // listen
    app.listen(8000, 'localhost');

    // console
    console.log('localhost:8000');	

    initLog();
    
    createMonitor();
    updateStatus();
}

// cluster
// if(cluster.isMaster)
//     for(let i=0, n=os.cpus().length*1; i<n; i+=1)
//         cluster.fork();
// else

application();