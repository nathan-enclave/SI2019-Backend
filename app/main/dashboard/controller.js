const BaseController = require('../../base/BaseController');
const DashboardService = require('./service');

class DashboardController extends BaseController {
  constructor() {
    super(new DashboardService());
  }

  async cashFlow(request) {
    try {
      const { year } = request.params;
      return await this.service.cashFlow(year);
    } catch (err) {
      throw err;
    }
  }

  async getProject(request) {
    try {
      return await this.service.getProject(request.query);
    } catch (err) {
      throw err;
    }
  }

  async getTotal(request) {
    try {
      return await this.service.getTotal(request.query);
    } catch (err) {
      throw err;
    }
  }

  async getStatisticEngineerStatus() {
    try {
      return await this.service.getStatisticEngineerStatus();
    } catch (error) {
      throw error;
    }
  }

  async salary(request) {
    try {
      return await this.service.salary(request.params);
    } catch (err) {
      throw err;
    }
  }

  async workStatus(request) {
    try {
      const { year } = request.params;
      return await this.service.workStatus(year);
    } catch (err) {
      throw err;
    }
  }

  async getStatisticProjectEarningByMonth(request) {
    try {
      const { year } = request.params;
      return await this.service.getStatisticProjectEarningByMonth(year);
    } catch (error) {
      throw error;
    }
  }

  async getStatisticEngineerSw() {
    try {
      return await this.service.getStatisticEngineerSw();
    } catch (error) {
      throw error;
    }
  }

  async getStatisticEngineerSalary() {
    try {
      return await this.service.getStatisticEngineerSalary();
    } catch (error) {
      throw error;
    }
  }

  async getStatisticEngineerGender() {
    try {
      return await this.service.getStatisticEngineerGender();
    } catch (error) {
      throw error;
    }
  }

  async getStatistiProjectByYear(request) {
    try {
      const { year } = request.params;
      return await this.service.getStatistiProjectByYear(year);
    } catch (error) {
      throw error;
    }
  }

  async getStatisticTeamAndProject() {
    try {
      return await this.service.getStatisticTeamAndProject();
    } catch (error) {
      throw error;
    }
  }

  async getStatistiProjectCategory() {
    try {
      return await this.service.getStatistiProjectCategory();
    } catch (error) {
      throw error;
    }
  }

  async getStatistiProjectLocation(request) {
    try {
      const { year } = request.query;
      return await this.service.getStatistiProjectLocation(year);
    } catch (error) {
      throw error;
    }
  }

  async getStatistiSalaryTeam() {
    try {
      return await this.service.getStatistiSalaryTeam();
    } catch (error) {
      throw error;
    }
  }

  async getStatistiDeadLine() {
    try {
      return await this.service.getStatistiDeadLine();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DashboardController;
