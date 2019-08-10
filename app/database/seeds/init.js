// const bcrypt = require('bcrypt');
const faker = require('faker');
const _ = require('lodash');
const moment = require('moment');
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
          name: 'Director',
          description: 'Diretor of the department'
        },
        {
          name: 'HR',
          description: 'Human resource manager for human management'
        },
        {
          name: 'PM',
          description: 'Project manager for team and project management'
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
    .then(() => Models.Category.query().insertGraph(Factory.categories()))
    .then(() => Models.Location.query().insertGraph(Factory.locations()))
    .then(async () => Models.Project.query().insertGraph(await Factory.project()))
    .then(async () => Models.Team.query().insertGraph(await Factory.team()))
    // Adding members to team
    .then(async () => {
      const totalEngineers = (await Models.Engineer.query().count())[0].count;
      const totalTeamWithProject = await Models.Team.query()
        .joinRelation('projects')
        .select('projects.start as projectStartDay', 'projects.end as projectEndDay');
      const data = [];
      for (let index = 0; index < totalTeamWithProject.length; index += 1) {
        for (let i = 0; i < 5; i += 1) {
          switch (i) {
            case 0:
              data.push(
                samples.createEngineerTeam(
                  faker.random.number({
                    min: 1,
                    max: totalEngineers
                  }),
                  index + 1,
                  'leader',
                  moment(totalTeamWithProject[i]).add(2, 'days')
                )
              );
              break;
            case 1:
              data.push(
                samples.createEngineerTeam(
                  faker.random.number({
                    min: 1,
                    max: totalEngineers
                  }),
                  index + 1,
                  'quality assurance',
                  moment(totalTeamWithProject[i]).add(2, 'days')
                )
              );
              break;

            default:
              data.push(
                samples.createEngineerTeam(
                  faker.random.number({
                    min: 1,
                    max: totalEngineers
                  }),
                  index + 1,
                  'developer',
                  moment(totalTeamWithProject[i]).add(2, 'days')
                )
              );
              break;
          }
        }
      }
      await Models.EngineerTeam.query().insertGraph(data);
    })
    // Handle status of engineers
    .then(async () => {
      const team = await Models.Team.query()
        .joinRelation('projects')
        .eager('engineers(selectEngineer)', {
          selectEngineer: builder => builder.select('engineers.id')
        })
        .where('projects.status', 'inProgress')
        .select('teams.id', 'projects.status');
      let listEngineers = _.map(team, 'engineers');
      // listEngineers = _.map(listEngineers, 'id');
      listEngineers = [].concat(...listEngineers);
      listEngineers = _.map(listEngineers, 'id');
      listEngineers = [...new Set(listEngineers)];
      await Models.Engineer.query()
        .whereIn('id', listEngineers)
        .update({
          status: 0
        });
    })
    .then(() => Models.CashFlow.query().insertGraph(Factory.cashFlow()));
