'use strict';

var MongoClient = require('mongodb').MongoClient;
var api = require('../../../../routes/api');

var testData = {
    users: [
      {
        _id : 0,
        username: 'greg',
        password: 'greg',
        fullname: 'Greg Lucas-Smith'
      }
    ],
    personnels: [
      {
        _id: 0,
        surname: 'Lucas-Smith',
        name: 'Greg',
        hchomephone: '11111111',
        roles: [
          { roleName : 'Jumbo Operator', projects: [
              { id: 'projectx', text: 'projectx', location : {name: 'McArthur River zinc mine'} }
            ], yearsPerformed : 6 }
        ],
        qualifications: [
          { name : 'Test Qualification', expiryDate : '31/Dec/2020', certificateNumber : '332343', institution : 'Edith' }
        ],
        trainings: [
          { name : 'Hard Training', certificateNumber : '1234567', institution : 'Training Centre of Excellence'}
        ],
        commLog: [
          { dateEntered: '01/01/2014 12:22', contact: 'greg', message: 'hello'}
        ]
      },
      {
        _id: 1,
        surname: 'Dallwitz',
        name: 'Lexi',
        hchomephone: '22222222',
        roles: [
          { roleName : 'Chemical Engineer', projects: [
              { id: 'projectx', text: 'projectx', location : {name: 'McArthur River zinc mine'} }
            ], client: 'Big Client', yearsPerformed : 10 }
        ],
        qualifications: [
          { name : 'Duplicate Qualification', expiryDate : '9/Dec/2020', certificateNumber : '332343', institution : 'Edith' },
          { name : 'Duplicate Qualification', expiryDate : '20/Dec/2013', certificateNumber : '3322243', institution : 'Edith' }
        ]
      },
      {
        _id: 2,
        surname: 'Noqualifications',
        name: 'Mister',
        roles: [
          { roleName : 'Amazing Job', projects: [
              { id: 'project', text: 'project', location: {name: 'Other mine'}, projectExperience: [] }
            ], yearsPerformed: 3 },
          { roleName : 'Real Good Job', projects: [
              { id: 'project2', text: 'project2', location: {name: 'Other mine'}, projectExperience: ['onOG'] }
            ], yearsPerformed: 3 },
          { roleName : 'Perfect Job', projects: [
              { id: 'project3', text: 'project3', location: {name: 'Other mine'}, projectExperience: ['onOG', 'eeha'] }
            ], yearsPerformed: 3 }
        ],
        trainings: [
          { name : 'EEHA', certificateNumber : '1234567', institution : 'EEHA Teacher'}
        ],
        occupation: 'Railway Electrician'
      },
      {
        _id: 3,
        surname: 'Frangelico',
        name: 'Alex',
        hchomephone: '2349894',
        hcmobile: '12345678',
        roles: [
          { roleName : 'Jumbo Operator', client: 'Big Client', projects: [
              { id: 'Good Project', text: 'Good Project', location : 'McArthur River zinc mine' }
            ], yearsPerformed : 8 },
          { roleName : 'Jumbo Operator', client: 'Small Client', projects: [
              { id: 'Great Project', text: 'Great Project', location : 'Other mine 2', projectExperience: ['offOG', 'eeha'] }
            ], yearsPerformed : 8 }
        ],
        qualifications: [
          { name : 'Boy Qualification', expiryDate : '9/Jun/2025', certificateNumber : '332343', institution : 'Edith' },
          { name : 'Test Qualification', expiryDate : '9/Apr/2025', certificateNumber : '332343', institution : 'Edith' }
        ],
        trainings: [
          { name : 'Hard Training', certificateNumber : '1234567', institution : 'Training Centre of Excellence'},
          { name : 'Easy Training', certificateNumber : '1234567', institution : 'Training Centre of Easiness'}
        ],
        commLog: [
          {
            _id: 0,
            dateEntered: '10/12/2014 22:44',
            contact: {
                _id: 0,
                username: 'greg',
                fullname: 'Greg Lucas-Smith'
            },
            message: 'dude',
            type: 'Email',
            direction: 'Outgoing',
            showFollowup: true,
            followup: [
              {
                dateDue: '11/12/2014 22:47',
                completed: false,
                contact: {
                    _id: 0,
                    username: 'greg',
                    fullname: 'Greg Lucas-Smith'
                },
                type: 'Email',
                message: 'followup dude'
              }
            ]
          },
          {
            _id: 1,
            followup: {
              _id: 1
            }
          },
          {
            _id: 2,
            followup: {
              _id: 2
            }
          },
          {
            _id: 3,
            followup: {
              _id: 3
            }
          },
          {
            _id: 4,
            followup: {
              _id: 4
            }
          },
          {
            _id: 5
          }
        ]

      },
      {
        _id: 4,
        surname: 'Noroles',
        name: 'Signore',
        hchomephone: '2349894'
      },
      {
        _id: 5,
        surname: 'Frangelico',
        name: 'Deleted',
        roles: [
          { roleName : 'Jumbo Operator', projects: [
            { id: 'projectx', text: 'projectx', location : {name: 'McArthur River zinc mine'} }
          ], yearsPerformed : 6 }
        ],
        deleted: true
      }
    ],
    jobDescriptions: [
    {
      _id: 0,
      company: 'Company 1',
      position: 'Position 1'
    },
    {
      _id: 1,
      company: 'Company 2',
      position: 'Position 2'
    },
    {
      _id: 2,
      worktype: 'fulltime',
      offshore: false,
      status: 'open',
      datecompleted: '08/12/2014',
      company: 'Company 3',
      position: 'Company 3',
      similarPosition: 'jumbo',
      personnels: [ 
        {
          _id: 3,
          name : 'Alex',
          surname : 'Frangelico',
          acceptable: true,
          currentWorkflow: 0,
          workflows: [
            { comments: 'hi there' }
          ]
        },
        {
          _id: 2,
          acceptable: true,
          currentWorkflow: 0
        }
      ]
    }
  ]
};

function databaseWrapper(testCallback) {

  MongoClient.connect(process.env.DBSTRING, function(err, db) {

    if(err) {
      console.log(err.stack);
      throw err;
    }

    var users = db.collection('users');

    users.remove(function(err) {
      if (err) {
        console.log('users drop error: ' + err);
        console.warn(err.stack);
      }

      users.insert(testData.users, function(err) {
        if (err) {
          console.log('error inserting users: ' + err);
          console.warn(err.stack);
        }

        var personnels = db.collection('personnels');

        personnels.remove(function(err) {
          if (err) {
            console.log('personnels drop error: ' + err);
            console.warn(err.stack);
          }

          personnels.insert(testData.personnels, function(err) {
            if (err) {
              console.log('error inserting personnels: ' + err);
              console.warn(err.stack);
            }

            var jobDescriptions = db.collection('jobDescriptions');

            jobDescriptions.remove(function(err) {
              if (err) {
                console.log('jobDescriptiona drop error: ' + err);
                console.warn(err.stack);
              }

              jobDescriptions.insert(testData.jobDescriptions, function(err) {

                if (err) {
                  console.log('error inserting jobDescriptions: ' + err);
                  console.warn(err.stack);
                }

                testCallback();
                db.close();
              });

            });

          });

        });

      });

    });

  });

}

exports.databaseWrapper = databaseWrapper;
exports.testData = testData;
exports.api = api;