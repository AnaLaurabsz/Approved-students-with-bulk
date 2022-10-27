const db = require('../client/database')

class ApproveStudents {
  async handle() {
    let bulk = [];
    const classRoomCollection = db.getCollection("classRoom");

    const studentsNotApprovedMath = await classRoomCollection.find({
      "subjectsApproved.math": true
    }).toArray();

    console.log('Total não aprovados %s', studentsNotApprovedMath.length)

    studentsNotApprovedMath.forEach(student => {
      console.log('Total do bulk %s', bulk.length)

      bulk.push(
        {
          updateOne: {
            filter: {
              _id: student._id
            },
            update: {
              $set: {
                "subjectsApproved.math": false
              }
            }
          }
        }
      )

      if (bulk.length >= 10) {
        classRoomCollection.bulkWrite(bulk);

        console.log('Gravou 10 registros')

        bulk = [];
      }
    });

    if (bulk.length) {
      classRoomCollection.bulkWrite(bulk);

      console.log('Gravou %s', bulk.length)

      bulk = [];
    }

    return { success: true };
  }
}

module.exports = { ApproveStudents };
