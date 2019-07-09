// const bcrypt = require('bcrypt');
const faker = require('faker');
const Models = require('../models');
// const { SALT_ROUNDS } = require('../../constants');
const Factory = require('../factory');
const samples = require('../factory/samples');

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('managers')
    .del()
    .then(() => knex('roles').del())
    .then(async () =>
      Models.Role.query().insertGraph([
        {
          name: 'superadmin',
          description: 'Admin with highest AUTHORITY'
        },
        {
          name: 'admin',
          description: 'Admin'
        }
      ])
    )
    .then(() => Models.Manager.query().insertGraph(Factory.manager(5)))
    .then(() => Models.Engineer.query().insertGraph(Factory.engineer(200)))
    .then(() => Models.Skill.query().insertGraph(Factory.skill()))
    // Adding skills to each Engineer
    .then(async () => {
      const totalEngineers = (await Models.Engineer.query().count())[0].count;
      const totalSkills = (await Models.Skill.query().count())[0].count;
      const data = [];
      for (let index = 0; index < totalEngineers; index += 1) {
        const randomNum = faker.random.number({
          min: 1,
          max: 7
        });
        let randomSkills = [];

        for (let j = 0; j < randomNum; j += 1) {
          randomSkills.push(
            faker.random.number({
              min: 1,
              max: totalSkills
            })
          );
        }
        randomSkills = [...new Set(randomSkills)];
        for (let i = 0; i < randomSkills.length; i += 1) {
          data.push(samples.createEngineerSkill(index + 1, randomSkills[i]));
        }
      }
      await Models.EngineerSkill.query().insertGraph(data);
    })
    .then(() => Models.Project.query().insertGraph(Factory.project(100)))
    .then(async () => Models.Team.query().insertGraph(await Factory.team(20)))
    // Adding members to team
    .then(async () => {
      const totalEngineers = (await Models.Engineer.query().count())[0].count;
      const totalTeams = (await Models.Team.query().count())[0].count;
      const data = [];
      for (let index = 0; index < totalTeams; index += 1) {
        for (let i = 0; i < 5; i += 1) {
          if (i === 0) {
            data.push(
              samples.createEngineerTeam(
                faker.random.number({
                  min: 1,
                  max: totalEngineers
                }),
                index + 1,
                'leader'
              )
            );
          } else {
            data.push(
              samples.createEngineerTeam(
                faker.random.number({
                  min: 1,
                  max: totalEngineers
                }),
                index + 1
              )
            );
          }
        }
      }
      await Models.EngineerTeam.query().insertGraph(data);
    });
