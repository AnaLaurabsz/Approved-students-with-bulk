const db = require('../commons/database');
const { pollingManager } = require('../managers');

const approveStudents = (() => {
  let processing = false;
  const timeControl = (databaseEmpty) => pollingManager.updatePollingTimer(approveService, databaseEmpty);
  const resolveFindResponse = (studentsNotApprovedMath, classRoomCollection) => {
    let bulk = [];

    studentsNotApprovedMath.forEach(student => {
    
      bulk.push(
        {
          updateOne: {
            filter: {
              _id: student._id
            },
            update: {
              $set: {
                "subjectsApproved.math": true
              }
            }
          }
        }
      )

      if (bulk.length >= 10) {
        classRoomCollection.bulkWrite(bulk);

        bulk = [];
      }
    });

    if (bulk.length) {
      classRoomCollection.bulkWrite(bulk);

      bulk = [];
    }
  };

  const approveService = async () => {
    try {
      if (processing === true) {
        return;
      }

      processing = true;

      const classRoomCollection = db.getCollection('classRoom');
      const studentsNotApprovedMath = await classRoomCollection.find({
        "subjectsApproved.math": false
      }).toArray()

      timeControl(studentsNotApprovedMath.length === 0);

      if (studentsNotApprovedMath.length) {
        resolveFindResponse(studentsNotApprovedMath, classRoomCollection);
      }
      processing = false;


    } catch (error) {
      processing = false;
      console.log(error);
    }
  };
  return {
    approveService
  };
})();


module.exports = approveStudents;