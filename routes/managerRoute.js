require('babel-polyfill');
let express = require('express');
let route = express.Router();
let managerDB = require('../db/managerDB');

//获取所有题目类型
route.get('/getAllSubjectType',(req,resp)=>{
    managerDB.getAllSubjectType().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    });
});

//获取所有题目难度级别
route.get('/getAllSubjectLevel',(req,resp)=>{
    managerDB.getAllSubjectLevel().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    });
});

//获取所有的方向
route.get('/getAllDepartmentes',(req,resp)=>{
    managerDB.getAllDepartmentes().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    });
});

//获取所有的知识点
route.get('/getAllTopics',(req,resp)=>{
    managerDB.getAllTopics().then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    });
});

//按条件查询所有题目信息
route.post('/getAllSubjects',(req,resp)=>{
    let subjectType_id = req.body.subjectType_id;
    let subjectLevel_id = req.body.subjectLevel_id;
    let department_id = req.body.department_id;
    let topic_id = req.body.topic_id;
    managerDB.getAllSubjects(subjectType_id,subjectLevel_id,department_id,topic_id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    });
});

//审核题目
route.post('/checkSubject',(req,resp)=>{
    let subject_id = req.body.subject_id;
    let subject_checkState = req.body.subject_checkState;
    managerDB.checkSubject(subject_id,subject_checkState).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(data);
    });
});

//删除题目
route.post('/delSubject',(req,resp)=>{
    let subject_id = req.body.subject_id;
    managerDB.delSubject(subject_id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(data);
    });
});

//获取题目选项
route.post('/getChoice',(req,resp)=>{
    let subject_id = req.body.subject_id;
    managerDB.getChoice(subject_id).then((data)=>{
        resp.send(data);
    }).catch((err)=>{
        resp.send(err);
    });
});

//保存题目信息
route.post('/saveSubject',(req,resp)=>{
    let analysis = req.body.analysis;
    let answer = req.body.answer.join();
    let stem = req.body.stem;
    let uploadTime = req.body.uploadTime;
    let department_id = req.body.department_id;
    let subjectLevel_id = req.body.subjectLevel_id;
    let subjectType_id = req.body.subjectType_id;
    let topic_id = req.body.topic_id;
    managerDB.saveSubject(analysis, answer, stem, uploadTime, department_id, subjectLevel_id, subjectType_id, topic_id).then((data)=>{
        resp.json(data.insertId);
    }).catch((err)=>{
        resp.send(err);
    });
});

//保存单选选项信息
route.post('/saveChoices',(req,resp)=>{
    console.log('req.body数据',req.body);

    let choiceContent = req.body.choiceContent;
    let choiceCorrect = req.body.choiceCorrect;
    let subject_id = req.body.subject_id;

    for (let i = 0; i < choiceCorrect.length; i++) {
        let content = choiceContent[i];
        let correct = choiceCorrect[i];

        managerDB.saveChoices(content,correct,subject_id).then((data)=>{
            resp.json(data);
        }).catch((err)=>{
            resp.send(err);
        });
    }

});


module.exports = route;
