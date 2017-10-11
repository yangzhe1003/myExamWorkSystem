let pool = require('./pool');
module.exports = {
    //获取所有题目类型
    getAllSubjectType(){
        let sql = "SELECT * FROM tbl_exam_subjecttype;";
        return pool.execute(sql);
    },

    //获取所有题目难度级别
    getAllSubjectLevel(){
        let sql = "SELECT * FROM tbl_exam_subjectlevel;";
        return pool.execute(sql);
    },

    //获取所有的方向
    getAllDepartmentes(){
        let sql = "SELECT * FROM tbl_exam_epartment;";
        return pool.execute(sql);
    },

    //获取所有的知识点
    getAllTopics(){
        let sql = "SELECT * FROM tbl_exam_topic;";
        return pool.execute(sql);
    },

    //按条件查询所有题目信息
    getAllSubjects(subjectType_id,subjectLevel_id,department_id,topic_id){
        let sql = "SELECT * FROM tbl_exam_subject where subjectType_id="                      +subjectType_id+" and subjectLevel_id="+subjectLevel_id
                    +" and department_id="+department_id+" and topic_id="+topic_id+";";
        return pool.execute(sql);
    },

    //审核题目
    checkSubject(subject_id,subject_checkState){
        let sql = "UPDATE tbl_exam_subject  SET  checkState ='"
            +subject_checkState+"' WHERE id="+subject_id+";";
        return pool.execute(sql);
    },

    //显示题目选项
    getChoice(subject_id){
        let sql = "SELECT * FROM tbl_exam_choice where subject_id="+subject_id+";";
        return pool.execute(sql);
    }
}