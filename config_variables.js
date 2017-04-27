exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
'mongodb://JulesTeacher:hannahbaker@ds119151.mlab.com:19151/student-teacher-db'
exports.TEST_DATABASE_URL = 'mongodb://Jules:thisismine@ds143030.mlab.com:43030/test_db_jul';
exports.PORT = process.env.PORT || 8080;


// mongo ds119151.mlab.com:19151/student-teacher-db -u JulesTeacher -p hannahbaker

/*To connect using a driver via the standard MongoDB URI (what's this?):*/

