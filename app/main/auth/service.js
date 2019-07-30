const Boom = require('boom');
const _ = require('lodash');

const jwt = require('../../services/jwt');
const PasswordUtils = require('../../services/password');
const sendEmail = require('../../services/sendEmail');
const Models = require('../../database/models');
// const CONSTANTS = require('../../constants');

class AuthService {
  async login(payload) {
    try {
      const { username, password } = payload;
      const user = await Models.Manager.query()
        .findOne({ username })
        .joinRelation('role')
        .select('managers.*', 'role.name as scope', 'managers.password as hashPassword');
      if (!user) {
        return Boom.conflict('User is not found');
      }

      if (!user.hashPassword) {
        return Boom.conflict('User can not login with username and password');
      }

      const isCorrectPassword = await PasswordUtils.compare(password, user.hashPassword);
      if (!isCorrectPassword) {
        return Boom.forbidden('Incorrect password');
      }

      const adminInformation = await Models.Engineer.query()
        .findById(user.engineerId)
        .select('firstName', 'lastName', 'englishName');
      const data = _.assign(
        _.pick(user, ['username', 'id', 'scope', 'engineerId']),
        adminInformation
      );
      return _.assign({ token: jwt.issue(data) }, data);
    } catch (error) {
      throw error;
    }
  }

  async register(payload) {
    try {
      const { username, password, engineerId } = payload;
      const user = await Models.Manager.query().findOne({ username });
      if (user) {
        return Boom.conflict('User is exist');
      }
      const roleId = _.sample([2, 3]);
      const hashPassword = await PasswordUtils.hash(password);
      const result = await Models.Manager.query().insert({
        username,
        password: hashPassword,
        roleId,
        engineerId
      });
      result.scope = roleId === 2 ? 'HR' : 'PM';
      const data = _.pick(result, ['username', 'id', 'scope']);
      return _.assign({ token: jwt.issue(data) }, data);
    } catch (error) {
      throw error;
    }
  }

  // check email
  async check(payload) {
    try {
      const { email } = payload;
      let result;
      const numCode = Math.floor(Math.random() * 100000) + 10000; // get random number
      const checkEmail = await Models.Engineer.query()
        .where('email', email)
        .select('id');
      if (checkEmail.length === 0) {
        throw Boom.notFound('Engieer is not found');
      }
      const idEng = Number(_.map(checkEmail, 'id'));
      const checkRole = await Models.Manager.query()
        .update({ verify: numCode })
        .where('engineerId', idEng);
      if (checkRole.length === 0) {
        throw Boom.forbidden('User has no permistion');
      }

      const getIdManager = await Models.Manager.query()
        .where('engineerId', idEng)
        .select('id');
      const id = Number(_.map(getIdManager, 'id'));
      if (!getIdManager) {
        throw Boom.forbidden('Not Found');
      } else {
        result = `${email} is can changer password`;
      }
      return { result, email, id };
    } catch (error) {
      throw error;
    }
  }

  // send verify code

  async sendcode(payload) {
    try {
      const { email } = payload;
      const title = `Hear is verify code to change password.`;
      let result;
      const checkEmail = await Models.Engineer.query()
        .where('email', email)
        .select('id', 'firstName');
      const id = Number(_.map(checkEmail, 'id'));
      const name = _.map(checkEmail, 'firstName');
      const checkRole = await Models.Manager.query()
        .where('engineerId', id)
        .select('verify');
      if (!id) {
        throw Boom.forbidden(`${email} Not exits`);
      }
      if (checkRole.length === 0) {
        throw Boom.forbidden(`${email} Not is manager`);
      }
      const verifycode = Number(_.map(checkRole, 'verify'));
      const content = `<html>
      <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" class="m_3908211973147165576table-main-gmail" style="max-width:600px;width:100%">
                     
                     
         <body><table border="0" cellpadding="0" cellspacing="0" width="600" align="center" class="m_3908211973147165576table-main-gmail" style="max-width:600px;width:100%">
                     
                     
            <tbody><tr>
               <td align="center" valign="top" style="border:1px solid #dedede">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                     
                     <tbody><tr>
                        <td align="center" valign="top">
                           <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                              <tbody><tr>
                                 <td align="center" valign="top" style="padding:23px 0">
                                    <img src="http://enclaveit.com/wp-content/uploads/2019/03/logo_enclave_12.png" height="40" style="height:40px;vertical-align:middle" alt="Firebase" title="Firebase" class="CToWUd">
                                 </td>
                              </tr>
                           </tbody></table>
                        </td>
                     </tr>
                     
                     
                     <tr>
                        <td align="center" valign="top" style="padding:30px 25px;border-top:1px solid #e0e0e0">
                           <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                              <tbody><tr>
                                 <td align="left" valign="top" style="font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;color:#222222;font-weight:700;font-size:20px;line-height:26px;padding:0 0">
                                    Hi ${name},
                                 </td>
                              </tr>
                              <tr>
                                 <td align="left" valign="top" style="font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;color:#222222;font-weight:400;font-size:14px;line-height:22px;padding:20px 0 0">
                                
                                 Hear is verify code to change password your account.</br>
                                 Enter this number in textbox verify code.
                                    <tr>
                                       <td align="center" valign="border" style="font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;color:#f5aa42;font-weight:400;font-size:40px;line-height:22px;padding:20px;border:10px 0 0">
                                        <b><i>${verifycode}</i></b>
                                       </td>
                                    </tr>
                              </tr>
      
                              <tr>
                                 <td align="center" valign="border" style="font-family:Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;color:#b5af9e;font-weight:400;font-size:12px;line-height:22px;padding:20px;border:10px 0 0">
                                  <i>Email had send by Enclave software manager</i>
                                 </td>
                              </tr>
      
                           </tbody></table>
                        </td>
                     </tr>
                  
                        
                    
                     
                  </tbody></table>
               </td>
            </tr>
         </tbody></table>
      </body>
      </html>`;
      try {
        sendEmail.sendEmail(email, title, content);
        result = `sended`;
      } catch (error) {
        throw Boom.forbidden(error);
      }
      return result;
    } catch (error) {
      throw Boom.forbidden(error);
    }
  }

  // reset pasword
  async reset(id, payload) {
    try {
      let result;
      const { verify, password } = payload;
      const hashPassword = await PasswordUtils.hash(password);
      try {
        const checkVerify = await Models.Manager.query()
          .where('id', id)
          .select('verify');
        const pickVerify = Number(checkVerify.map(e => e.verify));
        if (verify === pickVerify) {
          const update = await Models.Manager.query()
            .findById(id)
            .update({ password: `${hashPassword}`, verify: null })
            .returning('id', 'username');
          result = 'Complete';
          if (!update) {
            return Boom.conflict('fail');
          }
        } else {
          return Boom.conflict('verify incorect');
        }
      } catch (error) {
        throw error;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
