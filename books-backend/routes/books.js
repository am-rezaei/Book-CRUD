let express = require('express');
let router = express.Router();


const NodeCache = require("node-cache");
const SEQUENCE_KEY = "sequence_key";
const myCache = new NodeCache();


myCache.set(1,{name:'Computer Programmer',year:'2012',id:1,ISBN:'1E343EHR3',author:'Amin'});
myCache.set(2,{name:'Data Structure',year:'2015',id:2,ISBN:'234SMH123',author:'Amin'});
myCache.set(SEQUENCE_KEY,2);


router.delete('/:id', async function (req, res, next) {
    let id = parseInt(req.params.id);
    myCache.del(id)
    return res.status(200).json({success: 'ok'});
})

router.get('/list', async (req, res) => {
    let result = [];
    myCache.keys().forEach(k => {
            if (k !== SEQUENCE_KEY) {
                result.push(myCache.get(k));
            }
        }
    )
    return res.status(200).json(result);
});

router.get('/ping', async (req, res) => {
    return res.status(200).json({state:'ok'});
});

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    return res.status(200).json(myCache.get(id));
});


router.post('/', async (req, res) => {
    let lastKey = myCache.get(SEQUENCE_KEY);
    if (lastKey === undefined)
        lastKey = 0;
    let newKey = lastKey + 1;
    myCache.set(SEQUENCE_KEY, newKey);
    myCache.set(newKey, {...req.body, id: newKey});
    return res.status(200).json({message: 'created'});
});

router.put('/', async (req, res) => {
    try {
        myCache.set(req.body.id, req.body);
        return res.status(200).json({message: 'updated'});
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: 'something went wrong'});
    }
});


//Handle undefined routes
const notFound = function (req, res) {
    return res.status(404).json({message: 'NOT FOUND!'});
};
router.get('*', notFound);
router.post('*', notFound);
router.put('*', notFound);
router.delete('*', notFound);

module.exports = router;
