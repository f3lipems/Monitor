const monitor = require('../controllers/monitor');
const file = require('fs');

class MonitorActions{

    static async monitorCreate(req, res){
        try{
            let newMonitor = new monitor();
            saveMonitor(newMonitor);
            res.render('../views/home.html', {monitor:newMonitor});
        }
        catch(error){
            console.log(error);
            res.render('./error.html', {error: error});
        }
    }

    static async generateMonitor(){
        let newMonitor = new monitor();
        saveMonitor(newMonitor);
    }

    static async monitorUpdate(req, res){
        try{
            randomUpdate()
            res.send(JSON.parse(getMonitor()));
        }    
        catch(error){
            console.log(error);
            res.send({error: error});
        }
    };

    static async randomUpdate(){
        let setMonitor = JSON.parse(getMonitor());
        let box = Math.round(Math.random() * (6 - 1) + 1);
        let alt = Boolean(Math.round(Math.random()));
        
        switch(box){
            case 1:
                if(alt){
                    setMonitor.pilsner += 0.25;
                }else{
                    setMonitor.pilsner -= 0.25;
                }
                break;
            case 2:
                if(alt){
                    setMonitor.ipa += 0.25;
                }else{
                    setMonitor.ipa -= 0.25;
                }
                break;
            case 3:
                if(alt){
                    setMonitor.lager += 0.25;
                }else{
                    setMonitor.lager -= 0.25;
                }
                break;
            case 4:
                if(alt){
                    setMonitor.stout += 0.25;
                }else{
                    setMonitor.stout -= 0.25;
                }
                break;
            case 5:
                if(alt){
                    setMonitor.wheat += 0.25;
                }else{
                    setMonitor.wheat -= 0.25;
                }
                break;
            case 6:
                if(alt){
                    setMonitor.pale += 0.25;
                }else{
                    setMonitor.pale -= 0.25;
                }
                break;
        }
        saveMonitor(setMonitor);
    }

    static monitorStatus(req, res){
        try{
            res.send(JSON.parse(getMonitor()));
        }
        catch(error){
            res.send({error: error});
        }
    }
    
    static monitorPanel(req, res){
        try{
            let setMonitor = JSON.parse(getMonitor());
            res.render('../views/home.html', {monitor:setMonitor});
        }
        catch(error){
            res.render('./error.html', {error: error});
        }
    }

    static monitorAdjustment(req, res){
        try{
            let setMonitor = JSON.parse(getMonitor());
            let strBody = JSON.stringify(req.body);

            let setBody = strBody.split('\"')
            // console.log(setBody);

            let frz = [];
            setBody.forEach(
                res => {    
                    if(res.replace(/[^a-z0-9-.]/gi,'') != ''){
                        frz.push(res.replace(/[^a-z0-9-.]/gi,''));
                    }                
                }
            );
            
            console.log(frz);

            switch(frz[1]){
                case "pilsner":
                    setMonitor.pilsner = setMonitor.pilsner + Number(frz[3]);
                    break;
                case "ipa":
                        setMonitor.ipa = setMonitor.ipa + Number(frz[3]);
                    break;
                case "lager":
                        setMonitor.lager = setMonitor.lager + Number(frz[3]);
                    break;
                case "stout":
                    setMonitor.stout = setMonitor.stout + Number(frz[3]);
                    break;
                case "wheat":
                    setMonitor.wheat = setMonitor.wheat + Number(frz[3]);
                    break;
                case 'pale':
                    setMonitor.pale = setMonitor.pale + Number(frz[3]);
                    break;
            }
            saveMonitor(setMonitor);
            setMonitor =  JSON.parse(getMonitor());
            res.send(setMonitor);
        }    
        catch(error){
            res.send({error: error});
        }
    }

    static monitorNormalize(req, res){
        try{
            let setMonitor = JSON.parse(getMonitor());
            console.log(req.body.freezer);
            
            switch(req.body.freezer){
                case "pilsner":
                    setMonitor.pilsner = -5;
                    break;
                case "ipa":
                        setMonitor.ipa = -5.5;
                    break;
                case "lager":
                        setMonitor.lager = -5.5;
                    break;
                case "stout":
                    setMonitor.stout = -7;
                    break;
                case "wheat":
                    setMonitor.wheat = -4;
                    break;
                case 6:
                    setMonitor.pale = -5;
                    break;
            }
            saveMonitor(setMonitor);
            setMonitor =  JSON.parse(getMonitor());
            res.render('../views/home.html', {monitor:setMonitor});
        }    
        catch(error){
            console.log(error);
            res.render('./error.html', {error: error});
        }
    }

};

function saveMonitor(monitor){
    file.writeFileSync('data.txt', JSON.stringify(monitor), function(err){
        if(err) {
            throw err;
        }        
    });  
}

function getMonitor() {  
    return file.readFileSync('data.txt','utf8',function(err,data){
        if(err){
            throw err;
        }        
    });
};

module.exports = MonitorActions;